import{_ as r}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-DPN-3ftV.js";import{b as p,o as c,w as o,g as s,e as i,m as y,D as l,v as m,x as u,z as a}from"./modules/vue-Cho9hMGZ.js";import{_ as E}from"./default.vue_vue_type_script_setup_true_lang-jH2WIlFr.js";import{u as f,f as A}from"./slidev/context-C-ExvZmy.js";import"./modules/unplugin-icons-481F6Nil.js";import"./index-Diq4705d.js";import"./modules/shiki-DolGubX0.js";import"./layoutHelper-DYp61_9N.js";const P={__name:"dev-intro-artifactory.md__slidev_227",setup(d){const{$clicksContext:e,$frontmatter:t}=f();return e.setup(),(D,n)=>{const F=r;return c(),p(E,m(u(a(A)(a(t),226))),{default:o(()=>[n[1]||(n[1]=s("h1",null,"GitHub Actions + npm + Artifactory",-1)),n[2]||(n[2]=s("h2",null,"Example Workflow",-1)),i(F,y({},{title:"",ranges:[]}),{default:o(()=>[...n[0]||(n[0]=[s("pre",{class:"shiki the-unnamed slidev-code",style:{"background-color":"#0E131F",color:"#F3EFF5"}},[s("code",{class:"language-yaml"},[s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"name"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"Build and Publish")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#0ACCD6"}},"on"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"  push"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"    branches"),s("span",{style:{color:"#F3EFF5"}},": ["),s("span",{style:{color:"#44FFD2"}},"main"),s("span",{style:{color:"#F3EFF5"}},"]")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"jobs"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"  build"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"    runs-on"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"ubuntu-latest")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"    steps"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"uses"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"actions/checkout@v4")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      ")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5B8","font-style":"italic"}},"      # Configure npm to use Artifactory")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"name"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"Setup npm registry")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        run"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#F141A8","font-style":"italic"}},"|")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#44FFD2"}},'          echo "registry=http://artifactory:8082/artifactory/api/npm/npm/" > .npmrc')]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#44FFD2"}},'          echo "//artifactory:8082/artifactory/api/npm/npm/:_authToken=${{ secrets.ARTIFACTORY_TOKEN }}" >> .npmrc')]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#44FFD2"}},"      ")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"name"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"Install dependencies")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        run"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"npm ci"),s("span",{style:{color:"#F3EFF5B8","font-style":"italic"}},"  # Uses Artifactory for downloads")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      ")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"name"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"Build")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        run"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"npm run build")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      ")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"name"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"Test")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        run"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"npm test")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      ")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5B8","font-style":"italic"}},"      # Publish to Artifactory")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"name"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"Publish package")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        if"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"github.ref == 'refs/heads/main'")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        run"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"npm publish")])])],-1)])]),_:1},16)]),_:1},16)}}};export{P as default};
