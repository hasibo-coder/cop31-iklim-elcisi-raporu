(function(){
  try{var u=location.href.split('#')[0];if(/^https?:/.test(u)){document.getElementById('atifurl').textContent=u;}}catch(e){}
  var b=document.getElementById('kopyala'),d=document.getElementById('kopyadurum');
  if(!b)return;
  b.addEventListener('click',function(){
    var t=document.getElementById('atifmetin').innerText.trim();
    function ok(){d.textContent='Kopyalandı.';}
    function sec(){try{var r=document.createRange();r.selectNodeContents(document.getElementById('atifmetin'));var s=getSelection();s.removeAllRanges();s.addRange(r);d.textContent='Metin seçildi; Ctrl+C ile kopyalayabilirsin.';}catch(e){d.textContent='Metni elle seçip kopyala.';}}
    try{navigator.clipboard.writeText(t).then(ok,sec);}catch(e){sec();}
  });
})();
