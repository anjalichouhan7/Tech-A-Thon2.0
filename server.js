// import packages

const express = require('express');

//store public folder's path to path var
const path = require('path');
const fileupload = require('express-fileupload');

let initial_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(initial_path));
app.use(fileupload());

app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "home.html"));
})

app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"));
})


// make  aroute for uploads
// make it post request
app.post('/upload', (req, res) => {
    let file = req.files.image;
    //make a date object so we can name uploaded images with timestamp
    let date = new Date();

    //image name
    // uploaded image name so it should be unique
    let imagename = date.getDate() + date.getTime() + file.name;

    // image upload path
    let path = 'public/uploads/' + imagename;

    //use file.mv to create upload
    file.mv(path, (err, result) => {
        if(err){
            throw err;
        } else{
            // in response send uploaded image path
            res.json(`uploads/${imagename}`)
        }
    })
})

app.get("/:blog", (req, res) => {
    res.sendFile(path.join(initial_path, "blog.html"));
})

app.get("/admin",(req,res)=>{
    res.sendFile(path.join(initial_path,"dashboard.html"))
})

app.use((req, res) => {
    res.json("404");
})

app.listen("3000", () => {
    console.log('listening......');
})

