const baseURL = 'https://git.heroku.com/kevinuscu-my-ajax-blog-server.git'
// const baseURL = 'http://localhost:3000'

// On page load, get content reference and display index
const pageContent = $('#content')
displayIndex()

// Set listeners for nav bar
$('#home')[0].addEventListener('click', event => displayIndex())
$('#new-post')[0].addEventListener('click', event => createNewPost())
