const fs = require('fs');
const path = './android/app/build.gradle';

fs.readFile(path, 'utf8', (err, data) => {
  if (err) return console.error(err);

  const result = data
    .replace(/JavaVersion.VERSION_21/g, 'JavaVersion.VERSION_17')
    .replace(/jvmTarget = "21"/g, 'jvmTarget = "17"');

  fs.writeFile(path, result, 'utf8', err => {
    if (err) return console.error(err);
    console.log('build.gradle actualizado para usar Java 17');
  });
});
