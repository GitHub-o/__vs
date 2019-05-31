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