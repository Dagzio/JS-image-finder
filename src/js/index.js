import  fetchImages  from "./searchImages";

const form = document.querySelector('#search-form');
const formInput = form.querySelector('input[name="searchQuery"]');

form.addEventListener('submit', onSubmitForm);


async function onSubmitForm(event) {
    event.preventDefault();
    const name = formInput.value.trim();
    fetchImages(name);
    form.reset();
}

// async fetchImages(name) c await на запуск функции рендера

// функция/функции рендера разметки (markup)

