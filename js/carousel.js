const GALLERY_CLASS = 'gallery__carousel';

const CAROUSEL_ITEM_CLASS = 'gallery__carousel-view';
const CAROUSEL_IMAGE_CLASS = 'gallery__image';

const CAROUSEL_PREVIOUS_BUTTON_CLASS = 'gallery__carousel-previous';
const CAROUSEL_NEXT_BUTTON_CLASS = 'gallery__carousel-next';

const PREVIOUS_ITEM_CLASS = 'previous-item'
const NEXT_ITEM_CLASS = 'next-item';

const CAROUSEL_ITEM_SIZE = 4;

// Pass images name here
// * Images should be placen in <rootDir>/images/gallery
const imageFileNames = [
  '_9iGBacngjc.png',
  '2NJTS5hIKnk.png',
  '7xW3M3aypyo.png',
  '9p2B8k1Pz3o.png',
  'aAdF0nvDxnk.png',
  'tcWgp1_m4Qc.png',
  'trible.png',
  'x894NB46ZGQ.png',
  'x894NB46ZGQ.png',
  'aAdF0nvDxnk.png',
  'x894NB46ZGQ.png',
  '7xW3M3aypyo.png'
];

const galleryElemet = document.querySelector(`.${GALLERY_CLASS}`);

const prevButton = document.querySelector(`.${CAROUSEL_PREVIOUS_BUTTON_CLASS}`);
const nextButton = document.querySelector(`.${CAROUSEL_NEXT_BUTTON_CLASS}`);

const prevItem = document.querySelector(`${PREVIOUS_ITEM_CLASS}`);
const nextItem = document.querySelector(`${NEXT_ITEM_CLASS}`);

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


  galleryItems.forEach((galleryItem) => {
    galleryElemet.appendChild(galleryItem)
  });

  const createCardTemplate = () => {
    const card = document.createElement("div");
    card.classList.add("card");
    return card;
  }

  const moveLeft = () => {
    galleryElemet.classList.add("transition-left");
    BTN_LEFT.removeEventListener("click", moveLeft);
    BTN_RIGHT.removeEventListener("click", moveRight);
  };

  const moveRight = () => {
    galleryElemet.classList.add("transition-right");
    BTN_LEFT.removeEventListener("click", moveLeft);
    BTN_RIGHT.removeEventListener("click", moveRight);
  };

  BTN_LEFT.addEventListener("click", moveLeft);
  BTN_RIGHT.addEventListener("click", moveRight);

  galleryElemet.addEventListener("animationend", (animationEvent) => {
    let changedItem;
    if (animationEvent.animationName === "move-left") {
      galleryElemet.classList.remove("transition-left");
      changedItem = ITEM_LEFT;
      document.querySelector("#item-active").innerHTML = ITEM_LEFT.innerHTML;
    } else {
      galleryElemet.classList.remove("transition-right");
      changedItem = ITEM_RIGHT;
      document.querySelector("#item-active").innerHTML = ITEM_RIGHT.innerHTML;
    }
    
    changedItem.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      const card = createCardTemplate();
      card.innerText = Math.floor(Math.random() * 8);
      changedItem.appendChild(card);
    }
    
    BTN_LEFT.addEventListener("click", moveLeft);
    BTN_RIGHT.addEventListener("click", moveRight);
  })
}
