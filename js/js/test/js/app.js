var myGen = function* (){

  console.log('before');
  var one = yield 1;

  console.log('after');

  var two = yield 2;
  var three = yield 3;

  console.log(one, two, three);

};

var gen = myGen();


console.log(myGen().next('1'));
console.log(myGen().next('2'));
 