import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
  } from 'https://www.gstatic.com/firebasejs/9.19.0/firebase-auth.js'
  import { auth } from './firebase.js'
  
  const loginFormElement = document.querySelector('#login-form')
  const signupFormElement = document.querySelector('#signup-form')
  const logoutButtonElement = document.querySelector('.logout')
  
  if (loginFormElement) {
    loginFormElement.addEventListener('submit', async (e) => {
      e.preventDefault()
      const email = loginFormElement['login-email'].value
      const password = loginFormElement['login-password'].value
      await login(email, password)
    })
  }
  
  if (signupFormElement) {
    signupFormElement.addEventListener('submit', async (e) => {
      e.preventDefault()
      const email = signupFormElement['login-email'].value
      const password = signupFormElement['login-password'].value
      await signup(email, password)
    })
  }
  
  if (logoutButtonElement) {
    logoutButtonElement.addEventListener('click', async () => {
      try {
        await signOut(auth)
      } catch (err) {
        alert(err)
      }
    })
  }
  
  /**
   * @param {string} email
   * @param {string} password
   * @return {Promise<void>}
   */
  async function signup(email, password) {
    try {
      const credentials = await createUserWithEmailAndPassword(auth, email, password)
      console.log('SIGNUP', credentials)
      window.location.replace('../index.html')
    } catch (err) {
      console.log(err)
      switch (err.code) {
        case 'auth/email-already-in-use':
          alert('Email already in use')
          break;
        case 'auth/invalid-email':
          alert('Invalid email')
          break;
        case 'auth/weak-password':
          alert('Password is too weak')
          break;
        default:
          alert('Something went wrong')
          break
      }
    }
  }
  
  async function login(email, password) {
    try {
      const credentials = await signInWithEmailAndPassword(auth, email, password)
      console.log('SIGNUP', credentials)
      window.location.replace('../index.html')
    } catch (err) {
      alert(err.message)
    }
  }
  
  const loggedUrls = ['../index.html']
  const publicUrls = ['../forms/login.html', '../forms/signup.html']
  
  onAuthStateChanged(auth, (user) => {
    const currentPath = window.location.pathname
    if (user) {
      if (publicUrls.includes(currentPath)) {
        window.location.replace('../index.html')
      }
    } else {
      if (loggedUrls.includes(currentPath)) {
        window.location.replace('../forms/login.html')
      }
    }
  })