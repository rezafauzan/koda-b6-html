const favoriteProductContainer = document.getElementById("favorite-product-container")

function elementCreator(element, attribute = [['','']], content, parrent){
    const e = document.createElement(element)
    attribute.forEach(
        attr => e.setAttribute(attr[0], attr[1])
    )
    e.textContent(content)
    parrent.appendChild(e)
}

const card = elementCreator('div', [['class','card body-overlay']], '', favoriteProductContainer)

const cardHeader = elementCreator('div', [['class','card-header']], '', card)
const cardHeaderImg = elementCreator('img', [['src','assets/img/product2.png'], ['alt', 'Product.name']], '', cardHeader)

const cardBody = elementCreator('div', [['class','card-body']], '', card)
const cardBodyH3 = elementCreator('h3', [], 'Product.name', cardBody)
const cardBodyDesc = elementCreator('p', [], 'Product.desc', cardBody)
const cardBodyPrice = elementCreator('span', [], 'Product.price', cardBody)
const cardBodyActionContainer = elementCreator('div', [['class','action']], '', cardBody)
const cardBodyActionBuy = elementCreator('button', [['class','button-primary']], 'Buy', cardBodyActionContainer)
const cardBodyActionCart = elementCreator('button', [['class','cart button-border-primary']], '', cardBodyActionContainer)
const cardBodyActionCartIcon = elementCreator('img', [['src','assets/img/ShoppingCart-yellow.svg'],['alt','cart_icon']], '', cardBodyActionCart)





