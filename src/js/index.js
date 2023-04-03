import  fetchImages  from "./searchImages";

const form = document.querySelector('#search-form');
const formInput = form.querySelector('input[name="searchQuery"]');
const galleryList = document.querySelector('.gallery');

form.addEventListener('submit', onSubmitForm);


async function onSubmitForm(event) {
    event.preventDefault();
    const name = formInput.value.trim();
    const images = await fetchImages(name);
     galleryList.insertAdjacentElement("beforeend", await renderGalleryMarkup(images)); 
    // form.reset();
}

function renderGalleryMarkup(images) {
    console.log(images);
    return images.map(({ webformatURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
                   <img src="${webformatURL}" alt="${Object.values(tags)}" loading="lazy" />
             <div class="info">
                 <p class="info-item">
                 <b>Likes:${likes}</b>

                 </p>
                 <p class="info-item">
                <b>Views: ${views}</b>
                  </p>
                  <p class="info-item">
                 <b>Comments: ${comments}</b>
              </p>
                   <p class="info-item">
              <b>Downloads: ${downloads}</b>
             </p>
       </div>
     </div>`
    }).join('');

}; 
// async fetchImages(name) c await на запуск функции рендера

// функция/функции рендера разметки (markup)

