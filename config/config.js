import firebase from 'firebase';

//API details
const config = {
  apiKey: "AIzaSyCQmThH0nmWfaZhqixKUWs4gxrr4rgfiMI",
  authDomain: "ideas-17d9e.firebaseapp.com",
  databaseURL: "https://ideas-17d9e.firebaseio.com",
  projectId: "ideas-17d9e",
  storageBucket: "ideas-17d9e.appspot.com",
  messagingSenderId: "444527575070"
};

firebase.initializeApp(config);

export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
