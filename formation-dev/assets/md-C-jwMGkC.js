import{_ as r}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-DPN-3ftV.js";import{b as F,o as p,w as n,g as s,e as y,m as i,D as l,v as m,x as u,z as a}from"./modules/vue-Cho9hMGZ.js";import{_ as A}from"./default.vue_vue_type_script_setup_true_lang-jH2WIlFr.js";import{u as E,f as d}from"./slidev/context-C-ExvZmy.js";import"./modules/unplugin-icons-481F6Nil.js";import"./index-Diq4705d.js";import"./modules/shiki-DolGubX0.js";import"./layoutHelper-DYp61_9N.js";const x={__name:"dev-intro-artifactory.md__slidev_228",setup(f){const{$clicksContext:e,$frontmatter:t}=E();return e.setup(),(D,o)=>{const c=r;return p(),F(A,m(u(a(d)(a(t),227))),{default:n(()=>[o[1]||(o[1]=s("h1",null,"GitHub Actions + Docker + Artifactory",-1)),o[2]||(o[2]=s("h2",null,"Push/Pull Docker Images",-1)),y(c,i({},{title:"",ranges:[]}),{default:n(()=>[...o[0]||(o[0]=[s("pre",{class:"shiki the-unnamed slidev-code",style:{"background-color":"#0E131F",color:"#F3EFF5"}},[s("code",{class:"language-yaml"},[s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"name"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"Build Docker Image")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#0ACCD6"}},"on"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"  push"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"    branches"),s("span",{style:{color:"#F3EFF5"}},": ["),s("span",{style:{color:"#44FFD2"}},"main"),s("span",{style:{color:"#F3EFF5"}},"]")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"jobs"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"  docker"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"    runs-on"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"ubuntu-latest")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"    steps"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"uses"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"actions/checkout@v4")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      ")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5B8","font-style":"italic"}},"      # Login to Artifactory Docker registry")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"name"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"Login to Artifactory")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        uses"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"docker/login-action@v3")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        with"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"          registry"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"artifactory.mycompany.com:8082")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"          username"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"${{ secrets.ARTIFACTORY_USER }}")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"          password"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"${{ secrets.ARTIFACTORY_PASSWORD }}")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      ")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5B8","font-style":"italic"}},"      # Build and push")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"name"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"Build and push")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        uses"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"docker/build-push-action@v5")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        with"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"          push"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#0ACCD6"}},"true")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"          tags"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#F141A8","font-style":"italic"}},"|")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#44FFD2"}},"            artifactory.mycompany.com:8082/docker-local/my-app:${{ github.sha }}")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#44FFD2"}},"            artifactory.mycompany.com:8082/docker-local/my-app:latest")])])],-1)])]),_:1},16)]),_:1},16)}}};export{x as default};
