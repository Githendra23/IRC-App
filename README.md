# IRC Chat Relay

A seamless real-time communication chat app enabling users to create an account, log in, and join multiple rooms to start chatting with others. Users can utilize various commands:
- ```/msg <username>``` to send a private message to another user in the same room.
- ```/join <room name>```  to join or create a new chat room.
- ```/quit <room name>``` to leave a chat room (if no room name is provided, it will exit the current room).
- ```/delete <room name>``` to delete a channel (if no room name is provided, it will kick everyone, including yourself, from the current room and delete it if you're the owner).
- ```/nick <new username>``` to change your username to a new one.

![image](https://github.com/Githendra23/IRC-App/assets/51377697/8b67434f-6dfd-44a0-8e0a-62cc275d17df)


## Technologies used

**Backend:**

<a href="https://nodejs.org/docs/latest/api/" target="_blank"><img src="https://img.icons8.com/fluency/48/node-js.png"/></a>
<a href="https://expressjs.com/en/5x/api.html" target="_blank"><img src="https://img.icons8.com/fluency/48/express-js.png"/></a>
<a href="https://www.mongodb.com/docs/" target="_blank"><img src="https://img.icons8.com/color/48/mongodb.png" alt="mongodb"/></a>
<a href="https://socket.io/docs/v4/" target="_blank"><img width="48" height="48" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Socket-io.svg/1024px-Socket-io.svg.png"/></a>

**Frontend:**

<a href="https://legacy.reactjs.org/docs/getting-started.html"><img width="auto" height="48" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="react"/></a>
<a href="https://tailwindcss.com/docs/installation" target="_blank"><img src="https://img.icons8.com/fluency/48/tailwind_css.png" alt="tailwind_css"/></a>
<a href="https://www.typescriptlang.org/docs/"><img width="48" height="48" src="https://img.icons8.com/fluency/48/typescript--v1.png" alt="typescript"/></a>
<a href="https://socket.io/docs/v4/" target="_blank"><img width="48" height="48" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Socket-io.svg/1024px-Socket-io.svg.png"/></a>

## The necessary steps to configure and install the project on a new environment

### Installation of software

To make the application work, you need to install:

<a href="docs.docker.com" target="_blank"><img src="https://img.icons8.com/fluency/48/docker.png"/></a>

Download the project:
```cmd
git clone https://github.com/Githendra23/IRC-App.git
```

### Run the Project

To run the project, you must build the docker containers and run them.

First, navigate to the directory where the *docker-compose.yml* file is located:
```cmd
cd <route of the repository>
```

To build the containers, execute this command:
```cmd
docker-compose build
```

Then, run the containers:
```cmd
docker-compose up
```

Click or copy-paste the provided link into your browser to access the website.

⚠️ **Do not open and use the link with the same ports in multiple tabs.** ⚠️
