
const userName = document.getElementById('userName')
const passwordInput = document.getElementById('password')
const login = document.getElementById('login')

login.addEventListener('click', LogIn)
passwordInput.addEventListener('input', doSame(e))

function doSame(e){
    if (e.keyCode === 13){
        LogIn()
    }
}

function LogIn(){
    let data = {
        name: userName.value,
        password: passwordInput.value
    }
    fetch('http://167.99.138.67:1111/login', {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then ( data => {
            console.log(data)
        if(data.success){
            localStorage.setItem('secretKey', data.secretKey)
            console.log(localStorage)
            window.location.href('index.html')
            localStorage.setItem('loggedUser', userName.value)
        }else {
            alert(data.message)
            userName.value = ''
            passwordInput.value = ''
        }

    })

}