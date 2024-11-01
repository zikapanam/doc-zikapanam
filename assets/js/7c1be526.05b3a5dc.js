"use strict";(self.webpackChunkzikapanam_doc=self.webpackChunkzikapanam_doc||[]).push([[9962],{7654:(e,i,t)=>{t.d(i,{A:()=>n});t(6540);var r=t(4848);function n(e){let{children:i}=e;return(0,r.jsx)("div",{className:"no-nav-layout",children:i})}},176:(e,i,t)=>{t.r(i),t.d(i,{default:()=>p});var r=t(6540),n=t(7654),s=t(8639),l=t(9842),o=t(4848);const d=e=>{const i=document.getElementById(e).getBoundingClientRect().top+window.pageYOffset+-100;window.scrollTo({top:i,behavior:"smooth"})},a=e=>"string"!=typeof e?"":e.replace(/https?:\/\/[^\s]+/g,""),c=e=>"string"!=typeof e?"":e.replace(/[\u{1F600}-\u{1FAFF}\u{2600}-\u{27BF}]+/gu,""),u=e=>Array.isArray(e)?e.map((e=>a(e))).join(", "):a(e),p=()=>{const[e,i]=(0,r.useState)([]),[t,p]=(0,r.useState)(!0),[h,x]=(0,r.useState)(null),[m,j]=(0,r.useState)("");(0,r.useEffect)((()=>{(async()=>{try{const e=await fetch("/collectifs_data.json");if(!e.ok)throw new Error("Network response was not ok");const t=await e.json(),r=Object.values(t).filter((e=>e.intitule)).sort(((e,i)=>c(e.intitule).localeCompare(c(i.intitule))));i(r)}catch(h){x("Erreur lors du chargement des donn\xe9es. Veuillez r\xe9essayer plus tard.")}finally{p(!1)}})()}),[]);const g=e.map((e=>({...e,lineups:(e.lineups||[]).filter((e=>c(e.intitule_long||e.intitule_court||"").toLowerCase().includes(m)||e.style_musique&&e.style_musique.toLowerCase().includes(m)))}))).filter((e=>c(e.intitule).toLowerCase().includes(m)||e.lineups&&e.lineups.length>0)),_=g.map((e=>({id:e.intitule,title:e.intitule,lineups:e.lineups})));return t?(0,o.jsx)("p",{children:"Chargement des donn\xe9es..."}):h?(0,o.jsx)("p",{children:h}):(0,o.jsx)(n.A,{title:"Collectifs et Lineups",children:(0,o.jsxs)("div",{style:{padding:"20px"},children:[(0,o.jsxs)("div",{style:{marginBottom:"20px",padding:"10px",border:"1px solid #ddd",borderRadius:"8px"},children:[(0,o.jsx)("h2",{children:"Table des mati\xe8res"}),(0,o.jsx)("input",{type:"text",placeholder:"Rechercher un collectif, lineup ou style de musique...",onChange:e=>{j(e.target.value.toLowerCase())},style:{padding:"8px",marginBottom:"10px",borderRadius:"4px",width:"100%",border:"1px solid #ddd"}}),_.map((e=>(0,o.jsxs)("div",{children:[(0,o.jsx)("a",{href:`#collectif-${e.id}`,style:{fontWeight:"bold",textDecoration:"underline"},onClick:i=>{i.preventDefault(),d(`collectif-${e.id}`)},children:e.title}),(0,o.jsx)("ul",{children:e.lineups.map(((i,t)=>(0,o.jsx)("li",{children:(0,o.jsx)("a",{href:`#lineup-${e.id}-${t}`,onClick:i=>{i.preventDefault(),d(`lineup-${e.id}-${t}`)},children:i.intitule_long||i.intitule_court})},t)))})]},e.id)))]}),(0,o.jsx)("div",{children:g.map(((e,i)=>{return(0,o.jsxs)("div",{id:`collectif-${e.intitule}`,style:{marginBottom:"40px",paddingBottom:"20px",borderBottom:"1px solid #ccc"},children:[(0,o.jsx)("div",{id:`anchor-${e.intitule}`,style:{position:"relative",top:"-80px"}}),(0,o.jsx)("h3",{children:a(e.intitule)}),e.intitule_court&&(0,o.jsx)("h4",{children:a(e.intitule_court)}),e.recrutement_permanent&&(0,o.jsx)("p",{className:"recrutement-permanent",children:"Recrutement permanent"}),e.pseudo_zap&&(0,o.jsxs)("div",{children:[(0,o.jsx)("strong",{children:"Leader :"})," ",u(e.pseudo_zap),(0,o.jsx)("br",{})]}),e.jam_description&&(0,o.jsx)("div",{className:"markdown-container",children:(0,o.jsx)(s.o,{rehypePlugins:[l.A],children:a(e.jam_description)})}),e.illustration_url&&(t=e.illustration_url,/\.(jpg|jpeg|png|gif|webp)$/i.test(t))&&(0,o.jsx)("img",{src:e.illustration_url,alt:`${e.intitule} logo`,style:{width:"100px",height:"auto",marginTop:"10px"}}),e.discord_presentation_url&&(0,o.jsx)("p",{children:(0,o.jsx)("a",{href:e.discord_presentation_url,target:"_blank",rel:"noopener noreferrer",children:"Pr\xe9sentation Discord"})}),(0,o.jsx)("h4",{children:"Lineups"}),(0,o.jsx)("ul",{children:e.lineups.map(((i,t)=>{return(0,o.jsxs)("li",{id:`lineup-${e.intitule}-${t}`,children:[(0,o.jsx)("p",{children:(0,o.jsx)("strong",{children:a(i.intitule_long)||a(i.intitule_court)})}),i.referent_pseudo_zap&&(0,o.jsxs)("div",{children:[(0,o.jsx)("strong",{children:"R\xe9f\xe9rent :"})," ",u(i.referent_pseudo_zap),(0,o.jsx)("br",{})]}),i.prenoms_membres&&(0,o.jsxs)("div",{children:[(0,o.jsx)("strong",{children:"Membres :"})," ",(r=a(i.prenoms_membres),r?r.split(",").map((e=>e.trim().split("-").map((e=>e.charAt(0).toUpperCase()+e.slice(1).toLowerCase())).join("-"))).join(", "):""),(0,o.jsx)("br",{})]}),i.style_musique&&(0,o.jsxs)("div",{children:[(0,o.jsx)("strong",{children:"Style(s) de musique :"})," ",i.style_musique,(0,o.jsx)("br",{})]}),i.phrase_accroche&&(0,o.jsx)("div",{className:"markdown-container",children:(0,o.jsx)(s.o,{rehypePlugins:[l.A],children:a(i.phrase_accroche)})}),i.description&&(0,o.jsx)("div",{className:"markdown-container",children:(0,o.jsx)(s.o,{rehypePlugins:[l.A],children:a(i.description)})}),(0,o.jsx)("br",{})]},t);var r}))}),(0,o.jsx)("p",{children:(0,o.jsx)("a",{href:"#top",style:{textDecoration:"underline"},children:"Retour \xe0 la table des mati\xe8res"})})]},i);var t}))})]})})}}}]);