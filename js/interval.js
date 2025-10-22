class interval {
    min;
    max;

    constructor(min = Infinity, max = -Infinity) {

    }

    size() {
        return this.max - this.min;
    }

    contains(x = 0) {
        return this.min <= x && x <= this.max;
    }

    surrounds(x = 0) {
        return this.min < x && x < this.max;
    }
}