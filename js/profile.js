function getUser(body) {
    const headers = new Headers();
    headers.set('Authorization', `Basic ${btoa(`${body.username}:${body.password}`)}`);
    headers.set('content-type', 'application/json');
    return fetch(`http://127.0.0.1:5000/api/v1/user/${body.username}`, {
        method: 'GET',
        headers,
    });
}

async function getHandler() {
    const currentUser = window.localStorage.getItem('current_user');

    const entry = {
        username: JSON.parse(currentUser).username,
        password: JSON.parse(currentUser).password,
    };
    const response = await getUser(entry);

    const responseText = JSON.parse(await response.text());
    if (response.ok) {
        document.getElementById('email').value = `${responseText.email}`;
        document.getElementById('username').value = `${responseText.username}`;
        return true;
    }
    return false;
}

getHandler().then(res => {
    console.log(res);
});