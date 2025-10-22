/**
 * Created 2025
 * Peter Brumbach
 */

document.addEventListener("DOMContentLoaded", () => {
    mainMethod();
});

function mainMethod() {
    // World
    let world = new hittableList();
    world.Add(new Sphere(new Vector3(0, 0, -1), 0.5));
    world.Add(new Sphere(new Vector3(0,-100.5,-1), 100));

    let cam = new camera(16/9, 400, "myCanvas", 10, 10);

    cam.render(world);
}