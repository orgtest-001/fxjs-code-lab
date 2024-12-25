console.log('Happy developing ✨')

/* 순수 함수 */
function add(a, b) {
    return a + b;
}

console.log( add(10, 5) );
console.log( add(10, 5) );
console.log( add(10, 5) );
console.log( add(10, 5) );
console.log( add(10, 5) );

console.log('예제 2 >>> 순수함수가 아니다.');

var c = 10;
function add2(a, b) {
    return a + b + c;
}

console.log( add2(10, 2) ); // 22
console.log( add2(10, 3) );
console.log( add2(10, 4) );
c = 20;
console.log( add2(10, 2) ); // 32
console.log( add2(10, 3) );
console.log( add2(10, 4) );

console.log('예제 3 >>> 순수함수가 아니다 -> 다른 변수의 상태를 바꿈');

var c = 20;
function add3(a, b) {
    c = b;
    return a + b;
}

console.log('c : ', c);
console.log( add3(20, 30) );
console.log('c : ', c);


var obj1 = { val: 10 };
function add4(obj, b) {
    obj.val += b;
}

console.log( obj1.val );
add4(obj1, 20);
console.log( obj1.val );


console.log( '예제 4 >>> 다시 순수함수' );

var obj1 = { val: 10 };
function add5(obj, b) {
    return { val: obj.val + b };
}

console.log( obj1.val );
var obj2 = add5(obj1, 20);
console.log( obj1.val );
console.log( obj2.val );

// 함수형 프로그래밍은 초기의 값을 변경시키지 않으면서 값을 다뤄나가는 프로그래밍
// 순수함수가 아닌 함수는 평가시점이 중요함 -> 평가시점에 따라 로직이 정해짐
// 순수함수는 언제 실행해도 결과가 동일함 = 정합성, 평가시점을 개발자가 다룰 수 있음

// 일급 함수
// 함수를 값으로 다룰 수 있다 -> 변수, 인자 등등으로 다뤄서 다른 함수가 실행하게 할 수 있음
// 런타임에서 언제나 들고다ㄴ

var f1 = function (a) {
    return a * a;
}

console.log( f1 );

var f2 = add;
console.log( f2 );
// 함수를 인자로 받을 수 있음

console.log( 'f3' );
function f3(f) {
    return f();
}

f3(function () { return 10 });
// 일급함수와 순수함수를 조합하여 다양한 로직을 만드는 것 = 함수형 프로그래밍

// 순수함수와 일급함수를 조합한 재미있는 예제 add_maker
function add_maker(a) {
    return function (b) {
        return a + b;
    } // 클로저
}
// 이러한 함수가 클로저와 일급함수 개념이 같이 사용됨
// 여기서 a는 순수함수로 이용됨

var add10 = add_maker(10);
/*
* function(10) {
*   return a + 10;
* }
* */
console.log( add10(20) );

function f4 (f1, f2, f3) {
    return f3(f1() + f2());
}

f4 (
    function () { return 2;},
    function () {return 1; },
    function (a) {return a * a; },
)

// 1. f1 을 실행하여 2를 대입
// 2. f2를 실행하여 1을 대입
// 3. 두 값을 더한 값이 f3의 인자가 됨
// 4. 최종 값은 9가 됨

// 함수가 함수를 인자로 받아서 원하는 시점에 평가하여 적용하여 로직을 적용해나감
