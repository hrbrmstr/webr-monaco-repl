# 🧪 🕸️ WebRIDEr: Monaco-powered WebR "REPL" & IDE

This is a fairly accessible project so I'm not going to complicate it with "Vite" or "Lit" bits.

I wouldn't pay for this, but it's a pretty decent IDE for WebR, given WebR itself is at 0.1.1.

## Left Source Pane

- Auto-saves current source pane contents to local storage
- R syntax highlighting
- An oddly decent # of auto-completes
- cmd-shift-p to bring up command palette
    - **WebR: Clear Local Storage** — nuke local storage and replace with the default document
    - **WebR: Save Canvas as PNG** — what it says
    - **WebR: Save Source Pane** — what it says
- cmd-shift-i inserts `|>`
- option-shift-minus inserts `<-`

## Top Right Plot Pane

- janky-ish {webr} `canvas()` displayer

## Bottom Right Console

- non-editable & non-interactive output place for what is sent to the R console, including `stdout` and `stderr`

See it live! <https://rud.is/w/webr-monaco-repl/>

![](preview.png)
