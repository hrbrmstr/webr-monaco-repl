
export const instructions = `# This is Microsoft's Monaco editor that they
# use in VS Code and the online editor in GitHub
#
# Right now I haven't done much customization with it. 
# But I have done some!
#
# - It will syntax highlight R code b/c "duh".
# - The line the cursor is on will be sent to the 
#   "R Console" if you CMD-Enter (or whatev CMD is)
#   on your lesser operating systems.
# - You can also make a multi-line selection and
#   "CMD-Enter" to have all that go to the R console
# - CTRL-L will clear the "R Console"
# 
# The "R Console" output pane should auto-scroll but I 
# am no HTML "expert".
#
# The upper-right pane is the janky "plot window".
#
# Presently there is no way to load files but you can
# save files.
#
# **BUT** the source pan is saved to local browser
# storage after every source change, so it will 
# reload if you refresh the page. You can use
# CMD-option-s to save the source out.
#
# You can force-clear local storage with CMD-shift-k or 
# open up the Palette (CMD-shift-p) and search for 
# "WebR: Clear Local Storage".
# 
# Also in the command palette is a way to save the
# canvas as a PNG file.
#
# There is also no way to work interactively in the 
# "R Console", but this is a much nicer "REPL" than
# the example WebR one, but that's just my opinion.
#
# There is no WebR FS browser.
#
# Select the cowsay() function, CMD-Enter, then
# cowsay something!
`

export const plotR = `canvas(bg="white")
plot(mtcars)
dev.off()
`

export const cowsay = `cowsay <- function(message) {
  message_lines <- strsplit(message, split = "\\n")[[1]]
  max_length <- max(nchar(message_lines))
  
  cat(" ", strrep("_", max_length + 2), "\\n", sep = "")
  
  for (line in message_lines) {
    cat("< ", line, strrep(" ", max_length - nchar(line)), " >\\n", sep = "")
  }
  
  cat(" ", strrep("-", max_length + 2), "\\n", sep = "")
  
  cat('        \\\\   ^__^\\n')
  cat('         \\\\  (oo)\\\\_______\\n')
  cat('            (__)\\\\       )\\\\/\\\\\\n')
  cat('                ||----w |\\n')
  cat('                ||     ||\\n')
}`
