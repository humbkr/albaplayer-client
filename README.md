# Alba player React

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Dev env init
##### Prerequisites
- docker installed and running on your machine
- ``make`` command available

##### Steps
From the project's root, run ``make up``. After the container has loaded, run a 
``make ssh`` to log into it.  
Once logged in, run
- ``yarn install``
- ``yarn start``

Now get the port the docker container is listening to with ``docker ps`` (the container to look for is named "alba_client")
and access the app at localhost:[docker container port]
