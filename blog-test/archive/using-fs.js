var fs = require('fs');
// Force encoding to utf-8 text
fs.readFile('articles/hello-world.md', 'utf-8', function(err,data){
  if(err) {
    console.error("Could not open file: %s", err);
    process.exit(1);
  }
  console.log(data);
});
