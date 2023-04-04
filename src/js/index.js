import fetchImages from "./searchImages";
import { Notify } from "notiflix";

const form = document.querySelector('#search-form');
const formInput = form.querySelector('input[name="searchQuery"]');
const galleryList = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

form.addEventListener('submit', onSubmitForm);


async function onSubmitForm(event) {
    event.preventDefault();
    
    const name = formInput.value.trim();
    const images = await fetchImages(name);
    const render = await renderGalleryMarkup(images);
     galleryList.insertAdjacentHTML("beforeend", render); 
    form.reset();
}

function renderGalleryMarkup(images) {

    if (images.hits.length < 1) {
        clearGallery();
        loadMoreBtn.style.display = "none";
       Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    } else {
        loadMoreBtn.style.display = "flex";
    }
    return images.hits.map(({ webformatURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
                   <img class ="photo-card__image" src="${webformatURL}" alt="${tags}" loading="lazy"  />
                
             <div class="info">
                 <p class="info-item">
                 <b>Likes</b>
                 ${likes}

                 </p>
                 <p class="info-item">
                <b>Views</b>
                ${views}
                  </p>
                  <p class="info-item">
                 <b>Comments</b>
                 ${comments}
              </p>
                   <p class="info-item">
              <b>Downloads</b>
              ${downloads}
             </p>
             </div>
       </div>`
      }).join('');

}; 


function clearGallery() {
    galleryList.innerHTML = '';
}

// function hideLoadMoreBtn() {
//     loadMoreBtn.style.display = "none";
// }

