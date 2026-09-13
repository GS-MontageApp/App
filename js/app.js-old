function checkDailySplash(){document.getElementById('daily_splash_modal').classList.remove('hidden');}
function closeDailySplash(){document.getElementById('daily_splash_modal').classList.add('hidden');}
function openMehrModal(){document.getElementById('mehr_modal').classList.remove('hidden');}
function closeMehrModal(){document.getElementById('mehr_modal').classList.add('hidden');}
function selectMehrItem(appName,appTitle){closeMehrModal();switchApp(appName,appTitle);}
function switchEoSub(subKey){document.querySelectorAll('.eo-sub-section').forEach(el=>el.classList.add('hidden'));document.querySelectorAll('#view-eoform section button').forEach(btn=>{btn.classList.remove('bg-[#005691]','text-white','shadow-sm');btn.classList.add('text-slate-600','hover:text-slate-900');});const targetSub=document.getElementById('eo_sub_'+subKey);if(targetSub)targetSub.classList.remove('hidden');const activeBtn=document.getElementById('eo_tab_'+subKey);if(activeBtn){activeBtn.classList.remove('text-slate-600','hover:text-slate-900');activeBtn.classList.add('bg-[#005691]','text-white','shadow-sm');}const badge=document.getElementById('header-badge');if(badge){badge.classList.remove('hidden');badge.textContent=subKey==='din'?'Einstecktiefe':subKey==='l'?'EO-Form L':'EO-Form-S';}restoreSelectedEoRow(subKey);}
function checkInstallState(){const isStandalone=window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true;const installContainer=document.getElementById('install_container');if(isStandalone&&installContainer)installContainer.style.display='none';}
let deferredPrompt;window.addEventListener('beforeinstallprompt',(e)=>{e.preventDefault();deferredPrompt=e;});window.addEventListener('appinstalled',()=>{const installContainer=document.getElementById('install_container');if(installContainer)installContainer.style.display='none';deferredPrompt=null;});
function installPWA(){if(deferredPrompt){deferredPrompt.prompt();deferredPrompt.userChoice.then((choiceResult)=>{if(choiceResult.outcome==='accepted')document.getElementById('install_container').style.display='none';deferredPrompt=null;});}else{alert('Bereits installiert oder über Browser-Menü unterstützt.');}}
if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('./sw.js').then(reg=>reg.update()).catch(err=>console.log(err));});}
function openTopMenu(){checkInstallState();document.getElementById('top_menu_modal').classList.remove('hidden');}
function closeTopMenu(){document.getElementById('top_menu_modal').classList.add('hidden');}
function openSubModal(type){const titleEl=document.getElementById('sub_modal_title'),contentEl=document.getElementById('sub_modal_content');contentEl.innerHTML='';if(type.startsWith('logbook-')){const key=type.replace('logbook-',''),titles={master:'Zangenschlosser App',etagen:'Etagenrechner',zuschnitt:'Zuschnittsrechner',drehwinkel:'Verdrehwinkel'};titleEl.textContent=`📜 Logbuch: ${titles[key]}`;const logs=(window.allLogbooks&&window.allLogbooks[key])?window.allLogbooks[key]:[];let html='<div class="space-y-3 pb-2 flex flex-col w-full">';logs.forEach(item=>{html+=`<div class="p-3 bg-slate-50 rounded-xl border-l-4 ${item.border} text-xs shrink-0 shadow-sm"><div class="flex justify-between font-bold text-slate-700"><span>Version ${item.version}</span><span>${item.date}</span></div><p class="mt-1 text-slate-600 leading-relaxed">${item.text}</p></div>`;});html+='</div>';contentEl.innerHTML=html;}else if(type==='explanation'){titleEl.textContent='📖 Erklärung über die App';contentEl.innerHTML=`<div class="space-y-3 text-slate-700 text-sm"><p><strong>Zangenschlosser App (Dr. Zange)</strong> für Rohrleitung- und Hydraulikbau.</p><div class="pt-2"><img src="./img/dr-zange.jpg" alt="Dr. Zange" class="rounded-xl shadow-md w-full object-cover"></div></div>`;}else if(type==='contact'){titleEl.textContent='✉️ Kontakt & Support';contentEl.innerHTML=`<div class="space-y-3 text-slate-700 text-sm"><p>Support & Feedback via Projekt-Team.</p><p class="text-xs text-slate-500">Version: v1.10.33</p></div>`;}document.getElementById('sub_modal').classList.remove('hidden');}
function closeSubModal(){document.getElementById('sub_modal').classList.add('hidden');}
function switchApp(appName,appTitle){document.querySelectorAll('.app-view').forEach(el=>el.classList.add('hidden'));document.querySelectorAll('.nav-btn').forEach(el=>{el.classList.remove('text-indigo-600');el.classList.add('text-slate-400');});const targetView=document.getElementById('view-'+appName);if(targetView)targetView.classList.remove('hidden');const activeNav=document.getElementById('nav-'+appName);if(activeNav){activeNav.classList.remove('text-slate-400');activeNav.classList.add('text-indigo-600');}else if(appName==='foobar2'||appName==='foobar3'){const mehrNav=document.getElementById('nav-mehr');if(mehrNav){mehrNav.classList.remove('text-slate-400');mehrNav.classList.add('text-indigo-600');}}const badge=document.getElementById('header-badge');if(appName==='eoform'){badge.classList.remove('hidden');badge.textContent='Einstecktiefe';}else{badge.classList.add('hidden');}document.getElementById('header-title').textContent=appTitle;window.scrollTo(0,0);}
window.addEventListener('DOMContentLoaded',()=>{checkInstallState();checkDailySplash();renderEoTables();EtagenApp.init();ZuschnittApp.init();DrehwinkelApp.init();switchEoSub('din');restoreSelectedEoRow('din');});
// Nach targetView.classList.remove('hidden') in switchApp:
if (appName === 'drehwinkel') {
  // Event/Resize triggern falls Dials Maße brauchen
  window.dispatchEvent(new Event('resize'));
}
// Entweder beim globalen Start:
document.addEventListener('DOMContentLoaded', () => {
  if (typeof ZuschnittApp !== 'undefined' && ZuschnittApp.init) {
    ZuschnittApp.init();
  }
  if (typeof DrehwinkelApp !== 'undefined' && DrehwinkelApp.init) {
    DrehwinkelApp.init();
  }
});
