  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
  import { getAuth } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js'
  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDMdrbMMrQrB8kJRiWYqDImqV6j_3cbdmE",
    authDomain: "ny-times-books-app.firebaseapp.com",
    projectId: "ny-times-books-app",
    storageBucket: "ny-times-books-app.appspot.com",
    messagingSenderId: "846733774853",
    appId: "1:846733774853:web:6a92e8d312620a99104c6c"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  // Initialize Firebase Authentication and get a reference to the service
  export const auth = getAuth(app);



 // // Initialize Cloud Firestore and get a reference to the service
  // export const db = getFirestore(app);
  // import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'