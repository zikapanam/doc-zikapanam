"use strict";(self.webpackChunkzikapanam_doc=self.webpackChunkzikapanam_doc||[]).push([[893,9962],{3426:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>d,contentTitle:()=>c,default:()=>h,frontMatter:()=>o,metadata:()=>a,toc:()=>u});var i=s(4848),n=s(8453),r=s(7654),l=s(176);const o={id:"collectifs",title:"Collectifs & Lineups",description:"Tous les collectifs et leurs lineups.",kewords:["zikapanam","collectif","lineup","Membres","r\xe9f\xe9rents","leaders"]},c=void 0,a={id:"projets-dans-l-asso/collectifs",title:"Collectifs & Lineups",description:"Tous les collectifs et leurs lineups.",source:"@site/docs/projets-dans-l-asso/collectifs.mdx",sourceDirName:"projets-dans-l-asso",slug:"/projets-dans-l-asso/collectifs",permalink:"/docs/projets-dans-l-asso/collectifs",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"collectifs",title:"Collectifs & Lineups",description:"Tous les collectifs et leurs lineups.",kewords:["zikapanam","collectif","lineup","Membres","r\xe9f\xe9rents","leaders"]},sidebar:"DocSidebar",previous:{title:"Organiser une soir\xe9e",permalink:"/docs/fonctionnement/organiser-une-soiree"},next:{title:"Exemples de formations musicales",permalink:"/docs/projets-dans-l-asso/lineups"}},d={},u=[];function p(e){return(0,i.jsx)(r.A,{children:(0,i.jsx)(l.default,{})})}function h(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(p,{...e})}):p()}},7654:(e,t,s)=>{s.d(t,{A:()=>n});s(6540);var i=s(4848);function n(e){let{children:t}=e;return(0,i.jsx)("div",{className:"no-nav-layout",children:t})}},176:(e,t,s)=>{s.r(t),s.d(t,{default:()=>p});var i=s(6540),n=s(7654),r=s(8639),l=s(9842),o=s(4848);const c=e=>{const t=document.getElementById(e).getBoundingClientRect().top+window.pageYOffset+-100;window.scrollTo({top:t,behavior:"smooth"})},a=e=>"string"!=typeof e?"":e.replace(/https?:\/\/[^\s]+/g,""),d=e=>"string"!=typeof e?"":e.replace(/[\u{1F600}-\u{1FAFF}\u{2600}-\u{27BF}]+/gu,""),u=e=>Array.isArray(e)?e.map((e=>a(e))).join(", "):a(e),p=()=>{const[e,t]=(0,i.useState)([]),[s,p]=(0,i.useState)(!0),[h,m]=(0,i.useState)(null),[x,j]=(0,i.useState)("");(0,i.useEffect)((()=>{(async()=>{try{const e=await fetch("/collectifs_data.json");if(!e.ok)throw new Error("Network response was not ok");const s=await e.json(),i=Object.values(s).filter((e=>e.intitule)).sort(((e,t)=>d(e.intitule).localeCompare(d(t.intitule))));t(i)}catch(h){m("Erreur lors du chargement des donn\xe9es. Veuillez r\xe9essayer plus tard.")}finally{p(!1)}})()}),[]);const f=e.map((e=>({...e,lineups:(e.lineups||[]).filter((e=>d(e.intitule_long||e.intitule_court||"").toLowerCase().includes(x)||e.style_musique&&e.style_musique.toLowerCase().includes(x)))}))).filter((e=>d(e.intitule).toLowerCase().includes(x)||e.lineups&&e.lineups.length>0)),g=f.map((e=>({id:e.intitule,title:e.intitule,lineups:e.lineups})));return s?(0,o.jsx)("p",{children:"Chargement des donn\xe9es..."}):h?(0,o.jsx)("p",{children:h}):(0,o.jsx)(n.A,{title:"Collectifs et Lineups",children:(0,o.jsxs)("div",{style:{padding:"20px"},children:[(0,o.jsxs)("div",{style:{marginBottom:"20px",padding:"10px",border:"1px solid #ddd",borderRadius:"8px"},children:[(0,o.jsx)("h2",{children:"Table des mati\xe8res"}),(0,o.jsx)("input",{type:"text",placeholder:"Rechercher un collectif, lineup ou style de musique...",onChange:e=>{j(e.target.value.toLowerCase())},style:{padding:"8px",marginBottom:"10px",borderRadius:"4px",width:"100%",border:"1px solid #ddd"}}),g.map((e=>(0,o.jsxs)("div",{children:[(0,o.jsx)("a",{href:`#collectif-${e.id}`,style:{fontWeight:"bold",textDecoration:"underline"},onClick:t=>{t.preventDefault(),c(`collectif-${e.id}`)},children:e.title}),(0,o.jsx)("ul",{children:e.lineups.map(((t,s)=>(0,o.jsx)("li",{children:(0,o.jsx)("a",{href:`#lineup-${e.id}-${s}`,onClick:t=>{t.preventDefault(),c(`lineup-${e.id}-${s}`)},children:t.intitule_long||t.intitule_court})},s)))})]},e.id)))]}),(0,o.jsx)("div",{children:f.map(((e,t)=>{return(0,o.jsxs)("div",{id:`collectif-${e.intitule}`,style:{marginBottom:"40px",paddingBottom:"20px",borderBottom:"1px solid #ccc"},children:[(0,o.jsx)("div",{id:`anchor-${e.intitule}`,style:{position:"relative",top:"-80px"}}),(0,o.jsx)("h3",{children:a(e.intitule)}),e.intitule_court&&(0,o.jsx)("h4",{children:a(e.intitule_court)}),e.recrutement_permanent&&(0,o.jsx)("p",{className:"recrutement-permanent",children:"Recrutement permanent"}),e.pseudo_zap&&(0,o.jsxs)("div",{children:[(0,o.jsx)("strong",{children:"Leader :"})," ",u(e.pseudo_zap),(0,o.jsx)("br",{})]}),e.jam_description&&(0,o.jsx)("div",{className:"markdown-container",children:(0,o.jsx)(r.o,{rehypePlugins:[l.A],children:a(e.jam_description)})}),e.illustration_url&&(s=e.illustration_url,/\.(jpg|jpeg|png|gif|webp)$/i.test(s))&&(0,o.jsx)("img",{src:e.illustration_url,alt:`${e.intitule} logo`,style:{width:"100px",height:"auto",marginTop:"10px"}}),e.discord_presentation_url&&(0,o.jsx)("p",{children:(0,o.jsx)("a",{href:e.discord_presentation_url,target:"_blank",rel:"noopener noreferrer",children:"Pr\xe9sentation Discord"})}),(0,o.jsx)("h4",{children:"Lineups"}),(0,o.jsx)("ul",{children:e.lineups.map(((t,s)=>{return(0,o.jsxs)("li",{id:`lineup-${e.intitule}-${s}`,children:[(0,o.jsx)("p",{children:(0,o.jsx)("strong",{children:a(t.intitule_long)||a(t.intitule_court)})}),t.referent_pseudo_zap&&(0,o.jsxs)("div",{children:[(0,o.jsx)("strong",{children:"R\xe9f\xe9rent :"})," ",u(t.referent_pseudo_zap),(0,o.jsx)("br",{})]}),t.prenoms_membres&&(0,o.jsxs)("div",{children:[(0,o.jsx)("strong",{children:"Membres :"})," ",(i=a(t.prenoms_membres),i?i.split(",").map((e=>e.trim().split("-").map((e=>e.charAt(0).toUpperCase()+e.slice(1).toLowerCase())).join("-"))).join(", "):""),(0,o.jsx)("br",{})]}),t.style_musique&&(0,o.jsxs)("div",{children:[(0,o.jsx)("strong",{children:"Style(s) de musique :"})," ",t.style_musique,(0,o.jsx)("br",{})]}),t.phrase_accroche&&(0,o.jsx)("div",{className:"markdown-container",children:(0,o.jsx)(r.o,{rehypePlugins:[l.A],children:a(t.phrase_accroche)})}),t.description&&(0,o.jsx)("div",{className:"markdown-container",children:(0,o.jsx)(r.o,{rehypePlugins:[l.A],children:a(t.description)})}),(0,o.jsx)("br",{})]},s);var i}))}),(0,o.jsx)("p",{children:(0,o.jsx)("a",{href:"#top",style:{textDecoration:"underline"},children:"Retour \xe0 la table des mati\xe8res"})})]},t);var s}))})]})})}},8453:(e,t,s)=>{s.d(t,{R:()=>l,x:()=>o});var i=s(6540);const n={},r=i.createContext(n);function l(e){const t=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:l(e.components),i.createElement(r.Provider,{value:t},e.children)}}}]);