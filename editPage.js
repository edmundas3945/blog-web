const inputTitle = document.getElementById('editTitle')
const img = document.getElementById('editImg')
const inputDes = document.getElementById('editDescription')
const edit = document.getElementById('edit')

let editData = JSON.parse(localStorage.getItem('edit'));

inputTitle.value = editData.title
img.value = editData.image
inputDes.value = editData.description

edit.addEventListener('click', editPost)

console.log(editData)

function editPost(){
    console.log(editData)
    let data = {
        secretKey: localStorage.getItem('secretKey'),
        title: inputTitle.value,
        description: inputDes.value,
        image: img.value,
        id: editData.id

    }
    fetch('http://167.99.138.67:1111/updatepost', {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then (data => {
                if(data.success){
                    window.location.href = 'myPosts.html'
                }
                else {
                    alert(data.message)
                }
            }
        )
        // .then(data => console.log(data))
}

