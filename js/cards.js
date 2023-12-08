const cardsContainer = document.querySelector('.cards');
const defaultPhoto = 'https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676296367166243426.png';

async function getPost() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=12')
        if (!response.ok) {
            throw new Error('Запрос не удачный')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Ошибка данных', error);
        return [];
    }
}

async function renderCards() {
    const posts = await getPost()
    cardsContainer.innerHTML = '';

    posts.forEach(post => {
        const card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = `
        <img src="${defaultPhoto}" alt="photo">
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        `;
        cardsContainer.appendChild(card)
    })
}

window.addEventListener('DOMContentLoaded', renderCards);