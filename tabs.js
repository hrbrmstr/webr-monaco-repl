const tabButtons = document.querySelectorAll('.tabbtn');
const tabs = document.querySelectorAll('.tab');

tabButtons.forEach((button, index) => {
	button.addEventListener('click', () => {
		tabButtons.forEach(button => {
			button.classList.remove('active');
		});
		tabs.forEach(tab => {
			tab.classList.add('hidden');
			tab.classList.remove('active');
		});
		button.classList.add('active');
		tabs[ index ].classList.remove('hidden');
		tabs[ index ].classList.add('active');
	});
});

export async function refreshEnvTab() {

	const res = await globalThis.webRConsole.webR.evalR(`
ls() |> sort() |> lapply(function(.obj) {
  
  total_size <- function(x) {
    size <- object.size(x)
    
    if (is.environment(x)) {
      for (name in ls(x)) {
        obj <- get(name, envir = x)
        size <- size + total_size(obj)
      }
    }
    
    return(size)
  }
  
  esc <- function(.y) {
    if (grepl("<environ", .y[1])) return("environment")
    gsub(">", "&gt;", gsub("<", "&lt;", .y))
  }
  
  tmp <- get(.obj)
  
  list(
    name = .obj, 
    wat = esc(capture.output(print(str(tmp, 1), width=20))[1]), 
    size = format(total_size(tmp), units="auto", standard = "SI", digits=2)
  )
  
})
`)
	
	const envTab = document.getElementById("env-tab")
	// while (envTab.firstChild) {
	// 	envTab.removeChild(envTab.firstChild);
	// }

	const fragment = document.createDocumentFragment();

	for await (const r of res) {

		const obj = await r.toJs();

		const row = document.createElement("div");
		row.classList.add("env-row");

		fragment.appendChild(row)

		// create a div for each key in the object and add it to the row
		obj.values.forEach(val => {
			const cell = document.createElement("div");
			cell.classList.add("env-row-cell");
			cell.textContent = val.values[ 0 ];
			cell.title = val.values[ 0 ];
			row.appendChild(cell);
		});

		fragment.appendChild(row)

	}

	envTab.style.display = 'none';
	envTab.replaceChildren(fragment)
	envTab.style.display = ''; 

}
function createTree(paths) {
	const tree = {};

	paths.forEach(path => {
		let parts = path.split('/');
		let currentLevel = tree;

		parts.forEach((part, index) => {
			if (!currentLevel[ part ]) {
				currentLevel[ part ] = index === parts.length - 1 ? null : {};
			}
			currentLevel = currentLevel[ part ];
		});
	});

	return tree;
}


export async function refreshDirTree() {

	const res = await globalThis.webRConsole.webR.evalR(`
list.files("..", all.files = TRUE, recursive = TRUE, include.dirs = TRUE)
`)
	
	const tree = await res.toArray()

	const fsPre = document.getElementById("fs-pre")
	
	fsPre.innerText = tree.join("\n")
	
}