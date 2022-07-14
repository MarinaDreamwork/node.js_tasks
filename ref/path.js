const path = require('path');
console.log('dirname', __dirname);
console.log('filename', __filename);
console.log('path.dirname', path.dirname(__dirname));
console.log('path.filename', path.dirname(__filename));
console.log('path.basename', path.basename(__filename, '.js'));
console.log('path.extname', path.extname(__filename));
console.log('path.parse', path.parse(__filename).ext);
console.log('path.resolve', path.resolve(__dirname, '..', './index.js'));