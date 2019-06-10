// let fs = require('fs');

// function promisify() {
// 	return (path) => {
// 		return new Promise((resolve, reject) => {
// 			fs.readFile(path, 'utf-8', (error, data) => error ? reject(error) : resolve(data));
// 		})
// 	}
// }

// let readFile = promisify();
// readFile('../one')
// 	.then(res => readFile(res))
// 	.then(res => readFile(res))
// 	.then(res => console.log(res));

// function co(iter) {
// 	return new Promise((resolve, reject) => {
// 		let next = (res) => {
// 			let {value, done} = iter.next(res);
// 			done ? resolve(value)
// 				   : value.then(res => next(res));
// 		}
// 		next();
// 	})
// }

// function * read(path) {
// 	let value1 = yield readFile(path, 'utf-8'),
// 		value2 = yield readFile(value1, 'utf-8'),
// 		value3 = yield readFile(value2, 'utf-8');

// 	return value3;
// }

// async function aRead(path) {
// 	let value1 = await readFile(path, 'utf-8'),
// 		value2 = await readFile(value1, 'utf-8'),
// 		value3 = await readFile(value2, 'utf-8');

// 	return value3;
// }

// let r = co(read('../one'));
// r.then(res => console.log(res));

// let a = aRead('../one');
// a.then(res => console.log(res));

var obj = {
      b: {
            c: 4
      },
      d: [{
            e: 0
      }, {
            e: 0
      }],
      1: {
            2: 2
      }
};

function parse(tar, param) {
      var regL = /\[/g,
            regR = /\]/g,
            reg = /\./g,
            len;

      param = param.replace(regL, '.')
            .replace(regR, '')
            .replace(reg, '');
      len = param.length;
      if (len > 1) {
            tar = tar[param[0]];
            param = param.slice(1);
            return parse(tar, param);
      }

      return tar[param];
}

Array.prototype.bubbleSort1 = function () {
      var len = this.length,
            temp;

      for (var i = 0; i < len - 1; i++) {
            for (var j = 0; j < len - i - 1; j++) {
                  if (this[j] > this[j + 1]) {
                        temp = this[j + 1]
                        this[j + 1] = this[j]
                        this[j] = temp
                  }
            }
      }
      return this
}

Array.prototype.bubbleSort2 = function () {
      var j = this.length - 1;
      console.time()
      while (j > 0) {
            var pos = 0,
                  temp;
            for (var i = 0; i < j; i++) {
                  if (this[i] > this[i + 1]) {
                        pos = i;
                        temp = this[i];
                        this[i] = this[i + 1];
                        this[i + 1] = temp;
                  }
            }
            j = pos;
      }
      console.timeEnd()
      return this;
}

Array.prototype.selectionSort = function() {
      var len = this.length,
            temp,
            minIdx;
      for(var i = 0; i < len - 1; i++) {
            minIdx = i;
            for(var j = i + 1; j < len; j++) {
                  if(this[minIdx] > this[j]) {
                        minIdx = j;
                  }
            }
            temp = this[i];
            this[i] = this[minIdx];
            this[minIdx] = temp;
      }
      return this;
}