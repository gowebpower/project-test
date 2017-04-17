// function tConvert (time) {
//   //Check correct time format and split into components
//   time = time.toString ().match (/^([01]*\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

//   if (time.length > 1) { // If time format correct
    
//     time = time.slice (1);  // Remove full string match value

//     time[4] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM

//     time[0] = +time[0] % 12 || 12; // Adjust hours

//   }
//   return time.join (''); // return adjusted time or original string
// }
 
// console.log ( tConvert ('01:00:00') );




function timeConvert( time ){

  time = time.match(/^([1][0-2]|0\d)(:[0-5]\d)(:[0-5]\d)(AM|PM)$/i);

  if (time) { // If time format correct

    time = time.slice(1); // remove full string match value

    // If 12:00:00 PM  >> 12:00:00. Otherwise add 12.
    if ( time[3].match(/pm/i) ){

      if ( time[0] != 12 ) { 
        time[0] = +time[0];
        time[0] += 12;

      }
    }

    // If 12:00:00 AM  >> 00:00:00AM
    else if ( time[3].match(/am/i) ){

      if ( time[0] == 12 ) { 
        time[0] = '00';
      }

    }

    time.splice(-1,1); // remove last element of an array

    return time.join('');

  } else return 'Please input correct time format'

}


console.log (timeConvert('03:00:00AM') );