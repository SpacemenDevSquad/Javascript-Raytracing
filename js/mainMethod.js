/**
 * Created 2025
 * Peter Brumbach
 */

document.addEventListener("DOMContentLoaded", () => {
    world = new hittableList();
    initalize();
});

// Global Variables
let cam;
let world;

// Mutable Camera Variables
let imageWidth = 400;
let pixelSample = 10;
let position = new Vector3(0, 0, 0);
let fov = 90;

function initalize() {
    // Initalize Sliders

    // FOV Slider
    const fovSlider = document.getElementById("fovSlider");
    const fovText = document.getElementById("fovText");
    const FOV_DEFAULT_VALUE = 90;
    fovSlider.max = 150;
    fovSlider.min = 20;
    fovSlider.value = FOV_DEFAULT_VALUE; 
    fov = FOV_DEFAULT_VALUE;
    fovText.textContent = "Camera FOV: "+FOV_DEFAULT_VALUE.toString();

    // Width Slider
    const widthSlider = document.getElementById("qualitySlider");
    const widthText = document.getElementById("qualityText");
    const WIDTH_DEFAULT_VALUE = 400;
    widthSlider.max = 1000;
    widthSlider.min = 20;
    widthSlider.value = WIDTH_DEFAULT_VALUE; 
    imageWidth = WIDTH_DEFAULT_VALUE;
    widthText.textContent = "Image Quality: "+WIDTH_DEFAULT_VALUE.toString();

    // Text Field Functions
    const Xtext = document.getElementById("camXPos");
    const Ytext = document.getElementById("camYPos");
    const Ztext = document.getElementById("camZPos");
    Xtext.value = "";
    Ytext.value = "";
    Ztext.value = "";

    // Add the Ground to the World
    const materialGround = new lambertian(new Vector3(0.8, 0.8, 0.0));
    world.Add(new Sphere(new Vector3( 0.0, -100.5, -1.0), 100.0, materialGround));

    // World
    const middleBallMat = new lambertian(new Vector3(0.1, 0.2, 0.5));
    const leftBallMat = new dielectric(1.5);
    const bubbleMat = new dielectric(1/1.5);
    const rightBallMat  = new metal(new Vector3(0.8, 0.6, 0.2), 0.0);

    world.Add(new Sphere(new Vector3( 0.0,    0.0, -1.2), 0.5, middleBallMat));
    world.Add(new Sphere(new Vector3(-1.0,    0.0, -1.0), 0.5, leftBallMat));
    world.Add(new Sphere(new Vector3(-1.0,    0.0, -1.0), 0.4, bubbleMat));
    world.Add(new Sphere(new Vector3( 1.0,    0.0, -1.0), 0.5, rightBallMat));
}

function startRender() {
    cam = new Camera(16/9, imageWidth, pixelSample, position, fov);
    cam.render(world);
}


// Slider Functions
function setFov() {
    const slider = document.getElementById("fovSlider");
    const text = document.getElementById("fovText");
    fov = slider.value;
    text.textContent = "Camera FOV: "+fov.toString();
}

function setQuality() {
    const slider = document.getElementById("qualitySlider");
    const text = document.getElementById("qualityText");
    imageWidth = slider.value;
    text.textContent = "Image Quality: "+imageWidth.toString();
}

// Text Field Functions
function setPosition() {
    const UPPER_BOUND = 20;
    const LOWER_BOUND = -20;
    const Xtext = document.getElementById("camXPos");
    const Ytext = document.getElementById("camYPos");
    const Ztext = document.getElementById("camZPos");
    let x = 0;
    let y = 0;
    let z = 0;
    if (!isNaN(parseFloat(Xtext.value))) {
        x = parseFloat(Xtext.value);
        if (x > UPPER_BOUND) {
            Xtext.value = UPPER_BOUND;
            x = UPPER_BOUND;
        }
        if (x < LOWER_BOUND) {
            Xtext.value = LOWER_BOUND;
            x = LOWER_BOUND;
        }
    }
    if (!isNaN(parseFloat(Ytext.value))) {
        y = parseFloat(Ytext.value);
        if (y > UPPER_BOUND) {
            Ytext.value = UPPER_BOUND;
            y = UPPER_BOUND;
        }
        if (y < 0) {
            Ytext.value = LOWER_BOUND;
            y = LOWER_BOUND;
        }
    }
    if (!isNaN(parseFloat(Ztext.value))) {
        z = parseFloat(Ztext.value);
        if (z > UPPER_BOUND) {
            Ztext.value = UPPER_BOUND;
            z = UPPER_BOUND;
        }
        if (z < LOWER_BOUND) {
            Ztext.value = LOWER_BOUND;
            z = LOWER_BOUND;
        }
    }
    position = new Vector3(x, y, z);
    console.log(position.toString());
}