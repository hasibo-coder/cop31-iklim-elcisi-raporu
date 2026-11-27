/* Oturum süzgeci: tema ve etiket gruplarını birlikte uygular. JS yoksa 33 kartın tamamı görünür. */
(function(){
  var EN=(document.documentElement.lang||'').indexOf('en')===0;
  var kutu=document.getElementById('ofiltre'),kartlar=document.querySelectorAll('#ogrid .ocard'),sayac=document.getElementById('osayac');
  if(!kutu||!kartlar.length)return;
  var durum={tema:'hepsi',et:'hepsi'};
  var gruplar=[
    {ad:'tema',baslik:EN?'Theme':'Tema',sec:EN?[['hepsi','All'],['t1','Theme 1'],['t2','Theme 2'],['t3','Theme 3'],['t4','Theme 4'],['t5','Theme 5'],['t6','Theme 6'],['t7','Theme 7']]:[['hepsi','Tümü'],['t1','Tema 1'],['t2','Tema 2'],['t3','Tema 3'],['t4','Tema 4'],['t5','Tema 5'],['t6','Tema 6'],['t7','Tema 7']]},
    {ad:'et',baslik:EN?'Figure label':'Rakam etiketi',sec:EN?[['hepsi','All'],['dogrulandi','With Verified'],['duzeltildi','With Corrected'],['beyan','With Speaker-reported']]:[['hepsi','Tümü'],['dogrulandi','Doğrulandı içeren'],['duzeltildi','Düzeltildi içeren'],['beyan','Beyan içeren']]}
  ];
  function uygula(){
    var g=0;
    Array.prototype.forEach.call(kartlar,function(k){
      var okT=durum.tema==='hepsi'||k.getAttribute('data-tema')===durum.tema;
      var okE=durum.et==='hepsi'||(k.getAttribute('data-et')||'').split(' ').indexOf(durum.et)>-1;
      k.hidden=!(okT&&okE); if(okT&&okE)g++;
    });
    sayac.textContent=EN?('Showing '+g+' of '+kartlar.length+' sessions.'):(kartlar.length+' oturum içinden '+g+' tanesi gösteriliyor.');
    Array.prototype.forEach.call(kutu.querySelectorAll('.chip'),function(b){
      b.setAttribute('aria-pressed',durum[b.getAttribute('data-g')]===b.getAttribute('data-k')?'true':'false');
    });
  }
  gruplar.forEach(function(gr){
    var w=document.createElement('div');w.className='fgrup';
    var p=document.createElement('p');p.className='fbaslik';p.textContent=gr.baslik;w.appendChild(p);
    var c=document.createElement('div');c.className='chips';c.setAttribute('role','group');c.setAttribute('aria-label',gr.baslik+(EN?' filter':' süzgeci'));
    gr.sec.forEach(function(o){
      var b=document.createElement('button');b.type='button';b.className='chip';b.textContent=o[1];
      b.setAttribute('data-g',gr.ad);b.setAttribute('data-k',o[0]);
      b.addEventListener('click',function(){durum[gr.ad]=o[0];uygula();});
      c.appendChild(b);
    });
    w.appendChild(c);kutu.appendChild(w);
  });
  uygula();
})();
