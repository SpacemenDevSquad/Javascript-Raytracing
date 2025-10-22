/**
 * Created 2025
 * Peter Brumbach
 */

document.addEventListener("DOMContentLoaded", () => {
    mainMethod();
});

function mainMethod() {

    // Canvas
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    const ASPECT_RATIO = 16/9;
    const width = 800;
    let height = width/ASPECT_RATIO;
    if (height < 1) {height = 1};
    canvas.width = width;
    canvas.height = height;

    // World
    let world = new hittableList();
    world.Add(new Sphere(new Vector3(0, 0, -1), 0.5));
    world.Add(new Sphere(new Vector3(0,-100.5,-1), 100));

    // Camera
    const focalLength = 1;
    const viewportHeight = 2;
    const viewportWidth = viewportHeight * (width/height);
    const cameraCenter = new Vector3(0, 0, 0);
    const viewportU = new Vector3(viewportWidth, 0, 0);
    const viewportV = new Vector3(0, -viewportHeight, 0);
    const pixelDeltaU = viewportU.DivideConst(width);
    const pixelDeltaV = viewportV.DivideConst(height);
    viewportUpperLeft = new Vector3();
    viewportUpperLeft.copy(cameraCenter);
    viewportUpperLeft = viewportUpperLeft.Subtract(new Vector3(0, 0, focalLength));
    viewportUpperLeft = viewportUpperLeft.Subtract(viewportU.MultiplyConst(0.5)).Subtract(viewportV.MultiplyConst(0.5));
    let pixel00Location = new Vector3();
    pixel00Location.copy(viewportUpperLeft);
    pixel00Location = pixel00Location.Add(pixelDeltaU.DivideConst(2)).Add(pixelDeltaV.DivideConst(2));

    // Rendering

    for (let i = 0; i < height; i++) {
        // console.log("Scanlines remaining:"+(height-i).toString());
        for (let j = 0; j < width; j++) {
            let pixelCenter = new Vector3();
            pixelCenter.copy(pixel00Location);
            pixelCenter = pixelCenter.Add(pixelDeltaU.MultiplyConst(j));
            pixelCenter = pixelCenter.Add(pixelDeltaV.MultiplyConst(i));

            rayDirection = new Vector3();
            rayDirection.copy(pixelCenter);
            rayDirection = rayDirection.Subtract(cameraCenter);
            const r = new ray(cameraCenter, rayDirection);

            const currColor = rayColor(r, world);
            ctx.fillStyle = WriteColor(currColor);
            ctx.fillRect(j, i, 1, 1);
        }
    }
    console.log("Render Complete!");
}

function WriteColor(pixelColor = new Color()) {
    const r = pixelColor.X() * 255.999;
    const g = pixelColor.Y() * 255.999;
    const b = pixelColor.Z() * 255.999;
    return "rgb("+r.toString()+" "+g.toString()+" "+b.toString()+")";
}

function rayColor(r = new ray(), world = new hittableList()) {
    let rec = new hitRecord();
    if (world.hit(r, 0, Infinity, rec)) {
        return (rec.normal.Add(new Vector3(1,1,1))).MultiplyConst(0.5);
    }

    let unitDirection = new Vector3();
    unitDirection = r.direction();
    unitDirection = unitDirection.unitVector();
    const a = (-unitDirection.Y() + 1) * 0.5;
    let a1 = new Vector3(1, 1, 1);
    const a2 = new Vector3(0.5, 0.7, 1);
    a1 = a1.MultiplyConst (1-a).Add(a2.MultiplyConst(a))
    return a1;
}