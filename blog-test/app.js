#!/usr/bin/env node
// doc at hand
//  http://docs.nodejitsu.com/articles/javascript-conventions/using-ECMA5-in-nodejs
//  http://book.mixu.net/ch5.html
//  http://nodebits.org/distilled-patterns
//  http://hueniverse.com/2011/06/the-style-of-non-blocking/
//
// dependencies
// async        managing control flows              https://github.com/caolan/async
// beautify     beautifies html                     http://jsbeautifier.org/
// filesystem   node.js core module                 http://nodejs.org/docs/latest/api/fs.html
// findit       Recursively walk directory trees.   https://github.com/substack/node-findit
// markdown     parser                              http://github.com/evilstreak/markdown-js/
// mustache     template engine                     https://github.com/janl/mustache.js/
// path         node.js core module                 http://nodejs.org/docs/latest/api/path.html
// wrench       recursive file operations           https://github.com/ryanmcgrath/wrench-js
var async       = require("async");
var beautify    = require("beautify").js_beautify;
var fs          = require("fs");
var findit      = require("findit");
var markdown    = require("markdown").markdown;
var mustache    = require("mustache");
var path        = require("path");
var wrench      = require("wrench");

function Generator(settings) {
    this.settings = settings;
};

var generator = new Generator();

console.log("huhu");