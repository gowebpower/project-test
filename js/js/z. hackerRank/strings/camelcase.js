function findCamelCase(words){
  
  var numberOfWords;

  if(words){

    numberOfWords = 1;

    for( var i=0; i < words.length; i++ ){

      if( words[i] == words[i].toUpperCase() ){

        numberOfWords++;

      }

    }

  } else numberOfWords = 0;

  console.log(numberOfWords);

}