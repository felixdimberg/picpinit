# PICPINIT

Picpinit is a social media app where you upload pictures to a album based on a location. The idea is to together create albums for all your memories. 

### Installation

It is a React.js app and will need react-scripts to be able to run.
To start the webapp run he command lines:

```bash
npm install react-scripts
npm start
```

You will then access the webapp at http://localhost:3000

### Google maps API

The app requires a google maps API key to be able to function. 
Change the 'GOOGLE_MAPS_KEY' to your own api key in picpinit-master/src/pages/home.js:

```bash
line googleMapURL: "https://maps.googleapis.com/...key=GOOGLE_MAPS_API_KEY&language=en",

```
If you don't have a API key, you can get one at https://cloud.google.com/maps-platform/

To be able to 

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

