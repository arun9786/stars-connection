
export default {
  "expo": {
    "name": "stars",
    "slug": "stars",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": ["@react-native-firebase/app", "@react-native-firebase/auth"]
  },
  "extra" :{
    firebaseApiKey: "AIzaSyAPq6u697JqACUwgoXmYp-yVUhivso1Yhc",
    firebaseAuthDomain: "stars-connection.firebaseapp.com",
    firebaseDatabaseURL: "https://stars-connection-default-rtdb.firebaseio.com",
    firebaseProjectId: "stars-connection",
    firebaseStorageBucket: "stars-connection.appspot.com",
    firebaseMessagingSenderId: "542861506529",
    firebaseAppId: "1:542861506529:web:926ef886ccbcd113c404a0",
    firebaseMeasurementId: "G-V9HKSEF6GF"
}
}

