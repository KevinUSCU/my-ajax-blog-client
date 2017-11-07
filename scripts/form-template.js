postFormTemplate = `
  <form>
    <div class="form-group">
      <label for="postTitle">I am a Post! And my name is:</label>
      <input type="text" class="form-control" id="postTitle" placeholder="this post needs a zippy title; type it right here!" required>
    </div>
    <div class="form-group">
      <label for="postContent">TL;DR</label>
      <textarea class="form-control" id="postContent" placeholder="blah, blah, blah..." rows="8" required></textarea>
    </div>
    <button type="submit" class="btn btn-outline-primary submit-button">Submit</button>
  </form>
`