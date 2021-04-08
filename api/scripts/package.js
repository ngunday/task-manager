const fs = require('fs');
const glob = require('glob');
const UglifyJS = require('uglify-js');

const uglifyJsFiles = (dir) => {
  glob(`${dir}/**/*.js`, null, (er, files) => {
    files.forEach((filename) => {
      if (filename.indexOf('bb-apps-terminal.js') >= 0) {
        return;
      }
      const result = UglifyJS.minify(fs.readFileSync(filename).toString('utf-8'));
      fs.writeFileSync(filename, result.code);
    });
  });
};

(() => {
  const source = fs.readFileSync(`${__dirname}/../package.json`).toString('utf-8');
  const sourceObj = JSON.parse(source);
  delete sourceObj.devDependencies;
  delete sourceObj.eslintConfig;
  delete sourceObj.scripts;
  sourceObj.main = sourceObj.main.slice(5);
  sourceObj.types = sourceObj.types.slice(5);
  fs.writeFileSync(`${__dirname}/../dist/package.json`, Buffer.from(JSON.stringify(sourceObj, null, 2), 'utf-8'));
  fs.writeFileSync(`${__dirname}/../dist/version.txt`, Buffer.from(sourceObj.version, 'utf-8'));
  fs.writeFileSync(`${__dirname}/../dist/version.txt`, Buffer.from(sourceObj.version, 'utf-8'));
  fs.copyFileSync(`${__dirname}/../LICENSE.md`, `${__dirname}/../dist/LICENSE.md`);
  fs.copyFileSync(`${__dirname}/../README.md`, `${__dirname}/../dist/README.md`);
  uglifyJsFiles(`${__dirname}/../dist`);
})();
