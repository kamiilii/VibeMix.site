const SONGS = [
  {
    "id": 1,
    "title": "Evidências",
    "artist": "Chitãozinho & Xororó",
    "genre": "Sertanejo",
    "duration": 278,
    "rating": 4.9,
    "cover": "evidencias.jpg",
    "year": 1990
  },
  {
    "id": 2,
    "title": "Amo Noite e Dia",
    "artist": "Jorge & Mateus",
    "genre": "Sertanejo",
    "duration": 193,
    "rating": 4.8,
    "cover": "amonoitedia.jpg",
    "year": 2010
  },
  {
    "id": 3,
    "title": "Infiel",
    "artist": "Marília Mendonça",
    "genre": "Sertanejo",
    "duration": 210,
    "rating": 4.9,
    "cover": "infiel.jpg",
    "year": 2016
  },
  {
    "id": 4,
    "title": "Trem-Bala",
    "artist": "Ana Vilela",
    "genre": "MPB",
    "duration": 210,
    "rating": 4.8,
    "cover": "trembala.jpg",
    "year": 2017
  },
  {
    "id": 5,
    "title": "O Leãozinho",
    "artist": "Caetano Veloso",
    "genre": "MPB",
    "duration": 188,
    "rating": 4.7,
    "cover": "leaozinho.jpg",
    "year": 1977
  },
  {
    "id": 6,
    "title": "Velha Infância",
    "artist": "Tribalistas",
    "genre": "MPB",
    "duration": 257,
    "rating": 4.9,
    "cover": "velhainfancia.jpg",
    "year": 2002
  },
  {
    "id": 7,
    "title": "Cheia de Manias",
    "artist": "Raça Negra",
    "genre": "Pagode",
    "duration": 224,
    "rating": 4.8,
    "cover": "cheiademanias.jpg",
    "year": 1992
  },
  {
    "id": 8,
    "title": "Deixa Acontecer",
    "artist": "Grupo Revelação",
    "genre": "Pagode",
    "duration": 212,
    "rating": 4.9,
    "cover": "deixaacontecer.jpg",
    "year": 2008
  },
  {
    "id": 9,
    "title": "Trevo (Tu)",
    "artist": "ANAVITÓRIA",
    "genre": "Pop",
    "duration": 212,
    "rating": 4.8,
    "cover": "trevo.jpg",
    "year": 2016
  },
  {
    "id": 10,
    "title": "Partilhar",
    "artist": "Rubel",
    "genre": "MPB",
    "duration": 222,
    "rating": 4.7,
    "cover": "partilhar.jpg",
    "year": 2015
  },
  {
    "id": 11,
    "title": "Céu Azul",
    "artist": "Charlie Brown Jr.",
    "genre": "Pop",
    "duration": 207,
    "rating": 4.8,
    "cover": "ceuazul.jpg",
    "year": 2011
  },
  {
    "id": 12,
    "title": "Ainda Bem",
    "artist": "Marisa Monte",
    "genre": "MPB",
    "duration": 214,
    "rating": 4.8,
    "cover": "aindabem.jpg",
    "year": 2011
  }
];
const KEY = "vibemix_playlist";

function getPlaylist(){ return JSON.parse(localStorage.getItem(KEY) || "{}"); }
function savePlaylist(p){ localStorage.setItem(KEY, JSON.stringify(p)); updateBadge(); }
function updateBadge(){ const p=getPlaylist(); const n=Object.values(p).reduce((a,b)=>a+b,0); document.querySelectorAll("#countBadge").forEach(x=>x.textContent=n); }
function fmt(sec){ const m=Math.floor(sec/60).toString().padStart(2,"0"); const s=(sec%60).toString().padStart(2,"0"); return `${m}:${s}`; }
function toast(msg){ const t=document.createElement("div"); t.className="toast-msg"; t.textContent=msg; document.body.appendChild(t); setTimeout(()=>t.remove(),1800); }
function add(id){ const p=getPlaylist(); p[id]=(p[id]||0)+1; savePlaylist(p); toast("Música adicionada à sua playlist!"); }
function remove(id){ const p=getPlaylist(); delete p[id]; savePlaylist(p); renderPlaylist(); }
function changeQty(id,d){ const p=getPlaylist(); p[id]=(p[id]||0)+d; if(p[id]<=0) delete p[id]; savePlaylist(p); renderPlaylist(); }
function card(s){ return `<div class="col-sm-6 col-xl-4"><article class="music-card">
<img class="cover" src="img/${s.cover}" alt="Capa estilizada de ${s.title}">
<div class="music-body"><span class="genre">${s.genre}</span><div class="music-title">${s.title}</div><div class="artist">${s.artist}</div>
<div class="d-flex justify-content-between mt-3"><span class="rating">★ ${s.rating}</span><span class="muted">${fmt(s.duration)}</span></div>
<div class="card-actions"><a class="btn btn-outline-dark" href="detalhes.html?id=${s.id}">Detalhes</a><button class="btn btn-dark" onclick="add(${s.id})">+ Playlist</button></div></div></article></div>`; }
function renderCatalog(){ const box=document.querySelector("#catalog"); if(!box)return;
 const q=(document.querySelector("#search")?.value||"").toLowerCase(); const g=document.querySelector("#genre")?.value||""; const d=Number(document.querySelector("#duration")?.value||0); const sort=document.querySelector("#sort")?.value||"name";
 let arr=SONGS.filter(s=>(s.title+" "+s.artist).toLowerCase().includes(q)&&(!g||s.genre===g)&&(!d||s.duration<=d));
 arr.sort((a,b)=>sort==="rating"?b.rating-a.rating:sort==="duration"?a.duration-b.duration:a.title.localeCompare(b.title,"pt-BR"));
 box.innerHTML=arr.map(card).join(""); document.querySelector("#empty")?.classList.toggle("d-none",arr.length>0); document.querySelector("#resultInfo")?.replaceChildren(document.createTextNode(`${arr.length} resultado(s)`));
}
function renderDetail(){ const box=document.querySelector("#detail"); if(!box)return; const id=Number(new URLSearchParams(location.search).get("id")||1); const s=SONGS.find(x=>x.id===id)||SONGS[0];
 box.innerHTML=`<img class="detail-cover" src="img/${s.cover}" alt="Capa de ${s.title}"><div><span class="genre">${s.genre}</span><h1 class="mt-3">${s.title}</h1><p class="fs-5 muted">${s.artist}</p><div class="detail-meta"><span class="genre">★ ${s.rating}</span><span class="genre">${fmt(s.duration)}</span><span class="genre">${s.year}</span></div><p class="muted">Uma faixa selecionada para compor o catálogo da VibeMix. Adicione à sua playlist e organize sua coleção no navegador.</p><div class="d-flex gap-2 flex-wrap"><button class="btn btn-dark btn-lg" onclick="add(${s.id})">Adicionar à playlist</button><a class="btn btn-outline-dark btn-lg" href="index.html">Voltar ao catálogo</a></div></div>`; }
function renderPlaylist(){ const box=document.querySelector("#playlistItems"); if(!box)return; const p=getPlaylist(); const entries=Object.entries(p); 
 box.innerHTML=entries.length?entries.map(([id,q])=>{const s=SONGS.find(x=>x.id==id); return `<div class="playlist-item"><img src="img/${s.cover}" alt=""><div><h4>${s.title}</h4><p>${s.artist} • ${fmt(s.duration)}</p></div><div class="qty"><button onclick="changeQty(${s.id},-1)">−</button><strong>${q}</strong><button onclick="changeQty(${s.id},1)">+</button><button class="btn btn-sm btn-outline-danger ms-2" onclick="remove(${s.id})">×</button></div></div>`}).join(""):`<div class="empty">Sua playlist está vazia.<br><a href="index.html" class="btn btn-dark mt-3">Adicionar músicas</a></div>`;
 let qty=0,total=0; entries.forEach(([id,n])=>{const s=SONGS.find(x=>x.id==id);qty+=n;total+=s.duration*n;}); document.querySelector("#sumQty")?.replaceChildren(document.createTextNode(qty)); document.querySelector("#sumTime")?.replaceChildren(document.createTextNode(fmt(total)));
}
document.addEventListener("DOMContentLoaded",()=>{updateBadge(); renderCatalog(); renderDetail(); renderPlaylist();
 ["search","genre","duration","sort"].forEach(id=>document.querySelector("#"+id)?.addEventListener("input",renderCatalog));
 document.querySelector("#clearBtn")?.addEventListener("click",()=>{localStorage.removeItem(KEY);renderPlaylist();updateBadge();});
 document.querySelector("#promoBtn")?.addEventListener("click",()=>{const v=(document.querySelector("#promo")?.value||"").trim().toUpperCase(); const msg=document.querySelector("#promoMsg"); if(v==="VIBEMIX10"){msg.textContent="Código aceito! Conteúdo bônus liberado.";msg.className="small mt-2 text-success fw-bold";}else{msg.textContent="Código inválido. Tente VIBEMIX10.";msg.className="small mt-2 text-danger fw-bold";}});
});
