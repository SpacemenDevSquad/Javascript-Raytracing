class camera {
    // Public Variables & Functions
    aspectRatio;
    imageWidth;
    canvasID;
    pixelSample;
    maxDepth;

    constructor(aspectRatio = 16/9, imageWidth = 400, canvasID = "myCanvas", pixelSample = 10, maxDepth = 10) {
        this.aspectRatio = aspectRatio;
        this.imageWidth = imageWidth;
        this.canvasID = canvasID;
        this.pixelSample = pixelSample;
        this.maxDepth = maxDepth;
    }

    render(world = new hittableList()) {
        this.#initialize()

        for (let i = 0; i < this.#imageHeight; i++) {
            console.log("Scanlines remaining:"+(this.#imageHeight-i).toString());
            for (let j = 0; j < this.imageWidth; j++) {
                let currColor = new Vector3(0, 0, 0);

                // Antialiasing
                if (this.pixelSample > 1) {
                    for(let sample = 0; sample < this.pixelSample; sample++) {
                        let r = this.#getRay(j, i);
                        currColor = currColor.Add(this.#rayColor(r, this.maxDepth, world));
                    }
                } else {
                    let pixelSample = this.#pixel00Location.Add(this.#pixelDeltaU.MultiplyConst(j));
                    pixelSample = pixelSample.Add(this.#pixelDeltaV.MultiplyConst(i));
                    const rayDirection = pixelSample.Subtract(this.#center);
                    currColor = this.#rayColor(new ray(this.#center, rayDirection), this.maxDepth, world)
                }

                this.#ctx.fillStyle = this.#WriteColor(currColor.MultiplyConst(this.#pixelSampleScale));
                this.#ctx.fillRect(j, i, 1, 1);
            }
        }
        console.log("Render Complete!");
    }

    // Private Variables & Functions
    #ctx;
    #imageHeight;
    #center;
    #pixelSampleScale;
    #pixel00Location;
    #pixelDeltaU;
    #pixelDeltaV;

    #initialize() {
        // Initalize Canvas, define canvas width & height
        const canvas = document.getElementById(this.canvasID);
        this.#ctx = canvas.getContext("2d");
        this.#imageHeight = Math.round(this.imageWidth/this.aspectRatio);
        if (this.#imageHeight < 1) {this.#imageHeight = 1};
        canvas.width = this.imageWidth;
        canvas.height = this.#imageHeight;

        // Pixel sample scale calculation
        this.#pixelSampleScale = 1.0/this.pixelSample;

        // Camera Center
        this.#center = new Vector3(0, 0, 0);

        // Viewport Dimensions
        const focalLength = 1;
        const viewportHeight = 2;
        const viewportWidth = viewportHeight * (this.imageWidth/this.#imageHeight);

        // Canvas Edge Vectors
        const viewportU = new Vector3(viewportWidth, 0, 0);
        const viewportV = new Vector3(0, -viewportHeight, 0);

        // Distance from pixel to pixel on canvas
        this.#pixelDeltaU = viewportU.DivideConst(this.imageWidth);
        this.#pixelDeltaV = viewportV.DivideConst(this.#imageHeight);

        // Calculate the position of the upper left pixel
        let viewportUpperLeft = new Vector3();
        viewportUpperLeft.copy(this.#center);
        viewportUpperLeft = viewportUpperLeft.Subtract(new Vector3(0, 0, focalLength));
        viewportUpperLeft = viewportUpperLeft.Subtract(viewportU.MultiplyConst(0.5)).Subtract(viewportV.MultiplyConst(0.5));
        this.#pixel00Location = new Vector3();
        this.#pixel00Location.copy(viewportUpperLeft);
        this.#pixel00Location = this.#pixel00Location.Add(this.#pixelDeltaU.DivideConst(2)).Add(this.#pixelDeltaV.DivideConst(2));
    }

    #rayColor(r = new ray(), depth = 0, world = new hittableList()) {
        let rec = new hitRecord();
        if (depth <= 0) {
            return new Vector3(0, 0, 0);
        }
        if (world.hit(r, new interval(0.001, Infinity), rec)) {
            const direction = rec.normal.Add(RandomUnitVector());
            return (this.#rayColor(new ray(rec.p, direction), depth - 1, world)).MultiplyConst(0.5);
        }

        let unitDirection = new Vector3();
        unitDirection = r.direction();
        unitDirection = unitDirection.unitVector();
        const a = (-unitDirection.Y() + 1) * 0.5;
        let a1 = new Vector3(1, 1, 1);
        const a2 = new Vector3(0.2, 0.4, 1);
        a1 = a1.MultiplyConst (1-a).Add(a2.MultiplyConst(a))
        return a1;
    }

    #linearToGamma(x = 0) {
        if (x > 0) {
            return Math.sqrt(x);
        }
        return 0;
    }

    #WriteColor(pixelColor = new Vector3()) {
        const intensity = new interval(0, 0.8);
        let r = pixelColor.X();
        let g = pixelColor.Y();
        let b = pixelColor.Z();

        r = this.#linearToGamma(r);
        g = this.#linearToGamma(g);
        b = this.#linearToGamma(b);

        r = intensity.clamp(r)*256;
        g = intensity.clamp(g)*256;
        b = intensity.clamp(b)*256;
        return "rgb("+r.toString()+" "+g.toString()+" "+b.toString()+")";
    }

    #getRay(i, j) {
        const offset = this.#sampleSquare();
        let pixelSample = this.#pixel00Location.Add(this.#pixelDeltaU.MultiplyConst(i+offset.X()));
        pixelSample = pixelSample.Add(this.#pixelDeltaV.MultiplyConst(j+offset.Y()));
        const rayDirection = pixelSample.Subtract(this.#center);
        return new ray(this.#center, rayDirection);
    }

    #sampleSquare() {
        return new Vector3(Math.random() - 0.5, Math.random() - 0.5, 0)
    }
}