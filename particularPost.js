const particularContainer = document.getElementById('particularContainer')
const loggedUser = document.getElementById('loggedUser')

loggedUser.innerText = localStorage.getItem('loggedUser')

openParticularPost()

let particularPost = []

function openAuthorPage(event){
    let particularUser = event.target.id
    localStorage.setItem('particularName', particularUser)
}

function openParticularPost(){
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    fetch(`http://167.99.138.67:1111/getsinglepost/${user.name}/${user.id}`)
        .then(res => res.json())
        .then(data => {
                particularPost.push(data)
                console.log(particularPost)
                    particularContainer.innerHTML = ''
                    let date = new Date(particularPost[0].data.timestamp)
                    let monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"]
                    particularContainer.innerHTML += `
                <div class="particularPost">
                    <a href="particularPost.html">
                        <img class="postImg" src="${particularPost[0].data.image}" alt="">
                    </a>
                    <div class="dataAndAuthor">
                        <div class="">${monthNames[date.getMonth()]} ${date.getDay()+1}, ${date.getFullYear()}</div>
                        <div class="d-flex">
                        <div>by: </div>
                            <a href="authorPage.html">
                                <div class="goToAuthor" id="${particularPost[0].data.username}" onclick="openAuthorPage(event)"> ${particularPost[0].data.username}</div>
                            </a>
                        </div>
                    </div>
                    <h5 class="title">${particularPost[0].data.title}</h5>
                    <div class="description">
                    ${particularPost[0].data.description}
                    </div>
                    </div>`
            }
        )
}


