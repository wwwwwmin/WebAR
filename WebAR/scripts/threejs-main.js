// 计算机图形学要素：模型、光照、镜头
//在这里还需要渲染器、场景
class App {
    constructor(canvas, model, animations) {
        this.scene = App.createScene()
            .add(model)
            .add(App.createAmbientLight())
            .add(App.createtDirectionalLight())
        this.camera = App.createCamera();
        this.renderer = App.createRenderer(canvas);
        this.mixer = new AnimationMixer(model, animations)
        this.update()
    }

    static createScene() {
        let scene = new THREE.Scene();
        scene.background = new THREE.Color(0x5F9EA0);
        return scene;
    }
    //添加背景环境光，均匀的照亮场景中的所有物体
    static createAmbientLight() {
        return new THREE.AmbientLight(0xffffff, 10) //颜色，光照强度
    }

    //添加方向光
    static createtDirectionalLight() {
        let light = new THREE.DirectionalLight(0xffffff, 7);
        light.position.set(0, 50, 300);
        return light;
    }

    static createCamera() {
        // 摄像机视锥体垂直视野角度，摄像机视锥体长宽比，摄像机视锥体近端面，摄像机视锥体远端面
        let camera = new THREE.PerspectiveCamera(
            90,
            Window.innerWidth / Window.innerHeight,
            1,
            1000
        );
        camera.position.z = 9;
        camera.position.x = 0;
        camera.position.y = 0;
        return camera;
    }

    static createRenderer(canvas) {
        let renderer = new THREE.WebGLRenderer({
            canvas
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.toneMapping = THREE.ReinhardToneMapping;
        renderer.toneMappingExposure = 2.0;
        return renderer;
    }

    update() {
        this.resize();
        this.mixer.update();
        this.renderer.render(this.scene, this.camera); //通过镜头渲染到场景
        window.requestAnimationFrame(() => { //窗口刷新自动调用update
            this.update()
        })
    }

    resize() {
        let canvasSize = this.renderer.getSize(new THREE.Vector2());
        let windowSize = new THREE.Vector2(window.innerWidth, window.innerHeight);
        if (!canvasSize.equals(windowSize)) {
            this.renderer.setSize(windowSize.x, windowSize.y, false); //重置画布大小
            this.camera.aspect = windowSize.x / windowSize.y; //重置镜头比例
            this.camera.updateProjectionMatrix();
        }
    }
}

class AnimationMixer {
    constructor(model, animations) {
        this.clock = new THREE.Clock(); //动画由时钟控制
        this.mixer = new THREE.AnimationMixer(model);
        this.animations = animations;
    }

    play(clip) {
        let animation = this.animations.find(a => a.name === clip)
        if (animation) {
            this.mixer.stopAllAction();
            this.mixer.clipAction(animation).play();
            this.clip = animation
        }
    }

    update() {
        let delta = this.clock.getDelta(); //获取自 oldTime 设置后到当前的秒数。 同时将 oldTime 设置为当前时间。
        this.mixer.update(delta)
    }
}

let loader = new THREE.GLTFLoader();
loader.load('models/scene.gltf', function (gltf) {
    let model = gltf.scene;
    model.scale.set(5, 5, 5);
    model.position.y = -4
    let canvas = document.querySelector('#app-canvas');
    let app = new App(canvas, model, gltf.animations);
    app.mixer.play('city_action')

    document.querySelector(".switch-button").addEventListener("click", () => {
        const clips = [
            'city_action',
            'city_idle'
        ]
console.log(app.mixer.clip)
        let clipIndex = clips.indexOf(app.mixer.clip.name);
        clipIndex = (clipIndex + 1) % clips.length
        app.mixer.play(clips[clipIndex])
    })
}, undefined, function (error) {
    console.error(error);
});