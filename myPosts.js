
const myPostsContainer = document.getElementById('myPostsContainer')
const areYouSure = document.getElementById('areYouSure')
const maybeNot = document.getElementById('no')
const maybeYes = document.getElementById('yes')

maybeNot.addEventListener('click', close)
maybeYes.addEventListener('click', deleteConfirm)

let myPosts = []
let IDforDELETEpost = ''

openMyPosts()

function openMyPosts(){
    let username = localStorage.getItem('loggedUser')
    fetch(`http://167.99.138.67:1111/getuserposts/${username}`)
        .then(res => res.json())
        .then(data => {
                myPosts.push(data)
                console.log(myPosts[0].data)
                myPostsContainer.innerHTML = ''
                myPosts[0].data.map(item => {
                    let date = new Date(item.timestamp)
                    let monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"]
                    myPostsContainer.innerHTML += `
                <div id="${item.id}" class="authorPost">
        <img src="${item.image}" alt="">
        <div class="center">${monthNames[date.getMonth()]} ${date.getDay()+1}, ${date.getFullYear()}</div>
        <h5 class="title">${item.title}</h5>
        <div class="description">${item.description}</div>
        <div class="bottomOfMyPost">
            <a href="editPage.html">
                <div onclick="editInfo(event)" class="editBtn">Edit</div>
            </a>
            <div onclick="deletePost(event)" class="deleteBtn">Delete</div>
        </div>
    </div>`
                })
            }
        )
}

function deletePost(event){
    // console.log(event.path[2].id)
    IDforDELETEpost = event.path[2].id
        areYouSure.style.display = 'block'
}

function close(){
        areYouSure.style.display = 'none'
}

function deleteConfirm(){
    let data = {
        secretKey: localStorage.getItem('secretKey'),
        id: IDforDELETEpost
    }
    fetch('http://167.99.138.67:1111/deletepost', {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).
        then(data => {
        console.log(data)
        if(data.success){
            location.reload()
        }
    })
}

function editInfo(event) {

    let something = {
        title: event.path[2].children[2].innerText,
        description: event.path[2].children[3].innerText,
        image: event.path[2].children[0].currentSrc,
        id: event.path[2].id
    }
    localStorage.setItem('edit', JSON.stringify({
        title: something.title,
        description: something.description,
        image: something.image,
        id: something.id
    }));
    // localStorage.setItem('editTitle', 'smth.title')
    // localStorage.setItem('editDescription', smth.description)
    // localStorage.setItem('editImage', smth.image)
    // localStorage.setItem('editId', smth.id)
    console.log(something)
}


