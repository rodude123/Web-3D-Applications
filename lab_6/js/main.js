import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
let slideIndex = 1;

showSlides(slideIndex);

function nextSlide(n)
{
    showSlides(slideIndex += n);
}

function showSlides(n) 
{
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++)
    {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "flex";
}

function swapPages(pg1, pg2)
{
    if (document.querySelector(pg2).classList.contains("showPg"))
    {
        return;
    }

    document.querySelector(pg1).classList.toggle("showPg");
    document.querySelector(pg1).classList.toggle("hidePg");
    document.querySelector(pg2).classList.toggle("showPg");
    document.querySelector(pg2).classList.toggle("hidePg");
}

// three js stuff
let camera, scene, renderer;
let canvas = document.querySelector("#fantaCanvas");

function init()
{
    scene = new THREE.Scene();
    // scenes.background = new THREE.Color(0x000000, 0);
    camera = new THREE.PerspectiveCamera(70, 1, 1, 1000);
    camera.position.set( - 1.8, 0.6, 2.7 );
    renderer = new THREE.WebGLRenderer({antialias: true, canvas: canvas, alpha: true});
    renderer.setSize( 500, 500 );
    renderer.setClearColor(0x000000, 0);
    // document.querySelector("#fanta .modelContent").appendChild( renderer.domElement );

    const loader = new GLTFLoader().setPath('./assets/models/');
    loader.load('fanta can.glb', function (gltf)
    {
        scene.add(gltf.scene);
        render();
    });

    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.HemisphereLight(color, intensity);
    light.position.set(0, 1, 0);
    light.groundColor = new THREE.Color(0xFFFFFF);
    scene.add(light);
    
    const dLight = new THREE.SpotLight(color,  intensity);
    dLight.position.set(5, 10, 7.5);
    dLight.angle = 0.314;
    dLight.decay = 1;
    scene.add(dLight);

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render ); // use if there is no animation loop
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.target.set( 0, 0, - 0.2 );
    controls.update();


    window.addEventListener( 'resize', onWindowResize ); 
    
    animate(); 
}

function animate() 
{
    requestAnimationFrame( animate );

    /*cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;*/
    

    renderer.render( scene, camera );
}

function onWindowResize() 
{
    if (window.innerWidth > 500 && window.innerHeight > 500)
    {
        camera.aspect = 1;
        renderer.setSize( 500, 500 );
        camera.updateProjectionMatrix();
        return;
    }
    
    camera.aspect = window.innerWidth / (window.innerHeight / 2);
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, (window.innerHeight / 2) );

    render();
}

function render() 
{
    renderer.render( scene, camera );
}

document.addEventListener("DOMContentLoaded", () => 
{
    fetch("/mvc/HomeDrinksData").then(res => res.json().then(json => 
    {
        if (res.ok)
        {
            
        }
    }));
});

document.querySelector("#drinksMenu").addEventListener("click", e =>
{
    e.target.classList.toggle("active")
});

document.querySelector("#burger").addEventListener("click", () =>
{
    document.querySelector("#navLinks").classList.toggle("shown");
    document.querySelector("#drinksMenu").classList.remove("active");
});

document.body.addEventListener("click", e =>
{
    if (e.target !== document.querySelector("#drinksMenu"))
    {
        document.querySelector("#drinksMenu").classList.remove("active");
    }
});

document.querySelector("#fantaPg").addEventListener("click", () =>
{
    fetch("/mvc/individualDrink/fanta").then(res => res.json().then(json =>
    {
        if (res.ok)
        {
            // fill out the page with the data and images
            console.log(json)
        }
    }))

    init();
    render();

    swapPages(`#${document.querySelector(".showPg").id}`, "#fanta");
});

document.querySelector("#homePg").addEventListener("click", () =>
{
    swapPages(`#${document.querySelector(".showPg").id}`, "#home");
});

document.querySelector("#prevSlide").addEventListener("click", () =>
{
    nextSlide(-1);
});

document.querySelector("#nextSlide").addEventListener("click", () =>
{
    nextSlide(1);
});
