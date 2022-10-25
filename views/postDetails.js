const timeAgo = require('node-time-ago');

   
  function postDetails(post){
  
     if (!post.id) {
       
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
     return(html)
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
   
   return(html)
   
     }
   }
   


     module.exports= postDetails