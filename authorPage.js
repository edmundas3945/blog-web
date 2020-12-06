const authorPostsContainer = document.getElementById('authorPostsContainer')
const loggedUser = document.getElementById('loggedUser')
const author = document.getElementById('author')

loggedUser.innerText = localStorage.getItem('loggedUser')

author.innerText = ` ${localStorage.getItem('particularName')}`

let authorPosts = []

openAuthorPage()

function openAuthorPage(){
    let username = localStorage.getItem('particularName')
    // console.log(username)
    fetch(`http://167.99.138.67:1111/getuserposts/${username}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
                authorPosts.push(data)
                authorPostsContainer.innerHTML = ''
                authorPosts[0].data.map(item => {
                    let date = new Date(item.timestamp)
                    let monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"]
                    authorPostsContainer.innerHTML += `
                <div class="authorPost"> 
        <img class="postImg" src="${item.image}" alt="">
        <div class="center">${monthNames[date.getMonth()]} ${date.getDay()+1}, ${date.getFullYear()}</div>
        <h5 class="title">${item.title}</h5>
        <div class="description">${item.description}</div>
    </div>`
                })
            }
        )
}



