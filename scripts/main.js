const baseURL = 'http://localhost:3000'

// On page load, get content reference and display index
const pageContent = $('#content')
displayIndex()

// Set listeners for nav bar
$('#home')[0].addEventListener('click', event => displayIndex())
$('#new-post')[0].addEventListener('click', event => createNewPost())


function displayIndex() {
  axios.get(`${baseURL}/posts`).then(result => {
    let postbin = $(document.createElement('div'))
    postbin.id = 'postbin'
    result.data.forEach(element => {
      let { id, title } = element
      let previewItem = buildIndexItem(id, title)
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

function buildIndexItem(id, title) {
  let item = `
    <div class="pvw-item">
      <h4>${title}</h4>
      <button id="${id}" type="button" class="btn btn-primary btn-sm">View Post</button>
    </div>
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