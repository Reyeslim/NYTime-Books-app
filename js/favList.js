const favList = document.querySelector('.favs')

export const setupFavs = (data) => {
    if (data.length) {
        
        let html = ''

        data.forEach(doc => {
            
            const fav = doc.data()
            const content = `<ul>
            <li class="list-group">
            <h5>${fav.title}</h5>
            <p>${fav.content}</p>
            </li>
            </ul>`

            console.log(fav)
            html += content
        })

        favList.innerHTML = html
    } else {
        favList.innerHTML = '<h2> No hay favoritos todavía </h2>'
    }
}

// const createInfoElement = (text) => {
//     const infoElement = document.createElement('p')
//     infoElement.setAttribute('class', 'info')
//     infoElement.innerText = text

//     return infoElement
// }

// /**
//  * @param {object} data
//  * @param {string} data.title
//  * @param {string} data.content
//  */

// const createListElement = (data) => {
//     const newCardElement = document.createElement('div')
//     newCardElement.setAttribute('class', 'card')

//     const titleElement = document.createElement('p')
//     titleElement.setAttribute('class', 'title')
//     titleElement.innerText = data.title

//     const cardContentElement = document.createElement('div')
//     cardContentElement.setAttribute('class', 'content')

//     const newestPublishedDate = createInfoElement(data.info1)
//     const oldestPublishedDate = createInfoElement(data.info2)
//     const updated = createInfoElement(data.info3)

//     cardContentElement.append(newestPublishedDate, oldestPublishedDate, updated)

//     favList.append(titleElement, cardContentElement)
// }

