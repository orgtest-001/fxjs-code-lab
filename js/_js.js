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

function _each(list, iterator) {
    for (var i = 0; i < list.length; i++) {
        iterator(list[i]);
    }

    return list;
}