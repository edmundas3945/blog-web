
let username = document.getElementById('userName')
let passwordOne = document.getElementById('password')
let passwordTwo = document.getElementById('password2')
const submit = document.getElementById('submit')

submit.addEventListener('click', registerUser)
passwordTwo.addEventListener('input', doSame(e))

function doSame(e){
    if (e.keyCode === 13){
        registerUser()
    }
}

function registerUser(){
    // console.log(username.value)
    let data = {
        name: username.value,
        passwordOne: passwordOne.value,
        passwordTwo: passwordTwo.value
    }
    fetch('http://167.99.138.67:1111/createaccount', {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(data => {
        console.log(data)
        if(data.success){
            window.location.href('login.html')
            userName.value = ''
            passwordInput.value = ''
        }else {
            alert(data.message)
            username.value = ''
            passwordOne.value = ''
            passwordTwo.value = ''
        }
    })
}