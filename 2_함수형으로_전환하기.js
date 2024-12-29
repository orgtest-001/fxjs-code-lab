import {_filter, _map} from "./js/_js.js";

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

console.log("EACH START >>>> ")

console.log(
    [1,2,3].map(function (val) {
        return val * 2;
    })
)

// 객체형 프로그래밍, 객체가 중요함 -> 데이터가 중요함 데이터를 평가해야함
console.log(
    [1,2,3,4].filter(function (val) {
        return val % 2;
    })
)

// 함수형 프로그래밍, 함수 -> 동작이 중요함 동작으로 데이터를 이야기 하기에 유연성 높아짐
console.log(
    _map([1,2,3,4], function(val) {
        return val * 2;
    })
)

// 함수와 메서드는 다르다 -> 메서드는 객체 상태에 따라 값이 달라진다
// 메서드는 객체 지향 프로그램으로서 클래스의 인스턴스에 종속되어 사용되어진다.
// 함수는 객체에 종속되어 있지 않아있기 때문에 어떠한 값이 들어오든지 동작에 대한 정의를 할 수 있다.

// 아래 코드는 사용 불가 arrayLike의 문제
// 객체에 없는 메서드이기 때문에 불가능함 -> 그렇다면 어떠한 방식으로 풀어야할까?
// 힘수를 정의하여 함수형으로 정의해서 map의 역할을 할 수 있다.
// document.querySelectorAll('*').map(function (node) {
//     return node.nodeName;
// })

// mapper와 같은 두번째 인자는 언제나 콜백함수라고 불려질 수 없다 -> 보조함수를 다들 콜백함수로 부르는 경향이 있음
// 역할에 맞는 보조함수의 이름이 존재한다.
_map([1,2,3,4], function(val) {
    return val * 2;
})

// 커링 -> 함수와 인자를 다루는 기법
// 자바스크립트는 커링이 지원되지 않지만, 1급함수가 지원되고 평가시점을 마음대로 다룰 수 있게 커링과 같은 기법을 구현할 수 있음
function _curry(fn) {
    return function (a,  b) {
        return arguments.length == 2 ? fn(a, b) : function (b) {
            return fn(a, b);
        };
    }
}

function _curryr(fn) {
    return function (a, b) {
        return arguments.length == 2 ? fn(a, b) : function (b) { return fn(b, a); };
    }
}

console.log("커링 예시 >>>> ")
var add = _curry(function (a, b) {
    return a + b;
});

var add10 = add(10);

console.log( add10(5) );
console.log( add(5)(3) );
console.log( add(1, 2) );

// 원하는 시점까지 들고있다가 평가시점에 값을 출력하는 것이 커링기법
// 인자로 본체함수 -> 커리함수 실행 -> add(10)은 a에 10의 값을 기억하는 클로져가 된다 -> add10(5)는 기억한 a의 클로져함수를 받아서 5를 더해 15가 된다.

var sub = _curryr(function (a, b) {
    return a - b;
});

console.log( sub(10, 5) );

var sub10 = sub(10);
console.log( sub10(5) );

// 2. _get 만들어 좀 더 간단하게 하기
var _get = _curryr(function (obj, key) {
    return obj == null ? undefined : obj[key];
});

console.log("_get에 대한 예제 >>>> ")
var user1 = users[0]
console.log(user1.name);
console.log(_get(user1, 'name'));

console.log(_get(users[10], 'name'));

console.log(
    _map(
        _filter(users, function(user) { return user.age >= 30; }),
        function (user) { return user.name; }
    )
);

console.log(
    _map(
        _filter(users, function(user) { return user.age < 30; }),
        function (user) { return user.age; }
    )
);

console.log("TO CURRYING >>>> ")

console.log(
    _map(
        _filter(users, function(user) { return user.age >= 30; }),
        _get('name')
    )
);

console.log(
    _map(
        _filter(users, function(user) { return user.age < 30; }),
        _get('age')
    )
);