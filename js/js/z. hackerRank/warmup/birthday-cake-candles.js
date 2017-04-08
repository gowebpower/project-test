function birthday( candles ){

  // find max Number

  var maxNumber = Math.max.apply(null, candles);
  var blewCandles = [];

  // get new array with any element that has max number

  for ( let i = 0; i < candles.length; i++ ){

    if ( maxNumber === candles[i] ){ 
      blewCandles.push(candles[i]);
    }

  }

  // print new array length.

  return blewCandles.length;

}


console.log (birthday( [ 82,3,2,4] ) );


