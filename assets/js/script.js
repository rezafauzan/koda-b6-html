function elementor(element, attribute = [['', '']], content, parrent) {
    const e = document.createElement(element)
    attribute.forEach(
        item => {
            e.setAttribute(item[0], item[1])
        }
    )
    if (typeof content === "string" || typeof content === "number") {
        const textNode = document.createTextNode(content)
        e.appendChild(textNode)
    }

    if (parrent) {
        parrent.appendChild(e)
    }
    return e
}

async function ambilData(resource) {
    const raw = await fetch(resource)
    const json = raw.json()

    return json
}

// Fetch Fetch duniawi 
let alertData = {}
ambilData("https://raw.githubusercontent.com/rezafauzan/koda-b6-html/refs/heads/main/assets/data/alert-message.json").then(
    data => { alertData = data }
)

// Section Auth Logic
function validateLogin(email, password, alertElement) {
    if (email.length < 1) {
        if (document.getElementById('alert-message') !== null) {
            elementor('span', [['id', 'alert-message']], alertData.login_email_empty, alertElement)
        }
        alertElement.classList.add('alert-fatal')
        alertElement.classList.add('show')
    } else if (email.includes('@') !== true) {
        if (document.getElementById('alert-message') !== null) {
            elementor('span', [['id', 'alert-message']], alertData.login_email_not_valid, alertElement)
        }
        alertElement.classList.add('alert-fatal')
        alertElement.classList.add('show')
    } else if (email !== 'koda@email.com') {
        if (document.getElementById('alert-message') !== null) {
            elementor('span', [['id', 'alert-message']], alertData.login_email_wrong, alertElement)
        }
        alertElement.classList.add('alert-fatal')
        alertElement.classList.add('show')
    } else if (password !== '1234') {
        if (document.getElementById('alert-message') !== null) {
            elementor('span', [['id', 'alert-message']], alertData.login_password_wrong, alertElement)
        }
        alertElement.classList.add('alert-fatal')
        alertElement.classList.add('show')
    } else if (email === 'koda@email.com' && password === '1234') {
        window.location.href = 'index.html'
    }
}

function toggleShowPassword(iconSelector, inputId) {
    const inputPassword = document.getElementById(inputId)
    const icon = document.querySelector(iconSelector)
    if (inputPassword.getAttribute('type') === 'password') {
        inputPassword.setAttribute('type', 'text')
        icon.setAttribute('src', 'assets/img/eye-svgrepo-com.svg')
    } else {
        inputPassword.setAttribute('type', 'password')
        icon.setAttribute('src', 'assets/img/EyeSlash.svg')
    }
}

// Section Product Logic
function populateFavoriteProduct(products = [], containerId) {
    const favoriteProductContainer = document.getElementById(containerId)
    products.forEach(
        (product, index) => {
            const card = elementor('div', [['class', 'card body-overlay']], '', favoriteProductContainer)
            const cardHeader = elementor('div', [['class', 'card-header']], '', card)
            const cardHeaderImg = elementor('img', [['src', product.image[0]], ['alt', product.name]], '', cardHeader)
            const cardBody = elementor('div', [['class', 'card-body']], '', card)
            const cardBodyH3 = elementor('h3', [], product.name, cardBody)
            const cardBodyDesc = elementor('p', [], product.desc, cardBody)
            const cardBodyPrice = elementor('span', [], product.price, cardBody)
            const cardBodyActionContainer = elementor('div', [['class', 'action']], '', cardBody)
            const cardBodyActionBuy = elementor('a', [['href', `detail-product.html?id=${index}`], ['class', 'button button-primary']], 'Buy', cardBodyActionContainer)
            const cardBodyActionCart = elementor('button', [['class', 'button button-border-primary']], '', cardBodyActionContainer)
            const cardBodyActionCartIcon = elementor('img', [['src', 'assets/img/ShoppingCart-yellow.svg'], ['alt', 'cart_icon']], '', cardBodyActionCart)
        }
    )
}