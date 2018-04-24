



var dataFromAPI = [
  
  {
    eventID: 20,
    isRewardClaimed: false

  },

  {
    eventID: 22,
    isRewardClaimed: false

  },

  {
    eventID: 24,
    isRewardClaimed: false

  },

  {
    eventID: 26,
    isRewardClaimed: false

  },

  {
    eventID: 27,
    isRewardClaimed: false

  }

]

var config = config || {};
config.rewardInfo = [
  
  {
    eventID: 20,
    index: 0,
    rewardItem: 'Coffee'

  },

  {
    eventID: 22,
    index: 1,
    rewardItem: 'Donut'

  },

  {
    eventID: 24,
    index: 2,
    rewardItem: 'Taco'

  },

  {
    eventID: 27,
    index: 3,
    rewardItem: 'Chhese'

  },

  {
    eventID: 30,
    index: 4,
    rewardItem: 'Galay'

  }

]


var mapAPIdtoRewardInfo = ( dataFromAPI ) => {

  var userSharedList = [];

  // Only Add Matched eventID From API to RewardInfo
  var _mapAPIdtoRewardInfo = ( currentValue ) => {

    for ( var i in config.rewardInfo ){

      if ( config.rewardInfo[i].eventID == currentValue.eventID ) {
  
        userSharedList.push(config.rewardInfo[i]);
      }
    }

  }

  dataFromAPI.forEach( _mapAPIdtoRewardInfo );

  return userSharedList;

}

var userSharedList = mapAPIdtoRewardInfo( dataFromAPI );
console.log("userSharedList", userSharedList);








