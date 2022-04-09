const button = document.querySelector('.enter-btn');
const form = document.querySelector('#registration-form');

function signupUser(body) {
    return fetch('http://127.0.0.1:5000/api/v1/auth/register', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers({
            'content-type': 'application/json',
        }),
    });
}

async function buttonHandler(event) {
    if (form.checkValidity()) {
        event.preventDefault();

        const username = document.getElementById('username');
        const password = document.getElementById('password');
        const first_name = document.getElementById('first-name');
        const last_name = document.getElementById('last-name');
        const email = document.getElementById('email');
        const region_id = document.getElementById('region-id');

        const entry = {
            username: username.value,
            first_name: first_name.value,
            last_name: last_name.value,
            password: password.value,
            email: email.value,
            region_id: region_id.value
        };

        signupUser(entry)
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(await response.text());
                }
                return response.text();
            })
            .then(() => {
                window.location.href = 'login.html';
            })
            .catch((error) => {
                console.log(`Fetch error: ${error}`);
            });
    }
}

button.addEventListener('click', buttonHandler);