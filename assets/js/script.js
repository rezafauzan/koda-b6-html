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
ambilData("https://raw.githubusercontent.com/rezafauzan/koda-b6-html/refs/heads/feat/login-logic/assets/data/alert-message.json").then(
    data => { alertData = data }
)

function validateLogin(email, password, alertElement) {
    if (email.length < 1) {
        elementor('span', [['id', 'alert-message']], alertData.login_email_empty, alertElement)
        alertElement.classList.add('alert-fatal')
        alertElement.classList.add('show')
    } else if (email.includes('@') !== true) {
        elementor('span', [['id', 'alert-message']], alertData.login_email_not_valid, alertElement)
        alertElement.classList.add('alert-fatal')
        alertElement.classList.add('show')
    } else if (email !== 'koda@email.com') {
        elementor('span', [['id', 'alert-message']], alertData.login_email_wrong, alertElement)
        alertElement.classList.add('alert-fatal')
        alertElement.classList.add('show')
    } else if (password !== '1234') {
        elementor('span', [['id', 'alert-message']], alertData.login_password_wrong, alertElement)
        alertElement.classList.add('alert-fatal')
        alertElement.classList.add('show')
    } else if (email === 'koda@email.com' && password === '1234') {
        window.location.href = 'index.html'
    }
}