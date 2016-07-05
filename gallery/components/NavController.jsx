import React from 'react';
import Nav from './Nav';
import PhotoStore from '../stores/PhotoStore';
import PhotoAction from '../actions/PhotoAction';

const NavController = React.createClass({

  getInitialState() {
      return {
          items: PhotoStore.getItems(),
      };
  },

  render() {
    let status = this.props.status;
    return (
      <div className="nav">
        {
          this.state.items.map(function(item, index) {
            return (
              <Nav 
                key={index}
                index={index}
                status={status}
              />
            )
          })
        }
      </div>
      
    );
  }
});

export default NavController;