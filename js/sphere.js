class Sphere extends hittable {
    #center;
    #radius;

    constructor(center = new Vector3(), radius = 0.0) {
        super();
        this.#center = center;
        this.#radius = radius;
    }

    hit(r = new ray(), rayTMin = 0.0, rayTMax = 0.0, rec = new hitRecord()) {
        const oc = this.#center.Subtract(r.origin());
        const a = r.direction().length_squared();
        const h = r.direction().dot(oc);
        const c = oc.length_squared(oc) - (this.#radius * this.#radius);
        const discriminant = h*h - a*c;
        if (discriminant < 0) return false;

        const sqrtd = Math.sqrt(discriminant);

        let root = (h - sqrtd) / a;
        if (root <= rayTMin || rayTMax <= root) {
            root = (h + sqrtd) / a
            if (root <= rayTMin || rayTMax <= root) return false;
        }

        rec.t = root;
        rec.p = r.at(rec.t);
        const outwardNormal = (rec.p.Subtract(this.#center)).DivideConst(this.#radius);
        rec.setFaceNormal(r, outwardNormal);

        return true;
    }
}