import * as RLang from './rlang.js'
import { installRUniversePackages } from './r.js'
import { rCompletions } from "./completions.js";
import { cowsay, plotR, instructions } from "./boilerplate.js";
import { default as DOMPurify } from 'https://cdn.jsdelivr.net/npm/dompurify@3.0.1/+esm'
import picoModal from 'https://cdn.jsdelivr.net/npm/picomodal@3.0.0/+esm'
import { default as lf } from 'https://cdn.jsdelivr.net/npm/localforage@1.10.0/+esm'


globalThis.lf = lf

// debugging
lf.config({
	name: 'webrider-localforage',
	storeName: 'rObjs',
	description: 'Objects for WebRIDEr'
});

const keys = await lf.keys()

// setup our handlers for the Console

// Configure the Monaco Editor
require.config({
	paths: {
		'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.27.0/min/vs'
	}
});

globalThis.RHistory = [];

require([ 'vs/editor/editor.main' ], function () {

	const savedCode = localStorage.getItem('savedCode') || `${instructions}\n\n${cowsay}\n\n${plotR}\n\n`;

	var editor = monaco.editor.create(document.getElementById('editor'), {
		value: savedCode,
		language: 'r',
		theme: 'vs-dark'
	});

	monaco.languages.register({ id: 'r' });
	monaco.languages.setMonarchTokensProvider('r', RLang.language)
	monaco.languages.setLanguageConfiguration('r', RLang.conf)
	monaco.languages.registerCompletionItemProvider('r', rCompletions);

	globalThis.editor = editor;

	// This handles sending stuff from the editor to R
	// OR intercepting stuff before it goes to R
	async function sendInput() {

		var selectedText = editor.getModel().getValueInRange(editor.getSelection());

		if (!selectedText) {
			var lineNumber = editor.getPosition().lineNumber;
			selectedText = editor.getModel().getLineContent(lineNumber);
		}

		selectedText = selectedText.trim()
		globalThis.RHistory.push(selectedText)

		if (selectedText.startsWith("?")) {
			window.open(`https://rdocs.rud.is/#q=r ${DOMPurify.sanitize(selectedText.trim().slice(1))}`, '_rdocs')
			return
		} else if (selectedText.startsWith("browseURL")) {
			const url = DOMPurify.sanitize(selectedText.match(/browseURL\((["'])(.*?)\1\)/)[ 2 ]);
			window.open(url, "blank")
			const outpre = document.getElementById("outpre")
			outpre.innerText += "# Help tab opened" + '\n> ';
			outpre.scrollTop = outpre.scrollHeight
			return
		} else if (selectedText.startsWith("install.runiverse")) {
			const pkg = DOMPurify.sanitize(selectedText.match(/install.runiverse\((["'])(.*?)\1\)/)[ 2 ]);
			const outpre = document.getElementById("outpre")
			const out = document.getElementById("out")
			outpre.innerText += `# ${pkg} installed.` + '\n> ';
			outpre.scrollTop = outpre.scrollHeight;
			await installRUniversePackages(pkg)
			return
		}

	  globalThis.webRConsole.stdin(selectedText);

		document.getElementById('outpre').innerText += selectedText + "\n";

		const outpre = document.getElementById("outpre")
		outpre.scrollTop = outpre.scrollHeight; // scroll into view

	}

	// this handles auto-save to local storage on change
	editor.onDidChangeModelContent(() => {
		const content = editor.getValue();
		localStorage.setItem('savedCode', content);
	});

	// cmd-shift-p to bring up the command palette
	editor.addCommand(
		monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KEY_P,
		() => {
			editor.getAction('editor.action.quickCommand').run();
		},
		''
	);

	// cmd-enter to run code
	editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, async function () {
		Promise.resolve(await sendInput());
	});

	// pair of functions to clear local storage and restore boilerplate
	function clearLocalStorage() {
		localStorage.removeItem('savedCode');
		editor.setValue(`${instructions}\n\n${cowsay}\n\n${plotR}\n\n`)
	}

	async function viewEnvironmentSummary() {
		
		const res = await globalThis.webRConsole.webR.evalR(`
paste0(c("<table class='r-env-view'>", sapply(ls(), function(.x) {
  esc <- function(.y) gsub(">", "&gt;", gsub("<", "&lt;", .y))
  tmp <- get(.x)
  sprintf("<tr><td>%s</td><td>%s</td><td>%s</td></tr>", .x, esc(capture.output(print(str(tmp, 1), width=20))[1]), format(object.size(tmp)))
}, USE.NAMES = FALSE), "</table>"), collapse="\n")
`)
		const tbl = await res.toJs()
		
		picoModal({
			content: `${decodeURI(tbl.values[0])}`,
			overlayStyles: {
				backgroundColor: "darkslategray",
				opacity: 0.75
			},
			modalStyles: {
				backgroundColor: "#1e1e1e",
				padding: "30px"
			}
		}).show();
	}

  function viewWebRHistory() {

		picoModal({
			content: `<pre style='max-height: 50vh; color: white; overflow: scroll; padding-bottom:6px;'>${decodeURI(globalThis.RHistory.join("\n"))}</pre>`,
			overlayStyles: {
				backgroundColor: "darkslategray",
				opacity: 0.75
			},
			modalStyles: {
				backgroundColor: "#1e1e1e",
				padding: "30px"
			}
		}).show();
	}

	async function saveWorkspace() {
		const res = await globalThis.webRConsole.webR.evalR(`save.image()`)
		const rData = await globalThis.webRConsole.webR.FS.readFile(".RData")
		await lf.setItem("WORKSPACE", rData);
	}

	editor.addAction({
		id: 'save-webr-workspace',
		label: 'WebR: Save Workspace',
		// keybindings: [ monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KEY_L ], // Optional: Assign a keybinding
		contextMenuGroupId: 'navigation',
		contextMenuOrder: 1.5,
		run: saveWorkspace
	});

	async function loadWorkspace() {
		const rData = await lf.getItem("WORKSPACE")
		let res = await globalThis.webRConsole.webR.FS.writeFile(".RData", rData)
		res = await globalThis.webRConsole.webR.evalR(`load(".RData")`)
	}

	editor.addAction({
		id: 'load-webr-workspace',
		label: 'WebR: Load Workspace',
		// keybindings: [ monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KEY_L ], // Optional: Assign a keybinding
		contextMenuGroupId: 'navigation',
		contextMenuOrder: 1.5,
		run: loadWorkspace
	});

	async function interruptSession() {
		await globalThis.webRConsole.interrupt()
	}

	editor.addAction({
		id: 'interrupt-webr-session',
		label: 'WebR: Interrupt Session',
		// keybindings: [ monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KEY_L ], // Optional: Assign a keybinding
		contextMenuGroupId: 'navigation',
		contextMenuOrder: 1.5,
		run: interruptSession
	});

	editor.addAction({
		id: 'view-webr-history',
		label: 'WebR: View WebR History',
		keybindings: [ monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KEY_L ], // Optional: Assign a keybinding
		contextMenuGroupId: 'navigation',
		contextMenuOrder: 1.5,
		run: viewWebRHistory
	});

	editor.addAction({
		id: 'view-environment-summary',
		label: 'WebR: View WebR Env. Summary',
		keybindings: [ monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KEY_U ], // Optional: Assign a keybinding
		contextMenuGroupId: 'navigation',
		contextMenuOrder: 1.5,
		run: viewEnvironmentSummary
	});

	editor.addAction({
		id: 'clear-local-storage',
		label: 'WebR: Clear Local Storage',
		keybindings: [ monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KEY_K ], // Optional: Assign a keybinding
		contextMenuGroupId: 'navigation',
		contextMenuOrder: 1.5,
		run: clearLocalStorage
	});

	// save the "canvas" as PNG
	editor.addAction({
		id: 'saveCanvas',
		label: 'WebR: Save Canvas as PNG…',
		run: function (editor) {
			var canvas = document.getElementById('plot-canvas');
			var dataURL = canvas.toDataURL('image/png');
			var link = document.createElement('a');
			link.download = 'canvas.png';
			link.href = dataURL;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	});

	// save the source pane
	editor.addAction({
		id: 'saveSource',
		label: 'WebR: Save Source Pane…',
		keybindings: [
			monaco.KeyMod.CtrlCmd | monaco.KeyMod.Alt | monaco.KeyCode.KEY_S
		],
		run: function (editor) {
			var source = editor.getValue();
			var blob = new Blob([ source ], { type: 'text/plain' });
			var link = document.createElement('a');
			link.href = URL.createObjectURL(blob);
			var fileName = prompt('Enter file name:', 'source.R');
			if (fileName === null) {
				return;
			}
			link.download = fileName;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	});

	// cmd-option-p from anywhere
	document.addEventListener('keydown', function (event) {
		if ((event.ctrlKey || event.metaKey) && event.keyCode === 80) {
			event.preventDefault();
			var filename = 'source.r';
			var link = document.createElement('a');
			link.download = filename;
			link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(editor.getValue());
			link.click();
		}
	});

	editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KEY_I,
		function () {
			var currentPosition = editor.getPosition();
			editor.executeEdits("", [ {
				range: new monaco.Range(currentPosition.lineNumber, currentPosition.column, currentPosition.lineNumber, currentPosition.column),
				text: "|>"
			} ]);
		});

	editor.addCommand(monaco.KeyMod.Alt | monaco.KeyMod.Shift | monaco.KeyCode.US_MINUS,
		function () {
			var currentPosition = editor.getPosition();
			editor.executeEdits("", [ {
				range: new monaco.Range(currentPosition.lineNumber, currentPosition.column, currentPosition.lineNumber, currentPosition.column),
				text: "<-"
			} ]);
		});

});
