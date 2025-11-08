import{_ as p}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-DPN-3ftV.js";import{b as y,o as F,w as n,g as s,e as o,m as t,D as l,v as d,x as f,z as c}from"./modules/vue-Cho9hMGZ.js";import{_ as m}from"./default.vue_vue_type_script_setup_true_lang-jH2WIlFr.js";import{u,f as g}from"./slidev/context-C-ExvZmy.js";import"./modules/unplugin-icons-481F6Nil.js";import"./index-Diq4705d.js";import"./modules/shiki-DolGubX0.js";import"./layoutHelper-DYp61_9N.js";const x={__name:"dev-best-practices.md__slidev_146",setup(D){const{$clicksContext:i,$frontmatter:r}=u();return i.setup(),(k,e)=>{const a=p;return F(),y(m,d(f(c(g)(c(r),145))),{default:n(()=>[e[2]||(e[2]=s("h1",null,"Image Optimization: Layer Management",-1)),e[3]||(e[3]=s("h2",null,"Combine RUN commands to reduce layers",-1)),o(a,t({},{title:"",ranges:[]}),{default:n(()=>[...e[0]||(e[0]=[s("pre",{class:"shiki the-unnamed slidev-code",style:{"background-color":"#0E131F",color:"#F3EFF5"}},[s("code",{class:"language-dockerfile"},[s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5B8","font-style":"italic"}},"# ❌ Multiple layers")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F141A8","font-style":"italic"}},"RUN"),s("span",{style:{color:"#99D0F7"}}," apk update")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F141A8","font-style":"italic"}},"RUN"),s("span",{style:{color:"#99D0F7"}}," apk add --no-cache git")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F141A8","font-style":"italic"}},"RUN"),s("span",{style:{color:"#99D0F7"}}," apk add --no-cache curl")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5B8","font-style":"italic"}},"# ✅ Single layer")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F141A8","font-style":"italic"}},"RUN"),s("span",{style:{color:"#99D0F7"}}," apk update && \\")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#99D0F7"}},"    apk add --no-cache git curl")])])],-1)])]),_:1},16),e[4]||(e[4]=s("h2",null,"Order instructions by change frequency",-1)),o(a,t({},{title:"",ranges:[]}),{default:n(()=>[...e[1]||(e[1]=[s("pre",{class:"shiki the-unnamed slidev-code",style:{"background-color":"#0E131F",color:"#F3EFF5"}},[s("code",{class:"language-dockerfile"},[s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5B8","font-style":"italic"}},"# ✅ Good ordering - least to most frequently changed")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F141A8","font-style":"italic"}},"FROM"),s("span",{style:{color:"#99D0F7"}}," node:20-alpine")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F141A8","font-style":"italic"}},"WORKDIR"),s("span",{style:{color:"#99D0F7"}}," /app")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5B8","font-style":"italic"}},"# 1. Dependencies (changes less often)")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F141A8","font-style":"italic"}},"COPY"),s("span",{style:{color:"#99D0F7"}}," package*.json ./")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F141A8","font-style":"italic"}},"RUN"),s("span",{style:{color:"#99D0F7"}}," npm ci --omit=dev")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5B8","font-style":"italic"}},"# 2. Source code (changes more often)")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F141A8","font-style":"italic"}},"COPY"),s("span",{style:{color:"#99D0F7"}}," . .")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5B8","font-style":"italic"}},"# 3. Configuration")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F141A8","font-style":"italic"}},"EXPOSE"),s("span",{style:{color:"#99D0F7"}}," 3000")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F141A8","font-style":"italic"}},"CMD"),s("span",{style:{color:"#99D0F7"}}," ["),s("span",{style:{color:"#44FFD2"}},'"node"'),s("span",{style:{color:"#99D0F7"}},", "),s("span",{style:{color:"#44FFD2"}},'"server.js"'),s("span",{style:{color:"#99D0F7"}},"]")])])],-1)])]),_:1},16)]),_:1},16)}}};export{x as default};
