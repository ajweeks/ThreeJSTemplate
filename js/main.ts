///<reference path="three.d.ts"/>

// Copyright AJ Weeks 2015

function get(what: string): HTMLElement {
    return document.getElementById(what);
}

class ThreeJSTest {
    previousTime: number = 0.0;
    elapsed: number = 0.0;

    renderer: THREE.WebGLRenderer;
    camera: THREE.Camera;
    scene: THREE.Scene;
    sphere: THREE.Mesh;
    width = 720;
    height = 480;

    constructor() {
        this.renderer = new THREE.WebGLRenderer({alpha: true});
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(0xFFFFFF, 1);
        get('content').appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(45, this.width/this.height, 0.1, 1000);

        this.camera.position = new THREE.Vector3(0, 0, -20);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        var sphereGeometry = new THREE.SphereGeometry(5, 15, 15);
        var sphereMaterial = new THREE.MeshBasicMaterial( {
            color: 0x553311, wireframe: true
        });

        this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

        this.sphere.position = new THREE.Vector3(0, 0, 0);

        this.scene.add(this.sphere);
        this.scene.add(new THREE.AmbientLight(new THREE.Color(0.9, 0.9, 0.9).getHex()));

        this.renderer.render(this.scene, this.camera);
    }

    render() {
        requestAnimationFrame(() => this.render());
        var now = new Date().getTime();
        this.elapsed += (this.previousTime - now);

        this.sphere.rotateX(0.05);
        this.sphere.rotateY(0.02);

        this.renderer.render(this.scene, this.camera);
        this.previousTime = now;
    }

    start(): void {
        this.previousTime = new Date().getTime();
        this.render();
    }
}
window.onload = () => {
    var three = new ThreeJSTest();
    three.start();
};
