// 9998 input 
// 8999 output

// 7854 input
// 6999 output



// -------------------------------------------------------------------
//  For in loop within input number digit length.
//    Compare if a number equals or less than number in the right;
//  
// -------------------------------------------------------------------

function findSpecialNumber( input ){

  var numbersArray = [];
  var i = 0;
  var i2 = 0;
  var isRest9 = false;
  
  // Special case***  if digit is less than 10 just return;
  if (input < 10 ) { return input };
  if (input === 10) { return input-1};


  // Otherwise go loop and find specialNumber
 
  input = input.toString();
  numbersArray = input.split("");

  for( i = 0; i < numbersArray.length ; i++ ){

    // First make sure there is # in the right.
    // & If current # is not equal or less than next #, subtract current # by 1 and make next numbers to 9 only once.
    if ( numbersArray[i+1] && !( numbersArray[i] <= numbersArray[i+1] ) ){

      numbersArray[i] = --numbersArray[i];
      numbersArray[i+1] = 9;

      // Make rest # to 9 then never go this route again.
      if ( !isRest9 ){ 
        for( i2 = i+1 ; i2 < numbersArray.length ; i2++ ){
          numbersArray[i2] = 9;
        }
        isRest9 = true;
      }

      // First make sure there is # in the left
      // If # in the left is not equal or less than new current # ( current # was subtracted by 1)
      // Reset this loop and start over.
      if ( numbersArray[i-1] && !(numbersArray[i-1] <= numbersArray[i]) ){

        i= -1;
        continue;

      }
    }
  }

  return numbersArray.join("");

}



// -------------------------------------------------------------------
// For in loop with input--;
//  Compare if a number equals or less than number to right;

// -------------------------------------------------------------------

// function findSpecialNumber( input ){

//   var numbersArray = [];
//   var i = 0;
//   var i2 = 0;
  
//   // Special case***  if digit is less than 10 just return;
//   if (input < 10 ) { return input };
//   if (input === 10) { return input-1};


//   // Otherwise go loop and find specialNumber
//   for( ; 0 < input; input-- ){

//     input = input.toString();
//     numbersArray = input.split("");

//     for( i2 = 0; i2 < numbersArray.length; i2++ ){ 

//       // make sure there is next number to compare.
//       if( numbersArray[i2+1] ){

//         // keep checking if this might be specialNumber
//         if ( numbersArray[i2] <= numbersArray[i2+1] ){

//           // last array, It means this is specialNumber, return this specialNumber then.
//           if( !numbersArray[i2+2] ){ 

//             return input

//           }
         
//         } 
//         // this is not specialNumber. get out of this current loop and go next input--.
//         else {
//           break;
//         }

//       }

//     }

//   }

// }


// console.log( 'test result ' + findSpecialNumber( 3456874 ) );

//  