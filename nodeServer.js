import { createServer } from 'http';
import { blue } from 'chalk';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { addNote, printNotes } from './notes.controller';
const port = 3000;
const basePath = join(__dirname, 'pages');
const server = createServer( async (req, res) => {
  if(req.method === "GET") {
    const content = await readFile(join(basePath, 'index.html'));
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    // await printNotes();
    res.end(content);
  } else if(req.method === 'POST') {
    const body = [];

    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8'
    });
    
    req.on('data', (data) => {
      body.push(Buffer.from(data));
    });

    req.on('end', async () => {
      const title = body.toString().split('=')[1].replaceAll('+', ' ');
      await addNote(title);
      res.end(`Note ${title} was added`)
    });
  }
});

server.listen(port, () => {
  console.log(blue(`Server has been started on port ${port}...`))
});