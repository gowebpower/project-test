function super_reduced_string(s){
  string = s.trim();

  function reduceString(){
    for( var i = 0; i < string.length; i++ ){
      if (string[i] === string[i+1]) {

        string = string.replace(string[i]+string[i], '');

        return reduceString();

      }
    }

  }

  reduceString();
  
  if( string.length < 1 ) return 'Empty String';

  return string;

}

console.log("Value: ", super_reduced_string('aabbbcccddddde'));