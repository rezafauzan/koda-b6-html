const products = [
    {
        "name": "Hazzelnut Latte",
        "image": ['image 27.png', this.name],
        "desc": 'You can explore the menu that we provide with fun and have their own taste and make your day better.',
        "price": 22000
    },
    {
        "name": "Kopi Liong",
        "image": ['image 22.png', this.name],
        "desc": 'You can explore the menu that we provide with fun and have their own taste and make your day better.',
        "price": 10000
    },
    {
        "name": "Kopi kirr",
        "image": ['image 30.png', this.name],
        "desc": 'You can explore the menu that we provide with fun and have their own taste and make your day better.',
        "price": 80000
    },
    {
        "name": "Kopiru Rariru",
        "image": ['product2.png', this.name],
        "desc": 'You can explore the menu that we provide with fun and have their own taste and make your day better.',
        "price": 5000
    }
]

const favoriteProductContainer = document.getElementById("favorite-product-container")

function elementCreator(element, attribute = [['', '']], content, parrent) {
    const e = document.createElement(element)
    attribute.forEach(
        attr => e.setAttribute(attr[0], attr[1])
    )
    e.textContent = content

    return parrent.appendChild(e)
}

function populateFavoriteProduct(products = []){
    products.forEach(
        (product, index) => {
            const card = elementCreator('div', [['class', 'card body-overlay']], '', favoriteProductContainer)
            const cardHeader = elementCreator('div', [['class', 'card-header']], '', card)
            const cardHeaderImg = elementCreator('img', [['src', 'assets/img/product2.png'], ['alt', product.name]], '', cardHeader)
            const cardBody = elementCreator('div', [['class', 'card-body']], '', card)
            const cardBodyH3 = elementCreator('h3', [], product.name, cardBody)
            const cardBodyDesc = elementCreator('p', [], product.desc, cardBody)
            const cardBodyPrice = elementCreator('span', [], product.price, cardBody)
            const cardBodyActionContainer = elementCreator('div', [['class', 'action']], '', cardBody)
            const cardBodyActionBuy = elementCreator('a', [['href',`detail-product.html?id=${index}`],['class', 'button-primary']], 'Buy', cardBodyActionContainer)
            const cardBodyActionCart = elementCreator('button', [['class', 'cart button-border-primary']], '', cardBodyActionContainer)
            const cardBodyActionCartIcon = elementCreator('img', [['src', 'assets/img/ShoppingCart-yellow.svg'], ['alt', 'cart_icon']], '', cardBodyActionCart)
        }    
    )    
}    

populateFavoriteProduct(products)