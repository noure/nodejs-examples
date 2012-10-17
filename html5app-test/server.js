var connect = require('connect');

connect.static.mime.define({'text/cache-manifest': ['manifest', 'appcache', 'bar']});


var app = connect()
  .use(connect.logger('dev'))
  .use(connect.static(__dirname))
 .listen(8183);