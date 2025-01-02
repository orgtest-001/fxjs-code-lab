import {Iterator} from "./functional/iterator";

class ArrayLikeIterator<T> implements Iterator<T> {
    private index = 0;
    constructor(private value: Iterator<T>) {}

    next(): IteratorResult<T> {
        if (this.index < this.arrayLike.length) {
            return {
                value: this.arrayLike[this.index++],
                done: false
            };
        } else {
            return {
                value: undefined,
                done: true
            };
        }
    }
}

const arrayLike: ArrayLike<number> = {
    0: 10,
    1: 20,
    2: 30,
    length: 3
};