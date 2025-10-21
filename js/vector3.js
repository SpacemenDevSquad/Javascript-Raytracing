class Vector3 {
    constructor(e0 = 0.0, e1 = 0.0, e2 = 0.0) {
        this.e = [e0, e1, e2];
    }

    getX() {
        return this.e[0];
    }
    getY() {
        return this.e[1];
    }
    getZ() {
        return this.e[2];
    }

    Add(v = new Vector3()) {
        const rtVec3 = new Vector3();
        rtVec3.e[0] = this.e[0] + v.e[0];
        rtVec3.e[1] = this.e[1] + v.e[1];
        rtVec3.e[2] = this.e[2] + v.e[2];
        return rtVec3;
    }

    Subtract(v = new Vector3()) {
        const rtVec3 = new Vector3();
        rtVec3.e[0] = this.e[0] - v.e[0];
        rtVec3.e[1] = this.e[1] - v.e[1];
        rtVec3.e[2] = this.e[2] - v.e[2];
        return rtVec3;
    }

    MultiplyVec3(v = new Vector3()) {
        const rtVec3 = new Vector3();
        rtVec3.e[0] = this.e[0] * v.e[0];
        rtVec3.e[1] = this.e[1] * v.e[1];
        rtVec3.e[2] = this.e[2] * v.e[2];
        return rtVec3;
    }

    MultiplyConst(t = 1) {
        const rtVec3 = new Vector3();
        rtVec3.e[0] = this.e[0] * t;
        rtVec3.e[1] = this.e[1] * t;
        rtVec3.e[2] = this.e[2] * t;
        return rtVec3;
    }

    DivideConst(t = 1) {
        return this.MultiplyConst(1/t);
    }
    
    copy(v = new Vector3()) {
        this.e[0] = v.e[0];
        this.e[1] = v.e[1];
        this.e[2] = v.e[2];
    }

    length() {
        return Math.sqrt(this.length_squared())
    }

    length_squared() {
        return this.e[0]*this.e[0] + this.e[1]*this.e[1] + this.e[2]*this.e[2];
    }

    dot(v = new Vector3()) {
        return this.e[0] * v.e[0] + this.e[1] * v.e[1] + this.e[2] * v.e[2];
    }

    cross(v = new Vector3()) {
        return new Vector3(this.e[1] * v.e[2] - this.e[2] * v.e[1],
                this.e[2] * v.e[0] - this.e[0] * v.e[2],
                this.e[0] * v.e[1] - this.e[1] * v.e[0]);
    }

    unitVector() {
        return this.DivideConst(this.length());
    }

    toString() {
        return "Vector3("+this.e[0].toString()+", "+this.e[1].toString()+", "+this.e[2].toString()+")";
    }
}