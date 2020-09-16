AFRAME.registerComponent('tune-renderer',{
    schema: {
        // bar: {type: 'number'},
        // baz: {type: 'string'}
      },
      init: function () {
        // Do something when component first attached.
        let renderer = this.el.renderer;
        renderer.toneMapping = THREE.ReinhardToneMapping;
        renderer.toneMappingExposure = 2.0;
      },
      update: function () {
        // Do something when component's data is updated.
      },
      remove: function () {
        // Do something the component or its entity is detached.
      },
      tick: function (time, timeDelta) {
        // Do something on every scene tick or frame.
      }
})



AFRAME.registerComponent('modify-materials',{
    init:function(){
      this.el.addEventListener("model-loaded",()=>{
          const obj=this.el.getObject3D("mesh");
          obj.traverse(node=>{
              if(node.isMesh){
                  node.materials.opacity = 255
              }
          })
      })
    }
})

function on_switch(){
    const clips = [
        'city_action',
        'city_idle'
    ]
    let bot = document.querySelector('#bot');
    let mixer = bot.getAttribute("animation-mixer");
    console.log(mixer)
    let clipIndex = clips.indexOf(mixer.clip);
    let nextclipIndex = (clipIndex+1)%clips.length;
    bot.setAttribute("animation-mixer","clip:"+clips[nextclipIndex]) 
}

document.querySelector(".switch-button").addEventListener("click",on_switch);