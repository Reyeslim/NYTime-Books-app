import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js'
import {auth} from "./firebase.js";


const loggedUrls = ['/NYTime-Books-app/index.html']
const publicUrls = ['/NYTime-Books-app/forms/login.html', '/NYTime-Books-app/forms/signup.html']

onAuthStateChanged(auth, (user) => {
    const currentPath = window.location.pathname
    console.log({currentPath, user})
    if (user) {
        if (publicUrls.includes(currentPath)) {
            window.location.replace('/NYTime-Books-app/index.html')
        }
    } else {
        console.log('entramos en no logueados')
        console.log(publicUrls.includes(currentPath))
        if (loggedUrls.includes(currentPath)) {
            window.location.replace('/NYTime-Books-app/forms/login.html')
        }
    }
})