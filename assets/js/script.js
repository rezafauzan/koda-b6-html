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
    if (window.localStorage.getItem('isLogin') !== null) {
        window.localStorage.removeItem('isLogin')
    }
    
    if (document.getElementById('alert-message') !== null) {
        document.querySelector('#alert #alert-message').remove()
        alertElement.classList.remove('show')
    }
    let users = []
    if (window.localStorage.getItem('users') !== null) {
        users = JSON.parse(window.localStorage.getItem('users'))
    }

    if (users.length > 0) {
        let error = 0
        if (email.length < 1) {
            if (document.getElementById('alert-message') === null) {
                elementor('span', [['id', 'alert-message']], alertData.email_empty, alertElement)
            }
            alertElement.classList.add('alert-fatal')
            alertElement.classList.add('show')
            error = 1;
        } else if (email.includes('@') !== true) {
            if (document.getElementById('alert-message') === null) {
                elementor('span', [['id', 'alert-message']], alertData.email_not_valid, alertElement)
            }
            alertElement.classList.add('alert-fatal')
            alertElement.classList.add('show')
            error = 1;
        } else {
            if (document.getElementById('alert-message') !== null) {
                document.querySelector('#alert #alert-message').remove()
                alertElement.classList.remove('show')
            }
            error = 0
        }

        if (error < 1) {
            console.log(users)
            const user = users.find(pengguna => pengguna.email === email)
            console.log(user)
            if (user) {
                if (email === user.email && password === atob(user.password)) {
                    window.localStorage.setItem('isLogin', 'true')
                    window.location.href = 'index.html'
                } else {
                    if (document.getElementById('alert-message') === null) {
                        elementor('span', [['id', 'alert-message']], alertData.login_fail, alertElement)
                    }
                    alertElement.classList.add('alert-fatal')
                    alertElement.classList.add('show')
                }
            } else {
                if (document.getElementById('alert-message') === null) {
                    elementor('span', [['id', 'alert-message']], alertData.login_email_not_registered, alertElement)
                }
                alertElement.classList.add('alert-fatal')
                alertElement.classList.add('show')
            }
        }
    } else {
        if (document.getElementById('alert-message') === null) {
            elementor('span', [['id', 'alert-message']], alertData.users_empty, alertElement)
            alertElement.classList.add('alert-fatal')
            alertElement.classList.add('show')
            error = 1;
        } else {
            document.querySelector('#alert #alert-message').remove()
            error = 0
        }
    }
}

function registerValidation(formData) {
    if ($('#alert-message-register-success')[0] !== null) {
        $('#alert-message-register-success').parent().remove()
        $('#alert').removeClass('show')
    }
    let error = 0

    let users = []
    if (window.localStorage.getItem('users') !== null) {
        users = JSON.parse(window.localStorage.getItem('users'))
    }

    if (formData.fullname.length < 4) {
        console.log(formData.fullname.length)
        if (!$('#alert-message-fullname')[0]) {
            $('#fullname').parent().after(`<div id="alert" class="show alert-fatal"><span id="alert-message-fullname">${alertData.register_fullname_min_4}</span></div>`)
        }
        error = 1
    } else {
        $('#alert-message-fullname').parent().remove()
    }
    if (formData.email.length < 1) {
        if (!$('#alert-message-email')[0]) {
            $('#email').parent().after(`<div id="alert" class="show alert-fatal"><span id="alert-message-email">${alertData.email_empty}</span></div>`)
        }
        error = 1
    } else {
        $('#alert-message-email').parent().remove()
    }
    if (!formData.email.includes('@')) {
        if (!$('#alert-message-email')[0]) {
            $('#email').parent().after(`<div id="alert" class="show alert-fatal"><span id="alert-message-email">${alertData.email_not_valid}</span></div>`)
        }
        error = 1
    } else {
        $('#alert-message-email').parent().remove()
    }
    if (formData.password.length < 8) {
        if (!$('#alert-message-password')[0]) {
            $('#password').parent().after(`<div id="alert" class="show alert-fatal"><span id="alert-message-password">${alertData.register_password_min_8}</span></div>`)
        }
        error = 1
    } else {
        $('#alert-message-password').parent().remove()
    }
    if (formData.confirm_password !== formData.password) {
        if (!$('#alert-message-confirm-password')[0]) {
            $('#confirm_password').parent().after(`<div id="alert" class="show alert-fatal"><span id="alert-message-confirm-password">${alertData.register_confirm_password_not_match}</span></div>`)
        }
        error = 1
    } else {
        $('#alert-message-confirm-password').parent().remove()
    }
    const user = users.find(pengguna => pengguna.email === formData.email)
    if (user) {
        if (!$('#alert-message-user-exist')[0]) {
            $('#form-register').before(`<div id="alert" class="show alert-fatal"><span id="alert-message-user-exist">${alertData.register_user_exist}</span></div>`)
        }
        error = 1
    } else {
        $('#alert-message-user-exist').parent().remove()
    }
    console.log(error)
    if (error < 1) {
        const user = {
            "fullname": formData.fullname,
            "email": formData.email,
            "password": btoa(formData.password),
        }
        users.push(user)
        window.localStorage.setItem('users', JSON.stringify(users))
        if (!$('#alert-message-register-success')[0]) {
            $('#form-register').before(`<div id="alert" class="show alert-success"><span id="alert-message-register-success">${alertData.register_success}</span></div>`)
        } else {
            $('#alert-message-register-success').parent().remove()
        }
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