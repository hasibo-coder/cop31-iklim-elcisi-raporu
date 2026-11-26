// Arka plan videoları: sessiz otomatik oynatma (mobilde de). Oynatılamazsa poster görseli kalır.
// Tema 4: iki videoyu sırayla oynat (mercan, sonra yangın). JS yoksa ilk video döner.
(function(){try{
  var vs=document.querySelectorAll('.vbg video');
  function go(v){try{v.muted=true;v.defaultMuted=true;v.setAttribute('playsinline','');var p=v.play();if(p&&p.catch)p.catch(function(){});}catch(e){}}
  // Sunucu aralık (Range) isteğini desteklemezse bazı mobil tarayıcılar videoyu açmaz: dosyayı bellekte al, blob olarak oynat.
  function blobFallback(v){
    if(v._blob)return; v._blob=true;
    var src=v.currentSrc||(v.querySelector('source')&&v.querySelector('source').src)||v.src;
    try{fetch(src).then(function(r){return r.blob();}).then(function(b){v.src=URL.createObjectURL(b);go(v);}).catch(function(){});}catch(e){}
  }
  vs.forEach(function(v){
    var a=v.querySelector('source').getAttribute('src'),b=v.getAttribute('data-seq'),cur=0;
    go(v);
    v.addEventListener('loadeddata',function(){go(v);});
    v.addEventListener('error',function(){blobFallback(v);},true);
    var s=v.querySelector('source'); if(s)s.addEventListener('error',function(){blobFallback(v);});
    setTimeout(function(){if(v.readyState<2&&!v._blob)blobFallback(v);},3000);
    if(b){v.loop=false;v.addEventListener('ended',function(){cur=1-cur;v._blob=false;v.src=cur?b:a;go(v);});}
  });
  document.addEventListener('visibilitychange',function(){if(!document.hidden)vs.forEach(go);});
  ['touchstart','click','scroll'].forEach(function(ev){window.addEventListener(ev,function(){vs.forEach(function(v){if(v.paused)go(v);});},{once:true,passive:true});});
}catch(e){}})();
