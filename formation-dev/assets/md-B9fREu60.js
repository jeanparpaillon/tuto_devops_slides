import{_ as r}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-DPN-3ftV.js";import{b as c,o as p,w as o,g as s,e as i,m as y,D as l,v as m,x as E,z as a}from"./modules/vue-Cho9hMGZ.js";import{_ as u}from"./default.vue_vue_type_script_setup_true_lang-jH2WIlFr.js";import{u as f,f as A}from"./slidev/context-C-ExvZmy.js";import"./modules/unplugin-icons-481F6Nil.js";import"./index-Diq4705d.js";import"./modules/shiki-DolGubX0.js";import"./layoutHelper-DYp61_9N.js";const T={__name:"dev-intro-artifactory.md__slidev_242",setup(d){const{$clicksContext:e,$frontmatter:t}=f();return e.setup(),(D,n)=>{const F=r;return p(),c(u,m(E(a(A)(a(t),241))),{default:o(()=>[n[1]||(n[1]=s("h1",null,"Exercise 6: Enhanced Workflow with Artifactory",-1)),n[2]||(n[2]=s("h2",null,"Updated workflow with Artifactory integration",-1)),i(F,y({},{title:"",ranges:[]}),{default:o(()=>[...n[0]||(n[0]=[s("pre",{class:"shiki the-unnamed slidev-code",style:{"background-color":"#0E131F",color:"#F3EFF5"}},[s("code",{class:"language-yaml"},[s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5B8","font-style":"italic"}},"# .github/workflows/ci.yml (Enhanced version)")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"name"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"CI/CD with Artifactory")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#0ACCD6"}},"on"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"  push"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"    branches"),s("span",{style:{color:"#F3EFF5"}},": ["),s("span",{style:{color:"#44FFD2"}},"main"),s("span",{style:{color:"#F3EFF5"}},", "),s("span",{style:{color:"#44FFD2"}},"develop"),s("span",{style:{color:"#F3EFF5"}},"]")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"jobs"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"  test"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"    runs-on"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"ubuntu-latest")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"    steps"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"uses"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"actions/checkout@v4")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      ")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"name"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"Setup Node.js")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        uses"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"actions/setup-node@v4")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        with"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"          node-version"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#2AFFCC"}},"'"),s("span",{style:{color:"#44FFD2"}},"20"),s("span",{style:{color:"#2AFFCC"}},"'")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      ")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5B8","font-style":"italic"}},"      # NEW: Configure npm to use Artifactory for dependencies")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"name"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"Setup Artifactory npm registry")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        run"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#F141A8","font-style":"italic"}},"|")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#44FFD2"}},'          echo "registry=${{ secrets.ARTIFACTORY_URL }}/artifactory/api/npm/npm/" > .npmrc')]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#44FFD2"}},'          echo "//${{ secrets.ARTIFACTORY_URL }}/artifactory/api/npm/npm/:_authToken=${{ secrets.ARTIFACTORY_TOKEN }}" >> .npmrc')]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#44FFD2"}},"      ")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5B8","font-style":"italic"}},"      # npm ci now pulls from Artifactory (faster, cached!)")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"name"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"Install dependencies via Artifactory")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        run"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"npm ci")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      ")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"name"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"Run tests")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        run"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"npm test")])])],-1)])]),_:1},16)]),_:1},16)}}};export{T as default};
