var postFormTemplate = `
  <form>
    <div class="form-group">
      <label for="post-title">I am a Post! And my name is:</label>
      <input type="text" class="form-control" id="post-title" placeholder="this post needs a zippy title; type it right here!">
    </div>
    <div class="form-group">
      <label for="post-content">TL;DR</label>
      <textarea class="form-control" id="post-content" placeholder="blah, blah, blah..." rows="8"></textarea>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-auto">
          <button id='submit-button' type="submit" class="btn btn-outline-primary">Submit</button>
        </div>
        <div id="message" class="col">
        </div>
      </div>
    </div>
  </form>
`