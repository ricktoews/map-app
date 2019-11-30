const parser = require('node-html-parser');
const fs = require('fs');

const filename = 'Antilles_Map.svg';
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  //const root = parser.parse('<ul id="list"><li id="hi" data-msg="once upon">Hello World</li><li id="there" data-msg="a dreary midnight">Second</li></ul>');
  const root = parser.parse(data);
  var results = root.querySelectorAll('svg');

  var items = [];
  var paths = [];
  var groups = [];
  results.forEach(el => {
    let children = el.childNodes;
    children.forEach(chEl => {
      if (chEl.tagName === 'g') {
        let group = { paths: [] };
        let group_paths = chEl.querySelectorAll('path');
        group_paths.forEach(p => {
          group.paths.push( { id: p.id, fill: p.attributes.fill, d: p.attributes.d } );
        });
        items.push({ group: group });
      } else if (chEl.tagName === 'path') {
        items.push({ path: { id: chEl.id, fill: chEl.attributes.fill, d: chEl.attributes.d }});
      }
    });
  });
  var output = `var antilles = ` + JSON.stringify(items) + `; export default antilles;`;
  fs.writeFile('output.js', output, function() { console.log('finished writing.');});
});
