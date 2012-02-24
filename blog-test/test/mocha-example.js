// using should https://github.com/visionmedia/should.js
// run with mocha http://visionmedia.github.com/mocha/
// mocha --reporter spec test/mocha-example.js
var Should = require('should');
describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      [1,2,3].indexOf(5).should.equal(-1);
      [1,2,3].indexOf(0).should.equal(-1);
    })
  })
})