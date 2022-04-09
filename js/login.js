const button = document.querySelector('.enter-btn');
const form = document.querySelector('#login-form');

function loginUser(body) {
    const headers = new Headers();
    headers.set('Authorization', `Basic ${btoa(`${body.username}:${body.password}`)}`);
    headers.set('content-type', 'application/json');
    return fetch('http://127.0.0.1:5000/api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify(body),
        headers,
    });
}

async function buttonHandler(event) {
    if (form.checkValidity()) {
        event.preventDefault();

        const username = document.getElementById('username');
        const password = document.getElementById('password');

        const entry = {
            username: username.value,
            password: password.value,
        };

        loginUser(entry)
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(await response.text());
                }
                window.localStorage.setItem('current_user', JSON.stringify(entry));
                window.location.href = 'profile.html';
                return response.text();
            })
            .catch(() => {
                alert('Provided username or password does not exist!');
            });
    }
}

button.addEventListener('click', buttonHandler);