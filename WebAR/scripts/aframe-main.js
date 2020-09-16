AFRAME.registerComponent('tune-renderer',{
    init:function(){
        let renderer = this.el.renderer;
        renderer.toneMapping = THREE.ReinhardToneMapping;
        renderer.toneMappingExposure = 2.0;
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