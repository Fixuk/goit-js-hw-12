import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery, PER_PAGE } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;

form.addEventListener('submit', async evt => {
  evt.preventDefault();

  const query = form.elements['search-text'].value.trim();
  if (!query) return;

  currentQuery = query;
  currentPage = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    if (data.hits.length === 0) {
      iziToast.show({
        icon: 'ico-error',
        iconColor: '#fff',
        title: 'Error',
        titleColor: '#fff',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        timeout: 5000,
      });
      return;
    }

    createGallery(data.hits);

    if (currentPage * PER_PAGE < data.totalHits) {
      showLoadMoreButton();
    }
  } catch (err) {
    iziToast.show({
      icon: 'ico-error',
      iconColor: '#fff',
      title: 'Error',
      titleColor: '#fff',
      message: err.message,
      messageColor: '#fff',
      backgroundColor: '#ef4040',
      position: 'topRight',
      timeout: 5000,
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    createGallery(data.hits);

    const cardHeight = document
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });

    if (currentPage * PER_PAGE >= data.totalHits) {
      iziToast.show({
        icon: 'ico-info',
        iconColor: '#fff',
        title: 'Info',
        titleColor: '#fff',
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: '#fff',
        backgroundColor: '#4e75ff',
        position: 'topRight',
        timeout: 5000,
      });
    } else {
      showLoadMoreButton();
    }
  } catch (err) {
    iziToast.show({
      icon: 'ico-error',
      iconColor: '#fff',
      title: 'Error',
      titleColor: '#fff',
      message: err.message,
      messageColor: '#fff',
      backgroundColor: '#ef4040',
      position: 'topRight',
      timeout: 5000,
    });
  } finally {
    hideLoader();
  }
});
