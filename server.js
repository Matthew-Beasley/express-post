const express = require('express');
const path = require('path');
const db = require('./db');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res, next) => {
  try {
    res.send('index.html');
  } catch (err) {
    next(err);
  }
})

app.get('/users', (req, res, next) => {
  try {
    db.readJSON()
      .then(data => {
        console.log(data)
        res.send(JSON.stringify(data));
      })
  }
  catch (err) {
    res.status(500).send({message: err.message});
  }
})

app.post('/users', (req, res, next) => {
  res.send(db.writeJSON(req.query));
})

app.delete('/users', (req, res, next) => {
  console.log(req.query.name)
  res.send(db.deleteUser(req.query.name))
})

app.listen(PORT, () => console.log('listening on port', PORT));
