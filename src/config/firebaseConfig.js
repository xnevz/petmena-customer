import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

var config = {
    apiKey: "AIzaSyBIsR3VUxv184pL9_hVdda_5OCrNd1yqPM",
    authDomain: "petmena-customer.firebaseapp.com",
    projectId: "petmena-customer",
    storageBucket: "petmena-customer.appspot.com",
    messagingSenderId: "863989816389",
    appId: "1:863989816389:web:65128ef9f8bdf3c3e4172c"
};


let app = initializeApp(config);
export const fb = getDatabase(app);