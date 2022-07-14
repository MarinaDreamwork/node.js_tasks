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

const updateNote = async (id, newTitle) => {
  const notes = await getNotes();
  notes.map(note => note.id === id ? note.title = newTitle : note)
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgCyan(`Note id:${id} was updated`));
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
  console.log(chalk.red(`The note with id: ${id} was removed`));
  //console.log(chalk.greenBright(`Here is the actial db data: ${JSON.stringify(restNotes)}`));
}

module.exports = {
  addNote, getNotes, removeNote, updateNote
};