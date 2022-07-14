const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');
console.log(chalk.bold.yellow(notesPath));

const addNote = async (title) => {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString()
  };
  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgCyan('Note was added'));
};

const updateNote = async (id, title) => {
  console.log('id', id, 'title', title);
  const notes = await getNotes();
  const newDataNotes = notes.map(note => note.id === id 
    ? {...note, title: title }
    : note);
  console.log('newDataNotes', newDataNotes);
  await fs.writeFile(notesPath, JSON.stringify(newDataNotes));
  console.log(chalk.bgCyan('Note was changed'));
};

const getNotes = async () => {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
};

const printNotes = async () => {
  const notes = await getNotes();
  console.log(chalk.blueBright(`Here is the list of notes:`));
  notes.forEach(note => {
    console.log('id:', note.id, 'note title:', note.title);
  });
};

const removeNote = async (id) => {
  const notes = await getNotes();
  const restNotes = notes.filter(note => note.id !== id);
  await fs.writeFile(notesPath, JSON.stringify(restNotes));
  console.log(chalk.greenBright(`Here is the actial db data: ${JSON.stringify(restNotes)}`));
}

module.exports = {
  addNote, printNotes, removeNote, updateNote
};