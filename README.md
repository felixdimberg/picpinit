# PICPINIT

Picpinit is a social media app where you upload pictures to a album based on a location. The idea is to together create albums for all your memories. 

## Installation
To start the webapp you first need to install all of the following dependencies. 
Run following command line in the pinpicit-master folder to install all dependencies on the package.json file:

```bash
npm install
```

### Run
Run following command line to start hosting the webapp to your local server:

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
