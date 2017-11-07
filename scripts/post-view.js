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