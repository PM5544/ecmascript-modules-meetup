const { spawn } = require('child_process');
const { writeFile, readFile } = require('fs');
const { promisify } = require('util');
const { basename, join } = require('path');
const handler = require('serve-handler');
const http = require('http');
const write = promisify(writeFile);
const read = promisify(readFile);

[
  './node_modules/react-ecmascript/react-dom.development.mjs',
  './node_modules/react-ecmascript/react.development.mjs'
].map(filePath => {
  const fileName = basename(filePath);
  return read(filePath).then(content => write(join('.', 'public', '03', fileName), content));
});

const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: './public',
    trailingSlash: true,
    rewrites: [
      { source: 'public/', destination: '/index.html' },
      { source: 'public/01/', destination: '/index.html' },
      { source: 'public/02/', destination: '/index.html' },
      { source: 'public/03/', destination: '/index.html' }
    ]
  });
});

server.listen(1337, () => {
  console.log('Running at http://localhost:1337');
});

// spawn('babel', ['src/*.mjs','-d', './public/modules/', '-w'], { stdio: 'inherit' });
spawn('rollup', ['-c', '-w'], { stdio: 'inherit' });
