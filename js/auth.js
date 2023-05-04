import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js'
import { auth } from "./firebase.js";


const loggedUrls = ['/index.html']
const publicUrls = ['/forms/login.html', '/forms/signup.html']

onAuthStateChanged(auth, (user) => {
    const currentPath = window.location.pathname
    console.log({currentPath, user})
    if (user) {
        if (publicUrls.includes(currentPath)) {
            window.location.replace('../index.html')
        }
    } else {
        console.log('entramos en no logueados')
        console.log(publicUrls.includes(currentPath))
        if (loggedUrls.includes(currentPath)) {
            window.location.replace('/forms/login.html')
        }
    }
})