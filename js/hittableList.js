class hittableList extends hittable{
    objects = new Array();

    constructor() {super()}

    clear() {
        this.objects = new Array();
    }

    Add(hittableObj = new hittable()) {
        this.objects.push(hittableObj)
    }

    hit(r = new ray(), rayTMin = 0.0, rayTMax = 0.0, rec = new hitRecord()) {
        let tempRec = new hitRecord();
        let hitAnything = false;
        let closestSoFar = rayTMax;

        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].hit(r, rayTMin, closestSoFar, tempRec)) {
                hitAnything = true;
                closestSoFar = tempRec.t;
                rec.copy(tempRec);
            }
        }

        return hitAnything;
    }
}