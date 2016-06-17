import { EventEmitter } from 'events';
import assign from 'object-assign';
const data = require('../src/data/data').default;

// 每张海报的宽高
let photo = {
	width: 275,
	height: 400
};

// 外层包裹层的宽高，这里取的是浏览器窗口
let wrap = {
	width: Math.max(window.innerWidth, 1200),
	height: Math.max(window.innerHeight, 600)
};

const PhotoStore = assign({}, EventEmitter.prototype, {
	items: data,

	currentIndex: 0,

	// 分区，数组内存储下标
	middleIndex: Math.ceil((data.length - 1) / 2),

	// 各分区的x,y取值范围
	range: {
		leftArea: {
			// [-1/3, center - 2/3] 
			x: [0 - photo.width / 3, wrap.width / 2 - photo.width * 4 / 3],
			// [-1/3, wrap + 1/3]
			y: [0 - photo.height * 2 / 3, wrap.height - photo.height / 3]
		},
		rightArea: {
			// [center + 2/3, wrap + 1/3, ] 
			x: [wrap.width - photo.width * 2 / 3, wrap.width / 2 + photo.width * 1 / 3],
			// [-1/3, wrap + 1/3]
			y: [0 - photo.height * 2 / 3, wrap.height - photo.height / 3]
		},
		center: {
			x: wrap.width / 2 - photo.width / 2,
			y: wrap.height / 2 - photo.height / 2
		},
		angle: [-120, 120]

	},

	getItems() {
		return this.items;
	},

	getCurrentIndex() {
		return this.currentIndex;
	},

	// 切换选中项并分区
	switchIndex(index) { 
		this.currentIndex = index;
	},

	// 分区
	subarea() {
		// allIndex 用以存储所有下标
		let allIndex = [];

		// 推入下标
		for(let i = 0, max = this.items.length; i < max; i++) {
			allIndex.push(i);
		}

		// 删除当前选中项，splice方法会影响原数组
		allIndex.splice(this.currentIndex, 1);

		// 把数组剩下的项取中间项
		this.middleIndex = allIndex[Math.ceil(allIndex.length / 2)];
		allIndex = null;
	},

	/*
		通过下标查询分区并返回定位和旋转角度
		@param index { Number } 提供一个数字下标
		@return { transform: translate3d(0, 0 , 0) rotate(0deg) scale(1) … } 返回一个对象
	*/
	getStyle(index) {
		if(index == this.currentIndex) {

			// '1px, 1px, 0'
			let position = this.range.center.x + 'px, ' + this.range.center.y + 'px, 0';

			return {
				transform: 'translate3d(' + position +  ') rotate(0deg) scale(1.2)',
				zIndex: '10'
			};

		} else if(index < this.middleIndex) { // 左分区

			let position = this.random(this.range.leftArea.x) + 'px, ' + this.random(this.range.leftArea.y) + 'px, 0';

			return {
				transform: 'translate3d(' + position +  ') rotate(' + this.random(this.range.angle) + 'deg) scale(1)'
			};

		} else if(index >= this.middleIndex){ // 右分区

			let position = this.random(this.range.rightArea.x) + 'px, ' + this.random(this.range.rightArea.y) + 'px, 0';

			return {
				transform: 'translate3d(' + position +  ') rotate(' + this.random(this.range.angle) + 'deg) scale(1)'
			};

		}

	},


	/*
		随机数生成函数，在给定的范围内随机生成一个值。
		@param [num1, num2] { Number } 提供一个包含最小值最大值的数组，顺序不限
		@return { Number } 返回该范围内的随机数
	*/
	random(_range) {
		let min = Math.min(_range[0], _range[1]),
			max = Math.max(_range[0], _range[1]),
			diff = max - min;
		/*
		*例如传入 [1, 20]，则 diff = 19 --> 0 <= Math.round(Math.random() * diff) <= 19
		*然后再加上最小值，即可随机生成 1 ~ 20 之间的任意数，如果使用 Math.floor() 则
		*生成 1 ~ 19 之间的任意数，使用 Math.ceil() 则生成 2 ~ 20 之间的任意数
		*/
		return Math.round(Math.random() * diff) + min;
	},

	emitChange: function(data) {
		this.emit('change', data);
	},

	addChangeListener: function(callback) {
		this.on('change', callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener('change', callback);
	}

});

export default PhotoStore;