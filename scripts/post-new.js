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