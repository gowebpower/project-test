<<<<<<< HEAD
function super_reduced_string(s){
  string = s.trim();

  function reduceString(){
    for( var i = 0; i < string.length; i++ ){
      if (string[i] === string[i+1]) {
=======
var myGen = function* (){

<<<<<<< HEAD
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
 
=======
let asdasd = 'asd';
asdasd = 'asdasd';
>>>>>>> f1d8e1fb55f298a3b9d22b1d481f2f3f5ad8631a

        string = string.replace(string[i]+string[i], '');

        return reduceString();

<<<<<<< HEAD
      }
    }

  }

  reduceString();
  
  if( string.length < 1 ) return 'Empty String';

  return string;

}

console.log("Value: ", super_reduced_string('aabbbcccddddde'));
=======
console.log(asdasd);
>>>>>>> c4201624eea2f8f0a19c3eda4fc4b117a1aee3da
>>>>>>> f1d8e1fb55f298a3b9d22b1d481f2f3f5ad8631a
