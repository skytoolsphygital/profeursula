(function(){
"use strict";
const data=window.COURSE;if(!data){document.body.textContent="No se pudo cargar el contenido.";return;}
const $=id=>document.getElementById(id);
const safe=t=>String(t??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const key="ursula-e2-s4-progress-v1";
function read(){try{const x=JSON.parse(localStorage.getItem(key)||"{}");return {seen:Array.isArray(x.seen)?x.seen.filter(n=>Number.isInteger(n)&&n>=0&&n<28):[],index:Number.isInteger(x.index)&&x.index>=0&&x.index<28?x.index:0};}catch{return {seen:[],index:0}}}
let saved=read(),index=saved.index,projecting=false;
const cumulative=i=>data.slides.slice(0,i+1).reduce((n,s)=>n+s.min,0);
const group=i=>data.modules.findIndex(g=>i>=g.start&&i<=g.end);
const card=(text,i)=>{const parts=text.split("|");return '<div class="visual-card"><strong>'+(parts.length>1?safe(parts[0]):String(i+1).padStart(2,"0"))+'</strong><p>'+safe(parts.length>1?parts.slice(1).join("|"):text)+'</p></div>'};
function renderVisual(slide){
 const items=slide.items||[],type=slide.visual||"cards";
 if(type==="video"){return '<div class="video-card"><div class="video-symbol">▶</div><h3>Audiencia pública · Caso Petro Urrego</h3><p>Abre el enlace original en YouTube. El material audiovisual completo es de consulta adicional.</p><a class="primary" href="'+safe(data.sources.audiencia[1])+'" target="_blank" rel="noopener noreferrer">Ver audiencia oficial ↗</a></div>'}
 if(type==="formula"){return '<div class="visual formula"><div class="formula-tile">'+safe(items[0])+'</div><span class="formula-symbol">+</span><div class="formula-tile">'+safe(items[1])+'</div><span class="formula-symbol">=</span><div class="formula-tile">HECHO INTERNACIONALMENTE ILÍCITO</div></div><p class="note">'+safe(items[2])+'</p>'}
 if(type==="steps"||type==="pipeline"){return '<div class="visual steps">'+items.map((t,i)=>'<div class="step"><span class="step-num">'+String(i+1).padStart(2,"0")+'</span><span>'+safe(t)+'</span></div>').join("")+'</div>'}
 if(type==="timeline"){return '<div class="visual timeline">'+items.map(t=>{let p=t.split("|");return '<div class="timeline-item"><b>'+safe(p[0])+'</b><p>'+safe(p.slice(1).join("|"))+'</p></div>'}).join("")+'</div>'}
 return '<div class="visual '+safe(type)+'">'+items.map(card).join("")+'</div>';
}
function quizMarkup(q,scope){return '<div class="quiz-card" data-quiz="'+safe(scope)+'"><h3>'+safe(q.question)+'</h3>'+q.options.map((o,i)=>'<label class="quiz-option"><input type="radio" name="quiz-'+safe(scope)+'" value="'+i+'"><span>'+safe(o)+'</span></label>').join("")+'<div class="quiz-feedback" hidden role="status"></div></div>'}
function quizSetMarkup(qs){return '<div class="quiz-set">'+qs.map((q,i)=>'<div class="quiz-card" data-truefalse="'+i+'"><h3>DESAFÍO '+(i+1)+'</h3><p>'+safe(q.q)+'</p><label class="quiz-option"><input type="radio" name="tf-'+i+'" value="true"> Verdadero</label><label class="quiz-option"><input type="radio" name="tf-'+i+'" value="false"> Falso</label><div class="quiz-feedback" hidden role="status"></div></div>').join("")+'</div>'}
function bindQuizzes(s){
 if(s.quiz){const node=$("lesson").querySelector("[data-quiz]");node.addEventListener("change",e=>{if(!e.target.matches("input"))return;let valid=+e.target.value===s.quiz.correct;let box=node.querySelector(".quiz-feedback");box.hidden=false;box.innerHTML='<strong>'+(valid?"✓ Respuesta correcta":"↻ Revisemos el concepto")+'</strong>'+safe(s.quiz.why)});}
 if(s.quizSet){$("lesson").querySelectorAll("[data-truefalse]").forEach(node=>node.addEventListener("change",e=>{if(!e.target.matches("input"))return;let q=s.quizSet[+node.dataset.truefalse],valid=(e.target.value==="true")===q.a,box=node.querySelector(".quiz-feedback");box.hidden=false;box.innerHTML='<strong>'+(valid?"✓ Respuesta correcta":"↻ Revisa tu respuesta")+'</strong>'+safe(q.why)}))}
}
function renderModules(){$("moduleGrid").innerHTML=data.modules.map((m,i)=>'<button type="button" class="module" data-module="'+i+'"><span class="module-num">MÓDULO 0'+(i+1)+'</span><h3>'+safe(m.title)+'</h3><p>'+safe(m.description)+'</p><div class="module-foot"><span>'+m.minutes+' MIN</span><span>Explorar ↗</span></div></button>').join("");document.querySelectorAll("[data-module]").forEach(b=>b.addEventListener("click",()=>go(data.modules[+b.dataset.module].start)))}
function renderNav(){let html="";data.modules.forEach((m,k)=>{html+='<section class="nav-group"><div class="nav-title">0'+(k+1)+' · '+safe(m.short)+'</div>';for(let i=m.start;i<=m.end;i++)html+='<button class="nav-item'+(i===index?" active":"")+'" data-index="'+i+'" type="button" '+(i===index?'aria-current="step"':'')+'><span class="nav-number">'+String(i+1).padStart(2,"0")+'</span><span>'+safe(data.slides[i].t)+'</span></button>';html+='</section>'});$("lessonNav").innerHTML=html;$("lessonNav").querySelectorAll("[data-index]").forEach(b=>b.addEventListener("click",()=>go(+b.dataset.index)));}
function renderLesson(){let s=data.slides[index],m=group(index),resources=(s.sources||[]).map(id=>data.sources[id]).filter(Boolean);
 let html='<div class="lesson-kicker">MÓDULO 0'+(m+1)+' / '+safe(data.modules[m].short.toUpperCase())+'</div><h2>'+safe(s.t)+'</h2><p class="lesson-lead">'+safe(s.lead)+'</p>';
 if(s.quiz)html+=quizMarkup(s.quiz,"single");
 else if(s.quizSet)html+=quizSetMarkup(s.quizSet);
 else html+=renderVisual(s);
 if(s.prompt)html+='<div class="lesson-prompt"><strong>PREGUNTA PARA EL AULA</strong>'+safe(s.prompt)+'</div>';
 if(resources.length)html+='<section class="resources"><h3>FUENTES Y MATERIAL COMPLEMENTARIO</h3><div class="resources-list">'+resources.map(([title,url])=>'<a class="resource" href="'+safe(url)+'" target="_blank" rel="noopener noreferrer">'+safe(title)+' ↗</a>').join("")+'</div></section>';
 if(s.note)html+='<p class="note"><strong>Orientación docente:</strong> '+safe(s.note)+'</p>';
 $("lesson").innerHTML=html;bindQuizzes(s);
 $("breadcrumb").textContent="EJE 02 / MÓDULO "+String(m+1).padStart(2,"0");$("timeCounter").textContent=String(cumulative(index)).padStart(2,"0")+" / 80 MIN";$("slideCounter").textContent=String(index+1).padStart(2,"0")+" / 28";
 $("prevBtn").disabled=index===0;$("nextBtn").textContent=index===27?"Finalizar ✓":"Siguiente →";
 saved.index=index;if(!saved.seen.includes(index))saved.seen.push(index);
 try{localStorage.setItem(key,JSON.stringify(saved))}catch{}
 $("progressLabel").textContent=saved.seen.length+" / 28";$("progressFill").style.width=(saved.seen.length/28*100)+"%";
 renderNav();window.scrollTo({top:0,behavior:"instant"});document.querySelector("#classroom").classList.remove("nav-open");$("toggleNav").setAttribute("aria-expanded","false");
}
function go(i){index=Math.max(0,Math.min(27,i));$("home").hidden=true;$("classroom").hidden=false;renderLesson();try{history.replaceState(null,"","#sesion-"+String(index+1).padStart(2,"0"))}catch{}}
function home(){$("classroom").hidden=true;$("home").hidden=false;document.body.classList.remove("projecting");projecting=false;window.scrollTo(0,0);try{history.replaceState(null,"","#inicio")}catch{}}
function toast(t){$("toast").textContent=t;$("toast").classList.add("visible");setTimeout(()=>$("toast").classList.remove("visible"),3000)}
$("startBtn").onclick=()=>go(0);$("resumeBtn").onclick=()=>go(saved.index);$("homeBtn").onclick=home;$("prevBtn").onclick=()=>go(index-1);$("nextBtn").onclick=()=>index===27?home():go(index+1);
$("toggleNav").onclick=()=>{let open=$("classroom").classList.toggle("nav-open");$("toggleNav").setAttribute("aria-expanded",String(open))};
$("presentBtn").onclick=async()=>{if($("classroom").hidden)go(saved.index);projecting=!projecting;document.body.classList.toggle("projecting",projecting);$("presentBtn").setAttribute("aria-pressed",String(projecting));if(projecting&&document.documentElement.requestFullscreen){try{await document.documentElement.requestFullscreen()}catch{}}else if(!projecting&&document.fullscreenElement){try{await document.exitFullscreen()}catch{}}};
document.addEventListener("fullscreenchange",()=>{if(!document.fullscreenElement&&projecting){projecting=false;document.body.classList.remove("projecting")}});
document.addEventListener("keydown",e=>{if($("classroom").hidden||/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName||""))return;if(e.key==="ArrowRight"){e.preventDefault();if(index<27)go(index+1)}if(e.key==="ArrowLeft"){e.preventDefault();if(index>0)go(index-1)}if(e.key==="Escape"&&projecting){projecting=false;document.body.classList.remove("projecting")}});
renderModules();let match=location.hash.match(/^#sesion-(\d{1,2})$/);if(match&&+match[1]>=1&&+match[1]<=28)go(+match[1]-1);
})();