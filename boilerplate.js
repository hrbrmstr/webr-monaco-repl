
export const instructions = `
#  _    _      _    ______ ___________ _____     
# | |  | |    | |   | ___ \\_   _|  _  \\  ___|    
# | |  | | ___| |__ | |_/ / | | | | | | |__ _ __ 
# | |/\\| |/ _ \\ '_ \\|    /  | | | | | |  __| '__|
# \\  /\\  /  __/ |_) | |\\ \\ _| |_| |/ /| |__| |   
#  \\/  \\/ \\___|_.__/\\_| \\_|\\___/|___/ \\____/_|   
#                                                
#  A client-side IDE for WebR                                              
#                         
#  Please mooove over to 
#  <github.com/hrbrmstr/webr-monaco-repl> 
#  for more information
#  --------------------------------------
#         \\   ^__^
#          \\  (oo)\_______
#             (__)\       )\\/\\
#                 ||----w |
#                 ||     ||
#
# 2023-04-11: Path to v0.2.0
# 
# - T A B S !
# - Plot tab and Environment tab in upper right pane
# 
# 2023-04-10: Path to v0.2.0
# 
# - Added "WebR: Save Workspace" and "WebR: Load Workspace"
#   These two items will use R's "save.image()" to store
#   the entire workspace into local storage which will
#   persist between refreshes. (I'm working on another set
#   of functions to upload ".RData" file into a WebR context
#   and download the saved workspace to local disk as well.)
#
# - Added "WebR: Interrupt Session" which lets you stop long
#   running jobs.
#
# ==========================================================
#
# Here is some boilerplate code to get you started!
#
# Select the cowsay() function, CMD-Enter, then
# cowsay something!

stringb <- new.env()
source("https://rud.is/data/stringb.R", local=stringb)
`

export const plotR = `
install.runiverse("basetheme")

plot2 <- new.env()
source("https://rud.is/data/plot2.R", local=plot2)

canvas(bg="white")
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
