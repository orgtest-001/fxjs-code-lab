// 기준 데이터
import {_curryr, _filter, _map} from "./js/_js";

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

// 찾아내기 - find
// 1. find 만들기 -> filter 함수와 비슷, filter 함수는 전체를 순회 후 배열 리턴 -> find는 true가 될 때 인덱스 값 리턴
var _find = curryr(function(list, predi) {
    var keys = _keys(list);
    for (var i = 0, len = keys.length; i < len; i++) {
        var val = list[keys[i]];
        if (predi(val)) return val;
    }
});

console.log(_find(users, user => user.age < 30));

// 2. find_index
var _find_index = curryr(function(list, predi) {
    var keys = _keys(list);
    for (var i = 0, len = keys.length; i < len; i++) {
        var val = list[keys[i]];
        if (predi(val)) return i;
    }
    return -1;
});

console.log(
    _find_index(users, user => user.id === 30)
);

_go(
    users,
    _find_index(user => user.id === 50),
    console.log
);

// 3. some
var _some =  _curryr((list, predi) => {
    _find_index(data, predi || _identity) !== -1;
});

function _some(list, predi) {
    return _find_index(data, predi || _identity) !== -1;
}

_some([1, 2, 5, 10, 20], function(val) {
    return val > 10;
}); // true 벨류가 10보다 큰게 하나라도 있다면!

// 4. every
function _every(list, predi) {
    return _find_index(data, _negate(predi || _identity)) === -1;
}

_every([1, 2, 5, 10, 20], function(val) {
    return val > 10;
}); // false 벨류가 전부 10보다 커야 한다!

console.log(
    _some(users, user => user.age < 20)
);

_go(
    users,
    _some(user => user.age > 30),
    console.log
);

// 접기
