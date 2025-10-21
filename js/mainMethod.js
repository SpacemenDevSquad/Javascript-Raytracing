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
    const width = 400;
    let height = width/ASPECT_RATIO;
    if (height < 1) {height = 1};
    canvas.width = width;
    canvas.height = height;

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

            const currColor = rayColor(r);
            ctx.fillStyle = WriteColor(currColor);
            ctx.fillRect(j, i, 1, 1);
        }
    }
    console.log("Render Complete!");
}

function WriteColor(pixelColor = new Vector3()) {
    const r = pixelColor.getX() * 255.999;
    const g = pixelColor.getY() * 255.999;
    const b = pixelColor.getZ() * 255.999;
    return "rgb("+r.toString()+" "+g.toString()+" "+b.toString()+")";
}

function rayColor(r = new ray()) {
    unitDirection = new Vector3();
    unitDirection = r.direction();
    //unitDirection = unitDirection.unitVector();
    const a = (unitDirection.getY() + 1) * 0.5;
    let a1 = new Vector3(0.8, 0.9, 1);
    const a2 = new Vector3(0.5, 0.7, 1);
    a1 = a1.MultiplyConst(1-a).Add(a2.MultiplyConst(a))
    return a1;
}