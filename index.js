const chalk = require('chalk');
const express = require('express');
const { addNote, getNotes, removeNote, updateNote } = require('./notes.controller');
const port = 3000;
const path = require('path');
const pathToClientFolder = path.join(__dirname, 'public');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'pages');

app.use(express.static(pathToClientFolder));
app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

app.get('/', async (req, res) => {
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false
  });
});

app.post('/', async (req, res) => {
  await addNote(req.body.notes);
   res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: true
  });
});

app.delete(`/:id`, async(req, res) => {
  console.log(req.params.id);
  await removeNote(req.params.id);
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false
  });
});

app.put(`/:id`, async(req, res) => {
  console.log(req.body);
  await updateNote(req.params.id, req.body.title);
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false
  });
});

app.listen(port, () => {
  console.log(chalk.greenBright(`Server has been started on port ${port}`));
});