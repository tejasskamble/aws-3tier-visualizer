(function(){
const $=s=>document.querySelector(s),S=window.STEPS,N=S.length;
let cur=1,mode='b',fail=false,timer=null;
const host=$('#dia');host.innerHTML=ARCH.build();
const nav=$('#steps');
nav.innerHTML=S.map((s,i)=>`<button data-i="${i+1}"><b>${i+1}</b><span>${s.t}<small>${s.s}</small></span></button>`).join('');
$('#leg').innerHTML=LEGEND.map(l=>`<li>${l[0]} ${l[1]}</li>`).join('');
$('#sum').innerHTML=SUMMARY.map(s=>`<div><b>${s[0]}</b>${s[1]}</div>`).join('');
function render(){
 host.querySelectorAll('[data-s]').forEach(el=>{const s=+el.dataset.s,e=el.dataset.e?+el.dataset.e:99,on=s<=cur&&cur<=e;
  el.classList.toggle('on',on);el.classList.toggle('cur',s===cur);el.classList.toggle('dead',fail&&el.dataset.az==='a')});
 $('#down').classList.toggle('on',fail&&cur>=2);
 host.querySelectorAll('.lbl[data-t]').forEach(t=>t.textContent=mode==='b'?t.dataset.b:t.dataset.t);
 nav.querySelectorAll('button').forEach(b=>{b.toggleAttribute('aria-current',+b.dataset.i===cur);if(+b.dataset.i===cur)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current')});
 const d=S[cur-1];$('#ct').textContent=`${cur}. ${d.t}`;$('#cs').textContent=d.s;$('#cp').textContent=d.p;$('#cx').textContent=d.x;$('#cw').textContent=d.w;
 $('#dp').open=mode==='b';$('#dt').open=mode==='t';
 $('#pt').textContent=`${cur}/${N}`;$('#pb').style.width=cur/N*100+'%';
 const n=$('#note');n.hidden=!fail;n.textContent=fail?FAILNOTE:'';
 $('#mB').setAttribute('aria-pressed',mode==='b');$('#mT').setAttribute('aria-pressed',mode==='t');$('#fail').setAttribute('aria-pressed',fail);
}
const go=i=>{cur=Math.max(1,Math.min(N,i));ANIM.stop();render()};
const pause=()=>{clearInterval(timer);timer=null};
nav.onclick=e=>{const b=e.target.closest('button');if(b){pause();go(+b.dataset.i)}};
$('#play').onclick=()=>{pause();if(cur>=N)go(1);timer=setInterval(()=>{if(cur>=N)pause();else go(cur+1)},5000)};
$('#pause').onclick=pause;
$('#reset').onclick=()=>{pause();fail=false;go(1)};
$('#mB').onclick=()=>{mode='b';render()};$('#mT').onclick=()=>{mode='t';render()};
$('#fail').onclick=()=>{fail=!fail;if(fail&&cur<6)cur=6;ANIM.stop();render()};
$('#flow').onclick=()=>{pause();if(cur<6)cur=6;render();ANIM.flow(fail,(i,n,t)=>{$('#cw').textContent=i?`Hop ${i}/${n}: ${t}`:S[cur-1].w})};
const root=document.documentElement;
try{const t=localStorage.getItem('theme');if(t)root.dataset.theme=t;else if(matchMedia('(prefers-color-scheme: light)').matches)root.dataset.theme='light'}catch(e){}
$('#theme').onclick=()=>{const t=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=t;try{localStorage.setItem('theme',t)}catch(e){}};
function gloss(q){q=(q||'').toLowerCase();$('#gl').innerHTML=GLOSS.filter(g=>g.join(' ').toLowerCase().includes(q)).map(g=>`<article><h3>${g[0]} <small>= ${g[1]}</small></h3><p>${g[2]}</p><p><i>Role here:</i> ${g[3]}</p></article>`).join('')||'<p>No matching term.</p>'}
$('#q').oninput=e=>gloss(e.target.value);gloss();render();
})();
