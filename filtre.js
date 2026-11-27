/* Süzgeç: .filtre[data-hedef] kutusuna düğmeler ekler; tablo satırlarındaki data-f değerine göre gösterir/gizler. JS yoksa tüm satırlar görünür. */
(function(){
  var kutular=document.querySelectorAll('.filtre[data-hedef]');
  Array.prototype.forEach.call(kutular,function(k){
    var tablo=document.getElementById(k.getAttribute('data-hedef')); if(!tablo) return;
    var satirlar=tablo.querySelectorAll('tbody tr');
    var durum=k.getAttribute('data-mod')==='durum';
    var secenek=durum?[['hepsi','Tümü'],['dogrulandi','Doğrulandı'],['duzeltildi','Düzeltildi'],['beyan','Beyan'],['kontrol','Kontrol edilmedi']]
      :[['hepsi','Tümü'],['t1','Tema 1'],['t2','Tema 2'],['t3','Tema 3'],['t4','Tema 4'],['t5','Tema 5'],['t6','Tema 6'],['t7','Tema 7']];
    var grup=document.createElement('div'); grup.className='chips'; grup.setAttribute('role','group'); grup.setAttribute('aria-label',k.getAttribute('data-etiket'));
    var sayac=document.createElement('p'); sayac.className='sayac'; sayac.setAttribute('role','status'); sayac.setAttribute('aria-live','polite');
    var birim=k.getAttribute('data-sayac')||'kayıt';
    function uygula(anahtar){
      var g=0;
      Array.prototype.forEach.call(satirlar,function(s){
        var f=(s.getAttribute('data-f')||'').split(' ');
        var goster=anahtar==='hepsi'||f.indexOf(anahtar)>-1;
        s.hidden=!goster; if(goster) g++;
      });
      sayac.textContent=satirlar.length+' '+birim+' içinden '+g+' tanesi gösteriliyor.';
      Array.prototype.forEach.call(grup.children,function(b){b.setAttribute('aria-pressed',b.getAttribute('data-k')===anahtar?'true':'false');});
    }
    secenek.forEach(function(o){
      var b=document.createElement('button'); b.type='button'; b.className='chip'; b.textContent=o[1]; b.setAttribute('data-k',o[0]);
      b.addEventListener('click',function(){uygula(o[0]);}); grup.appendChild(b);
    });
    k.appendChild(grup); k.appendChild(sayac); uygula('hepsi');
  });
})();
