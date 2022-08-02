const express = require('express');
const app = express(); 
const port = 3000;

const boroughs = ['THE BRONX', 'brooklyn','queens','manhatten','staten island'] 


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
app.engine('adds', (filePath, options, callback) => {
    fs.readFile(filePath, (err, content)=>{
        if (err) return callback(err)
        const render = content.toString()
        .replace('#title', '<title>' + options.title + '</title>')
        .replace('#words', '<h1>' + options.words + '</h1>')
        .replace('#list', '<ul>' + options.list + '</ul>')
        .replace('#list1', '<li>' + options.list1 + '</li>')
        .replace('#list2', '<li>' + options.list2 + '</li>')
        .replace('#list3', '<li>' + options.list3 + '</li>')
        .replace('#para', '<p>' + options.para + '</p>')
        return callback(null,render)

    })
})



app.set('views', './views') // specify the views directory
app.set('view engine', 'hypatia') // register the hypatia view engine
app.set('view engine','adds')
app.get('/dog', (req,res)=> {res.render('template.hypatia', {title:'A dog', message: 'This here is a dog',img:'https://cdn.pixabay.com/photo/2016/01/05/17/51/maltese-1123016__480.jpg', content: 'This dog is not available for sell'})
})
app.get('/listofthings',(req,res)=> {res.render('template.adds', {title:'LIST', words: 'my list of things', list1: "woah", list2: "this", list3: "crazy", para: 'I wonder if this works' })})


app.get('/here', (req,res)=>{res.send('<title> here </title>')})

app.get('/are', (req,res)=>{res.send('<title> are </title>')})

app.get('/your', (req,res)=>{res.send('<title> your </title>')})

app.get('/10', (req,res)=>{res.send('<title> 10 </title>')})

app.get('/routes', (req,res)=>{res.send('<title> routes </title>')})

app.get('/test', (req,res) => {
    res.send('TESTING')
})

app.get('/:boroughsofnyc', (req, res) => {
    res.send(boroughs[req.params.boroughsofnyc])
});

app.get('/woah/:im/:here', (req,res)=> {
    res.send('man ' + req.params.im + ' ' + req.params.here)
})



app.listen(port,() => {
    console.log('I am listening on port' , port);
});