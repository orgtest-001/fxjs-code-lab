function square(a) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(a * a);
        }, 500);
    });
}

square(10).then(function (res) {
    console.log(res);
}).then()

square(10)
    .then(square)
    .then(square)
    .then(console.log);

_.go(
    square(10),
    square,
    square,
    console.log);

// 비동기 함수는 코드의 순서를 개발자가 제어하기 어렵다.

// promis는 복잡한 콜백제어가 어렵다 그렇다면?

var list = [2, 3, 4];
_.map(list, function (item) {
    return item * 2
});

new Promise(function (resolve) {
    (function recur(res) {
        if (list.length === res.length) return resolve;
        square(list[res.length]).then(function(val) {
            res.push(val);
            recur(res);
        })
    })([])
}).then(console.log);


_.go(
    list,
    _.map(square),
    console.log
);