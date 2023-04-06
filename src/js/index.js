import fetchImages from "./searchImages";
import { Notify } from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const form = document.querySelector('#search-form');
const searchInput = form.querySelector('input[name="searchQuery"]');
const galleryList = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

hideLoadMoreBtn();
let page = 1;


form.addEventListener('submit', onSearch);

async function onSearch(event) {

    event.preventDefault();

    hideLoadMoreBtn();
    clearGallery();

    const name = searchInput.value.trim();

    page = 1;
    
    const images = await fetchImages(name, page);
    const render = await renderGalleryMarkup(images);

    galleryList.insertAdjacentHTML("beforeend", render);

    
    Notify.success(`Hooray! We found ${images.totalHits} images.`)
    if (images.totalHits < 40) {
        hideLoadMoreBtn();
        Notify.info("We're sorry, but you've reached the end of search results.");
    }

}


loadMoreBtn.addEventListener('click', onLoadMoreImages);

async function onLoadMoreImages() {
    
    page += 1;
    
    const images = await fetchImages(searchInput.value, page);
    const render = await renderGalleryMarkup(images);
    galleryList.insertAdjacentHTML("beforeend", render); 

    let finalPage = Math.ceil(Number(images.totalHits) / 40);
    if (finalPage === page) {
        hideLoadMoreBtn();
        Notify.info("We're sorry, but you've reached the end of search results.");
    }
    
}

function renderGalleryMarkup(images) {

    if (images.hits.length < 1) {
       Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    } else {
        visibleLoadMoreBtn();
    }
    return images.hits.map(({ webformatURL, largeImageURL , tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
                   <a class ="photo-card__item" href="${largeImageURL}"><img class ="photo-card__image" src="${webformatURL}" alt="${tags}" title="${tags}" loading="lazy" height='260'/></a>
                
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

function hideLoadMoreBtn() {
    loadMoreBtn.style.display = "none";
}

function visibleLoadMoreBtn() {
    loadMoreBtn.style.display = "block";
}
galleryList.addEventListener('click', onImageClick);

function onImageClick(event) {
    event.preventDefault();
}

const lightbox = new SimpleLightbox('.photo-card > photo-card__item a', {
    captionDelay: 250,
    showCounter: false});
