// 기준 데이터
import {_filter, _map} from "./js/_js";

var users = [
    { id: 10, name: 'ID', age: 36 },
    { id: 20, name: 'BJ', age: 32 },
    { id: 30, name: 'JM', age: 32 },
    { id: 40, name: 'PJ', age: 27 },
    { id: 50, name: 'HA', age: 25 },
    { id: 60, name: 'JE', age: 26 },
    { id: 70, name: 'JI', age: 31 },
    { id: 80, name: 'MP', age: 23 },
    { id: 90, name: 'FP', age: 13 }
];

// 수집하기 - map, values, pluck 등
// 1. map
console.log(
    _map(users, user => user.name)
);

// 2. valuse
// function _values(data) {
//     return _map(data, _identity)
// }
var _values = _map(_identity());

function _identity(val) {
    return val;
}

var a = 10;
console.log( _identity(a) );


console.log(users[0]);
console.log(_values(users[0]));
console.log(_keys(users[0]));

console.log( _map(_identity)(users[0]) );

// 3. pluck
function _pluck(data, key) {
    // return _map(data, obj => obj[key]);
    return _map(data, _get(key));
}


console.log( _pluck(users, 'age') );
// [33, 22, 11, ...]

// 거르기 - filter, reject, compact, without 등
// 1. reject
function _negate(func) {
    return function(val) {
        return !func(val);
    }
}

function _reject(list, predi) {
    return _filter(list, _negate(predi));
}

console.log( _reject(users, user => user.age > 30) );

// 2. compact
var _compact = _filter(_identity);

console.log(_compact([1, 2, 0, false, null, {}]))

// 찾아내기
// 접기
