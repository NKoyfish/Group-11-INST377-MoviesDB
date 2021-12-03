let submitbutton = document.querySelector('.submitbutton')
let formbox = document.querySelector('.input')
async function genreDelte() {
    console.log('hello from deleteJS')
    let request = `/api/genres/${formbox.value}`
    await fetch(request, {method: 'DELETE'})
}
submitbutton.addEventListener('click',genreDelte)