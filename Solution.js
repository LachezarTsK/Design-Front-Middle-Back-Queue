
/*
 At any time before and after each method call:
 (frontDeque.size == backDeque.size) || (frontDeque.size - 1 == backDeque.size)
 */
var FrontMiddleBackQueue = function () {
    this.NO_ELEMENTS_IN_QUEUE = -1;
    this.frontDeque = new DoubleEndedQueue();
    this.backDeque = new DoubleEndedQueue();
};

/** 
 * @param {number} value
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushFront = function (value) {
    if (this.frontDeque.size > this.backDeque.size) {
        this.backDeque.addFirst(this.frontDeque.removeLast());
    }
    this.frontDeque.addFirst(value);
};

/** 
 * @param {number} value
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushMiddle = function (value) {
    if (this.frontDeque.size > this.backDeque.size) {
        this.backDeque.addFirst(this.frontDeque.removeLast());
    }
    this.frontDeque.addLast(value);
};

/** 
 * @param {number} value
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushBack = function (value) {
    this.backDeque.addLast(value);
    if (this.frontDeque.size < this.backDeque.size) {
        this.frontDeque.addLast(this.backDeque.removeFirst());
    }
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popFront = function () {
    if (this.frontDeque.isEmpty() && this.backDeque.isEmpty()) {
        return this.NO_ELEMENTS_IN_QUEUE;
    }
    if (this.frontDeque.size === this.backDeque.size) {
        this.frontDeque.addLast(this.backDeque.removeFirst());
    }
    return this.frontDeque.removeFirst();
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popMiddle = function () {
    if (this.frontDeque.isEmpty() && this.backDeque.isEmpty()) {
        return this.NO_ELEMENTS_IN_QUEUE;
    }
    let elementToPop = this.frontDeque.removeLast();
    if (this.frontDeque.size < this.backDeque.size) {
        this.frontDeque.addLast(this.backDeque.removeFirst());
    }
    return elementToPop;
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popBack = function () {
    if (this.frontDeque.isEmpty() && this.backDeque.isEmpty()) {
        return this.NO_ELEMENTS_IN_QUEUE;
    }
    if (this.frontDeque.size > this.backDeque.size) {
        this.backDeque.addFirst(this.frontDeque.removeLast());
    }
    return this.backDeque.removeLast();
};


function QueueNode(value) {
    this.value = value;
    this.next = null;
    this.previous = null;
}

class DoubleEndedQueue {

    constructor() {
        this.size = 0;
        this.front = null;
        this.back = null;
    }

    addFirst(value) {
        let node = new QueueNode(value);

        if (this.size === 0) {
            this.front = node;
            this.back = this.front;
        } else {
            this.front.previous = node;
            node.next = this.front;
            this.front = node;
        }
        ++this.size;
    }

    addLast(value) {
        let node = new QueueNode(value);

        if (this.size === 0) {
            this.back = node;
            this.front = this.back;
        } else {
            this.back.next = node;
            node.previous = this.back;
            this.back = node;
        }
        ++this.size;
    }

    removeFirst() {
        if (this.size === 0) {
            throw "Container is empty";
        }

        let storeFront = this.front;
        if (--this.size > 0) {
            this.front = this.front.next;
            this.front.previous = null;
        } else {
            this.front = null;
            this.back = null;
        }
        return storeFront.value;
    }

    removeLast() {
        if (this.size === 0) {
            throw "Container is empty";
        }

        let storeBack = this.back;
        if (--this.size > 0) {
            this.back = this.back.previous;
            this.back.next = null;
        } else {
            this.front = null;
            this.back = null;
        }
        return storeBack.value;
    }

    isEmpty() {
        return this.size === 0;
    }
}
