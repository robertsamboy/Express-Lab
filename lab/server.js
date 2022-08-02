const express = require('express');
const app = express(); 
const port = 3000;

const fs = require('fs') // this engine requires the fs module like we did Saturday
app.engine('hypatia', (filePath, options, callback) => { // define the view engine called hypatia
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err)
    // this is an extremely simple view engine we'll be more complex later
    const rendered = content.toString()
      .replace('#title#', '<title>' + options.title + '</title>')
      .replace('#message#', '<h1>' + options.message + '</h1>').replace('#content#','<div>'+ options.content + '</div>' )
      .replace('#img','<img src =' + options.img + '>')
    return callback(null, rendered)
  })
})
app.set('views', './views') // specify the views directory
app.set('view engine', 'hypatia') // register the hypatia view engine

app.get('/dog', (req,res)=> {res.render('template', {title:'A dog', message: 'This here is a dog',img:'https://cdn.pixabay.com/photo/2016/01/05/17/51/maltese-1123016__480.jpg', content: 'This dog is not available for sell'})
})



app.get('/test', (req,res) => {
    res.send('hey')
})














app.listen(port,() => {
    console.log('I am listening on port' , port);
});