import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
let slideIndex = 1;

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

function insertIndividualDrinkData(json)
{
    document.querySelector("#modelInfo h1").innerText = json[0].title;
    document.querySelector("#modelInfo h2").innerText = json[0].subtitle;
    document.querySelector("#modelInfo .drinkInfo p").innerText = json[0].info
    document.querySelector("#modelInfo .drinkInfo a").href = json[0].linkToCocaCola;
    document.querySelector("#slideshow div").innerHTML = "";

    for (let i = 0; i < json.length; i++)
    {
       let slideElement = document.createElement("div");
       slideElement.className = "mySlides fade";
       let slideNumber = document.createElement("div");
       slideNumber.className = "numberText";
       slideNumber.innerText = `${i+1} / ${json.length + 1}`;
       let slideImage = document.createElement("img");
       slideImage.src = json[i].imgLoc;
       slideImage.alt = json[i].imgAlt;
       let slideSubText = document.createElement("div");
       slideSubText.className = "text";
       slideSubText.innerText = json[i].subText;
       slideElement.appendChild(slideNumber);
       slideElement.appendChild(slideImage);
       slideElement.appendChild(slideSubText);
       document.querySelector("#slideshow div").appendChild(slideElement);
    }
    
    showSlides(slideIndex);
}


function showIndividualDrink(drink)
{
    fetch(`mvc/index.php/individualDrink/${drink}`).then(res => res.json().then(json =>
    {
        if (res.ok)
        {
            insertIndividualDrinkData(json);
            init(json[0].modelLink);
            render();
        }
    }))
    
    swapPages(`#${document.querySelector(".showPg").id}`, "#drink");
}

// three js stuff
let camera, scene, renderer, obj, hLight, sLight, controls;
let rotX, rotY, rotZ = false;
let canvas = document.querySelector("#fantaCanvas");

const color = 0xFFFFFF;
const intensity = 1;

function init(model)
{
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, 1, 1, 1000);
    camera.position.set( - 1.8, 0.6, 2 );
    renderer = new THREE.WebGLRenderer({antialias: true, canvas: canvas, alpha: true});
    renderer.setSize( 500, 500 );
    renderer.setClearColor(0x000000, 0);

    const loader = new GLTFLoader().setPath('./assets/models/');
    loader.load(model, function (gltf)
    {
        obj = gltf.scene;
        scene.add(gltf.scene);
        render();
    });

    hLight = new THREE.HemisphereLight(color, intensity);
    hLight.position.set(0, 1, 0);
    hLight.groundColor = new THREE.Color(color);
    scene.add(hLight);
    
    sLight = new THREE.SpotLight(color,  intensity);
    sLight.position.set(5, 10, 7.5);
    sLight.angle = 0.314;
    sLight.decay = 1;
    scene.add(sLight);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener( 'change', render ); 
    
    window.addEventListener( 'resize', onWindowResize ); 
    
    animate(); 
}

function animate() 
{
    requestAnimationFrame( animate );
    
    if (rotX)
    {
        obj.rotation.x += 0.01;
    }
    
    if (rotY)
    {
        obj.rotation.y += 0.01;
    }
    
    if (rotZ)
    {
        obj.rotation.z += 0.01;
    }

    if (!rotX && !rotY && !rotZ)
    {
        obj.rotation.x = 0;
        obj.rotation.y = 0;
        obj.rotation.z = 0;
    }
    
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
    fetch("mvc/index.php/homeDrinks").then(res => res.json().then(json => 
    {
        if (res.ok)
        {
            for (let i = 0; i < json.length; i++)
            {
                let card = document.createElement("div");
                card.className = "card";
                let img = document.createElement("img");
                img.src = json[i].imgLink;
                img.alt = json[i].imgAlt;
                let cardBody = document.createElement("div");
                cardBody.className = "cardBody";
                let cardTitle = document.createElement("h3");
                cardTitle.innerText = json[i].title;
                let cardText = document.createElement("p");
                cardText.innerText = json[i].information;
                let cardLink = document.createElement("a");
                cardLink.href = json[i].actualLink;
                cardLink.innerText = "Finds out more...";
                cardLink.className = "btn btnPrimary";
                
                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardText);
                cardBody.appendChild(cardLink);
                card.appendChild(img);
                card.appendChild(cardBody);
                document.querySelector("#homeDrinks").appendChild(card);
            } 
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

document.querySelector("#cocaColaPg").addEventListener("click", () =>
{
    showIndividualDrink("cocacola");
});

document.querySelector("#fantaPg").addEventListener("click", () =>
{
    showIndividualDrink("fanta");
});

document.querySelector("#costaPg").addEventListener("click", () =>
{
    showIndividualDrink("costa");
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

// three js interactive buttons
document.querySelector("#toggleWireframe").addEventListener("click", () =>
{
    obj.traverse((node) => 
    {
        if (!node.isMesh) return;
        node.material.wireframe = !node.material.wireframe;
    });
});

document.querySelector("#toggleLighting").addEventListener("click", () =>
{
    hLight.visible = !hLight.visible;
    sLight.visible = !sLight.visible;
});

document.querySelector("#rotX").addEventListener("click", () => 
{
   rotX = !rotX;
});

document.querySelector("#rotY").addEventListener("click", () => 
{
   rotY = !rotY;
});

document.querySelector("#rotZ").addEventListener("click", () => 
{
   rotZ = !rotZ;
});

document.querySelector("#stopRot").addEventListener("click", () => 
{
    rotX = false;
    rotY = false;
    rotZ = false;
});
