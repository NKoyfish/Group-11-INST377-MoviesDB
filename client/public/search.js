async function moviesReq() {
  const searchinput = document.querySelector('.search');
  let page = 0;
  const allData = await fetch('/api/movies', {
    headers: {Accept: 'application/json', 'Content-Type': 'application/json'}
  });
  logData = await allData.json();
  let filterData = logData;
  async function displayMovieLogs(list) {
    if (page < 0) page = 0;
    if (page > list.length / 50) page = list.length / 50 - 1;
    const slice = list.slice(50 * page, 50 * (page + 1));
    const result = document.querySelector('.results');
    slice.forEach((movie) => {
      result.innerHTML += `<li class="filmblock"><a>
        ${movie.name} (${movie.year})</a>
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
    displayMovieLogs(filterData);
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
    filterData = matchArray;
    displayMovieLogs(filterData)
  }
 
  searchinput.addEventListener('keyup', (evt) => {
    result.innerHTML = '';
    displayMatches(evt);})
}

window.onload = moviesReq;
