# This is a justfile (https://github.com/casey/just)

# project dir
project := "webr-monaco-repl"

syncDest1 := "rud.is:~/rud.is/w/" + project + "/"
syncDest2 := "rud.is:~/rud.is/w/repl/"
syncDest3 := "rud.is:~/rud.is/webrider/"

# list out the available actions
default:
	@just --list

# sync to server
rsync:
  rsync -avp --exclude .git --exclude .gitignore --exclude package.json --exclude package-lock.json --exclude README.md --exclude target  --exclude LICENSE --exclude CHANGELOG.md --exclude node_modules ./ {{syncDest1}}
  rsync -avp --exclude .git --exclude .gitignore --exclude package.json --exclude package-lock.json --exclude README.md --exclude target  --exclude LICENSE --exclude CHANGELOG.md --exclude node_modules ./ {{syncDest2}}
  rsync -avp --exclude .git --exclude .gitignore --exclude package.json --exclude package-lock.json --exclude README.md --exclude target  --exclude LICENSE --exclude CHANGELOG.md --exclude node_modules ./ {{syncDest3}}

# install/update miniserve
install-miniserve:
  @cargo install miniserve

# open google chrome beta to the local dev server
browse: 
	@open -a "Google Chrome Beta"  http://localhost:8080/

# serve project (requires miniserve)
serve:
	@miniserve \
		--header "Cache-Control: no-cache; max-age=1" \
		--header "Cross-Origin-Embedder-Policy: require-corp" \
		--header "Cross-Origin-Opener-Policy: same-origin" \
		--header "Cross-Origin-Resource-Policy: cross-origin" \
		--index index.html \
		.
