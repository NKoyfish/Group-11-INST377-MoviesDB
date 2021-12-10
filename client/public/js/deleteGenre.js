const submitbutton = document.querySelector('.submitbutton');
const formbox = document.querySelector('.input');
async function genreDelte() {
  console.log('hello from deleteJS');
  const request = `/api/genres/${formbox.value}`;
  const resp = await fetch(request, {method: 'DELETE'});
  console.log(resp)
  if (resp.status === 200){alert(`${formbox.value} deleted`)}
  else {
    console.log(resp.status)
    alert(`Not Found`)
  }
}
submitbutton.addEventListener('click', genreDelte);