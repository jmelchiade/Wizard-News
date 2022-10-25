const express = require("express");
const app = express();
const morgan = require('morgan');
const postBank = require("./postBank");
const path= require('path')
const timeAgo = require('node-time-ago');


app.use(morgan('dev'))

app.use(express.static(path.join(__dirname,'public')))

app.get("/", (req, res) => {
  const posts = postBank.list();



const html = `<!DOCTYPE html>
<html>
<head>
  <title>Wizard News</title>
  <link rel="stylesheet" href="/style.css" />
</head>
<body>
  <div class="news-list">
    <header><img src="/logo.png"/>Wizard News</header>
    ${posts.map(post => `
      <div class='news-item'>
        <p>
          <span class="news-position">${post.id}. ▲</span>
          <a href="/posts/${post.id}">${post.title}</a>
          <small>(by ${post.name})</small>
        </p>
        <small class="news-info">
          ${post.upvotes} upvotes | ${timeAgo(post.date)}
        </small>
      </div>`
    ).join('')}
  </div>
</body>
</html>`

res.send(html);

})


app.get('/posts/:id', (req, res, next) => {
  const id = req.params.id;
  const post = postBank.find(id);
  if (!post.id) {
    res.status(404)
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <header><img src="/logo.png"/>Wizard News</header>
      <div class="not-found">
        <p>Accio Page! 🧙‍♀️ ... Page Not Found</p>
        <img src="https://media2.giphy.com/media/Swx36wwSsU49HAnIhC/giphy.gif" alt"dumbledore" />
      </div>
    </body>
    </html>`
  res.send(html)
  } else {
    const html = `
  <!DOCTYPE html>
<html>
<head>
  <title>Wizard News</title>
  <link rel="stylesheet" href="/style.css" />
</head>
<body>
<header><img src="/logo.png"/>Wizard News</header>
<div class="news-list"><p>${post.title}, <small>(by ${post.name})</small> <small>${timeAgo(post.date)}.</small></p><p>${post.content}</p></div>
</body>
</html>`

res.send(html)

  }
})

app.use((error, req, res, next)=>{
  console.error('there is an error:', error)
  if(res.statusCode < 400){res.status(500)}

  res.send({error:error.message, message:error.message})
  });

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
