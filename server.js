const { spawn } = require('child_process');
const { writeFile } = require('fs');
const { promisify } = require('util');
const { resolve, join } = require('path');
const handler = require('serve-handler');
const http = require('http');
const reactEcmascript = require('react-ecmascript');
const write = promisify(writeFile);

reactEcmascript().then(sources => {
  ['react-dom.development.mjs', 'react.development.mjs'].forEach(f =>
    write(join('.', 'public', '03', f), sources[f])
  );
});

const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: "./public",
    cleanUrls: true,
    rewrites: [
      { "source": "public/01/", "destination": "/index.html" },
      { "source": "public/02/", "destination": "/index.html" },
      { "source": "public/03/", "destination": "/index.html" }
    ]
  }
)});


server.listen(1337, () => {
  console.log('Running at http://localhost:1337');
});

// spawn('babel', ['src/*.mjs','-d', './public/modules/', '-w'], { stdio: 'inherit' });
spawn('rollup', ['-c', '-w'], { stdio: 'inherit' });
