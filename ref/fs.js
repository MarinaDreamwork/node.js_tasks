const fsSync = require('fs');
const fs = require('fs/promises');
const path = require('path');
const base = path.resolve(__dirname, 'new example');
const isFolderExists = fsSync.existsSync(base);
const filePath = path.join(base, 'text.txt');
const newArgument = process.argv[2] ?? '';

const getContentStyle = () => `
\n${newArgument}`;

const readFileContent = async () => {
  console.log(await fs.readFile(filePath, {encoding: 'utf-8'}));
};

const startProgramm = async () => {
  try{
    if(isFolderExists) {
      await fs.appendFile(filePath, getContentStyle());
      await readFileContent();
    } else {
      await fs.mkdir(base);
      await fs.writeFile(filePath, newArgument);
      await readFileContent();
    }
  } catch(error) {
    console.error(error);
  }
};

startProgramm();