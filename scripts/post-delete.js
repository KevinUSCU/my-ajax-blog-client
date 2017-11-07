function deletePost(id) {
  axios.delete(`${baseURL}/posts/${id}`)
    .then(result => displayIndex())
}