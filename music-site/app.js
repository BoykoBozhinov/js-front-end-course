window.addEventListener('load', solve);

function solve() {

    let counter = 0;
    const allInputs = {
        genre: document.getElementById('genre'),
        songName: document.getElementById('name'),
        author: document.getElementById('author'),
        date: document.getElementById('date')
    }

    const addBtn = document.getElementById('add-btn');
    const hitsContainer = document.querySelector('.all-hits-container');
    const savedContainer = document.querySelector('.saved-container');
    const likesContainer = document.querySelector('.likes > p');

    addBtn.addEventListener('click', addSongHandler);

    function addSongHandler(event) {
        event.preventDefault();
        let inputsValue = Object.values(allInputs);
        let isEmpty = inputsValue.find((input) => input.value === '');

        if (isEmpty) {
            return;
        }

        const hitsInfo = createElement('div', hitsContainer, '', ['hits-info']);


        const img = createElement('img', hitsInfo, null, null, null, { src: './static/img/img.png'});
        createElement('h2', hitsInfo, `Genre: ${allInputs.genre.value}`);
        createElement('h2', hitsInfo, `Name: ${allInputs.songName.value}`);
        createElement('h2', hitsInfo, `Author: ${allInputs.author.value}`);
        createElement('h3', hitsInfo, `Date: ${allInputs.date.value}`);
        const saveBtn = createElement('button', hitsInfo, 'Save song', ['save-btn']);
        const likeBtn = createElement('button', hitsInfo, 'Like song', ['like-btn']);
        const deleteBtn = createElement('button', hitsInfo, 'Delete', ['delete-btn']);

        inputsValue.forEach((e) => e.value = '');

        likeBtn.addEventListener('click', likeSongHandler);
        saveBtn.addEventListener('click', saveSongHandler);
        deleteBtn.addEventListener('click', deleteSongHandler);
    }

    function saveSongHandler() {
        const songRef = this.parentNode;
        const saveBtn = document.querySelector('.save-btn');
        const likeBtn = document.querySelector('.like-btn');
        savedContainer.appendChild(songRef);
        saveBtn.remove();
        likeBtn.remove();
    }

    function deleteSongHandler() {
        this.parentNode.remove();
    }

    function likeSongHandler() {
        this.setAttribute('disabled', true);
        counter++;
       
        likesContainer.textContent = `Total Likes: ${counter}`;
    }


    function createElement(type, parentNode, content, classes, id, attributes, innerHtml) {

        let htmlElement = document.createElement(type);

        if (content && innerHtml) {
            htmlElement.innerHTML = content;
        } else {

            if (content && type !== 'input') {
                htmlElement.textContent = content;
            }

            if (content && type === 'input') {
                htmlElement.value = content;
            }

        }

        if (classes && classes.length > 0) {
            htmlElement.classList.add(...classes);
        }

        if (id) {
            htmlElement.id = id;
        }

        if (attributes) {
            for (key in attributes) {
                htmlElement[key] = attributes[key];
            }
        }

        if (parentNode) {
            parentNode.appendChild(htmlElement);
        }

        return htmlElement;
    }
}