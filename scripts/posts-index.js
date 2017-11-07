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