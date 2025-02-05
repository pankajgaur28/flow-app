# Flow app to visualise frow

This is a basic flow app, where we can add following nodes: Task, Notification, Condition and connect them using edges. This also provide a functionality to undoi and redo.

Step to run the project on your local machine:

- take a git checkout (main branch)
- run command "npm install" it will install the dependencies
- run comman "npm run dev" it will run the project on local server.
- to build the project run command "npm run build"

Design decisions:
    To keep the app scope simple and small I took only 3 component in considration (ie. Task, Notification, Condition). also kept the UI for the nodes simple as well.
    I have implemented the undo and redo functionality by storying delta changes (ie. only perticular node being changed), rather then keeping the image of whole state. This can be further optimised to reduce the data size even further in case of node moved or edited.


Trade off: 
- I have not used the type script and also not give the propType due to time constrain.
