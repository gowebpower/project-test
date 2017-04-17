

//***************************************************
//  Plus Minus
//***************************************************

function plusMinus( array ){

  var positive = 0;
  var zero = 0;
  var negative = 0;

  function checkNumber(n){

    if( n > 0 ) {

      positive++;

    } else if ( n === 0) {

      zero++;

    } else if( n < 0) {

      negative++;

    }

  };


  for ( let i = 0; i < array.length; i++ ){

    checkNumber(array[i]);

  }


  function calFraction(n){
    
    return (n/array.length).toFixed(6);

  }

  positive = calFraction(positive);
  zero = calFraction(zero);
  negative = calFraction(negative);

  console.log( positive + '\n' + negative + '\n' + zero );
}


