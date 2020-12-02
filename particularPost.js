
const postsContainer = document.getElementById('postsContainer')
const userBtn = document.getElementById('userBtn')
const menuBtn = document.getElementById('menuBtn')
const userContainer = document.getElementById('userContainer')
const authorPostContainer = document.getElementById('authorPostContainer')
const particularPostContainer = document.getElementById('particularPostContainer')


const home = document.getElementById('home')
const inputPassword2 = document.getElementById('password2')
const submit = document.getElementById('submit')

userBtn.addEventListener('click', openUserWindow)
let userMenuTrigger = true
home.addEventListener('click', goHome)
// menuBtn.addEventListener('click', openMenuWindow)

let posts = []
let authorPosts = []
let particularPost = []

getAll()

function openUserWindow(){
    if (userMenuTrigger){
        userMenuTrigger = !userMenuTrigger
        userContainer.style.display = 'block'
    }else {
        userMenuTrigger = !userMenuTrigger
        userContainer.style.display = 'none'
    }

}

function getAll(){
    console.log(document.body)
    fetch('http://167.99.138.67:1111/getallposts')
        .then(res => res.json())
        .then(data => {
            posts.push(data)
                // console.log(posts[0].data)
                postsContainer.innerHTML = ''
                posts[0].data.map(item => {
                    let date = new Date(item.timestamp)
                    let monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"]

                postsContainer.innerHTML += `
                <div class="post">
                <a href="particularPost.html">
                    <img id="${item.id}" onclick="openParticularPost(event)" src="${item.image}" alt="${item.username}">
                </a>

        <div class="dataAndAuthor">
            <div class="">${monthNames[date.getMonth()]} ${date.getDay()+1}, ${date.getFullYear()}</div>
            <div class="d-flex">
                <div>by: </div>
                <a href="authorPage.html">
                    <div class="goToAuthor" id="${item.username}" onclick="openAuthorPage(event)"> ${item.username}</div>
                </a>
            </div>
        </div>
           <h5 class="title">${item.title}</h5>
        <div class="description">
        ${item.description}
        </div>
    </div>`
            })
            }
            )
}

function goHome(){

}

function openAuthorPage(event){
    let username = event.target.id
    fetch(`http://167.99.138.67:1111/getuserposts/${username}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
                authorPosts.push(data)
                console.log(posts)
                postsContainer.innerHTML = ''
                posts[1].data.map(item => {
                    let date = new Date(item.timestamp)
                    let monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"]

                    postsContainer.innerHTML += `
                <div class="authorPost"> 
        <img src="${item.image}" alt="">
        <div class="dataAndAuthor">
            <div class="">${monthNames[date.getMonth()]} ${date.getDay()+1}, ${date.getFullYear()}</div>
            <div class="d-flex">
                <div>by: </div>
                <div class="goToAuthor" id="${item.username}" onclick="openAuthorPage(event)"> ${item.username}</div>
            </div>
        </div>
           <h5 class="title">${item.title}</h5>
        <div class="description">
        ${item.description}
        </div>
    </div>`
                })
            }
        )
}

function openParticularPost(event){
    console.log(event)
    let id = event.target.id
    let name = event.target.alt
    fetch(`http://167.99.138.67:1111/getsinglepost/${name}/${id}`)
        .then(res => res.json())
        .then(data => {
                posts.push(data)
                console.log(posts)
                posts[1].data.map(item => {
                    postsContainer.innerHTML = ''
                    let date = new Date(item.timestamp)
                    let monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"]

                    postsContainer.innerHTML += `
                <div class="post">
        <img src="${item.image}" alt="">
        <div class="dataAndAuthor">
            <div class="">${monthNames[date.getMonth()]} ${date.getDay()+1}, ${date.getFullYear()}</div>
            <div class="d-flex">
                <div>by: </div>
                <a href="authorPage.html">
                <div class="goToAuthor" id="${item.username}" onclick="openAuthorPage(event)"> ${item.username}</div>
                </a>
            </div>
        </div>
           <h5 class="title">${item.title}</h5>
        <div class="description">
        ${item.description}
        </div>
    </div>`
                })
            }
        )
}


