
const postsContainer = document.getElementById('postsContainer')
const loggedUser = document.getElementById('loggedUser')
const home = document.getElementById('home')

loggedUser.innerText = localStorage.getItem('loggedUser')

home.addEventListener('click', goHome)

let posts = []

getAll()

function getAll(){
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
                    <img title="${item.username}" id="${item.id}" class="postImg" onclick="openParticularPost(event)" src="${item.image}" alt="" >
                </a>

        <div class="dataAndAuthor">
            <div class="">${monthNames[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}</div>
            <div class="d-flex">
                <div>by: </div>
                <a href="authorPage.html">
                    <div class="goToAuthor" id="${item.username}" onclick="openAuthorPage(event)"> ${item.username}</div>
                </a>
            </div>
        </div>
        <a href="particularPost.html">
            <h5 title="${item.username}" id="${item.id}" onclick="openParticularPost(event)" class="title" >
                    ${item.title}
            </h5>
        </a>
           
        <div class="description">
        ${item.description}
        </div>
    </div>`
            })
            }
            )
}

function goHome(){
    window.onload('index.html')
}

function openAuthorPage(event){
    let particularUser = event.target.id
    localStorage.setItem('particularName', particularUser)
}

function openParticularPost(event){
    console.log('smth')
    // console.log(event.target.alt, event.target.id)
    localStorage.setItem('user', JSON.stringify({
        name: event.target.title,
        id: event.target.id
    }));
}





