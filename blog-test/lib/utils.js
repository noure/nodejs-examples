var path = require('path');
var fs = require('fs');

var walk = function (start, callback) {
  fs.lstat(start, function (err, stat) {
    if (err) { return callback(err) }
    if (stat.isDirectory()) {

      fs.readdir(start, function (err, files) {
        var coll = files.reduce(function (acc, i) {
          var abspath = path.join(start, i);

          if (fs.statSync(abspath).isDirectory()) {
            exports.walk(abspath, callback);
            acc.dirs.push(abspath);
          } else {
            acc.names.push(abspath);
          }

          return acc;
        }, {"names": [], "dirs": []});

        return callback(null, start, coll.dirs, coll.names);
      });
    } else {
      return callback(new Error("path: " + start + " is not a directory"));
    }
  });
};

exports.walk = walk;