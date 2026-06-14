import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');
let lightbox = null;

export function createGallery(images) {
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="card-info">
            <p class="card-info-item"><b>Likes</b><span>${likes}</span></p>
            <p class="card-info-item"><b>Views</b><span>${views}</span></p>
            <p class="card-info-item"><b>Comments</b><span>${comments}</span></p>
            <p class="card-info-item"><b>Downloads</b><span>${downloads}</span></p>
          </div>
        </a>
      </li>`
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);

  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
      captionPosition: 'bottom',
    });
  }
}

export function clearGallery() {
  galleryEl.innerHTML = '';
  lightbox = null;
}

export function showLoader() {
  loaderEl.classList.remove('hidden');
}

export function hideLoader() {
  loaderEl.classList.add('hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('hidden');
}
