const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;
const chai = require('chai');
const assert = chai.assert;
chai.use(require('chai-fs'));

const commandPath = '~/github/hchiba1/spang.py';

fs.readdirSync('lib').forEach((subdir) => {
  if (!fs.statSync(`lib/${subdir}`).isDirectory()) {
    return;
  }
  describe(subdir, () => {
    fs.readdirSync(`lib/${subdir}`).forEach((file) => {
      if (file.endsWith('.sh')) {
        const basename = path.basename(file, '.sh');
        it(file, () => {
          const result = execSync(`cd lib/${subdir}; PATH=${commandPath} ./${basename}.sh`).toString();
          const expect = fs.readFileSync(`lib/${subdir}/${basename}.txt`).toString();
          assert.equal(result, expect);
        });
      }
    });
  });
});
