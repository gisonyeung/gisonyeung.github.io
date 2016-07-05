import AppDispatcher from '../dispatcher/AppDispatcher';

const PhotoAction = {
	
	switchItem(index) {
		AppDispatcher.dispatch({
			actionType: 'SWITCH_ITEM',
			index: index,
		});
	},
	
	turn() {
		AppDispatcher.dispatch({
			actionType: 'TURN_ITEM'
		});
	},



	
};

export default PhotoAction;