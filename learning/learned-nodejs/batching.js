// copy from http://www.benjiegillam.com/2011/11/multiple-asynchronous-callbacks/
var EventEmitter = require('events').EventEmitter

var AsyncBatch,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

AsyncBatch = (function(_super) {

  __extends(AsyncBatch, _super);

  function AsyncBatch() {
    this._complete = {};
    this._scheduled = {};
  }

  AsyncBatch.prototype.wrap = function(name, cb) {
    var _this = this;
    this._scheduled[name] = true;
    return function() {
      _this._complete[name] = cb.apply(_this, arguments);
      if (Object.keys(_this._complete).length === Object.keys(_this._scheduled).length) {
        return _this.emit('done', _this._complete);
      }
    };
  };

  return AsyncBatch;

})(EventEmitter);

/*
Create a new AsyncBatch instance
*/
var batch;

batch = new AsyncBatch;

/*
Wrap your callbacks with batch.wrap and a name
The name is used to store the result returned by your callback
(Don't forget to return the result you're interested in!)
*/
var delay = function(ms, cb) {
    setTimeout(cb,ms);
}
delay(50, batch.wrap('timer', function() {
  return "Timer complete";
}));

/*
Add a completion handler that accepts `results` as a parameter.
  `results` is a JS object where the keys are the callback names 
  from above and the values are the return values of the
  callbacks.
*/

batch.on('done', function(results) {
  return console.log("Batch complete, timer result: " + results.timer);
});