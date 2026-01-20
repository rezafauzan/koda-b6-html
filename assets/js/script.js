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

let alertData = {}
ambilData("https://raw.githubusercontent.com/rezafauzan/koda-b6-html/refs/heads/feat/auth-localstorage/assets/data/alert-message.json").then(
    data => { alertData = data }
)

function validateLogin(email, password, alertElement) {
    const users = window.localStorage.getItem('users')
    if (users) {
        if (email.length < 1) {
            if (document.getElementById('alert-message') === null) {
                elementor('span', [['id', 'alert-message']], alertData.login_email_empty, alertElement)
            }
            alertElement.classList.add('alert-fatal')
            alertElement.classList.add('show')
        } else {
            if (email.includes('@') !== true) {
                if (document.getElementById('alert-message') === null) {
                    elementor('span', [['id', 'alert-message']], alertData.login_email_not_valid, alertElement)
                }
                alertElement.classList.add('alert-fatal')
                alertElement.classList.add('show')
            } else {
                users.forEach(
                    user => {
                        if (user.find(pengguna => pengguna.email === email)) {
                            if (email === pengguna.email && password === pengguna.password) {
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
                )
            }
        }
    } else {
        if (document.getElementById('alert-message') === null) {
            elementor('span', [['id', 'alert-message']], alertData.users_empty, alertElement)
            console.log("kosong")
        }
        alertElement.classList.add('alert-fatal')
        alertElement.classList.add('show')
    }
}

function registerValidation(formData) {
    let error = 0
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
    if (error < 1) {
        const user = {
            "fullname": formData.fullname,
            "email": formData.email,
            "password": btoa(formData.password),
        }
        window.localStorage.setItem('users', JSON.stringify(user))
        if (!$('#alert-register-success')[0]) {
            $('#form-register').before(`<div id="alert" class="show alert-success"><span id="alert-register-success">${alertData.register_success}</span></div>`)
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