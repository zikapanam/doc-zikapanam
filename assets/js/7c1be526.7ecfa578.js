"use strict";(self.webpackChunkzikapanam_doc=self.webpackChunkzikapanam_doc||[]).push([[9962],{176:(e,i,t)=>{t.r(i),t.d(i,{default:()=>d});var n=t(6540),l=t(2130),r=t(8639),s=t(9842),c=t(4848);const o=e=>e?e.replace(/https?:\/\/[^\s]+/g,""):"",d=()=>{const[e,i]=(0,n.useState)([]),[t,d]=(0,n.useState)(!0);if((0,n.useEffect)((()=>{(async()=>{try{const e=await fetch("/collectifs_data.json"),t=await e.json(),n=Object.values(t).filter((e=>e.intitule)).sort(((e,i)=>e.intitule.localeCompare(i.intitule)));i(n)}catch(e){console.error("Erreur lors du chargement des donn\xe9es JSON :",e)}finally{d(!1)}})()}),[]),t)return(0,c.jsx)("p",{children:"Chargement des donn\xe9es..."});if(!e||0===e.length)return(0,c.jsx)("p",{children:"Aucune donn\xe9e disponible."});const u=e.map((e=>({id:e.intitule,title:e.intitule,lineups:(e.lineups||[]).filter((e=>e.intitule_long||e.intitule_court)).sort(((e,i)=>(e.intitule_long||e.intitule_court).localeCompare(i.intitule_long||i.intitule_court)))})));return(0,c.jsx)(l.A,{title:"Index des Collectifs Musicaux",children:(0,c.jsxs)("div",{style:{padding:"20px"},children:[(0,c.jsx)("h1",{children:"Index Alphab\xe9tique des Collectifs et Lineups"}),(0,c.jsxs)("div",{style:{marginBottom:"20px",padding:"10px",border:"1px solid #ddd",borderRadius:"8px"},children:[(0,c.jsx)("h2",{children:"Table des mati\xe8res"}),u.map((e=>(0,c.jsxs)("div",{children:[(0,c.jsx)("a",{href:`#collectif-${e.id}`,style:{fontWeight:"bold",textDecoration:"underline"},children:e.title}),(0,c.jsx)("ul",{children:e.lineups.map(((i,t)=>(0,c.jsx)("li",{children:(0,c.jsx)("a",{href:`#lineup-${e.id}-${t}`,children:i.intitule_long||i.intitule_court})},t)))})]},e.id)))]}),(0,c.jsx)("div",{children:e.map(((e,i)=>{return(0,c.jsxs)("div",{id:`collectif-${e.intitule}`,style:{marginBottom:"40px",paddingBottom:"20px",borderBottom:"1px solid #ccc"},children:[(0,c.jsx)("h3",{children:o(e.intitule)}),e.intitule_court&&(0,c.jsx)("h4",{children:o(e.intitule_court)}),e.recrutement_permanent&&(0,c.jsx)("p",{className:"recrutement-permanent",children:"Recrutement permanent"}),e.jam_description&&(0,c.jsx)("div",{className:"markdown-container",children:(0,c.jsx)(r.o,{rehypePlugins:[s.A],children:o(e.jam_description)})}),e.illustration_url&&(t=e.illustration_url,/\.(jpg|jpeg|png|gif|webp)$/i.test(t))&&(0,c.jsx)("img",{src:e.illustration_url,alt:`${e.intitule} logo`,style:{width:"100px",height:"auto",marginTop:"10px"}}),e.discord_presentation_url&&(0,c.jsx)("p",{children:(0,c.jsx)("a",{href:e.discord_presentation_url,target:"_blank",rel:"noopener noreferrer",children:"Pr\xe9sentation Discord"})}),(0,c.jsx)("h4",{children:"Lineups"}),(0,c.jsx)("ul",{children:e.lineups.filter((e=>e.intitule_long||e.intitule_court)).sort(((e,i)=>(e.intitule_long||e.intitule_court).localeCompare(i.intitule_long||i.intitule_court))).map(((i,t)=>(0,c.jsxs)("li",{id:`lineup-${e.intitule}-${t}`,children:[(0,c.jsx)("strong",{children:o(i.intitule_long)||o(i.intitule_court)}),i.style_musique&&(0,c.jsxs)("p",{children:[(0,c.jsx)("strong",{children:"Style(s) de musique :"})," ",i.style_musique.join(", ")]}),i.phrase_accroche&&(0,c.jsx)("div",{className:"markdown-container",children:(0,c.jsx)(r.o,{rehypePlugins:[s.A],children:o(i.phrase_accroche)})}),i.description&&(0,c.jsx)("div",{className:"markdown-container",children:(0,c.jsx)(r.o,{rehypePlugins:[s.A],children:o(i.description)})})]},t)))}),(0,c.jsx)("p",{children:(0,c.jsx)("a",{href:"#top",style:{textDecoration:"underline"},children:"Retour \xe0 la table des mati\xe8res"})})]},i);var t}))})]})})}}}]);