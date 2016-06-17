import { Dispatcher } from 'flux';
import PhotoStore from '../stores/PhotoStore';
const AppDispatcher = new Dispatcher();

AppDispatcher.register(function(action) {
	switch(action.actionType) {
		case 'SWITCH_ITEM': 
			// 切换选中项
			PhotoStore.switchIndex(action.index);
			// 重新分区
			PhotoStore.subarea();
			PhotoStore.emitChange(false);
			break;
		case 'TURN_ITEM': 
			PhotoStore.emitChange(true);
			break;
		default: ;


	}
});

export default AppDispatcher;