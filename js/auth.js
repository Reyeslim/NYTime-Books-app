import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js'
import { collection, addDoc, getDocs, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js'
import { auth, db } from "./firebase.js";


const loggedUrls = ['/index.html', '/forms/fav.html']
const publicUrls = ['/forms/login.html', '/forms/signup.html']

onAuthStateChanged(auth, async (user) => {
    const currentPath = window.location.pathname
    // console.log({currentPath, user})
    if (user) {
        try {
            const userRef = await addDoc(collection(db, 'user'), {
                email: user.email
            })
            console.log("Document written with ID: ", userRef.id);
        } catch (error) {
          console.error("Error adding document: ", error);
        }

        console.log(user.email)
        if (publicUrls.includes(currentPath)) {
            window.location.replace('../index.html')
        }
    } else {
        // console.log('entramos en no logueados')
        // console.log(publicUrls.includes(currentPath))
        if (loggedUrls.includes(currentPath)) {
            window.location.replace('/forms/login.html')
        }
    }
})