const fs = require('fs');
const path = require('path');

const sourceFile = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\137e3afc-d6b9-41a1-873d-86f3efd1218f\\media__1786283427499.png';
const targetLogo = path.join(__dirname, '..', 'public', 'logo.png');
const targetOg = path.join(__dirname, '..', 'public', 'og-image.jpg');

console.log('Copying new logo...');
fs.copyFileSync(sourceFile, targetLogo);
fs.copyFileSync(sourceFile, targetOg);
console.log('Done!');
