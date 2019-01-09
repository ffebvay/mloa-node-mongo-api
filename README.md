# mloa-node-mongo-api

NodeJS + MongoDB API for User Management, Authentication and Registration

For documentation and instructions check out 
http://jasonwatmore.com/post/2018/06/14/nodejs-mongodb-simple-api-for-authentication-registration-and-user-management

Special thanks to **Jason Watmore** for his detailed article !

## Project setup

If you want to run the project locally, you will have to ensure that a few dependencies are installed on your computer
(i.e. NodeJS as server-side library, MongoDB as Database Server) and make them run separately.

### For Windows OS

##### MongoDB setup

You should run exactly the following command in a command prompt :

```
"C:\Program Files\MongoDB\Server\[X.X]\bin\mongod.exe"
```

Where ``[X.X]`` should be replaced by the version installed on your computer, for my it is **4.0**.
At the time I am writing this, the default port used by the MongoDB daemon is mongodb://localhost:``27017``

##### NodeJS setup

You have two options for running NodeJS, either you run the following command :

```
npm start
```

which will simply start the server listening on port 4000 by default.

The second option for development purpose is to run the following command defined in the ``package.json`` file :

```
npm run start-dev
```

This command calls the following command ``nodemon ./server.js`` which will run the server normally as well as adding
hot-reload capacity to the project, anytime you hit ``Save`` or <kbd>Ctrl</kbd> + <kbd>S</kbd> it will reload instantly 
the project without having to restart/ reload the whole API.

###### You should now be up and ready to develop any app to consume user/ tasks information ! 