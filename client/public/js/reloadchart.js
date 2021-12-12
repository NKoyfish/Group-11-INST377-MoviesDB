const reloadchart = document.querySelector('.button');
const countbutton = document.querySelector('.loadcount')
const spanSelector = document.querySelector('.count')

async function loadInsights() {
  let resp = await fetch('/api/chart');
  let json = await resp.json()
  let html = json.data
  spanSelector.innerHTML = html
}
async function reloadChart() {
  let resp = await fetch('/api/chart');
  let data = await resp.json()
  //console.log('refreshing page')
  //console.log(data)
  location.reload();
}
reloadchart.addEventListener('click', reloadChart);
countbutton.addEventListener('click', loadInsights);