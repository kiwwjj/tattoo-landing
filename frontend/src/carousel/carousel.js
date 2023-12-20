import {
  GALLERY_CLASS,
  CAROUSEL_ITEM_CLASS,
  CAROUSEL_IMAGE_CLASS,
  CAROUSEL_PREVIOUS_BUTTON_CLASS,
  CAROUSEL_NEXT_BUTTON_CLASS,
  CAROUSEL_ITEM_SIZE,
  imageFileNames
} from './constants.js';

const galleryElemet = document.querySelector(`.${GALLERY_CLASS}`);

const prevButton = document.querySelector(`.${CAROUSEL_PREVIOUS_BUTTON_CLASS}`);
const nextButton = document.querySelector(`.${CAROUSEL_NEXT_BUTTON_CLASS}`);

if (galleryElemet) {
  const imageElements = imageFileNames.map((imageFileName) => {
    const imageElement = document.createElement('img');
    imageElement.src = `./images/gallery/${imageFileName}`;
    imageElement.alt = imageFileName;
    imageElement.className = CAROUSEL_IMAGE_CLASS;

    return imageElement
  });

  const itemsCount = Math.ceil(imageElements.length / CAROUSEL_ITEM_SIZE);

  const galleryItems = Array.from({ length: itemsCount }, (x, i) => i)
    .map((value, idx) => {
      const galleryItem = document.createElement('div');
      galleryItem.classList.add(CAROUSEL_ITEM_CLASS);


      const startElement = idx * CAROUSEL_ITEM_SIZE;
      const endElement = startElement + CAROUSEL_ITEM_SIZE;
      const imageSlice = imageElements.slice(startElement, endElement);
      imageSlice.forEach((imageElement) => galleryItem.append(imageElement));

      return galleryItem;
    });

  let currentItemIndex = 0;
  const decrementCurrentItemIndex = () => {
    if (currentItemIndex === 0) {
      currentItemIndex = galleryItems.length - 1;
      return;
    }

    if (currentItemIndex === galleryItems.length - 1) {
      currentItemIndex = 0;
      return;
    }

    currentItemIndex--;
  }

  const incrementCurrentItemIndex = () => {
    if (currentItemIndex === galleryItems.length - 1) {
      currentItemIndex = 0;
      return;
    }
    currentItemIndex++;
  }

  const currentItemToRender = galleryItems.at(currentItemIndex);
  galleryElemet.appendChild(currentItemToRender)

  const handleAnimationEnd = (animationEvent) => {
    if (animationEvent.animationName === 'fade-out') {
      galleryElemet.removeChild(galleryElemet.firstChild);
  
      const currentItemToRender = galleryItems.at(currentItemIndex);
      galleryElemet.appendChild(currentItemToRender);
    
      galleryElemet.classList.remove("fade-out");
      galleryElemet.classList.add("fade-in");

      prevButton.addEventListener("click", handlPrevClick);
      nextButton.addEventListener("click", handleNextClick);
    } else {
      galleryElemet.classList.remove("fade-in");
    }
  }

  galleryElemet.addEventListener("animationend", handleAnimationEnd)

  const handlPrevClick = () => {
    decrementCurrentItemIndex();
    galleryElemet.classList.add("fade-out");

    prevButton.removeEventListener("click", handlPrevClick);
    nextButton.removeEventListener("click", handleNextClick);
  };

  const handleNextClick = () => {
    incrementCurrentItemIndex()
    galleryElemet.classList.add("fade-out");

    prevButton.removeEventListener("click", handlPrevClick);
    nextButton.removeEventListener("click", handleNextClick);
  };

  prevButton.addEventListener("click", handlPrevClick);
  nextButton.addEventListener("click", handleNextClick);
}
