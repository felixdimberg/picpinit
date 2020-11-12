# PICPINIT

Picpinit is a social media app where you upload pictures to a album based on a location. The idea is to together create albums for all your memories. 

## Installation
To start the webapp you first need to install all of the following dependencies on your computer:

### Dependencies

```bash
// React
npm install react
npm install react-dom
npm install react-google-maps
npm install react-redux
npm install react-scripts

//Redux
npm install redux
npm install redux-thunk
  
// Material UI 
npm install @material-ui/icons
npm install @material-ui/styles
npm install @material-ui/core

//Other
npm install notistack
npm install recompose

// with yarn
yarn add @material-ui/icons
npm install react-scripts
```
### Run

It is a React.js app and will need react-scripts to be able to run.

```
npm start
```

You will then access the webapp at http://localhost:3000

### Google maps API

The app requires a google maps API key to be able to function. 
Change the 'GOOGLE_MAPS_KEY' to your own api key in ../src/pages/home.js:

```bash
line 47: googleMapURL: "https://maps.googleapis.com/...key=GOOGLE_MAPS_API_KEY&language=en",
line 113:  fetch(`https://maps.googleapis.com/... &key GOOGLE_MAPS_API_KEY&language=en`)

```
If you don't have a API key, you can get one at https://cloud.google.com/maps-platform/

### Enjoy those memories!
