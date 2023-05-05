import { FacebookAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js'
import { auth } from './firebase.js'
import { showMessage } from './showMessage.js'

const facebookButton = document.querySelector('#facebook-login')

if (facebookButton) {
    facebookButton.addEventListener('click', async () => {
        const provider = new FacebookAuthProvider()
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