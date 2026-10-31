(function(){
const NS='http://www.w3.org/2000/svg';
const reduce=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
let timers=[];
// Complete journey: Internet > IGW > External ALB > Web > Internal ALB > App > RDS > response
function flow(fail,hop){
 const svg=document.getElementById('svg'),L=svg.querySelector('#flowLayer');stop();
 const z=fail?'2':'1',db=fail?'rd':'wr1';
 const seg=[['in','Internet → Internet Gateway → External ALB'],['w'+z,'External ALB → healthy Web Server'],['a'+z,'Web Server → Internal ALB'],['b'+z,'Internal ALB → App Server'],[db,fail?'App Server → RDS Reader (read)':'App Server → RDS Writer']];
 const all=seg.map((s,i)=>[s[0],s[1],0]).concat(seg.slice().reverse().map(s=>[s[0],'Response: '+s[1].split(' → ').reverse().join(' ← '),1]));
 const d=1.2;
 all.forEach((s,i)=>{
  const g=document.createElementNS(NS,'g');g.setAttribute('visibility','hidden');
  g.innerHTML=`<circle r="17" fill="#fb923c" opacity=".4" filter="url(#glow)"/><text text-anchor="middle" dy=".35em" font-size="20">${s[2]?'💾':'✉️'}</text><set attributeName="visibility" to="visible" begin="indefinite" dur="${d}s"/><animateMotion begin="indefinite" dur="${d}s" rotate="0" ${s[2]?'keyPoints="1;0" keyTimes="0;1" calcMode="linear"':''}><mpath href="#p-${s[0]}"/></animateMotion>`;
  L.appendChild(g);
  const t=i*d;g.querySelectorAll('set,animateMotion').forEach(a=>a.beginElementAt(t));
  timers.push(setTimeout(()=>hop&&hop(i+1,all.length,s[1]),t*1000));
 });
 timers.push(setTimeout(()=>{L.innerHTML='';hop&&hop(0,0,'')},all.length*d*1000));
}
function stop(){timers.forEach(clearTimeout);timers=[];const L=document.getElementById('flowLayer');if(L)L.innerHTML=''}
window.ANIM={flow,stop,reduce};
})();
