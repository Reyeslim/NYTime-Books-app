// //Elementos

// const booksDivElement = document.querySelector(".books")

// //Local Storage y API key

// const NY_BOOKS_LIST_KEY = 'nyBooksLists';
// const NY_API_KEY = 'F3kUhFZ3aXqKzEeop5tA7nx13adSA0jR';

// //Recuperamos las listas de libros desde Local Storage

// const getNyLists = () => {
//     const response = window.localStorage.getItem(NY_BOOKS_LIST_KEY)
//     return response ? JSON.parse(response) : []
// }

// //Guardamos las listas de libros en Local Storage

// const setNyLists = (booksLists) => {
//     window.localStorage.setItem(NY_BOOKS_LIST_KEY, JSON.stringify(booksLists))
// }

// //Funciones para pintar

// const createListElement = (data) => {
//     const newCardElement = document.createElement('div')
//     newCardElement.setAttribute('class', 'card')

//     const titleElement = document.createElement('p')
//     titleElement.setAttribute('class', 'title')
//     titleElement.innerText = data.title

//     const cardContentElement = document.createElement('div')
//     cardContentElement.setAttribute('class', 'content')
        
//     const weeksOnList = createInfoElement(data.weeks_on_list)
//     const author = createInfoElement(data.author)
//     const price = createInfoElement(data.price)
    
//     newCardElement.append(titleElement, weeksOnList, author, price)
//     containerDivElement.append(newCardElement)
// }


// async function startDetails(listName) {
//     const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${listName}.json?api-key=${NY_API_KEY}`)
//     const data = await response.json()
//     const books = data.results.books
//     for (const book of books) {
//         createBookListElement(book)        
//     }
// }

// startDetails()