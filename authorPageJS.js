const authorPostsContainer = document.getElementById('authorPostsContainer')

function openAuthorPage(event){
    let username = event.target.id
    fetch(`http://167.99.138.67:1111/getuserposts/${username}`)
        .then(res => res.json())
        .then(data => {
                console.log(data)
                authorPosts.push(data)
                console.log(posts)
                authorPostsContainer.innerHTML = ''
                posts[1].data.map(item => {
                    let date = new Date(item.timestamp)
                    let monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"]

                    authorPostsContainer.innerHTML += `
                <div class="authorPost"> 
                <a href="particularPost.html">
                    <img src="${item.image}" alt="">
                </a>
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