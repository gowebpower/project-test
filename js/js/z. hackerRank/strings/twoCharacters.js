function twoCharacters(givenWord){
  
  var charactersArray = []; // [ 'a','b','c','d','e','f','g' ];
  console.log("charactersArray", charactersArray);

  // Find no duplicated characters and store them into array from given words
  function findDifferentChars(){

    var sameWordFound;

    for( var i=0; i < givenWord.length; i++ ){

      sameWordFound = false;
   
      // Check if character is already added in charactersArray, if there is, do not push.
      for( var i2=0; i2 <= charactersArray.length; i2++ ){

        if( givenWord[i] ==  charactersArray[i2] ){

          sameWordFound = true;
          break;

        }

      }

      if( !sameWordFound ) charactersArray.push(givenWord[i]);

    }
  }

  findDifferentChars();
 


  // Find logest String with twoCharacters  
  // Make givenWord into String w/ TwoCharacters and check if each characters are altered.

  function makeStringIntoTwoChars(){
    var charsTocheck;
    var goodChars = '';


    for( var i = 0; i < charactersArray.length; i++ ){

      // 2D demention looping. [A, B] > [ A, B] > [A, C].. [ B, A] [ B,C].. etc
      for( var i2 = 0; i2 < charactersArray.length; i2++ ){

        charsTocheck = '';

        if ( i === i2 ) continue; // SKip this so that Only check chars with different value.

        for( var i3 = 0; i3 < givenWord.length; i3++ ){

          if ( charactersArray[i] === givenWord[i3] || charactersArray[i2] === givenWord[i3]  ) {

            // console.log( 'pair:' +charactersArray[i] + ' ' + charactersArray[i2] );

            // rule #1: characters should be altered between each character.
            if ( charsTocheck[charsTocheck.length-1] === givenWord[i3] ){
              
              // then reset charsTocheck value and get out of this loop
              charsTocheck = '';
              break;

            }

            charsTocheck += givenWord[i3];

          }

        }


        // rule #2: Find the logest length among goodChars.
        if ( goodChars.length < charsTocheck.length ){

          goodChars = charsTocheck;

        }

      }

    }

    return goodChars;

  }
  
  var answer = makeStringIntoTwoChars();
  return answer.length

}


console.log ( twoCharacters('beabeefeab') );