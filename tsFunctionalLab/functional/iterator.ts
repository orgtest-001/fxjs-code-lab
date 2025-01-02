interface IteratorYieldResult<T> {
    done?: false;
    value: T;
}

interface IteratorReturnResult {
    done: true;
    value: undefined;
}

interface Iterator<T> {
    next(): IteratorYieldResult<T> | IteratorReturnResult;
}