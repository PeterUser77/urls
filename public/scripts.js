const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')
const api = 'http://localhost:3000'

async function load() {
    const res = await fetch(api).then((data) => data.json())
    
    res.urls.map(({name, url}) => addElement({name, url}))
}

load()

function addElement({ name, url }) {

    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => removeElement(trash, {name, url})

    li.append(a)
    li.append(trash)
    ul.append(li)
    
}

async function createElement({name, url}) {
    await fetch(`${api}/?name=${name}&url=${url}`).then(() => {
        addElement({ name, url })
    })
}

async function removeElement(el, {name, url}) {

    await fetch(`${api}/?name=${name}&url=${url}&del=${1}`).then(() =>{
        el.parentNode.remove()
    })


}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Preencha o campo')

    const [name, url] = value.split(", ")

    if (!url) 
        return alert('formate o texto da maneira correta')

    if (!/^http/.test(url)) 
        return alert("Digite a url da maneira correta")

    createElement({ name, url })

    input.value = ""
})