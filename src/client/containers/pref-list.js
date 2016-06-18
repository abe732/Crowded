import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setPreferences} from '../actions/index';
import {fetchCafeListByGeoloc} from '../actions/cafe-api';
import {setNeighborhood} from '../actions/index';
import {Link, browserHistory} from 'react-router';

class PrefList extends Component {
  constructor (props)  {
    super(props);
    this.state = {term: ''};
    this.onPrefClick = this.onPrefClick.bind(this);
    this.onPrefSubmit = this.onPrefSubmit.bind(this);
    this.onNeighborhoodChange = this.onNeighborhoodChange.bind(this);
  }

  onPrefClick(event) {
    // need logic here or in the div to change the color
    //logic for preventing double clicking and for removing pref from list by clicking should be in the action handler
    
    this.props.setPreferences(event.target.value);
    //this.setState = event.target
  }
  
  //fetching geolocation here
  getCoords() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
      this.setState({term: position.coords.latitude + ',' + position.coords.longitude});
      });
    }else {
      console.log("Sorry your browser has not yet support Geo Location");
    }
  }

  componentDidMount() {
    this.getCoords();
  }
  
  onPrefSubmit() { // need switch logic here to switch to hood
       if(this.state.term.length === 0) {
         setTimeout(this.onPrefSubmit, 200);
       } else {
         this.props.fetchCafeListByGeoloc(this.state.term);
         browserHistory.push('/cafes')
       }    
  }
  
  onNeighborhoodChange(props) {
    browserHistory.push('/neighborhood')
  }
  
  render() { 
    return (
      <div>
        <div className="div-holder">
          <div className="small-print">Location set to nearest to you</div>
            <div className="small-print-button">
              <button type="submit" className="mdl-button--raised small-print" onClick={this.onNeighborhoodChange}>Choose Neigbhorhood</button>
            </div>
          <div className="search-button">
            <button type="submit" className="mdl-button--raised main" onClick={this.onPrefSubmit}>Find Cafes</button>
          </div>
        </div>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--4-col" value='coffeeQuality' onClick={this.onPrefClick}>
            Coffee
          </div>
          <div className="mdl-cell mdl-cell--4-col" value='ambiance' onClick={this.onPrefClick}>
            Ambiance
          </div>
          <div className="mdl-cell mdl-cell--4-col" value='yelpRating' onClick={this.onPrefClick}>
            Yelp Rating
          </div>
          <div className="mdl-cell mdl-cell--4-col" value='seats' onClick={this.onPrefClick}>
            Seats
          </div>
          <div className="mdl-cell mdl-cell--4-col" value='outlets' onClick={this.onPrefClick}>
            Outlets
          </div>
          <div className="mdl-cell mdl-cell--4-col" value='bathroomQuality' onClick={this.onPrefClick}>
            Bathrooms
          </div>
          <div className="mdl-cell mdl-cell--4-col" value='line' onClick={this.onPrefClick}>
            Line
          </div>
          <div className="mdl-cell mdl-cell--4-col" value='noise' onClick={this.onPrefClick}>
            Noise
          </div>
          <div className="mdl-cell mdl-cell--4-col" value='price' onClick={this.onPrefClick}>
            Price
          </div>
        </div>
      </div>
    );
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators({fetchCafeListByGeoloc, setPreferences, setNeighborhood}, dispatch);
}

export default connect(null, mapDispachToProps)(PrefList);