import * as firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyAdv9iVegtx4hB34GyaFXL9oR4CzmutUGA',
    authDomain: 'typescript-react-firebase-auth.firebaseapp.com',
    databaseURL: 'https://typescript-react-firebase-auth.firebaseio.com'
}

firebase.initializeApp(config);

export const db = firebase.database().ref();

export const firebaseAuth = firebase.auth;

export const googleProvider = new firebase.auth.GoogleAuthProvider();
