/* Terraform Architects - website assistant.
   No backend and no API key: it answers from the site's own details,
   points visitors to the booking form, and emails inquiries to the team.
   Edit CONFIG for the contact details and the email that receives inquiries. */
(function(){
'use strict';

var CONFIG={
 email:'terraformarchitects25@gmail.com',
 endpoint:'https://formsubmit.co/ajax/terraformarchitects25@gmail.com',
 phoneText:'0936 303 4899',
 phoneTel:'+639363034899',
 facebook:'https://www.facebook.com/share/1E2cL2BH34/'
};

/*KB-START*/
var UI={
 en:{
  title:'Terraform Assistant',sub:'Automated assistant \u00b7 replies instantly',
  ph:'Type your question\u2026',send:'Send',launch:'Ask us',close:'Close chat',lang:'TL',langLabel:'Switch to Filipino',
  hello:'Hi! I\u2019m the Terraform Architects assistant. I can answer questions about our services, process and estimates, take you to the booking form, or send your inquiry to our team by email.',
  chips:{services:'Our services',process:'How it works',cost:'Cost & estimate',book:'Book a consultation',contact:'Contact details',inquiry:'Send an inquiry'},
  act:{bookgo:'Open the booking form',inquiry:'Send an inquiry',call:'Call 0936 303 4899',email:'Email us',fb:'Message on Facebook',projectsgo:'See our projects'},
  form:{name:'Full name',phone:'Mobile number',email:'Email (optional)',msg:'Your inquiry',send:'Send inquiry',sending:'Sending\u2026',req:'Please fill this in.',bademail:'Please enter a valid email.'},
  inqIntro:'Sure. Fill this in and I\u2019ll send it straight to our team\u2019s email.',
  ok:function(n){return 'Thank you, '+n+'! Your inquiry was sent to our team by email. We\u2019ll get back to you by phone or message.'},
  fail:'Sorry, I couldn\u2019t send that automatically. You can send it by email instead, or call us.'
 },
 tl:{
  title:'Terraform Assistant',sub:'Automated na assistant \u00b7 agad sumasagot',
  ph:'I-type ang tanong ninyo\u2026',send:'Ipadala',launch:'Magtanong',close:'Isara ang chat',lang:'EN',langLabel:'Switch to English',
  hello:'Kumusta po! Ako ang assistant ng Terraform Architects. Masasagot ko ang mga tanong tungkol sa serbisyo, proseso at estimate, madadala ko kayo sa booking form, o ipapadala ko ang inquiry ninyo sa email ng team namin.',
  chips:{services:'Mga serbisyo',process:'Paano ang proseso',cost:'Gastos at estimate',book:'Mag-book ng konsultasyon',contact:'Contact details',inquiry:'Magpadala ng inquiry'},
  act:{bookgo:'Buksan ang booking form',inquiry:'Magpadala ng inquiry',call:'Tawagan ang 0936 303 4899',email:'I-email kami',fb:'Mag-message sa Facebook',projectsgo:'Tingnan ang projects'},
  form:{name:'Buong pangalan',phone:'Mobile number',email:'Email (opsyonal)',msg:'Inquiry ninyo',send:'Ipadala ang inquiry',sending:'Ipinapadala\u2026',req:'Pakilagyan po.',bademail:'Maglagay po ng wastong email.'},
  inqIntro:'Sige po. Punan lang ito at ipapadala ko agad sa email ng team namin.',
  ok:function(n){return 'Salamat po, '+n+'! Naipadala na ang inquiry ninyo sa email ng team namin. Makikipag-ugnayan kami sa inyo sa tawag o mensahe.'},
  fail:'Paumanhin po, hindi ko ito naipadala nang automatic. Puwede ninyo itong ipadala sa email, o tawagan kami.'
 }
};

var KB={
 services:{
  en:'We\u2019re a design-and-build team, so you deal with one company from the first sketch to turnover.\n\nArchitectural design: floor plans, elevations and 3D renders.\nInterior design: layouts, materials and built-in furniture.\nConstruction: ground-up builds with our own crew and supervised site works.\nRenovation: extensions, repairs and full makeovers.\nCost control: itemized estimates and progress reports.',
  tl:'Design-and-build po kami, kaya isang kumpanya lang ang kausap ninyo mula unang sketch hanggang turnover.\n\nArchitectural design: floor plan, elevations at 3D renders.\nInterior design: layout, materyales at built-in na furniture.\nConstruction: ground-up na pagpapatayo gamit ang sarili naming crew at supervised na trabaho sa site.\nRenovation: extension, repair at buong makeover.\nCost control: itemized na estimate at progress reports.',
  acts:['bookgo','projectsgo']
 },
 process:{
  en:'A project goes in five steps:\n\n1. Consultation: we visit your site and listen to your needs and budget.\n2. Design: plans and 3D views, revised until you approve.\n3. Estimate: a clear, itemized cost and timeline.\n4. Build: supervised construction with regular updates.\n5. Turnover: final inspection and handover of your keys.',
  tl:'Limang hakbang po ang takbo ng proyekto:\n\n1. Consultation: bibisitahin namin ang site at pakikinggan ang pangangailangan at budget ninyo.\n2. Design: plano at 3D views, babaguhin hanggang aprubado ninyo.\n3. Estimate: malinaw at itemized na gastos at timeline.\n4. Build: supervised na konstruksyon na may regular na update.\n5. Turnover: huling inspeksyon at pagbibigay ng susi.',
  acts:['bookgo']
 },
 cost:{
  en:'Cost depends on your lot size, the design, the materials and the scope, so I can\u2019t give a flat price in chat. After the free consultation, we give you a clear, itemized estimate and timeline, and progress reports during the build so you always know where your budget stands.\n\nIt helps a lot if you share your lot size, number of floors, budget range and timeline.',
  tl:'Nakadepende po ang gastos sa laki ng lote, disenyo, materyales at saklaw ng trabaho, kaya hindi ako makapagbibigay ng iisang presyo dito sa chat. Pagkatapos ng libreng konsultasyon, bibigyan namin kayo ng malinaw at itemized na estimate at timeline, at may progress reports habang ginagawa para alam ninyo kung nasaan ang budget.\n\nMalaking tulong kung maibabahagi ninyo ang laki ng lote, bilang ng palapag, budget range at timeline.',
  acts:['bookgo','inquiry']
 },
 free:{
  en:'Yes. The first consultation is free and has no obligation. Pick a date in the booking form and we\u2019ll confirm your schedule by phone or message.',
  tl:'Opo, libre at walang obligasyon ang unang konsultasyon. Pumili lang po ng petsa sa booking form at kukumpirmahin namin ang schedule sa tawag o mensahe.',
  acts:['bookgo']
 },
 book:{
  en:'You can book through the form. Choose a service (architectural design, interior design, construction, renovation or not sure yet), a meeting type (site visit, office meeting or online), a date and a time slot from 9:00 AM to 4:00 PM, and enter your project location. We confirm every booking personally.',
  tl:'Puwede po kayong mag-book sa form. Pumili ng serbisyo (architectural design, interior design, construction, renovation o hindi pa sigurado), uri ng meeting (site visit, office meeting o online), petsa at oras mula 9:00 AM hanggang 4:00 PM, at ilagay ang lokasyon ng proyekto. Personal naming kinukumpirma ang bawat booking.',
  acts:['bookgo']
 },
 projects:{
  en:'In our projects section you\u2019ll find a two-storey restaurant (exterior views), commercial interiors such as a dining hall, an arched feature wall, a service counter and bar seating, and residential interiors like a living and dining area and a U-shaped kitchen. There\u2019s also a video walkthrough of one of our interior designs.',
  tl:'Sa projects section ay makikita ninyo ang two-storey na restaurant (exterior), mga commercial interior tulad ng dining hall, arched feature wall, service counter at bar seating, at residential interior tulad ng living at dining area at U-shaped na kusina. May video walkthrough din ng isa sa mga interior design namin.',
  acts:['projectsgo','bookgo']
 },
 contact:{
  en:'Office: El Pueblo Condominium, Quezon City, Philippines 1117\nPhone: 0936 303 4899\nEmail: terraformarchitects25@gmail.com\nFacebook: Terraform Architects\nHours: Always open',
  tl:'Opisina: El Pueblo Condominium, Quezon City, Philippines 1117\nTelepono: 0936 303 4899\nEmail: terraformarchitects25@gmail.com\nFacebook: Terraform Architects\nOras: Laging bukas',
  acts:['call','email','fb','bookgo']
 },
 area:{
  en:'We\u2019re based in Quezon City, Metro Manila. I don\u2019t have a list of other service areas, so please send an inquiry with your project location and the team will confirm.',
  tl:'Nakabase po kami sa Quezon City, Metro Manila. Wala akong listahan ng iba pang sakop na lugar, kaya magpadala po ng inquiry kasama ang lokasyon ng proyekto at kukumpirmahin ng team.',
  acts:['inquiry','call']
 },
 timeline:{
  en:'It depends on the size and scope of the project. We give a clear, itemized cost and timeline at the Estimate step, after the consultation and design. To get started, book a free consultation or send us your project details.',
  tl:'Nakadepende po ito sa laki at saklaw ng proyekto. Binibigay namin ang malinaw at itemized na gastos at timeline sa Estimate step, pagkatapos ng konsultasyon at design. Para magsimula, mag-book ng libreng konsultasyon o ipadala ang detalye ng proyekto ninyo.',
  acts:['bookgo','inquiry']
 },
 about:{
  en:'Terraform Architects is a design and build company in Quezon City. We turn your vision into a home or space that is planned, priced and built by the same people.',
  tl:'Ang Terraform Architects ay design and build company sa Quezon City. Ginagawa naming bahay o espasyo ang vision ninyo, na pinlano, tinuos at itinayo ng iisang team.',
  acts:['projectsgo','bookgo']
 },
 human:{
  en:'I\u2019m an automated assistant, not a person. To reach the team, call 0936 303 4899, message us on Facebook, or send an inquiry and they\u2019ll get back to you.',
  tl:'Automated na assistant po ako, hindi tao. Para makausap ang team, tawagan ang 0936 303 4899, mag-message sa Facebook, o magpadala ng inquiry at babalikan nila kayo.',
  acts:['call','fb','inquiry']
 },
 inquiry:{en:'',tl:'',acts:[]},
 thanks:{
  en:'You\u2019re welcome! Anything else I can help with?',
  tl:'Walang anuman po! May iba pa ba akong maitutulong?',
  acts:[]
 },
 bye:{
  en:'Thanks for visiting Terraform Architects. We\u2019re here whenever you\u2019re ready.',
  tl:'Salamat po sa pagbisita sa Terraform Architects. Nandito lang kami kapag handa na kayo.',
  acts:[]
 },
 greet:{
  en:'Hello! I can help with our services, process, estimates, booking and contact details. What would you like to know?',
  tl:'Kumusta po! Matutulungan ko kayo sa serbisyo, proseso, estimate, booking at contact details. Ano po ang gusto ninyong malaman?',
  acts:[]
 },
 fallback:{
  en:'I\u2019m not sure about that one, and I don\u2019t want to guess. I can help with our services, process, cost, booking and contact details. For anything else, send an inquiry and the team will reply.',
  tl:'Hindi po ako sigurado sa tanong na iyan at ayokong manghula. Matutulungan ko kayo sa serbisyo, proseso, gastos, booking at contact details. Para sa iba pa, magpadala ng inquiry at sasagot ang team.',
  acts:['inquiry','call']
 }
};

/* Order is priority: the first matching intent wins. */
var ORDER=['human','thanks','bye','cost','timeline','free','area','book','process','projects','contact','services','about','inquiry','greet'];
var PAT={
 human:/\b(human|real person|agent|representative|staff|tao|totoong tao)\b/,
 thanks:/\b(thanks|thank you|salamat)\b/,
 bye:/\b(bye|goodbye|paalam)\b/,
 cost:/\b(price|prices|pricing|cost|costs|how much|magkano|presyo|budget|quote|quotation|estimate|estimates|rate|rates|bayad|gastos|payment|installment|hulugan)\b/,
 timeline:/\b(how long|duration|timeline|gaano katagal|gaano ka tagal|matagal|katagal|tagal)\b/,
 free:/\b(free|libre|consultation|konsultasyon|konsulta)\b/,
 area:/\b(service area|service areas|outside|province|provincial|nationwide|cebu|davao|laguna|cavite|bulacan|rizal|makati|taguig|pasig|manila|batangas|pampanga|sakop|serve)\b/,
 book:/\b(book|booking|appointment|schedule|sched|meeting|site visit|visit|date|magpa-?book|mag-?book|pa-?book|iskedyul|reserve|reservation)\b/,
 process:/\b(process|step|steps|how does it work|how it works|workflow|paano|proseso|hakbang|simula|start)\b/,
 projects:/\b(project|projects|portfolio|photo|photos|picture|pictures|sample|samples|example|examples|gallery|video|walkthrough|larawan|litrato|gawa)\b/,
 contact:/\b(contact|phone|call|number|numero|email|e-mail|facebook|fb|messenger|address|office|location|saan|tawag|hours|open|oras|bukas|located)\b/,
 services:/\b(service|services|offer|what do you do|ginagawa|serbisyo|alok|architect\w*|interior\w*|construct\w*|renovat\w*|design\w*|build\w*|cost control|patayo|pagawa|ipagawa|bahay|house|home)\b/,
 about:/\b(about|who are you|company|sino kayo|tungkol|kumpanya|terraform)\b/,
 inquiry:/\b(inquiry|inquire|enquiry|message|send|ask|question|tanong|magtanong|mensahe|ipadala|padala)\b/,
 greet:/\b(hi|hello|hey|kumusta|kamusta|magandang umaga|magandang hapon|magandang gabi|magandang araw|good morning|good afternoon|good evening)\b/
};
var TLRE=/\b(po|opo|ba|ano|anong|paano|magkano|saan|kailan|gusto|nais|pwede|puwede|pwedeng|meron|mayroon|kayo|ninyo|niyo|namin|natin|ako|ko|magpatayo|patayo|ipagawa|pagawa|libre|salamat|kumusta|kamusta|hindi|tulong|presyo|bayad|gastos|oras|araw|tawag|magtanong|tanong|sige|bahay|lote|gaano|katagal|mga|lang|naman|dito|sino)\b/;

function norm(text){return ' '+String(text).toLowerCase().replace(/[^a-z0-9\u00f1' \-]+/g,' ')+' '}
function detect(text){
 var t=norm(text);
 for(var i=0;i<ORDER.length;i++){if(PAT[ORDER[i]].test(t))return ORDER[i]}
 return 'fallback';
}
function looksTagalog(text){return TLRE.test(norm(text))}
/*KB-END*/

var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
var CHIPKEYS=['services','process','cost','book','contact','inquiry'];
var lang='en',isOpen=false,started=false,unanswered='',card=null,busy=false;
var launch,panel,log,chipBox,input,typEl;

function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e}

/* ---- email sending (FormSubmit, no backend needed) ---- */
function send(fields,subject){
 var body={_subject:subject,_template:'table',_captcha:'false',_honey:''},k;
 for(k in fields){if(fields[k]!==undefined)body[k]=fields[k]}
 var ctl=('AbortController' in window)?new AbortController():null;
 var to=setTimeout(function(){if(ctl)ctl.abort()},15000);
 return fetch(CONFIG.endpoint,{
  method:'POST',
  headers:{'Content-Type':'application/json','Accept':'application/json'},
  body:JSON.stringify(body),
  signal:ctl?ctl.signal:undefined
 }).then(function(r){return r.json()})
 .then(function(j){return !!j&&(j.success===true||j.success==='true')})
 .catch(function(){return false})
 .then(function(ok){clearTimeout(to);return ok});
}
window.TFSend=send;

/* ---- UI ---- */
function build(){
 launch=el('button','tfa-launch');
 launch.type='button';
 launch.setAttribute('aria-expanded','false');
 launch.setAttribute('aria-controls','tfa');
 launch.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H9.5L5 20v-4H4z"/></svg><span class="tfa-ll"></span>';

 panel=el('div','tfa');
 panel.id='tfa';
 panel.hidden=true;
 panel.setAttribute('role','dialog');
 panel.setAttribute('aria-label','Terraform Architects assistant');
 panel.innerHTML='<div class="tfa-h"><div class="tfa-t"><b></b><span></span></div>'+
  '<button type="button" class="tfa-x tfa-lang"></button>'+
  '<button type="button" class="tfa-x tfa-close">&times;</button></div>'+
  '<div class="tfa-log" role="log" aria-live="polite"></div>'+
  '<div class="tfa-chips"></div>'+
  '<div class="tfa-in"><label class="tfa-sr" for="tfa-q"></label>'+
  '<input id="tfa-q" type="text" autocomplete="off" maxlength="400">'+
  '<button type="button" class="tfa-b tfa-send"></button></div>';

 document.body.appendChild(launch);
 document.body.appendChild(panel);
 log=panel.querySelector('.tfa-log');
 chipBox=panel.querySelector('.tfa-chips');
 input=panel.querySelector('#tfa-q');

 launch.onclick=function(){toggle(!isOpen)};
 panel.querySelector('.tfa-close').onclick=function(){toggle(false);launch.focus()};
 panel.querySelector('.tfa-lang').onclick=function(){lang=lang==='en'?'tl':'en';setUI()};
 panel.querySelector('.tfa-send').onclick=submit;
 input.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();submit()}});
 document.addEventListener('keydown',function(e){
  if(e.key==='Escape'&&isOpen){var lb=document.getElementById('lb');if(lb&&!lb.hidden)return;toggle(false);launch.focus()}
 });
 setUI();
}

function setUI(){
 var u=UI[lang];
 panel.querySelector('.tfa-t b').textContent=u.title;
 panel.querySelector('.tfa-t span').textContent=u.sub;
 panel.querySelector('.tfa-lang').textContent=u.lang;
 panel.querySelector('.tfa-lang').setAttribute('aria-label',u.langLabel);
 panel.querySelector('.tfa-close').setAttribute('aria-label',u.close);
 panel.querySelector('.tfa-sr').textContent=u.ph;
 panel.querySelector('.tfa-send').textContent=u.send;
 input.placeholder=u.ph;
 launch.querySelector('.tfa-ll').textContent=u.launch;
 launch.setAttribute('aria-label',u.launch);
 if(started)chips();
}

function toggle(state){
 isOpen=state;
 panel.hidden=!state;
 launch.setAttribute('aria-expanded',String(state));
 if(state){
  if(!started){started=true;addMsg('bot',UI[lang].hello);chips()}
  scrollLog();
  if(!matchMedia('(max-width:520px)').matches)input.focus();
 }
}

function scrollLog(){log.scrollTop=log.scrollHeight}

function addMsg(who,text,acts){
 var m=el('div','tfa-m '+who,text);
 if(acts&&acts.length){
  var a=el('div','tfa-acts');
  acts.forEach(function(k){a.appendChild(actBtn(k))});
  m.appendChild(a);
 }
 log.appendChild(m);
 scrollLog();
 return m;
}

function actBtn(k){
 var u=UI[lang].act,b;
 if(k==='call'){b=el('a','tfa-b g',u.call);b.href='tel:'+CONFIG.phoneTel}
 else if(k==='email'){b=el('a','tfa-b g',u.email);b.href='mailto:'+CONFIG.email}
 else if(k==='fb'){b=el('a','tfa-b g',u.fb);b.href=CONFIG.facebook;b.target='_blank';b.rel='noopener'}
 else{
  b=el('button',k==='bookgo'?'tfa-b':'tfa-b g',u[k]);
  b.type='button';
  b.onclick=function(){run(k)};
 }
 return b;
}

function run(k){
 if(k==='bookgo')goTo('book',true);
 else if(k==='projectsgo')goTo('projects',false);
 else if(k==='inquiry')showInquiry('');
}

function goTo(id,focusForm){
 toggle(false);
 var t=document.getElementById(id);
 if(!t)return;
 t.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});
 if(focusForm){
  setTimeout(function(){
   var i=document.querySelector('#f input[name=name]');
   if(i&&i.offsetParent)i.focus({preventScroll:true});
  },reduce?50:750);
 }
}

function chips(){
 chipBox.textContent='';
 CHIPKEYS.forEach(function(k){
  var c=el('button','tfa-c',UI[lang].chips[k]);
  c.type='button';
  c.onclick=function(){addMsg('user',UI[lang].chips[k]);reply(k,'')};
  chipBox.appendChild(c);
 });
}

function typing(on){
 if(on&&!typEl){
  typEl=el('div','tfa-m bot tfa-typ');
  typEl.setAttribute('aria-hidden','true');
  typEl.innerHTML='<i></i><i></i><i></i>';
  log.appendChild(typEl);scrollLog();
 }else if(!on&&typEl){typEl.remove();typEl=null}
}

function reply(key,raw){
 typing(true);
 setTimeout(function(){
  typing(false);
  var k=KB[key];
  if(key==='inquiry'){
   addMsg('bot',UI[lang].inqIntro);
   showInquiry(unanswered);
  }else{
   addMsg('bot',k[lang],k.acts);
   if(key==='fallback')unanswered=raw;
  }
 },reduce?0:450);
}

function submit(){
 var raw=input.value.trim();
 if(!raw)return;
 input.value='';
 if(looksTagalog(raw)){if(lang!=='tl'){lang='tl';setUI()}}
 else if(raw.split(/\s+/).length>=3&&lang!=='en'){lang='en';setUI()}
 addMsg('user',raw);
 reply(detect(raw),raw);
}

/* ---- inquiry card: sends to the team's email ---- */
function showInquiry(prefill){
 if(card&&card.isConnected){
  card.scrollIntoView({block:'nearest'});
  var f0=card.querySelector('input');if(f0)f0.focus();
  return;
 }
 var u=UI[lang].form;
 var wrap=el('div','tfa-m bot tfa-wide');
 card=el('div','tfa-card');
 card.setAttribute('role','group');
 card.setAttribute('aria-label',UI[lang].act.inquiry);

 function field(label,type,auto){
  var l=el('label',null,label),i=el(type==='area'?'textarea':'input');
  if(type==='area'){i.rows=4}else{i.type=type}
  if(auto)i.setAttribute('autocomplete',auto);
  if(type==='tel')i.setAttribute('inputmode','tel');
  i.maxLength=type==='area'?1500:120;
  l.appendChild(i);l.appendChild(el('span','err'));
  card.appendChild(l);
  return i;
 }
 var n=field(u.name,'text','name'),
     ph=field(u.phone,'tel','tel'),
     em=field(u.email,'email','email'),
     ms=field(u.msg,'area');
 if(prefill)ms.value=prefill;

 var hp=el('input','tfa-hp');
 hp.type='text';hp.name='website';hp.tabIndex=-1;
 hp.setAttribute('autocomplete','off');hp.setAttribute('aria-hidden','true');
 card.appendChild(hp);

 var go=el('button','tfa-b',u.send);
 go.type='button';
 card.appendChild(go);

 function chk(i,must,isMail){
  var s=i.parentNode.querySelector('.err'),v=i.value.trim();
  var bad=must&&!v,mail=isMail&&v&&!/^\S+@\S+\.\S+$/.test(v);
  s.textContent=bad?u.req:(mail?u.bademail:'');
  return !(bad||mail);
 }

 go.onclick=function(){
  if(busy)return;
  var a=chk(n,1),b=chk(ph,1),c=chk(em,0,1),d=chk(ms,1);
  if(!(a&&b&&c&&d))return;
  var name=n.value.trim(),mail=em.value.trim();
  if(hp.value){wrap.remove();addMsg('bot',UI[lang].ok(name));return}
  busy=true;go.disabled=true;go.textContent=u.sending;
  var fields={Name:name,Mobile:ph.value.trim(),Email:mail||'-',Message:ms.value.trim(),Source:'Website assistant'};
  if(mail)fields._replyto=mail;
  send(fields,'Website inquiry from '+name).then(function(ok){
   busy=false;
   if(ok){
    wrap.remove();card=null;
    addMsg('bot',UI[lang].ok(name),['call','fb']);
   }else{
    go.disabled=false;go.textContent=u.send;
    var summary='Name: '+name+'\nMobile: '+ph.value.trim()+(mail?'\nEmail: '+mail:'')+'\n\n'+ms.value.trim();
    var m=addMsg('bot',UI[lang].fail);
    var a2=el('div','tfa-acts');
    var mb=el('a','tfa-b',UI[lang].act.email);
    mb.href='mailto:'+CONFIG.email+'?subject='+encodeURIComponent('Website inquiry from '+name)+'&body='+encodeURIComponent(summary);
    a2.appendChild(mb);a2.appendChild(actBtn('call'));
    m.appendChild(a2);
   }
  });
 };

 wrap.appendChild(card);
 log.appendChild(wrap);
 log.scrollTop+=wrap.getBoundingClientRect().top-log.getBoundingClientRect().top-12;
 n.focus({preventScroll:true});
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);
else build();
})();
