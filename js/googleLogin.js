import { GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js'
import { auth } from './firebase.js'
import { showMessage } from './showMessage.js'

const googleButton = document.querySelector('#google-login')

if (googleButton) {
    googleButton.addEventListener('click', async () => {
        const provider = new GoogleAuthProvider()
        try {
            const credentials = await signInWithPopup(auth, provider)
            console.log(credentials)

            showMessage('Bienvenido/a ' + credentials.user.displayName) 
            window.location.replace('../index.html')

        } catch (error) {
            console.log(error)
        }
    }

    )
}
