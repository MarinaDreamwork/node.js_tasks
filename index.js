const yargs = require('yargs');
const pkg = require('./package.json');
const { addNote, printNotes, removeNote } = require('./notes.controller');


yargs.command({
  command: 'add',
  describe: 'Add new note to the list',
  handler({ title }) {
    console.log('Add command', title);
    addNote(title);
  },
  builder: {
    title: {
      type: 'string',
      describe: 'Note title',
      demandOption: true
    }
  }
});

yargs.command({
  command: 'print',
  describe: 'Print all notes',
  async handler () {
    await printNotes();
    console.log('List command');
  }
});

yargs.command({
  command: 'remove',
  describe: 'Remove note from the list by id',
  async handler({ id }) {
    console.log('Add command', id);
    await removeNote(id);
  },
  builder: {
    id: {
      type: 'string',
      describe: 'Note id',
      demandOption: true
    }
  }
});

yargs.parse();

yargs.version(pkg.version);