import React from 'react';
import PhotoStore from '../stores/PhotoStore';
import PhotoAction from '../actions/PhotoAction';

const Photo = React.createClass({

  getInitialState() {
    return {
      style: PhotoStore.getStyle(this.props.index),
      isTurn: false,
    };
  },

  handleClick() {
    let index = this.props.index;
    if(index == PhotoStore.getCurrentIndex()) {
      PhotoAction.turn();
    } else {
      PhotoAction.switchItem(index);
    }
  },

  updateStyle() {
    this.setState({
      style: PhotoStore.getStyle(this.props.index),
      isTurn: false,
    })
  },

  updateTurn() {
    this.setState({
      isTurn: !this.state.isTurn,
    })
  },

  componentWillReceiveProps(nextProps) {
    // 翻转
    if(nextProps.status) {
      if(this.props.index== PhotoStore.getCurrentIndex()) {
        this.updateTurn();
      }
    } else { // 切换
      this.updateStyle();
    }
  },

  render() {
    return (
      <div 
        className={`photo ${ this.state.isTurn ? 'photo_back' : '' }`} 
        style={this.state.style}
        onClick={this.handleClick}
      >
        <div className="photo-wrap">
          <div className="side side-front">
          	<p className="image">
          	  <img src={this.props.data} alt={this.props.title} />
          	</p>
          	<p className={`caption ${ PhotoStore.getCurrentIndex() == this.props.index ? 'current' : '' } `}>{this.props.title}</p>
          </div>
          <div className="side side-back">
            <div 
              className="description" 
              dangerouslySetInnerHTML={{__html: this.props.description}}
            />
          </div>
        </div>
      </div>
    	
    );
  }
});

export default Photo;