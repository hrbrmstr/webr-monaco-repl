import { Console, WebR } from 'https://webr.r-wasm.org/v0.1.1/webr.mjs';
import { json as readJSON } from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const webRConsole = new Console({

	stdout: line => {
		const outpre = document.getElementById("outpre")
		outpre.innerText += line + '\n';
		outpre.scrollTop = outpre.scrollHeight;
	},

	stderr: line => {
		const outpre = document.getElementById("outpre")
		outpre.innerText += line + '\n';
		outpre.scrollTop = outpre.scrollHeight;
	},

	prompt: p => {
		const outpre = document.getElementById('outpre')
		outpre.innerText += "> "
		outpre.scrollTop = outpre.scrollHeight;
	},

	canvasExec: c => {
		Function(`document.getElementById('plot-canvas').getContext('2d').${c}`)()
	},

});

webRConsole.run();
webRConsole.webR.init();

globalThis.webRConsole = webRConsole; // handy

// second context to do side R ops w/o interfering with main one
globalThis.utilR = new WebR();
await globalThis.utilR.init();

export const rVersion = await globalThis.utilR.evalRString(`paste0(unclass(getRversion())[[1]][1:2], collapse=".")`)

/**
 * Install one or more R packages from R universe
 * 
 * Inspired by timelyportfolio
 * 
 * @note IT IS ON YOU FOR NOW TO ENSURE NO PACKAGES IN THE 
 *       DEPENDENCY TREE REQUIRE COMPILATION
 * @param {string[] | string} pkgs string or string array of R pkg names
 * @example
 * await R.installRUniversePackages("basetheme")
 * R.library("basetheme")
 */
export async function installRUniversePackages(pkgs) {

	if (typeof pkgs === 'string') {
		pkgs = [ pkgs ]
	}

	for (const pkg of pkgs) {
		const pkgMeta = await rUniversePkgInfo(pkg, rVersion)
		if (pkgMeta.compiled) {
			console.warn(`'${pkg}' cannot be installed because it reqires compilation`)
		} else {
			installRUniversePackageFromURL(pkg, pkgMeta.rUniverseDownloadURL)
		}
	}

}

/**
 * Install a built package from an R Universe URL
 * 
 * Inspired by timelyportfolio
 * 
 * @param {string} pkg package name
 * @param {string} rUniverseURL full r-univ URL
 */
function installRUniversePackageFromURL(pkg, rUniverseURL) {

	globalThis.webRConsole.stdin(`message(paste("Installing webR package: ${pkg} from ${rUniverseURL}"));`); 

	const rCode = `
.tmp <- tempfile()
utils::download.file("${rUniverseURL}", .tmp, quiet = FALSE);
utils::untar(.tmp, exdir = .libPaths()[[1]], tar = "internal", extras = "--no-same-permissions");
rm(.tmp)
`
	globalThis.webRConsole.webR.evalR(rCode)

}

/**
 * Get R pkg author, compilation req, and version from r-universe
 * @param {string} rPackage 
 * @returns {object} with `compiled`, `rUniverseDownloadURL`
 */
export async function rUniversePkgInfo(rPackage, rVersion = "4.1") {

	const rPkgs = await readJSON(`https://r-universe.dev/stats/powersearch?limit=1&all=true&q=${rPackage}`)

	const rPkgAuthor = rPkgs.results[ 0 ].maintainer.login;

	const rPkgDetails = await readJSON(`https://${rPkgAuthor}.r-universe.dev/${rPackage}/json`)

	const rPkgVersion = rPkgDetails.binaries
		.filter((d) => (d.os == "mac") & d.r.startsWith(rVersion))
		.pop(1).version;

	const pkgDownloadInfo = {
		compiled: rPkgDetails.NeedsCompilation !== "no",
		rUniverseDownloadURL: `https://${rPkgAuthor}.r-universe.dev/bin/macosx/contrib/${rVersion}/${rPackage}_${rPkgVersion}.tgz`
	}

	return pkgDownloadInfo

}