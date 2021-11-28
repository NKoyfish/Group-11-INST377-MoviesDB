const navSlide = () => {
  const burger = document.querySelector('.burger');
  const search = document.querySelector('.search');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');

  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    if (search != undefined) search.classList.toggle('hide');
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 5}s`;
      }
    });
  });
};
navSlide();
async function moviesReq() {
  const searchinput = document.querySelector('.search');
  let page = 0;
  const allData = await fetch('/api/movies', {
    headers: {Accept: 'application/json', 'Content-Type': 'application/json'}
  });
  logData = await allData.json();
  let filterData = logData
  async function displayMovieLogs(list) {
    if (page < 0) page = 0;
    if (page > list.length / 50) page = list.length / 50 - 1;
    const slice = list.slice(50 * page, 50 * (page + 1));
    const result = document.querySelector('.results');
    slice.forEach((movie) => {
      result.innerHTML += `<li class="filmblock">
      ${movie.name}
      </br>${movie.year}
      </br>${movie.score}
      </li>`;
    });
    console.log('display', slice);
  }

  // console logs all records and displays
 

  const result = document.querySelector('.results');
  const submit = document.querySelector('.submit');
  const next = document.querySelector('.next');
  const prev = document.querySelector('.prev');
  next.addEventListener('click', () => {
    page++;
    result.innerHTML = '';
    displayMovieLogs(filterData)
  });

  prev.addEventListener('click', (evt) => {
    page--;
    result.innerHTML = '';
    displayMovieLogs(filterData);
  });
 

  function findMatches(wordToMatch, array) {
    if (!wordToMatch) {
      result.innerHTML = '';
    }
    const tempData = logData.data;
    return tempData.filter((search) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return (search.name.match(regex));
    });
  }

  function displayMatches(event) {
    console.log(event.value);
    const matchArray = findMatches(event.target.value, logData.data);
    filterData = matchArray
    console.log(matchArray)
    let html = ''
    matchArray.forEach((movie) => {
      html += `<li class="filmblock">${movie.name}</li>`
    })
    result.innerHTML = html
  }
  function funclogData() {
    console.log('logData', logData);
  }
  searchinput.addEventListener('change', displayMatches);
  searchinput.addEventListener('keyup', (evt) => {
    if (searchinput.value === '' || searchinput.value === undefined){
      result.innerHTML = ''
    }
    else {
      displayMatches(evt)
    }
  })
  submit.addEventListener('click', () => {
    displayMatches(evt)
  });
}

window.onload = moviesReq;
