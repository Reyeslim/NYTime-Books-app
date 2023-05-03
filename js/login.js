import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js'
import { auth } from './firebase.js'
import { showMessage } from './showMessage.js'

const loginForm = document.querySelector('#login-form')

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = loginForm['login-email'].value
    const password = loginForm['login-password'].value

    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password)
        showMessage('Bienvenido/a ' + credentials.user.email)
        window.location.replace('../index.html')
    } catch (error) {
        if (error.code === "auth/wrong-password") {
            showMessage('Wrong password', 'error')
        } else if (error.code == "auth/user-not-found") {
            showMessage('User not found', 'error')
        } else {
            showMessage(error.message, 'error')
        }
        
    }

})