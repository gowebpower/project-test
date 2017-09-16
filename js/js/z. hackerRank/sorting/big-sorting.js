function findLowestNumsArr( arr ){

 
  const newSort = [];
  let foundedIndex;

  let findLowestNum = function(){

    // ---- Set first index of array as starting
    foundedIndex = 0;

    // ---- Loop array and find lowest number
    for ( let i = 1; i < arr.length; i++ ){

      if ( arr[foundedIndex] > arr[i] ){

        foundedIndex = i;

      }
    }

    // ---- Insert founded number to newSort[] and remove value from arr.

    newSort.push( arr[foundedIndex] );
    arr.splice(foundedIndex,1);


    // ---- loop again and do samething untill array is finished.

    if ( arr.length > 0 ){
      findLowestNum();
    };

  }
  findLowestNum()
  
  return newSort;

}


const array = [ 3154654651, 1, 3, 10, 3, 5 ]; 
const lowestNumberArr = findLowestNumsArr( array );
console.log("lowestNumberArr", lowestNumberArr);






 