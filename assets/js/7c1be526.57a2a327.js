"use strict";(self.webpackChunkzikapanam_doc=self.webpackChunkzikapanam_doc||[]).push([[9962],{7654:(e,t,i)=>{i.d(t,{A:()=>r});i(6540);var s=i(4848);function r(e){let{children:t}=e;return(0,s.jsx)("div",{className:"no-nav-layout",children:t})}},176:(e,t,i)=>{i.r(t),i.d(t,{default:()=>h});var s=i(6540),r=i(7654),n=i(8639),l=i(9842),o=i(4848);const a=e=>{const t=document.getElementById(e).getBoundingClientRect().top+window.pageYOffset+-100;window.scrollTo({top:t,behavior:"smooth"})},d=e=>"string"!=typeof e?"":e.replace(/https?:\/\/[^\s]+/g,""),u=e=>"string"!=typeof e?"":e.replace(/[\u{1F600}-\u{1FAFF}\u{2600}-\u{27BF}]+/gu,""),c=e=>Array.isArray(e)?e.map((e=>d(e))).join(", "):d(e),p=e=>e&&e.trim()?e.trim():"Fiche \xe0 compl\xe9ter",h=()=>{const[e,t]=(0,s.useState)([]),[i,h]=(0,s.useState)(!0),[m,x]=(0,s.useState)(null),[j,g]=(0,s.useState)(""),[_,f]=(0,s.useState)("");(0,s.useEffect)((()=>{(async()=>{try{const e=await fetch("/collectifs_data.json");if(!e.ok)throw new Error("Network response was not ok");const i=await e.json(),s=Object.values(i).filter((e=>e.intitule)).sort(((e,t)=>u(e.intitule).localeCompare(u(t.intitule)))).map((e=>({...e,lineups:(e.lineups||[]).sort(((e,t)=>u(e.intitule_long||e.intitule_court||"").localeCompare(u(t.intitule_long||t.intitule_court||""))))})));t(s)}catch(m){x("Erreur lors du chargement des donn\xe9es. Veuillez r\xe9essayer plus tard.")}finally{h(!1)}})()}),[]);const y=[...new Set(e.flatMap((e=>(e.lineups||[]).flatMap((e=>e.style_musique?e.style_musique.split(",").map((e=>e.trim())):[])))))].sort(((e,t)=>e.localeCompare(t))),v=e.map((e=>({...e,lineups:(e.lineups||[]).filter((e=>{const t=e.style_musique?e.style_musique.split(",").map((e=>e.trim().toLowerCase())):[],i=u(e.intitule_long||e.intitule_court||"").toLowerCase().includes(j)||t.some((e=>e.includes(j))),s=""===_||t.includes(_.toLowerCase());return i&&s}))}))).filter((e=>(u(e.intitule).toLowerCase().includes(j)||e.lineups&&e.lineups.length>0)&&(""===_||e.lineups.some((e=>e.style_musique&&e.style_musique.split(",").map((e=>e.trim().toLowerCase())).includes(_.toLowerCase())))))),w=v.map((e=>({id:p(e.intitule),title:p(e.intitule),lineups:e.lineups})));return i?(0,o.jsx)("p",{children:"Chargement des donn\xe9es..."}):m?(0,o.jsx)("p",{children:m}):(0,o.jsx)(r.A,{title:"Collectifs et Lineups",children:(0,o.jsxs)("div",{style:{padding:"20px"},children:[(0,o.jsxs)("div",{style:{marginBottom:"20px",padding:"10px",border:"1px solid #ddd",borderRadius:"8px"},children:[(0,o.jsx)("h2",{children:"Table des mati\xe8res"}),(0,o.jsx)("input",{type:"text",placeholder:"Rechercher un collectif, lineup ou style de musique...",onChange:e=>{g(e.target.value.toLowerCase())},style:{padding:"8px",marginBottom:"10px",borderRadius:"4px",width:"100%",border:"1px solid #ddd"}}),(0,o.jsxs)("select",{value:_,onChange:e=>{f(e.target.value)},style:{padding:"8px",marginBottom:"10px",borderRadius:"4px",width:"100%",border:"1px solid #ddd"},children:[(0,o.jsx)("option",{value:"",children:"Tous les styles"}),y.map(((e,t)=>(0,o.jsx)("option",{value:e.toLowerCase(),children:e},t)))]}),w.map((e=>(0,o.jsxs)("div",{children:[(0,o.jsx)("a",{href:`#collectif-${e.id}`,style:{fontWeight:"bold",textDecoration:"underline"},onClick:t=>{t.preventDefault(),a(`collectif-${e.id}`)},children:e.title}),(0,o.jsx)("ul",{children:e.lineups.map(((t,i)=>(0,o.jsx)("li",{children:(0,o.jsx)("a",{href:`#lineup-${e.id}-${i}`,onClick:t=>{t.preventDefault(),a(`lineup-${e.id}-${i}`)},children:p(t.intitule_long||t.intitule_court)})},i)))})]},e.id)))]}),(0,o.jsx)("div",{children:v.map(((e,t)=>{return(0,o.jsxs)("div",{id:`collectif-${p(e.intitule)}`,style:{marginBottom:"40px",paddingBottom:"20px",borderBottom:"1px solid #ccc"},children:[(0,o.jsx)("div",{id:`anchor-${p(e.intitule)}`,style:{position:"relative",top:"-80px"}}),(0,o.jsx)("h3",{children:p(d(e.intitule))}),e.intitule_court&&(0,o.jsx)("h4",{children:p(d(e.intitule_court))}),e.recrutement_permanent&&(0,o.jsx)("p",{className:"recrutement-permanent",children:"Recrutement permanent"}),e.pseudo_zap&&(0,o.jsxs)("div",{children:[(0,o.jsx)("strong",{children:"Leader :"})," ",c(e.pseudo_zap),(0,o.jsx)("br",{})]}),e.jam_description&&(0,o.jsx)("div",{className:"markdown-container",children:(0,o.jsx)(n.o,{rehypePlugins:[l.A],children:d(e.jam_description)})}),e.illustration_url&&(i=e.illustration_url,/\.(jpg|jpeg|png|gif|webp)$/i.test(i))&&(0,o.jsx)("img",{src:e.illustration_url,alt:`${e.intitule} logo`,style:{width:"100px",height:"auto",marginTop:"10px"}}),e.discord_presentation_url&&(0,o.jsx)("p",{children:(0,o.jsx)("a",{href:e.discord_presentation_url,target:"_blank",rel:"noopener noreferrer",children:"Pr\xe9sentation Discord"})}),(0,o.jsx)("h4",{children:"Lineups"}),(0,o.jsx)("ul",{children:e.lineups.map(((t,i)=>{return(0,o.jsxs)("li",{id:`lineup-${p(e.intitule)}-${i}`,children:[(0,o.jsx)("p",{children:(0,o.jsx)("strong",{children:p(d(t.intitule_long)||d(t.intitule_court))})}),t.referent_pseudo_zap&&(0,o.jsxs)("div",{children:[(0,o.jsx)("strong",{children:"R\xe9f\xe9rent :"})," ",c(t.referent_pseudo_zap),(0,o.jsx)("br",{})]}),t.prenoms_membres&&(0,o.jsxs)("div",{children:[(0,o.jsx)("strong",{children:"Membres :"})," ",(s=d(t.prenoms_membres),s?s.split(",").map((e=>e.trim().split("-").map((e=>e.charAt(0).toUpperCase()+e.slice(1).toLowerCase())).join("-"))).join(", "):""),(0,o.jsx)("br",{})]}),t.style_musique&&(0,o.jsxs)("div",{children:[(0,o.jsx)("strong",{children:"Style(s) de musique :"})," ",t.style_musique,(0,o.jsx)("br",{})]}),t.phrase_accroche&&(0,o.jsx)("div",{className:"markdown-container",children:(0,o.jsx)(n.o,{rehypePlugins:[l.A],children:d(t.phrase_accroche)})}),t.description&&(0,o.jsx)("div",{className:"markdown-container",children:(0,o.jsx)(n.o,{rehypePlugins:[l.A],children:d(t.description)})}),(0,o.jsx)("br",{})]},i);var s}))}),(0,o.jsx)("p",{children:(0,o.jsx)("a",{href:"#top",style:{textDecoration:"underline"},children:"Retour \xe0 la table des mati\xe8res"})})]},t);var i}))})]})})}}}]);