const express = require('express');
const fs = require('fs');
const bp = require('body-parser');
const serverport = process.env.PORT || 4200;

const app = express();

const files = [];

fs.readdirSync('./data').map(f => {
  const file = fs.readFileSync(`./data/${f}`);
  files.push(JSON.parse(file));
})

app.use(bp.urlencoded({
  extended: false
}))
app.use(bp.json())

app.get('/compensation_data', (req, res) => {
  console.log(req.params);
  console.log(req.query);
  console.log(res);
  const keys = Object.keys(files[0]);
  console.log(keys);
  res.json({
    keys
  })
})

app.get('/:idx', (req, res) => {
  try {
    const idx = parseInt(req.params.idx);
    res.send(files[idx]);
  } catch (e) {
    res.send(e);
  }
});

app.get('/alpha', (req, res) => {
  console.log(req);
  res.send('key');
})

app.listen(serverport, () => {
  console.log(`now listening on port ${serverport}`)
})