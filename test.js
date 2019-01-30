const path = require('path');
const vfile = require('to-vfile');
const unified = require('unified');
const parse = require('rehype-parse');
const stringify = require('rehype-stringify');
const extract = require('./extract');

const nodeContent = `<!doctype html><html lang="en"><head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <meta http-equiv="X-UA-Compatible" content="ie=edge">\n  <title>Document</title>\n</head>\n<body>\n  <div class="container">\n    <h1 class="title">Title</h1>\n    <p class="content">Lorem Ipsum</p>\n    <img src="#">\n  </div>\n\n</body></html>`;

(async (nodeContent) => {
  const parsed = await unified()
  .use(parse, { emitParseErrors: true })
  .use(extract)
  .use(stringify)
  .process(vfile.readSync(path.resolve(__dirname, 'content/html/test.html')))

  console.log(parsed)
})(nodeContent)