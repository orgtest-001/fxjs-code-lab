import {_filter, _map} from "./js/_js";

var users = [
    { id: 1, name: 'ID', age: 36 },
    { id: 2, name: 'BJ', age: 32 },
    { id: 3, name: 'JM', age: 32 },
    { id: 4, name: 'PJ', age: 27 },
    { id: 5, name: 'HA', age: 25 },
    { id: 6, name: 'JE', age: 26 },
    { id: 7, name: 'JI', age: 31 },
    { id: 8, name: 'MP', age: 23 },
];

// 1. 명령형 코드
var temp_users = [];
for (var i = 0; i < users.length; i++) {
    if (users[i].age >= 30) {
        temp_users.push(users[i]);
    }
}
console.log(temp_users);

var names = [];
for (var i = 0; i < temp_users.length; i++) {
    names.push(temp_users[i].name);
}
console.log(names);

var temp_users = [];
for (var i = 0; i < users.length; i++) {
    if (users[i].age < 30) {
        temp_users.push(users[i]);
    }
}
console.log(temp_users);

var names = [];
for (var i = 0; i < temp_users.length; i++) {
    names = temp_users[i].age;
}
console.log(names);

// 함수형 프로그래밍
// 응용형 함수, 고차 함수 -> 함수를 인자로 받거나, 함수를 리턴하거나, 함수안에서 리턴받은 함수를 이용

// 함수형 프로그래밍은 다형성이 분리되어 있어서 재활용성이 극대화된다.

// 조건을 바깥의 인자에게 위임을 진행
console.log(
    _filter(users, function (user) { return user.age >= 30; })
);

var over_30 = _filter(users, function (user) { return user.age >= 30; });
console.log('MAP START >>>> ');

var names = _map(over_30, function (user) { return user.name; });
console.log(names);

console.log(
    _map(over_30, function (user) { return user.age })
);

console.log('고차함수로의 조합');
console.log(
    _map(
        _filter(users, function(user) { return user.age >= 30; }),
        function (user) { return user.name; }
    )
);

// 3. each 만들기
// 3-1. _each로 _map, _filter 중복 제거