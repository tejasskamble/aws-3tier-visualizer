(function(){
const O='#fb923c',G='#34d399',B='#60a5fa';
const P={in:'M85 425H250',w1:'M310 425H340V215H390',w2:'M310 425H340V585H390',a1:'M455 215H640V402',a2:'M455 585H640V448',
b1:'M660 425H690V215H775',b2:'M660 425H690V585H775',wr1:'M850 215H1055',rd:'M850 585H1055',wr2:'M850 600H960V235H1055',
rep:'M1118 215H1200V585H1118',s3a:'M820 350V398',s3b:'M820 490V452',iam:'M877 425H848',nat1:'M792 235H705V300H525',
nat2:'M505 322V372H190V402',nat3:'M175 425H85',bad:'M80 395V330H250',vpn:'M130 700H150V805H820V722',peer:'M140 130H150V56H810V118'};
// wire: id, colour, first step, last step, az
const W=[['in',O,4],['w1',O,5,9,'a'],['w2',O,5],['a1',O,6,9,'a'],['a2',O,6],['b1',O,6,9,'a'],['b2',O,6],['wr1',B,6,9,'a'],['rd',B,6],['wr2',B,6,9,'a'],
['rep',G,6,9,'a'],['s3a',G,6,9,'a'],['s3b',G,6],['iam',G,6],['nat1',O,7,7,'a'],['nat2',O,7,7,'a'],['nat3',O,7,7],['bad','#ef4444',8,8],['vpn',G,9],['peer','#a78bfa',9]];
// packets: emoji, path, first, last, dur, offset, colour, az
const PK=[['✉️','in',4,9,2.2,0,O],['✉️','w1',5,9,1.6,0,O,'a'],['✉️','w2',5,9,1.6,.8,O],['✉️','a1',6,9,1.8,.3,O,'a'],['✉️','a2',6,9,1.8,1.1,O],
['✉️','b1',6,9,1.6,.5,O,'a'],['✉️','b2',6,9,1.6,1.3,O],['💾','wr1',6,9,1.4,0,B,'a'],['💾','rd',6,9,1.4,.7,B],['💾','wr2',6,9,2,.3,B,'a'],
['🔁','rep',6,9,2.4,0,G,'a'],['📦','nat1',7,7,2.2,0,O,'a'],['📦','nat2',7,7,2.2,.5,O,'a'],['📦','nat3',7,7,2.2,1,O],['😈','bad',8,8,2.4,0,'#ef4444'],
['🔒','vpn',9,9,4,0,G],['🤝','peer',9,9,4,0,'#a78bfa']];
const ICON={ec2:'<rect x="-11" y="-11" width="22" height="22" rx="2"/><path d="M-5-5h10v10h-10zM-15-5h4M-15 5h4M11-5h4M11 5h4"/>',
alb:'<circle cx="0" cy="-10" r="4"/><circle cx="-11" cy="9" r="4"/><circle cx="11" cy="9" r="4"/><path d="M0-6L-9 5M0-6L9 5"/>',
db:'<ellipse cx="0" cy="-9" rx="11" ry="5"/><path d="M-11-9V9a11 5 0 0 0 22 0V-9M-11 0a11 5 0 0 0 22 0"/>',
s3:'<path d="M-12-8Q0-14 12-8L9 11H-9Z"/>',nat:'<path d="M-12 0H12M5-7L12 0L5 7"/>',
igw:'<path d="M-11 12V-1a11 11 0 0 1 22 0V12M-5 12V0a5 5 0 0 1 10 0V12"/>',
vpn:'<rect x="-9" y="-2" width="18" height="13" rx="2"/><path d="M-5-2V-6a5 5 0 0 1 10 0V-2"/>',
iam:'<rect x="-12" y="-8" width="24" height="16" rx="2"/><circle cx="-5" cy="-1" r="3"/><path d="M1-2H9M1 3H7"/>'};
const at=(s,e,az)=>` data-s="${s}"${e?` data-e="${e}"`:''}${az?' data-az="a"':''}`;
// rounded frame: x,y,w,h,colour,dash,step,title,sub,az
function box(x,y,w,h,c,d,s,t,sub,az,tx,ty){return `<g class="rv"${at(s,0,az)}><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${c}" fill-opacity=".08" stroke="${c}" stroke-width="2"${d?' stroke-dasharray="8 6"':''}/>${t?`<text class="ttl" x="${tx||x+12}" y="${ty||y+22}" style="fill:${c}">${t}</text>`:''}${sub?`<text class="sub" x="${tx||x+12}" y="${(ty||y+22)+15}">${sub}</text>`:''}</g>`}
// icon: x,y,type,colour,"tech|beginner",scale,step,az
function ic(x,y,type,c,lab,sc,s,az,extra){const [t,b]=lab.split('|');return `<g class="rv"${at(s,0,az)} transform="translate(${x} ${y})"><rect x="${-28*sc}" y="${-28*sc}" width="${56*sc}" height="${56*sc}" rx="${10*sc}" fill="${c}"/><g transform="scale(${sc})" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${ICON[type]}</g><text class="lbl" y="${44*sc+ (sc<1?0:0)}" data-t="${t}" data-b="${b||t}">${b||t}</text>${extra||''}</g>`}
const pill=(x,y,t,c,s,az)=>`<g class="rv"${at(s,0,az)}><rect x="${x-22}" y="${y-8}" width="44" height="16" rx="8" fill="${c}"/><text class="lbl" x="${x}" y="${y+4}" style="fill:#fff;font-size:9px;font-weight:700">${t}</text></g>`;
function build(){
let o='<svg id="svg" viewBox="0 0 1400 850" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0b1437"/><stop offset="1" stop-color="#101c4a"/></linearGradient><pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#ffffff" fill-opacity=".1"/></pattern><filter id="glow" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="4"/></filter><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="context-stroke"/></marker></defs><rect width="1400" height="850" fill="url(#bg)"/><rect width="1400" height="850" fill="url(#dots)"/>';
// 1 wires first
o+='<g id="wires">'+Object.keys(P).map(k=>{const w=W.find(a=>a[0]===k);return `<path id="p-${k}" d="${P[k]}" class="wire${w?' rv':''}" stroke="${w?w[1]:'none'}" ${w?'marker-end="url(#ar)"':''}${w?at(w[2],w[3],w[4]):''}/>`}).join('')+'</g>';
// 2 frames
o+=box(140,6,1255,839,'#4aa3ff',1,1,'AWS Cloud · Region (the City)','',0,150,26);
o+=box(160,45,1225,790,'#2dd4bf',0,1,'VPC','10.0.0.0/16',0,180,100);
o+=box(330,70,900,320,'#4aa3ff',1,2,'Availability Zone 1a','',1,345,90)+box(330,460,900,320,'#4aa3ff',1,2,'Availability Zone 1b','',0,345,480);
const sn=[['Web-Subnet-1','10.0.1.0/24 · public','#f5b82e',360,120,1],['Web-Subnet-2','10.0.4.0/24 · public','#f5b82e',360,490],['App-Subnet-1','10.0.2.0/24 · private','#a78bfa',720,120,1],['App-Subnet-2','10.0.5.0/24 · private','#a78bfa',720,490],['DB-Subnet-1','10.0.3.0/24 · private','#7c8cff',1000,120,1],['DB-Subnet-2','10.0.6.0/24 · private','#7c8cff',1000,490]];
sn.forEach(a=>{o+=box(a[3],a[4],a[3]===1000?180:200,230,a[2],0,3,a[0],a[1],a[5]);});
o+=box(992,112,196,616,G,1,6,'','',0)+`<text class="sub rv" data-s="6" x="1090" y="108" style="text-anchor:middle;fill:${G}">DB Subnet Group</text>`;
// 3 entry
o+=`<g class="rv" data-s="4"><text x="60" y="435" font-size="34" text-anchor="middle">☁️</text><text class="lbl" x="60" y="469">Internet</text></g>`;
o+=ic(190,425,'igw','#8b5cf6','IGW|Main entrance',1,4)+ic(280,425,'alb','#8b5cf6','Ext. ALB|Receptionist',1,4);
o+=`<g class="rv" data-s="4"><rect x="175" y="505" width="150" height="44" rx="8" fill="#8b5cf633" stroke="#8b5cf6"/><text class="lbl" x="250" y="523">Public RT</text><text class="sub" x="250" y="538" style="text-anchor:middle">0.0.0.0/0 → IGW</text></g>`;
// 4 web tier
const web=(y,az)=>box(385,y-32,80,92,G,1,5,'','',az)+`<text class="sub rv" data-s="5" x="425" y="${y-36}" style="text-anchor:middle">Web ASG</text><g class="rv" data-s="5"${az?' data-az="a"':''}><circle cx="453" cy="${y-24}" r="8" fill="${G}"/><text x="453" y="${y-20}" font-size="10" fill="#fff" text-anchor="middle">✓</text></g>`;
o+=ic(425,215,'ec2','#e8741c','Web Server|Front desk',1,5,1)+web(215,1)+ic(425,585,'ec2','#e8741c','Web Server|Front desk',1,5)+web(585);
// 5 app/db tier
const app=(y,az)=>box(780,y-32,80,92,G,1,6,'','',az)+`<text class="sub rv" data-s="6" x="820" y="${y-36}" style="text-anchor:middle">App ASG</text>`;
o+=ic(640,425,'alb','#8b5cf6','Int. ALB|Dept. receptionist',1,6);
o+=ic(820,215,'ec2','#e8741c','App Server|Back office',1,6,1)+app(215,1)+ic(820,585,'ec2','#e8741c','App Server|Back office',1,6)+app(585);
o+=ic(1090,215,'db','#4f46e5','Writer|Records room',1,6,1)+ic(1090,585,'db','#4f46e5','Reader|Records copy',1,6);
o+=`<text class="sub rv" data-s="6" data-az="a" x="1090" y="276" style="text-anchor:middle">db-1-instance-1</text><text class="sub rv" data-s="6" x="1090" y="646" style="text-anchor:middle">db-1-instance-1-reader</text><text class="sub rv" data-s="6" x="1184" y="420" style="text-anchor:end;fill:${G}">replication</text>`;
o+=ic(820,425,'s3','#3f9a3f','S3 Bucket|Warehouse',1,6)+ic(905,425,'iam','#dc2626','IAM Role|Perm. card',.8,6);
// 6 NAT, private RT
o+=ic(505,300,'nat','#fb923c','NAT GW|Delivery counter',.65,7,1)+ic(505,670,'nat','#fb923c','NAT GW|Delivery counter',.65,7);
o+=`<g class="rv" data-s="7"><rect x="395" y="405" width="170" height="40" rx="8" fill="#a78bfa33" stroke="#a78bfa"/><text class="lbl" x="480" y="421">Private RT</text><text class="sub" x="480" y="436" style="text-anchor:middle">0.0.0.0/0 → NAT</text></g>`;
// 7 security
o+=pill(425,278,'SG-web','#ef4444',8,1)+pill(425,648,'SG-web','#ef4444',8)+pill(820,278,'SG-app','#ef4444',8,1)+pill(820,648,'SG-app','#ef4444',8)+pill(1090,292,'SG-db','#ef4444',8,1)+pill(1090,662,'SG-db','#ef4444',8)+pill(280,486,'SG-alb','#ef4444',8);
sn.forEach(a=>{o+=pill(a[3]+(a[3]===1000?150:170),a[4]+16,'NACL','#b91c1c',8,a[5])});
o+=`<g class="rv" data-s="8" data-e="8"><circle cx="264" cy="330" r="13" fill="#ef4444"/><path d="M258 324l12 12M270 324l-12 12" stroke="#fff" stroke-width="3"/><text class="lbl" x="264" y="306" style="fill:#fca5a5;font-weight:700">Blocked</text></g>`;
// 8 VPN, peering
o+=`<g class="rv" data-s="9"><rect x="20" y="650" width="110" height="100" rx="12" fill="#34d39922" stroke="${G}"/><text x="75" y="700" font-size="30" text-anchor="middle">🏢</text><text class="lbl" x="75" y="730">Ravi's Office</text><rect x="12" y="70" width="126" height="120" rx="12" fill="#a78bfa22" stroke="#a78bfa" stroke-dasharray="6 4"/><text class="ttl" x="75" y="125" style="text-anchor:middle;fill:#a78bfa">Partner VPC</text><text class="sub" x="75" y="142" style="text-anchor:middle">172.16.0.0/16</text><text class="sub" x="500" y="67" style="text-anchor:middle;fill:#c4b5fd">VPC peering · private, no internet</text><text class="sub" x="500" y="797" style="text-anchor:middle;fill:${G}">Site-to-Site VPN · encrypted tunnel</text></g>`;
o+=ic(205,805,'vpn',G.replace('34d399','059669'),'VPN GW|Secret tunnel',.7,9);
// failure overlay
o+=`<g id="down" class="rv"><rect x="330" y="70" width="900" height="320" rx="14" fill="#ef444422" stroke="#ef4444" stroke-width="3"/><text x="780" y="395" class="ttl" style="text-anchor:middle;fill:#fca5a5;font-size:15px" dy="-8">AZ 1a unavailable</text></g>`;
// packets last
o+='<g id="packets">'+PK.map(p=>`<g class="pk rv"${at(p[2],p[3],p[7])}><circle r="15" fill="${p[6]}" opacity=".3" filter="url(#glow)"/><text text-anchor="middle" dy=".35em" font-size="18">${p[0]}</text><animateMotion dur="${p[4]}s" begin="-${p[5]}s" repeatCount="indefinite" rotate="0"><mpath href="#p-${p[1]}"/></animateMotion></g>`).join('')+'</g><g id="flowLayer"></g></svg>';
return o}
window.ARCH={P,PK,W,build};
})();
