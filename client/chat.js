let username = prompt('Enter your username');
const exampleSocket = new WebSocket('ws://localhost:8080');

document.querySelector('#send').addEventListener('click', () => {
    if (document.querySelector('#text').value) {
        const message = document.createElement('div');
        const name = document.createElement('p');
        const note = document.createElement('p');
        const time = document.createElement('p');
        name.classList.add('username');
        note.classList.add('note');
        time.classList.add('time');

        name.innerHTML = username;
        note.innerHTML = document.querySelector('#text').value;
        time.innerHTML = new Date(Number(Date.now())).toLocaleTimeString();

        message.append(name, note, time);
        message.style.textAlign = 'right';
        document.querySelector('.chat').append(message);
        console.log(note.innerHTML, time.innerHTML);

        exampleSocket.send(JSON.stringify({'name': username, 'note': note.innerHTML, 'time': time.innerHTML}));
        document.querySelector('#text').value = '';
    }
})
exampleSocket.onmessage = function (el) {
    console.log(el.data);
    let data = JSON.parse(el.data);
    const message = document.createElement('div');
    const name = document.createElement('p');
    const note = document.createElement('p');
    const time = document.createElement('p');
    name.classList.add('username');
    note.classList.add('note');
    time.classList.add('time');

    name.innerHTML = data.name;
    note.innerHTML = data.note;
    time.innerHTML = data.time;

    message.append(name, note, time);
    message.style.textAlign = 'left';
    document.querySelector('.chat').append(message);
}