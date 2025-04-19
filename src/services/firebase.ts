// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDwLwjkFuheV7ZDlJFHu-rYbkBkT20wdws',
    authDomain: 'gtc-database-59695.firebaseapp.com',
    projectId: 'gtc-database-59695',
    storageBucket: 'gtc-database-59695.firebasestorage.app',
    messagingSenderId: '408423636680',
    appId: '1:408423636680:web:85e07ebc89155e1da10ffd',
    measurementId: 'G-TBN1ZZ05Y3'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
