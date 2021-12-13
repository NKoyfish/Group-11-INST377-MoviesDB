
//ive got no clue where to go from here haha
// we prob need to have our own api to return a poster
async function getFullImageUrl(website) {
  try {
    const response = await axios.get(website);
    const html = response.data;
    console.log(html);
  } catch (error) {
    throw error;
  }
}
async function handleSubmit(event) {
  event.preventDefault();
  const inputValue = document.querySelector('.titlesearch').value;
  const searchQuery = inputValue.trim();

  try {
    const results = await searchWikipedia(searchQuery);
    const imageSearch = grabImageFromPage(results);
    //const fullurl = getFullImageUrl(imageSearch);
  } catch (err) {
    console.log(err);
    console.log('Failed to search wikipedia');
  }
}

async function searchWikipedia(searchQuery) {
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=1&srsearch=${searchQuery}`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  const json = await response.json();
  console.log('idk', json);
  const pageid = json.query.search;
  console.log(pageid);
  return pageid;
}
async function grabImageFromPage(pageid) {
  const foundPageID = pageid[0].pageid;
  console.log('pageid:', foundPageID);
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=images&pageids=${foundPageID}&imlimit=20`;

  const response = await fetch(endpoint);
  if (!response.ok) {
    throw Error(response.statusText);
  }

  const json = await response.json();
  console.log(json);
  if (
    json !== undefined
    && json.query !== undefined
    && json.query.pages !== undefined
  ) {
    json.query.pages[foundPageID].images.forEach((thing) => {
      if (thing.title.includes('poster')) {
        console.log(thing.title);
        alert(`Poster found on wikipedia, ${thing.title}`)
        return (`https://en.wikipedia.org/wiki/${thing.title}`);
      }
    });
  }
  console.log();
  // this gets the image file name of the poster
}

const button = document.querySelector('.titlesubmit');
button.addEventListener('click', handleSubmit);



//copy
/* 
async function moviesReq() {
  const searchinput = document.querySelector('.search');
  let page = 0;
  const allData = await fetch('/api/movies', {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
  });
  logData = await allData.json();
  let filterData = logData;

  // function for when user clicks on a poster/poster text
  async function initBack() {
    const counttab = 5;
    const result = document.querySelector('.results');
    document.querySelector('#back').addEventListener('click', () => {
      result.innerHTML = '';
      const slice = filterData.slice(50 * page, 50 * (page + 1));
      slice.forEach((movie) => {
        result.innerHTML += `<li id="${movie.film_id}" class="filmblock"><a>
        ${movie.name} (${movie.year})</a>
        </li>`;
      });
      posterEvents(slice);
    });
  }
  async function click(id) {
    console.log(id, 'clicked poster');
    try {
      const response = await fetch(`/api/movies/${id}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const movie = await response.json();
      const movieData = movie.data;
      const result = document.querySelector('.results');
      const html = `<div class='moviestatlist'>
      <div class='infobox'>
        <li><a class='lefttext'>Film Title: </a><a class='righttext'>${movieData.name}</a><br></li>
        <li><a class='lefttext'>Released: </a><a class='righttext'>${movieData.released}</a><br></li>
        <li><a class='lefttext'>Rated: </a><a class='righttext'>${movieData.rating}</a><br></li>
        <li><a class='lefttext'>Score: </a><a class='righttext'>${movieData.score}</a><br></li>
        <li><a class='lefttext'>Studio: </a><a class='righttext'>${movieData.studio_id}</a><br></li>
        <li><a class='lefttext'>Country: </a><a class='righttext'>${movieData.country}</a><br></li>
        <li><a class='lefttext'>Writer: </a><a class='righttext'>${movieData.writer_id}</a><br></li>
        <li><a class='lefttext'>Director: </a><a class='righttext'>${movieData.director_id}</a><br></li>
        <li><a class='lefttext'>Actor: </a><a class='righttext'>${movieData.actor_id}</a><br></li>
        <li><a class='lefttext'>Votes: </a><a class='righttext'>${movieData.votes}</a><br></li>
        <li><a class='lefttext'>Budget: </a><a class='righttext'>${movieData.budget}</a><br></li>
        <li><a class='lefttext'>Gross: </a><a class='righttext'>${movieData.gross}</a><br></li>
        <div class="desc">
          <span class='wikireplace'>Ideally this would be a description about the movie pulled from an api. Shrek and Fiona travel to the Kingdom of Far Far Away, where Fiona's parents are King and Queen, to celebrate their marriage. When they arrive, they find they are not as welcome as they thought they would be.</span>
        </div>
        </div>
      <div class="posterbackframe">
        <div id="back" class="button"style="width: 40%">Go Back</div>
        <div class="posterframe"><img src='../sampleposter/xl_948470_406a814a.jpg'></div>
      </div>
      
     </div>`;
      result.innerHTML = html;
      let title = `${movieData.name} (${movieData.year}) (film)`
      
      console.log(title)
      await initBack();
      await loadSnippet(title)
    } catch (err) {
      console.log(err);
    }
  }
  async function loadSnippet(title) {
    let span = document.querySelector('.wikireplace')
    let obj = await searchWikipedia(title)
    span.innerHTML = obj
  }
  function trimTitle(text) {
    let replace = text.replace(/[\n\r]/g, '');
    replace = replace.trim();
    return replace;
  }
  async function searchWikipedia(searchQuery) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=extracts&inprop=url&utf8=&format=json&origin=*&srlimit=1&srsearch=${searchQuery}&exchars=1200`;
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    console.log(json.query)
    const pageid = json.query.search;
    return pageid[0].snippet
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const inputValue = event.attributes;
    const searchQuery = inputValue.trim();

    try {
      const results = await searchWikipedia(searchQuery);
    // const fullurl = getFullImageUrl(imageSearch);
    } catch (err) {
      console.log(err);
      console.log('Failed to search wikipedia');
    }
  }

  function displayMatches(event) {
    // console.log(event.value);
    const matchArray = findMatches(event.target.value, logData.data);
    filterData = matchArray;
    displayMovieLogs(filterData);
  }
  async function posterEvents(list) {
    list.forEach((elm) => {
      const movieElm = document.querySelector(`[id='${elm.film_id}']`);
      movieElm.addEventListener('click', (event) => {
        // console.log(event);
        // two cases click on text or "poster image"
        if (event.path.length > 7) {
          clickId = event.path[1].attributes[0].nodeValue;
          click(clickId);
        } else {
          clickId = event.path[0].attributes[0].nodeValue;
          click(clickId);
        }

      });
    });
  }

  async function displayMovieLogs(list) {
    const result = document.querySelector('.results');
    if (list) {
      if (page < 0) page = 0;
      if (page > list.length / 50) page = Math.ceil(list.length / 50) - 1;

      const slice = list.slice(50 * page, 50 * (page + 1));
      slice.forEach((movie) => {
        result.innerHTML += `<li id="${movie.film_id}"class="filmblock"><a>
        ${movie.name} (${movie.year})</a>
        </li>`;
      });
      // add event listeners to posters
      posterEvents(slice);
      // console.log('display', slice);
    }
  }

  // console logs all records and displays

  const result = document.querySelector('.results');
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
      return search.name.match(regex);
    });
  }

  searchinput.addEventListener('keyup', (evt) => {
    result.innerHTML = '';
    page = 0;
    displayMatches(evt);
  });
}

window.onload = moviesReq;
 */