"use strict";(self.webpackChunkzikapanam_doc=self.webpackChunkzikapanam_doc||[]).push([[9962],{7654:(e,i,t)=>{t.d(i,{A:()=>r});t(6540);var n=t(4848);function r(e){let{children:i}=e;return(0,n.jsx)("div",{className:"no-nav-layout",children:i})}},176:(e,i,t)=>{t.r(i),t.d(i,{default:()=>d});var n=t(6540),r=t(7654),l=t(8639),s=t(9842),o=t(4848);const u=e=>e?e.replace(/https?:\/\/[^\s]+/g,""):"",c=e=>e.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]+/gu,""),d=()=>{const[e,i]=(0,n.useState)([]),[t,d]=(0,n.useState)(!0);if((0,n.useEffect)((()=>{(async()=>{try{const e=await fetch("/collectifs_data.json"),t=await e.json(),n=Object.values(t).filter((e=>e.intitule)).sort(((e,i)=>c(e.intitule).localeCompare(c(i.intitule))));i(n)}catch(e){console.error("Erreur lors du chargement des donn\xe9es JSON :",e)}finally{d(!1)}})()}),[]),t)return(0,o.jsx)("p",{children:"Chargement des donn\xe9es..."});if(!e||0===e.length)return(0,o.jsx)("p",{children:"Aucune donn\xe9e disponible."});const a=e.map((e=>({id:e.intitule,title:e.intitule,lineups:(e.lineups||[]).filter((e=>e.intitule_long||e.intitule_court)).sort(((e,i)=>c(e.intitule_long||e.intitule_court).localeCompare(c(i.intitule_long||i.intitule_court))))})));return(0,o.jsx)(r.A,{title:"Collectifs et Lineups",children:(0,o.jsxs)("div",{style:{padding:"20px"},children:[(0,o.jsxs)("div",{style:{marginBottom:"20px",padding:"10px",border:"1px solid #ddd",borderRadius:"8px"},children:[(0,o.jsx)("h2",{children:"Table des mati\xe8res"}),a.map((e=>(0,o.jsxs)("div",{children:[(0,o.jsx)("a",{href:`#collectif-${e.id}`,style:{fontWeight:"bold",textDecoration:"underline"},onClick:i=>{i.preventDefault(),(e=>{const i=document.getElementById(e).getBoundingClientRect().top+window.pageYOffset+-100;window.scrollTo({top:i,behavior:"smooth"})})(`collectif-${e.id}`)},children:e.title}),(0,o.jsx)("ul",{children:e.lineups.map(((i,t)=>(0,o.jsx)("li",{children:(0,o.jsx)("a",{href:`#lineup-${e.id}-${t}`,children:i.intitule_long||i.intitule_court})},t)))})]},e.id)))]}),(0,o.jsx)("div",{children:e.map(((e,i)=>{return(0,o.jsxs)("div",{id:`collectif-${e.intitule}`,style:{marginBottom:"40px",paddingBottom:"20px",borderBottom:"1px solid #ccc"},children:[(0,o.jsx)("div",{id:`anchor-${e.intitule}`,style:{position:"relative",top:"-80px"}}),(0,o.jsx)("h3",{children:u(e.intitule)}),e.intitule_court&&(0,o.jsx)("h4",{children:u(e.intitule_court)}),e.recrutement_permanent&&(0,o.jsx)("p",{className:"recrutement-permanent",children:"Recrutement permanent"}),e.jam_description&&(0,o.jsx)("div",{className:"markdown-container",children:(0,o.jsx)(l.o,{rehypePlugins:[s.A],children:u(e.jam_description)})}),e.illustration_url&&(t=e.illustration_url,/\.(jpg|jpeg|png|gif|webp)$/i.test(t))&&(0,o.jsx)("img",{src:e.illustration_url,alt:`${e.intitule} logo`,style:{width:"100px",height:"auto",marginTop:"10px"}}),e.discord_presentation_url&&(0,o.jsx)("p",{children:(0,o.jsx)("a",{href:e.discord_presentation_url,target:"_blank",rel:"noopener noreferrer",children:"Pr\xe9sentation Discord"})}),(0,o.jsx)("h4",{children:"Lineups"}),(0,o.jsx)("ul",{children:e.lineups.filter((e=>e.intitule_long||e.intitule_court)).sort(((e,i)=>c(e.intitule_long||e.intitule_court).localeCompare(c(i.intitule_long||i.intitule_court)))).map(((i,t)=>(0,o.jsxs)("li",{id:`lineup-${e.intitule}-${t}`,children:[(0,o.jsx)("p",{children:(0,o.jsx)("strong",{children:u(i.intitule_long)||u(i.intitule_court)})}),i.referent_pseudo_zap&&(0,o.jsxs)("div",{children:[(0,o.jsx)("strong",{children:"R\xe9f\xe9rent :"})," ",u(i.referent_pseudo_zap),(0,o.jsx)("br",{})]}),i.prenoms_membres&&(0,o.jsxs)("div",{children:[(0,o.jsx)("strong",{children:"Membres :"})," ",u(i.prenoms_membres),(0,o.jsx)("br",{})]}),i.style_musique&&(0,o.jsxs)("div",{children:[(0,o.jsx)("strong",{children:"Style(s) de musique :"})," ",i.style_musique,(0,o.jsx)("br",{})]}),i.phrase_accroche&&(0,o.jsx)("div",{className:"markdown-container",children:(0,o.jsx)(l.o,{rehypePlugins:[s.A],children:u(i.phrase_accroche)})}),i.description&&(0,o.jsx)("div",{className:"markdown-container",children:(0,o.jsx)(l.o,{rehypePlugins:[s.A],children:u(i.description)})}),(0,o.jsx)("br",{})]},t)))}),(0,o.jsx)("p",{children:(0,o.jsx)("a",{href:"#top",style:{textDecoration:"underline"},children:"Retour \xe0 la table des mati\xe8res"})})]},i);var t}))})]})})}}}]);