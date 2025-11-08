import{_ as u}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-DPN-3ftV.js";import{b as d,o as m,w as a,g as n,e as t,m as i,D as l,v as c,x as f,z as p}from"./modules/vue-Cho9hMGZ.js";import{_ as g}from"./default.vue_vue_type_script_setup_true_lang-jH2WIlFr.js";import{u as x,f as v}from"./slidev/context-C-ExvZmy.js";import"./modules/unplugin-icons-481F6Nil.js";import"./index-Diq4705d.js";import"./modules/shiki-DolGubX0.js";import"./layoutHelper-DYp61_9N.js";const B={__name:"dev-sonarqube-xray.md__slidev_288",setup(y){const{$clicksContext:o,$frontmatter:r}=x();return o.setup(),(C,s)=>{const e=u;return m(),d(g,c(f(p(v)(p(r),287))),{default:a(()=>[s[2]||(s[2]=n("h1",null,"Scan Results Interpretation",-1)),s[3]||(s[3]=n("h2",null,"Sample Xray Report",-1)),t(e,i({},{title:"",ranges:[]}),{default:a(()=>[...s[0]||(s[0]=[n("pre",{class:"shiki the-unnamed slidev-code",style:{"background-color":"#0E131F",color:"#F3EFF5"}},[n("code",{class:"language-text"},[n("span",{class:"line"},[n("span",null,"┌─────────────────────────┬──────────┬────────────┬──────────────────┐")]),l(`
`),n("span",{class:"line"},[n("span",null,"│ Component               │ Severity │ CVE        │ Fixed Version    │")]),l(`
`),n("span",{class:"line"},[n("span",null,"├─────────────────────────┼──────────┼────────────┼──────────────────┤")]),l(`
`),n("span",{class:"line"},[n("span",null,"│ lodash@4.17.19          │ Critical │ CVE-2021-1 │ 4.17.21          │")]),l(`
`),n("span",{class:"line"},[n("span",null,"│ express@4.16.0          │ High     │ CVE-2022-2 │ 4.18.2           │")]),l(`
`),n("span",{class:"line"},[n("span",null,"│ axios@0.21.1            │ Medium   │ CVE-2021-3 │ 0.21.2           │")]),l(`
`),n("span",{class:"line"},[n("span",null,"└─────────────────────────┴──────────┴────────────┴──────────────────┘")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"Total: 3 vulnerabilities")]),l(`
`),n("span",{class:"line"},[n("span",null,"  Critical: 1")]),l(`
`),n("span",{class:"line"},[n("span",null,"  High: 1")]),l(`
`),n("span",{class:"line"},[n("span",null,"  Medium: 1")]),l(`
`),n("span",{class:"line"},[n("span",null,"  Low: 0")])])],-1)])]),_:1},16),s[4]||(s[4]=n("h2",null,"What to Do",-1)),s[5]||(s[5]=n("ol",null,[n("li",null,[n("strong",null,"Critical/High:"),l(" Fix immediately "),n("ul",null,[n("li",null,"Update to fixed version"),n("li",null,"Or find alternative package")])]),n("li",null,[n("strong",null,"Medium:"),l(" Plan fix in next sprint")]),n("li",null,[n("strong",null,"Low:"),l(" Add to backlog")])],-1)),s[6]||(s[6]=n("h2",null,"Dependency Tree Analysis",-1)),t(e,i({},{title:"",ranges:[]}),{default:a(()=>[...s[1]||(s[1]=[n("pre",{class:"shiki the-unnamed slidev-code",style:{"background-color":"#0E131F",color:"#F3EFF5"}},[n("code",{class:"language-text"},[n("span",{class:"line"},[n("span",null,"myapp@1.0.0")]),l(`
`),n("span",{class:"line"},[n("span",null,"├── express@4.16.0 (vulnerable)")]),l(`
`),n("span",{class:"line"},[n("span",null,"│   ├── body-parser@1.18.3")]),l(`
`),n("span",{class:"line"},[n("span",null,"│   └── accepts@1.3.5")]),l(`
`),n("span",{class:"line"},[n("span",null,"└── lodash@4.17.19 (vulnerable)")])])],-1)])]),_:1},16),s[7]||(s[7]=n("p",null,"Xray shows full dependency path to help understand impact",-1))]),_:1},16)}}};export{B as default};
