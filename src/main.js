import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox"; 
import "simplelightbox/dist/simple-lightbox.min.css";
import { getImage } from "./js/pixabay-api";
import { getMarkup } from "./js/render-functions";

const links = {
    formEL: document.querySelector('#form'),
    inputEL: document.querySelector('#image-input'),
    galleryEL: document.querySelector('#gallery'),
    gallery: document.querySelector('.gallery'),
  };
  
  function submitForm (event) {
    event.preventDefault();
    links.galleryEL.innerHTML = '<span class="loader"></span>';
    const searchValue = links.inputEL.value.trim();
    if (searchValue === '') {
      return iziToast.show({
        title: '<div class="error-remark"><img src="./img/error.svg" alt="error" class="error-svg"><span class="error-text">Introduction field please enter the value to search</span></div>',
        titleSize: '20px',
        message: '',
        backgroundColor: 'red',
        position: 'topRight',
      });
    }
  
    getImage(searchValue).then(data => {
      if (data.totalHits === 0) {
        return iziToast.show({
          title: '<div class="error-remark"><img src="./img/error.svg" alt="error" class="error-svg"><span class="error-text">Sorry, there are no images matching your search query. Please try again!</span></div>',
          titleSize: '20px',
          message: '',
          backgroundColor: 'red',
          position: 'topRight',
        });
      }

      links.galleryEL.innerHTML = '';

      getMarkup(data.hits, links.galleryEL);
      let gallery = new SimpleLightbox('#gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
      gallery.refresh();
    });
    links.formEL.reset();
  }
  
  links.formEL.addEventListener('submit', submitForm);
