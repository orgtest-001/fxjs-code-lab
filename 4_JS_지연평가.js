// 지연평가를 시작 시키고 유지 시키는 함수
// 지연평가가 안되어있을 때
var mi = 0;
var fi = 0;
_.go(
    _.range(100),
    _.map(function(val) {
        ++mi;
        return val * val;
    }),
    _.filter(function(val) {
        ++fi;
        return val % 2;
    }),
    _.take(5),
    console.log
)
console.log(i)

// 엄격한 평가
// take가 5로 mi와 fi가 range만큼 돈다 = 배열의 크기 혹은 arrayLike의 크기 만큼 돈다 -> 리소스 낭비
// partial.js 를 통해 지연평가를 구현하여 사용된 경우
// L. 을 사용시 지연평가를 사용할 수 있다.

_.go(
    _.range(100),
    L.map(function(val) {
        ++mi;
        return val * val;
    }),
    L.filter(function(val) {
        ++fi;
        return val % 2;
    }),
    L.take(5),
    console.log
)
console.log(i)
// 지연평가를 통해 take할 값 만큼만 돌아버리는 경우를 의미한다.
// 함수형 프로그래밍이고 순수함수이기 때문에, 평가시점에서 동일한 결과를 꺼낼 수 있기에 지연평가가 생김
// 끝을 내는 함수가 나올 때 까지 평가를 횡으로 하는게 아닌 종으로 하게 됨