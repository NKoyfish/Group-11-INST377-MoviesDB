let slidePosition = 0;
const slides = document.querySelectorAll('.carousel__item');
const totalSlides = slides.length;

next = document.querySelector('.next');
next.addEventListener('click', () => {
  moveToNextSlide();
  const pclasses = prev.classList
  const nclasses = next.classList
  newClass = 'carousel__button--next lastClick'
  if (!nclasses.contains('lastClick')) {next.classList = newClass}
  if (pclasses.contains('lastClick')) {prev.classList = 'carousel__button--prev '}
});
prev = document.querySelector('.prev');
prev.addEventListener('click', () => {
  moveToPrevSlide();
  const pclasses = prev.classList
  const nclasses = next.classList
  newClass = 'carousel__button--prev lastClick'
  if (!pclasses.contains('lastClick')) {prev.classList = newClass}
  if (nclasses.contains('lastClick')) {next.classList = 'carousel__button--next '}
  console.log(newClass)
  prev.classList = newClass
});

function updateSlidePosition() {
  for (const slide of slides) {
    slide.classList.remove('carousel__item--visible');
    slide.classList.add('carousel__item--hidden');
  }

  slides[slidePosition].classList.add('carousel__item--visible');
}

function moveToNextSlide() {
  if (slidePosition === totalSlides - 1) {
    slidePosition = 0;
  } else {
    slidePosition++;
  }

  updateSlidePosition();
}

function moveToPrevSlide() {
  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition--;
  }

  updateSlidePosition();
}
