class ray {
    #orig
    #dir

    constructor(origin = new Vector3(), direction = new Vector3()) {
        this.#orig = new Vector3();
        this.#dir = new Vector3();

        this.#orig.copy(origin);
        this.#dir.copy(direction);
    }

    origin() {
        return this.#orig
    }

    direction() {
        return this.#dir
    }

    at(t = 0) {
        const rtVec3 = new Vector3();
        rtVec3.copy(this.#dir);
        rtVec3.multiplyConst(t);
        rtVec3.add(this.#orig);
        return rtVec3;
    }
}