function get(what) {
    return document.getElementById(what);
}
var ThreeJSTest = (function () {
    function ThreeJSTest() {
        this.previousTime = 0.0;
        this.elapsed = 0.0;
        this.width = 720;
        this.height = 480;
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(0xFFFFFF, 1);
        get('content').appendChild(this.renderer.domElement);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000);
        this.camera.position = new THREE.Vector3(0, 0, -20);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        var sphereGeometry = new THREE.SphereGeometry(5, 15, 15);
        var sphereMaterial = new THREE.MeshBasicMaterial({
            color: 0x553311, wireframe: true
        });
        this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        this.sphere.position = new THREE.Vector3(0, 0, 0);
        this.scene.add(this.sphere);
        this.scene.add(new THREE.AmbientLight(new THREE.Color(0.9, 0.9, 0.9).getHex()));
        this.renderer.render(this.scene, this.camera);
    }
    ThreeJSTest.prototype.render = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.render(); });
        var now = new Date().getTime();
        this.elapsed += (this.previousTime - now);
        this.sphere.rotateX(0.05);
        this.sphere.rotateY(0.02);
        this.renderer.render(this.scene, this.camera);
        this.previousTime = now;
    };
    ThreeJSTest.prototype.start = function () {
        this.previousTime = new Date().getTime();
        this.render();
    };
    return ThreeJSTest;
})();
window.onload = function () {
    var three = new ThreeJSTest();
    three.start();
};
