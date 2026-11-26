(function(){try{
  var vs=document.querySelectorAll('.vbg video');
  var reduce=false;try{reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;}catch(e){}
  function go(v){try{v.muted=true;v.defaultMuted=true;v.setAttribute('playsinline','');var p=v.play();if(p&&p.catch)p.catch(function(){});}catch(e){}}
  function blobFallback(v){ if(v._blob)return; v._blob=true; var src=v.currentSrc||(v.querySelector('source')&&v.querySelector('source').src)||v.src;
    try{fetch(src).then(function(r){return r.blob();}).then(function(b){v.src=URL.createObjectURL(b);if(!reduce||v._user)go(v);}).catch(function(){});}catch(e){} }
  function btn(v){
    var c=v.closest('.cover')||v.parentNode; if(c.querySelector('.vplay'))return c.querySelector('.vplay');
    var b=document.createElement('button');b.type='button';b.className='vplay';b.textContent='Arka plan videosunu oynat';
    b.addEventListener('click',function(){v._user=true;v.style.display='block';go(v);b.hidden=true;});
    c.appendChild(b);return b;}
  vs.forEach(function(v){ var a=v.querySelector('source').getAttribute('src'),b=v.getAttribute('data-seq'),cur=0;
    if(reduce){v.removeAttribute('autoplay');v.pause();v.style.display='block';btn(v);}
    else{go(v);}
    v.addEventListener('loadeddata',function(){if(!reduce||v._user)go(v);});
    v.addEventListener('error',function(){blobFallback(v);},true);
    var s=v.querySelector('source'); if(s)s.addEventListener('error',function(){blobFallback(v);});
    setTimeout(function(){if(v.readyState<2&&!v._blob)blobFallback(v);},3000);
    setTimeout(function(){if(!reduce&&v.paused&&!document.hidden){btn(v).hidden=false;}},2500);
    v.addEventListener('playing',function(){var p=(v.closest('.cover')||document).querySelector('.vplay');if(p)p.hidden=true;});
    if(b){v.loop=false;v.addEventListener('ended',function(){cur=1-cur;v._blob=false;v.src=cur?b:a;go(v);});} });
  document.addEventListener('visibilitychange',function(){if(!document.hidden)vs.forEach(function(v){if(!reduce||v._user)go(v);});});
  if(!reduce)['touchend','click','keydown'].forEach(function(ev){window.addEventListener(ev,function(){vs.forEach(function(v){if(v.paused)go(v);});},{once:true,passive:true});});
}catch(e){}})();
