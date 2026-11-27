(function(){
  var EN=(document.documentElement.lang||'').indexOf('en')===0;
  try{var u=location.href.split('#')[0];if(/^https?:/.test(u)){document.getElementById('atifurl').textContent=u;}}catch(e){}
  var b=document.getElementById('kopyala'),d=document.getElementById('kopyadurum');
  if(!b)return;
  b.addEventListener('click',function(){
    var t=document.getElementById('atifmetin').innerText.trim();
    function ok(){d.textContent=EN?'Copied.':'Kopyalandı.';}
    function sec(){try{var r=document.createRange();r.selectNodeContents(document.getElementById('atifmetin'));var s=getSelection();s.removeAllRanges();s.addRange(r);d.textContent=EN?'Text selected; press Ctrl+C to copy.':'Metin seçildi; Ctrl+C ile kopyalayabilirsin.';}catch(e){d.textContent=EN?'Select the text and copy it manually.':'Metni elle seçip kopyala.';}}
    try{navigator.clipboard.writeText(t).then(ok,sec);}catch(e){sec();}
  });
})();
