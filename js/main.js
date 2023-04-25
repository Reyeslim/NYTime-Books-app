// Elementos
const containerDivElement = document.querySelector(".container");
const spinnerDivElement = document.querySelector(".spinner");

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

const createInfoElement = (text) => {
    const infoElement = document.createElement('p')
    infoElement.setAttribute('class', 'info')
    infoElement.innerText = text

    return infoElement
}

const createListElement = (data) => {
    const newCardElement = document.createElement('div')
    newCardElement.setAttribute('class', 'card')

    const titleElement = document.createElement('p')
    titleElement.setAttribute('class', 'title')
    titleElement.innerText = data.display_name

    const cardContentElement = document.createElement('div')
    cardContentElement.setAttribute('class', 'content')

    const detailsBtnElement = document.createElement('button')
    detailsBtnElement.setAttribute('class', 'details')
    detailsBtnElement.innerText = 'Detalles'

    // detailsBtnElement.onclick = async () => {
    //     await startDetails(data.list_name_encoded)
    //     window.location.replace('../html/details.html')
    // }
        
    const newestPublishedDate = createInfoElement(data.newest_published_date)
    const oldestPublishedDate = createInfoElement(data.oldest_published_date)
    const updated = createInfoElement(data.updated)
    
    newCardElement.append(titleElement, newestPublishedDate, oldestPublishedDate, updated, detailsBtnElement)
    containerDivElement.append(newCardElement)
}

// async function startDetails(listName) {
//     const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${listName}.json?api-key=${NY_API_KEY}`)
//     const data = await response.json()
//     const books = data.results.books
//     for (const book of books) {
//         createListElement(book)        
//     }
// }


async function start () {
    let booksLists = getNyLists();
    const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${NY_API_KEY}`)
    const data = await response.json()
    booksLists = data.results
    console.log(booksLists)
    setNyLists(booksLists)

    for (const list of booksLists) {
        createListElement(list)
    }
}

start()