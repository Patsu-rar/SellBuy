const button = document.querySelector('.enter-btn');
const form = document.querySelector('#edit-form');

const current_user = window.localStorage.getItem('current_user');
const current_pass = JSON.parse(current_user).password;
const old_pass = document.getElementById('old-password');

function editUser(body) {
    const headers = new Headers();

    headers.set('Authorization', `Basic ${btoa(`${JSON.parse(current_user).username}:${old_pass.value}`)}`);
    headers.set('content-type', 'application/json');
    return fetch('http://127.0.0.1:5000/api/v1/user/change_user', {
        method: 'PUT',
        body: JSON.stringify(body),
        headers,
    });
}

async function buttonHandler(event) {
    event.preventDefault();

    const new_pass = document.getElementById('new-password');
    const verified_pass = document.getElementById('verified-password');

    const entry = {
        password: new_pass.value
    };

    console.log(current_pass, old_pass.value);
    if (current_pass !== old_pass.value) {
        alert("Old password is wrong");
    } else if (old_pass.value === new_pass.value) {
        alert("The old password and the new one are the same");
    } else if (new_pass.value !== verified_pass.value) {
        alert("Please re-enter the same password");
    }

    editUser(entry)
        .then(async (response) => {
            if (!response.ok) {
                throw new Error(await response.text());
            }
            return response.text();
        })
        .then(() => {
            window.localStorage.setItem('current_user', JSON.stringify({
                username: JSON.parse(current_user).username,
                password: new_pass.value
            }));
            window.location.href = 'profile.html';
        })
        .catch((error) => {
            console.log(`Fetch error: ${error}`);
        });
}

button.addEventListener('click', buttonHandler);