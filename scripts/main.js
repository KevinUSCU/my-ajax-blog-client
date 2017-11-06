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
      let postbin = $(document.createElement('div'))
      postbin.id = 'postbin'
      result.data.forEach(element => {
        let { id, title, date, content } = element
        let previewItem = buildIndexItem(id, title, date, content)
        postbin.append(previewItem)
      })
      // Replace existing content with index of posts
      pageContent.html(postbin)
      // Create event listent for index item buttons
      postbin[0].addEventListener('click', (event) => {
        if (event.target.nodeName === 'BUTTON') viewPost(event.target.id)
      })
    })
}

function buildIndexItem(id, title, date, content) {
  // Format date item mm/dd/yy
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  let formattedDate = new Date(date).toLocaleDateString('en-US', options)
  // Index items use Bootstrap cards
  let item = `
    <div class="card index-item">
      <h4 class="card-header">${title}</h4>
      <div class="card-body">
        <p class="card-subtitle mb-2 text-muted">${formattedDate}</p>
        <p class="card-text">${content}</p>
        <button id="${id}" type="button" class="btn btn-outline-primary btn-sm">view full post</button>
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

function buildPost(id, title, content, data) {
  let post = `
  `
  return post
}

function createNewPost() {

}