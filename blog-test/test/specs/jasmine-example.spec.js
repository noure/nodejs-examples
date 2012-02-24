// jasmine behaviour driven development test example
// meant to be used with https://github.com/mhevery/jasmine-node
// run with jasmine-node test/spec
// nice examples http://www.2ality.com/2011/10/jasmine.html
describe('Calculator', function () {
  var counter = 0

  it('can add a number', function () {
    counter = counter + 2;   // counter was 0 before
    expect(counter).toEqual(2);
  });

  it('can multiply a number', function () {
    counter = counter * 5;   // counter was 2 before
    expect(counter).toEqual(10);
  });
});