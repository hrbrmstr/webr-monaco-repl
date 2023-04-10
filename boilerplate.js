
export const instructions = `

#    dMP dMP dMP dMMMMMP dMP    .aMMMb  .aMMMb  dMMMMMMMMb dMMMMMP      dMMMMMMP .aMMMb 
#   dMP dMP dMP dMP     dMP    dMP"VMP dMP"dMP dMP"dMP"dMPdMP             dMP   dMP"dMP 
#  dMP dMP dMP dMMMP   dMP    dMP     dMP dMP dMP dMP dMPdMMMP           dMP   dMP dMP  
# dMP.dMP.dMP dMP     dMP    dMP.aMP dMP.aMP dMP dMP dMPdMP             dMP   dMP.aMP   
# VMMMPVMMP" dMMMMMP dMMMMMP VMMMP"  VMMMP" dMP dMP dMPdMMMMMP         dMP    VMMMP"    
#                                                                                       
#    dMP dMP dMP dMMMMMP dMMMMb  dMMMMb  dMP dMMMMb  dMMMMMP dMMMMb                     
#   dMP dMP dMP dMP     dMP"dMP dMP.dMP amr dMP VMP dMP     dMP.dMP                     
#  dMP dMP dMP dMMMP   dMMMMK" dMMMMK" dMP dMP dMP dMMMP   dMMMMK"                      
# dMP.dMP.dMP dMP     dMP.aMF dMP"AMF dMP dMP.aMP dMP     dMP"AMF                       
# VMMMPVMMP" dMMMMMP dMMMMP" dMP dMP dMP dMMMMP" dMMMMMP dMP dMP                        
#                         
# < github.com/hrbrmstr/webr-monaco-repl >
#  ---------------------------------------
#         \\   ^__^
#          \\  (oo)\_______
#             (__)\       )\\/\\
#                 ||----w |
#                 ||     ||
#
# This pane is Microsoft's Monaco editor that they
# use in VS Code and the online editor in GitHub
#
# Right now I have done a bit of customization to it.
#
# It will syntax highlight R code b/c "duh".
#
# The line the cursor is on will be sent to the 
# "R Console" if you CMD-Enter (or whatev CMD is)
# on your lesser operating systems. I need to make
# this work better but it's better than xterm.js.	
#
# You can also make a multi-line selection and
# "CMD-Enter" to have all that go to the R console
#
# CTRL-l will clear the "R Console"
#
# CMD-shift-i inserts |>
#
# OPTION-shift-MINUS inserts <-
#
# CMD-shift-u brings up a janky WebR environment viewer
#
# CMD-shit-l brings up a janky R history viewer
# 
# It watches for and intercepts '?STRING' and
# will redirect you to a mini-R docs site I setup.
#
# It also intercepts 'browseURL(…)' and will open
# up the parameter in a new tab.
#
# There is a special 'install.runiverse' function
# that will install a single package from R Universe.
# YOU are responsible for dependencies and ensuring
# that all the deps and the pkg itself can run in
# WebR.
#
# Both of those two intercepts are sanitized to 
# protect from (unlikely) XSS attacks.
#
# The "R Console" output pane should auto-scroll for 
# everyone, but I am no HTML "expert".
#
# The upper-right pane is the janky "plot window".
#
# In the command palette is a way to save the
# canvas as a PNG file.
#
# Presently there is no way to load files but you can
# save files.
#
# **BUT** the source pane is saved to local browser
# storage after every source change, so it will 
# reload if you refresh the page. You can use
# CMD-option-s to save the source out.
#
# You can force-clear local storage with CMD-shift-k or 
# open up the Palette (CMD-shift-p) and search for 
# "WebR: Clear Local Storage".
# 
# There is also no way to work interactively in the 
# "R Console", but this is a much nicer "REPL" than
# the example WebR one, but that's just my opinion.
#
# There is no WebR FS browser yet.
#
# Select the cowsay() function, CMD-Enter, then
# cowsay something!

stringb <- new.env()
source("https://rud.is/data/stringb.R", local=stringb)

install.runiverse("basetheme")

plot2 <- new.env()
source("https://rud.is/data/plot2.R", local=plot2)
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
