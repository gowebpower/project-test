// ******************************************************************
// ----------------------- Imports
// ******************************************************************

// ---------------------- Libs

import React, { Component } from 'react';
import { Row, Column } from "react-foundation";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import "api/FruitasticApi";


// ---------------------- Components

import ItemList from 'components/itemList';


// ******************************************************************
// ----------------------- Export
// ******************************************************************


class FavoriteFruit extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fruitList: [],
      fruitListFiltered: [],
      fruitListSelected: [],
      componentDidMount: false
    };
  }  


  componentWillMount() {

    this.ui.fetchFavoriteFruit();

  }

  componentDidMount() {
    
    setTimeout(
      () =>{
        this.setState( {componentDidMount: true} );

      }, 480

    )
  }

  componentWillUnmount() {}


  /* This Components UI Methods */

  ui = { 

    // --- fetch FaforiteFruit data
    fetchFavoriteFruit: () => {
      // Fetch Data
      FruitasticApi.get( fruitList => {
        this.setState( { fruitList, fruitListSelected: fruitList  }, 
          ()=> {
            this.ui.filterFavoriteFruit( { mostPopular: true } );
          }
        );
      })

    },


    // --- filter, sort data and set a new filtered array for this component to use.
    filterFavoriteFruit: ( option ) => {
      
      let fruitList = this.state.fruitList;
      const fruitListFiltered = [];  // ['Apple', [ { favoriteFruit: 'Apple', Name: 'Ban Park'..} ], Color  ]

      const filterFruitList = () => {

        // ---- Set name of fruit to look for extracting out of frustlist.

        const fruitNameToFind = fruitList[0].favoriteFruit;
        let fruitListExtracted = [];
        let fruitRandomColor;


        // --- Extract set of fruit our of array
        fruitListExtracted = fruitList.filter( function( item ){ 
          
          if ( item.favoriteFruit == fruitNameToFind ){
            return item;
          }
          
        });


        // --- Get Random Color for the fruit
        fruitRandomColor = (() => {
          
          let rgb ='';
          let randomValue;
          for( let i = 0; i < 3; i++) {
                
            randomValue = Math.floor((Math.random() * 250) + 1);
            rgb += randomValue;

            if( i !==2 ){
              rgb += ',';
            }
          }
          
          return rgb;

        })();

        // ---- Push fruitListExtracted to fruitListFiltered 

        // if mostPopular is true, show top to bottom in order of most popular to least popular
        if ( option.mostPopular == true ){

          // Loop and inject fruitListExtracted if its length is bigger than fruitListFiltered[i] length

          if ( 0 < fruitListFiltered.length ){
            for ( let i = 0; i < fruitListFiltered.length; i++ ){

              if ( fruitListExtracted.length > fruitListFiltered[i][1].length ){
                  
                fruitListFiltered.splice(i,0, [ fruitNameToFind, fruitListExtracted, fruitRandomColor ]);
                break;

              }

              
              // inject fruitListExtracted to the last array if condition is not met untill the last [i].
              if( i == fruitListFiltered.length -1 ) {
                
                fruitListFiltered.push([ fruitNameToFind, fruitListExtracted, fruitRandomColor ]);
                break;

              }

            }
          } else {

            // Push fruitListExtracted to fruitListFiltered if there is no value to compare.
            fruitListFiltered.push([ fruitNameToFind, fruitListExtracted, fruitRandomColor ]);

          }

        } 

        // else show randomly
        if ( option.mostPopular != true ) fruitListFiltered.push([ fruitNameToFind, fruitListExtracted, fruitRandomColor ]);


        // ---- Remove fruitListExtracted from fruitListl for the next reculsive

        fruitList = fruitList.filter( function( item ){ 

          if ( item.favoriteFruit != fruitNameToFind ) { 
            return item;
          }

        });

        // ---- loop again and do samething untill there is no value in fruitList.

        if ( fruitList.length > 0 ){

          filterFruitList();
        };

      }

      filterFruitList();
      this.setState( { fruitListFiltered })
      
    },


    // --- CLick Event: Show Filtered Data List below
    ShowFilteredDataList: ( clickedIndex ) => {

      const { state } = this;
      const $infoItems = document.querySelectorAll('.m-favorite-fruits__overall-info-item');
      let fruitNameSelected;
      let fruitListSelected; 


      // Remove active class on all other fruits in top infobox.
      for ( let i = 0; i < $infoItems.length; i++ ){
        $infoItems[i].classList.remove('active');
      }

      // if clicked top title
      if ( clickedIndex === 'all'){
        fruitNameSelected = 'Favorite Fruits All';
        fruitListSelected = this.state.fruitList;
      }

      // if clicked fruit in top infobox
      else { 

        fruitNameSelected = this.state.fruitListFiltered[clickedIndex][0];
        fruitListSelected = this.state.fruitListFiltered[clickedIndex][1];

        // Add active class on clicked fruit in top infobox.
        $infoItems[clickedIndex].classList.add('active');

      }
      
      console.log(`Fruit selected: ${fruitNameSelected}, ${fruitListSelected.length}`);
      this.setState( { fruitListSelected } );

    }

  }


  render(){

    const { ui, state } = this;

    const favoriteFruitOverallInfo = this.state.fruitListFiltered.map((item , i) => { 
      const popularPercentage = 100 * (item[1].length / state.fruitList.length);
      const fruitName = item[0];
      const rgbColor = item[2];
      const fruitLength = item[1].length;


      var gaugeStyles = {
        width: `${popularPercentage}%`,
        backgroundColor: 'rgba('+rgbColor+',1)'
      };

      return (

        <div key={ i } className="m-favorite-fruits__overall-info-item" >
          <span className="m-favorite-fruits__name" onClick={ ()=>{ ui.ShowFilteredDataList(i) } }> { fruitName }</span>
          <span className="m-favorite-fruits__graph">
            <span style={ gaugeStyles }></span>
          </span>
          <span className="m-favorite-fruits__popular-number"> { fruitLength }</span>
        </div>
      )

    });


    const itemList = this.state.fruitListSelected.map((item , i) => { 
      
      return (
        <ItemList 
          key = { i }
          name = { item.name }
          favoriteFruit = { item.favoriteFruit }
        />
      )

    });
 

    return(
      <div className={ "m-favorite-fruits " + ( state.componentDidMount ? 'mounted' : '' )  }>
        <Row className="">
          <Column small={12} className="">
            <div className="m-favorite-fruits__title" onClick={ ()=>{ ui.ShowFilteredDataList('all') } }>Favorite Fruits</div>
            <div className="m-favorite-fruits__overall-info-wrapper ">
              { favoriteFruitOverallInfo }
            </div>
   
            <ReactCSSTransitionGroup
              transitionName="ui-list-item-transition"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
              { itemList }
            </ReactCSSTransitionGroup>    
            
          </Column>
        </Row>
      </div>

    )
  }
}


export default FavoriteFruit;
 