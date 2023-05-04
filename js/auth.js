import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js'
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js'
import { auth, db } from "./firebase.js";
import { setupFavs } from './favList.js'; 


const loggedUrls = ['/index.html', '/forms/fav.html']
const publicUrls = ['/forms/login.html', '/forms/signup.html']

onAuthStateChanged(auth, async (user) => {
    const currentPath = window.location.pathname
    // console.log({currentPath, user})
    if (user) {
        const consulta = await getDocs(collection(db, 'favoritos'))
        setupFavs(consulta.docs)
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