// mustache template engine https://github.com/janl/mustache.js/
var mustache = require('mustache');

var view = {
  title: "Joe",
  calc: function() {
    return 2 + 4;
  }
};

var template = "{{title}} spends {{calc}}";
var html = mustache.to_html(template, view);

console.log(html);