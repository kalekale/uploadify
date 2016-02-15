
var path = require('path');
var express = require("express");
var multer = require('multer');
var db = require('./db');
var mime = require('mime');
var bodyParser = require('body-parser');
var uuid = require('node-uuid');
var storage = multer.diskStorage({
  destination:  function (req, file, cb) {
    cb(null, 'dist/uploads/');
  },
  filename: function(req, file, cb) {
    console.log(mime.extension(file.mimetype));
    cb(null, uuid.v1() + '.' + mime.extension(file.mimetype));
  }
})
var upload = multer({ storage: storage });

var app = express();
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'dist')));

app.get('/',function(req,res){
      res.sendFile(__dirname + "/dist/index.html");
});

app.get('/api/images', (req, res) => {
  db.images.findAsync({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

app.get('/api/images/:imageId', (req, res) => {
  db.images.findAsync({ imageId: req.params.imageId })
    .then((data) => {
      if (data) {
        res.json(data); 
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

app.post('/api/images/comment/:imageId', (req, res) => {
  console.log(req.body);
  db.images.updateAsync(
    { imageId: req.params.imageId },
    { $push: 
      { comments: req.body.comment }
    }
  )
  .then(() => {
    res.sendStatus(200);
  });
});

app.post('/api/images/upload', upload.single('newImage'), (req, res, next) => {
  var id = req.file.filename.split('.')[0]
  db.images.insertAsync({
    imageId: id,
    title: 'title tähän',
    comments: [],
    filename: req.file.filename
  })
  .then(() => {
    res.redirect('/#/home/image/' + id); 
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  })
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});