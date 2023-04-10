# This is a justfile (https://github.com/casey/just)

# project dir
project := "webr-monaco-repl"

syncDest := "rud.is:~/rud.is/w/" + project + "/"

# list out the available actions
default:
	@just --list

# sync to server
rsync:
  rsync -avp --exclude .git --exclude .gitignore --exclude node_modules ./ {{syncDest}}

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
