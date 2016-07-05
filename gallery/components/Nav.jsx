import React from 'react';
import PhotoStore from '../stores/PhotoStore';
import PhotoAction from '../actions/PhotoAction';

const Nav = React.createClass({

  getInitialState() {
      return {
          isTurn: false  
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
      if(this.props.index == PhotoStore.getCurrentIndex()) {
        this.updateTurn();
      }
    } else{ // 切换
      this.updateStyle();
    }
  },

  render() {
    return (
        <span 
          className={`i ${ this.props.index == PhotoStore.getCurrentIndex() ? 'i_current' : '' } ${ this.state.isTurn ? 'i_back' : '' }`}
      	  onClick={this.handleClick}
        />
      );
  }
});

export default Nav;

