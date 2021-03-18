import gallery from './gallery-items.js'

const imagesContainer = document.querySelector(".js-gallery");
const imagesMarkup = createGalleryMarkup(gallery)
const closeBtn = document.querySelector(".lightbox__button");
const overlay = document.querySelector(".lightbox__overlay");
const modalEl = document.querySelector('.js-lightbox')

imagesContainer.insertAdjacentHTML('beforeend', imagesMarkup)

imagesContainer.addEventListener('click',onImagesContainer)
closeBtn.addEventListener('click', onCloseModal)
overlay.addEventListener('click', onCloseModal)


function createGalleryMarkup(gallery) {
    return gallery.map(({ preview, original, description }) => {
        return `<li class="gallery__item">
                <a
                  class="gallery__link"
                 href="${original}"
                 >
                 <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
                 </a>
             </li>`;
    }).join('');
}

function onImagesContainer(e) {
  window.addEventListener('keydown', onEscKeyPress);
    e.preventDefault();
    const isImgUrlEl = e.target.classList.contains("gallery__image");
    if (!isImgUrlEl) {
        return
    }
    const imgUrlEl = e.target;
    const imgSource = imgUrlEl.dataset.source;
    const imgAlt = imgUrlEl.alt;
  const modal = document.querySelector(".lightbox__image");
  modal.src = imgUrlEl.dataset.source;
  modal.alt = imgUrlEl.alt;
  modalEl.classList.add('is-open')
     console.log(modal)
}

function onCloseModal(e) {
  window.removeEventListener('keydown', onEscKeyPress);
  modalEl.classList.remove('is-open')
  const modalImg = document.querySelector(".lightbox__image");
  modalImg.src = '';
  modalImg.alt = '';
}
function onEscKeyPress(e) {
  const ESC_KEY_CODE = 'Escape';
  const onEscKey = e.code === ESC_KEY_CODE;
  if (onEscKey) {
    onCloseModal(e);
  }
}
