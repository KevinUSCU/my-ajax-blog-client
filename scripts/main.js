const baseURL = 'http://localhost:3000'

// On page load, get content reference and display index
const pageContent = $('#content')
displayIndex()

// Set listeners for nav bar
$('#home')[0].addEventListener('click', event => displayIndex())
$('#new-post')[0].addEventListener('click', event => createNewPost())

function displayIndex() {
  axios.get(`${baseURL}/posts`)
    .then(result => {
      // Clear existing content (because we only use append to display items below)
      pageContent.html('')
      // Add post index items
      result.data.forEach(element => {
        let { id, title, date, content } = element
        let previewItem = buildIndexItem(id, title, date, content)
        pageContent.append(previewItem)
      })
      // Set button listeners
      pageContent[0].addEventListener('click', (event) => {
        if ($(event.target).hasClass('view-button')) displayPost(event.target.id)
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

function displayPost(id) {
  axios.get(`${baseURL}/posts/${id}`).then(result => {
    let { title, content, date } = result.data
    let post = buildPostItem(id, title, content, date)
    // Replace existing content with post
    pageContent.html(post)
    // Add button listeners
    $('#update-button')[0].addEventListener('click', () => updatePost(id, title, content))
    $('#delete-button')[0].addEventListener('click', () => deletePost(id))
  })
}

function buildPostItem(id, title, content, date) {
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
        <button id="update-button" type="button" class="btn btn-outline-primary btn-sm">update post</button>
        <button id="delete-button" type="button" class="btn btn-outline-primary btn-sm">delete post</button>
      </p>
    </div>
  `
  return post
}

function createNewPost() {
  // Display from form template
  let header = `
    <h1>Create New Post</h1>
    <hr>
  `
  let postForm = header + postFormTemplate
  pageContent.html(postForm)
  // Form field references
  let postTitle = $('#post-title')[0]
  let postContent = $('#post-content')[0]
  // Add button listener
  $('#submit-button')[0].addEventListener('click', event => {
    event.preventDefault()
    axios.post(`${baseURL}/posts`, { 'title': postTitle.value, 'content': postContent.value })
      .then(result => {
        displayPost(result.data.id)
      })
      .catch(error => {
        // Display error message
        let errorMessage = `
          <div class="alert alert-danger" role="alert">
            ${error.response.data.error}
          </div>
        `
        $('#message').html(errorMessage)
      })
  })
}

function updatePost(id, title, content) {
  // Display from form template
  let header = `
    <h1>Update Post</h1>
    <hr>
  `
  let postForm = header + postFormTemplate
  pageContent.html(postForm)
  // Form field references
  let postTitle = $('#post-title')[0]
  let postContent = $('#post-content')[0]
  // Insert existing data
  postTitle.value = title
  postContent.value = content
  // Add button listener
  $('#submit-button')[0].addEventListener('click', event => {
    event.preventDefault()
    axios.put(`${baseURL}/posts/${id}`, { 'title': postTitle.value, 'content': postContent.value })
      .then(result => {
        displayPost(result.data.id)
      })
      .catch(error => {
        // Display error message
        let errorMessage = `
          <div class="alert alert-danger" role="alert">
            ${error.response.data.error}
          </div>
        `
        $('#message').html(errorMessage)
      })
  })
}

function deletePost(id) {
  axios.delete(`${baseURL}/posts/${id}`)
    .then(result => displayIndex())
}