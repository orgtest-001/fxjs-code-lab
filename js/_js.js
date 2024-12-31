export function _filter(values, predicate) {
    var new_list = [];
    _each(values, function (value) {
        if (predicate(value)) {
            new_list.push(value);
        }
    });
    return new_list;
}

export function _map(values, mapper) {
    var new_list = [];
    _each(values, function (value) {
        new_list.push(mapper(value))
    });
    return new_list;
}

export function _each(list, iterator) {
    for (var i = 0; i < list.length; i++) {
        iterator(list[i]);
    }
    return list;
}

// 커링 -> 함수와 인자를 다루는 기법
// 자바스크립트는 커링이 지원되지 않지만, 1급함수가 지원되고 평가시점을 마음대로 다룰 수 있게 커링과 같은 기법을 구현할 수 있음
export function _curry(fn) {
    return function (a,  b) {
        return arguments.length == 2 ? fn(a, b) : function (b) {
            return fn(a, b);
        };
    }
}

export function _curryr(fn) {
    return function (a, b) {
        return arguments.length == 2 ? fn(a, b) : function (b) { return fn(b, a); };
    }
}
// 2. _get 만들어 좀 더 간단하게 하기
export var _get = _curryr(function (obj, key) {
    return obj == null ? undefined : obj[key];
});

export var _map = _curryr(_map),
    _filter = _curry(_filter);

// 1. _pipe
export function _pipe() {
    var fns = arguments;

    return function (arg) {
        return _reduce(fns, function(arg, fn) {
            return fn(arg);
        }, arg);
    }
}

export function _go(arg) {
    var fns = _rest(arguments);
    return _pipe.apply(null, fns)(arg);
}