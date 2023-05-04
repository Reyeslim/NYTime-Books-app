import { signOut } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js'
import { auth } from './firebase.js'


const logout = document.querySelector('.logout')

logout.addEventListener('click', async () => {
    await signOut(auth)
    window.location.replace('/forms/login.html')
})

//Mapeo de datos para reutilizar

/**
 * @param {object} data
 * @param {string} data.display_name
 * @param {string} data.list_name
 * @param {string} data.list_name_encoded
 * @param {string} data.newest_published_date
 * @param {string} data.oldest_published_date
 * @param {string} data.updated
 */


const mapListToCard = (data) => ({
    title: data.display_name,
    info1: data.newest_published_date,
    info2: data.oldest_published_date,
    info3: data.updated,
    ...data
})

/**
 * @param {object} data
 * @param {string} data.title
 * @param {string} data.weeks_on_list
 * @param {string} data.author
 * @param {string} data.price
 */

const mapBookToCard = (data) => ({
    title: data.title,
    info1: data.author,
    info2: data.price,
    info3: data.weeks_on_list,
    ...data
})


// Elementos
const containerDivElement = document.querySelector(".container");
const spinnerDivElement = document.querySelector(".spinner");
const booksDivElement = document.querySelector(".books")
const favListElement = document.querySelector(".fav")

//Local Storage y API key

const NY_BOOKS_LIST_KEY = 'nyBooksLists';
const NY_API_KEY = 'F3kUhFZ3aXqKzEeop5tA7nx13adSA0jR';

//Recuperamos las listas de libros desde Local Storage

const getNyLists = () => {
    const response = window.localStorage.getItem(NY_BOOKS_LIST_KEY)
    return response ? JSON.parse(response) : []
}

//Guardamos las listas de libros en Local Storage

const setNyLists = (booksLists) => {
    window.localStorage.setItem(NY_BOOKS_LIST_KEY, JSON.stringify(booksLists))
}

//Funciones para pintar los datos de la api

/**
 * 
 * @param {string} text 
 */

const createInfoElement = (text) => {
    const infoElement = document.createElement('p')
    infoElement.setAttribute('class', 'info')
    infoElement.innerText = text

    return infoElement
}

/**
 * @param {object} data
 * @param {string} data.title
 * @param {string} data.info1
 * @param {string} data.info2
 * @param {string} data.info3
 * @param {string} data.list_name_encoded
 * @param {boolean} isDetails
 */

const createListElement = (data, isDetails = false) => {
    const newCardElement = document.createElement('div')
    newCardElement.setAttribute('class', 'card')

    const titleElement = document.createElement('p')
    titleElement.setAttribute('class', 'title')
    titleElement.innerText = data.title

    const cardContentElement = document.createElement('div')
    cardContentElement.setAttribute('class', 'content')

    const newestPublishedDate = createInfoElement(data.info1)
    const oldestPublishedDate = createInfoElement(data.info2)
    const updated = createInfoElement(data.info3)

    cardContentElement.append(newestPublishedDate, oldestPublishedDate, updated)

    if (!isDetails) {
        const detailsBtnElement = document.createElement('button')
        detailsBtnElement.setAttribute('class', 'details')
        detailsBtnElement.innerText = 'Detalles'

        detailsBtnElement.onclick = async () => {
            await bookDetails(data.list_name_encoded)
        }

        cardContentElement.appendChild(detailsBtnElement)
    } else {

        const imgElement = document.createElement("img");
        imgElement.setAttribute('class', 'book-img')
        imgElement.src = `${data.book_image}`
        

        const favBtnElement = document.createElement('input')
        favBtnElement.setAttribute('type', 'checkbox')
        favBtnElement.setAttribute('class', 'favorite')
        favBtnElement.setAttribute('id', 'fav')

        const btnIcon = document.createElement('label')
        btnIcon.setAttribute('for', 'fav')
        btnIcon.innerHTML = '<i class="fa-regular fa-heart" style="color: #ff0000; font-size: 25px; margin-left: 200px; margin-bottom: 20px; cursor: pointer;"></i>'

        btnIcon.onclick = () => {
            btnIcon.innerHTML = '<i class="fa-solid fa-heart" style="color: #ff0000; font-size: 25px; margin-left: 200px; margin-bottom: 20px; cursor: pointer;"></i>'

        }
        cardContentElement.append(imgElement, btnIcon, favBtnElement)
    }
    
    newCardElement.append(titleElement, cardContentElement)

    if (!isDetails) {
        containerDivElement.append(newCardElement)
    } else {
        booksDivElement.appendChild(newCardElement)
    }

}

// favListElement.addEventListener('click', (e) => {
//     window.location.replace('../forms/fav.html')
// })

async function bookDetails(listName) {
    const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${listName}.json?api-key=${NY_API_KEY}`)
    const data = await response.json()
    const books = data.results.books
    booksDivElement.setAttribute('class', 'books')
    containerDivElement.setAttribute('class', 'disabled')
    console.log(books)
    for (const book of books) {
        createListElement(mapBookToCard(book), true)
    }
}


async function start() {
    let booksLists = getNyLists();
    if (!booksLists || booksLists.length <= 0) {
        const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${NY_API_KEY}`)
        const data = await response.json()
        booksLists = data.results
        console.log(booksLists)
        setNyLists(booksLists)
    }


    for (const list of booksLists) {
        createListElement(mapListToCard(list))
    }
    containerDivElement.setAttribute('class', 'container')
    spinnerDivElement.setAttribute('class', 'disabled')
}

start()