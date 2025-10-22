/**
 * Created 2025
 * Peter Brumbach
 */

document.addEventListener("DOMContentLoaded", () => {
    mainMethod();
});

let cam;
let world;

function mainMethod() {
    // World
    world = new hittableList();
    const materialGround = new lambertian(new Vector3(0.8, 0.8, 0.0));
    const middleBallMat = new lambertian(new Vector3(0.1, 0.2, 0.5));
    const leftBallMat = new dielectric(1.5);
    const bubbleMat = new dielectric(1/1.5);
    const rightBallMat  = new metal(new Vector3(0.8, 0.6, 0.2), 1.0);

    world.Add(new Sphere(new Vector3( 0.0, -100.5, -1.0), 100.0, materialGround));
    world.Add(new Sphere(new Vector3( 0.0,    0.0, -1.2), 0.5, middleBallMat));
    world.Add(new Sphere(new Vector3(-1.0,    0.0, -1.0), 0.5, leftBallMat));
    world.Add(new Sphere(new Vector3(-1.0,    0.0, -1.0), 0.4, bubbleMat));
    world.Add(new Sphere(new Vector3( 1.0,    0.0, -1.0), 0.5, rightBallMat));

    cam = new Camera(16/9, 800, 10, new Vector3(0, 0, 0), 90);

    self.postMessage("Starting!");
    cam.render(world);
}