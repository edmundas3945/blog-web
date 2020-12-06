const inputTitle = document.getElementById('CPTitle')
const img = document.getElementById('CPImg')
const inputDes = document.getElementById('CPDescription')
const submit = document.getElementById('submit')

submit.addEventListener('click', createPost)

function createPost(){

    let data = {
        secretKey: localStorage.getItem('secretKey'),
        title: inputTitle.value,
        image: img.value,
        description: inputDes.value
    }
    fetch('http://167.99.138.67:1111/createpost', {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then (data => {
            if(data.success){
                window.location.href('index.html')
            }
            else {
                alert(data.message)
            }
        }
    )
}

