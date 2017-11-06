const baseURL = 'http://localhost:3000'

// On page load, get content reference and display index
const pageContent = $('#content')
displayIndex()

// Set listeners for nav bar
$('#home')[0].addEventListener('click', event => displayIndex())
$('#new-post')[0].addEventListener('click', event => createNewPost())

// Set listeners for content
pageContent[0].addEventListener('click', (event) => {
  if (event.target.nodeName === 'BUTTON') {
    if ($(event.target).hasClass('view-button')) viewPost(event.target.id)
    else if ($(event.target).hasClass('update-button')) console.log('update-button')
    else if ($(event.target).hasClass('delete-button')) console.log('delete-button')
  }
})

function displayIndex() {
  axios.get(`${baseURL}/posts`)
    .then(result => {
      // Clear existing content
      pageContent.html('')
      // Add post index items
      result.data.forEach(element => {
        let { id, title, date, content } = element
        let previewItem = buildIndexItem(id, title, date, content)
        pageContent.append(previewItem)
      })
    })
}

function buildIndexItem(id, title, date, content) {
  // Format date item Month Day, Year
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  let formattedDate = new Date(date).toLocaleString('en-US', options)
  // Index items use Bootstrap cards
  let item = `
    <div class="card index-item">
      <h4 class="card-header">${title}</h4>
      <div class="card-body">
        <p class="card-subtitle mb-2 text-muted">${formattedDate}</p>
        <p class="card-text">${content}</p>
        <button id="${id}" type="button" class="btn btn-outline-primary btn-sm view-button">view full post</button>
      </div>
    </div>
    <br>
  `
  return item
}

function viewPost(id) {
  axios.get(`${baseURL}/posts/${id}`).then(result => {
    console.log(result)
    let { id, title, content, date } = result.data
    let post = buildPost(id, title, content, date)
    // Replace existing content with post
    pageContent.html(post)
    // Set button listeners


  })
}

function buildPost(id, title, content, date) {
  // Format date item 
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' }
  let formattedDate = new Date(date).toLocaleString('en-US', dateOptions)
  let formattedTime = new Date(date).toLocaleString('en-US', timeOptions)
  // Post view uses Bootstrap jumbotron
  let post = `
    <div class="jumbotron post-item">
      <h1 class="display-3">${title}</h1>
      <p class="lead">Updated ${formattedDate} at ${formattedTime}</p>
      <hr class="my-4">
      <p class="post-content">${content}</p>
      <hr class="my-4">
      <p class="lead">
        <button id="${id}" type="button" class="btn btn-outline-primary btn-sm update-button">update post</button>
        <button id="${id}" type="button" class="btn btn-outline-primary btn-sm delete-button">delete post</button>
      </p>
    </div>
  `
  return post
}

function createNewPost() {

}