# Alba player (client)
Minimalistic audio library web player.

## About
Alba player is an audio library web-based player optimized for desktop. I was tired of all the desktop audio players available on linux 
and macos with questionable user interfaces and/or library management, and I wanted to learn golang and react, so I decided
to build my own.   
This player is by purpose very limited in terms of functionalities, as its main goal is to just play music.  

This repository is only for the client part of the application. You can find the server part at [https://github.com/humbkr/albaplayer-server](https://github.com/humbkr/albaplayer-server)   
Although fully operationnal, this project is still under heavy development. Contributions and remarks on the existing 
code are welcomed (new react dev here)!

WEBSITE (with demo): [https://albaplayer.com](https://albaplayer.com)

### Basic features

- HTML5 audio player with basic controls (play / pause / previous / next / timeline progress / volume / random / repeat)
- Main playing queue à la Winamp (playback doesn't magically change to the songs you are browsing in the library)
- Library browser with Artists / Albums / Tracks views that actually manage compilations properly
- Now playing screen with current song info and buttons to google lyrics and guitar tabs
- Client / server app, so can be installed on a server to access a music library remotely
- Can manage huge libraries (tested with 30000+ songs)

**Note:** this player is not adapted for mobile or tablet use. A good mobile UI would be completely different from the
desktop one, so I focused on the desktop first, as there are already a lot of good mobile players apps.

## Installation

Grab the archive corresponding to your system on the [official website](https://albaplayer.com), unzip it somewhere, tinker with the alba.yml
configuration file and run the alba executable from the command line.

## Developement

**Tech stack:**
- React
- Apollo GraphQL
- Redux toolkit

**Dependencies:**   

This project uses yarn to manage its dependencies.

**Code organization:**   

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app)
and thus follows its basic code structure.

**Code style:**   

This project uses [AirBNB javascript codestyle](https://github.com/airbnb/javascript) plus
some tweaks.

Jetbrains IDE setup: [https://www.themarketingtechnologist.co/eslint-with-airbnb-javascript-style-guide-in-webstorm/](https://www.themarketingtechnologist.co/eslint-with-airbnb-javascript-style-guide-in-webstorm/)

### Quick start


```bash
cp .env .env.development
# Here Change .env.development values

yarn install
yarn start
```

#### Jetbrains IDE setup
This project uses absolute imports. To avoid Jetbrains IDEs to complain:
- Right click on the /src folder > Mark directory as > Resources root
- Menu > Settings > Editor > Code style > Javascript > Check "Use paths relative to the project, resource, or sources root"

#### Docker

A docker image is provided for developement purposes, if you don't want to install the dev stack on your machine.   
(Note that you will unfortunately still have to install npm and other stuff if you want IDEs like JetBrains' Webstorm 
to work properly.)

##### Prerequisites
- docker set up on your machine
- ``make`` command available (windows users)

##### Set up
From the project root, cd into /docker then run ``make up``  
Once the container is mounted, log into it by running ``make ssh``
From inside the container, install the dependencies by running ```yarn install``` from the project's root

##### Use
- To start the application in watch mode, from inside the container run ``yarn start`` and wait for the process to finish.
- To access the application in a browser, get the container port from docker: ``docker ps`` (image name is "alba_client"), then go to your browser and
access localhost:<port>.
- To change the backend API url, see comments in the /.env file.
- To run eslint on src/ run ``yarn lint``

#### Known issues
- Warning about findDOMNode in the console: see https://github.com/bvaughn/react-virtualized/issues/1353


## TODO
- [ ] Write some tests for UI (redux tests done)
- [ ] Improve perfs for library loading
