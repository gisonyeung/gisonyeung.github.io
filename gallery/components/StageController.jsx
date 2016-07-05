import React from 'react';
import Photo from './Photo';
import NavController from './NavController';
import PhotoStore from '../stores/PhotoStore';

require('../src/sass/main.scss');


const StageController = React.createClass({
  getInitialState() {
      return {
          items: PhotoStore.getItems(),
          status: false,
      };
  },

  componentDidMount() {
    PhotoStore.addChangeListener(this.statusChange);  
  },

  componentWillUnmount() {
    PhotoStore.removeChangeListener(this.statusChange);  
  },

  statusChange(status) {
  	console.log(status);
  	this.setState({
  		status: status
  	})
  },

  render() {
  	let status = this.state.status;
  	return (
  	  <div>
  	    {
  	      this.state.items.map(function(item, index) {
  	        return (
  	          <Photo 
  	            key={index}
  	            data={`./src/img/${item.fileName}`} 
  	            title={item.title}
  	            description={item.description}
  	            index={index}
  	            status={status}
  	          />
  	        )
  	      })
  	    }
  	    <NavController status={status} />
      </div>
  	);
  }
});

export default StageController;