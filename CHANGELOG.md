# 2023-04-11: Path to v0.2.0
 
- T A B S !
    - Plot tab and Environment tab in upper right pane
    - FS tab is super basic

# 2023-04-10: Path to v0.2.0
 
- Added "WebR: Save Workspace" and "WebR: Load Workspace". These two items will use R's "save.image()" to store the entire workspace into local storage which will persist between refreshes. (I'm working on another set of functions to upload ".RData" file into a WebR context and download the saved workspace to local disk as well.)

- Added "WebR: Interrupt Session" which lets you stop long running jobs.
