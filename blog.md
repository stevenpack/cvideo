1. `vue create video-cv` 1 minute
1. Register domain (decide name: 5 mins, register 1 minute)
1. Create repo in github.com and push
```
git init
git remote add origin git@github.com:stevenpack/cvideo.git
git branch -M main
git push -u origin main
```
1. Install deps with `npm install`
1. Check it runs with `npm run serve`
1. Go to Pages -> Create Project, Connect Github, choose repo, choose Vue preset (oops my env builds to dist, not public) (2 minutes)
1. Add custom domain...
1. Build app!
1. Need a record button, record, store in stream, get back url for sending to employers.
1. Add a <button>Record</button>... hmmmm, looks a bit old. Bootstrap! Add the following to `index.html` for some styling and icons
```
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
  ```
1. Now our record button looks nicer! `<button type="submit" class="btn btn-primary"><i class="bi bi-record-circle"></i>&nbsp;Record</button>`
1. OK, a recording functionality `npm i recordrtc`
1. Write code for some basic state transition and capturing input
1. Upload to stream... uh oh, need to provide an API token. Need an API... worker!
1. `wrangler generate api`
1. write code
1. account id, zone id, route into toml
1. wrangler login
1. Add a DNS record (so annoying...)


