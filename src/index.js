import fs from 'fs';

const version = JSON.parse(fs.readFileSync('package.json', 'utf8')).version;

export default function ({ Plugin, types: t }) {
  const VERSION_EXPRESSION = t.literal(version);

  return new Plugin("version-inline", {
    visitor: {
      Identifier: {
        enter: function(node, parent) {
          if (this.isIdentifier({name: "__VERSION__"})) {
            return VERSION_EXPRESSION;
          }
        }
      }
    }
  });
}
