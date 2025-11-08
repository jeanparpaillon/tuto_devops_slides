import{_ as t}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-DPN-3ftV.js";import{b as p,o as r,w as o,g as s,e as y,m as i,D as l,v as E,x as u,z as a}from"./modules/vue-Cho9hMGZ.js";import{_ as A}from"./default.vue_vue_type_script_setup_true_lang-jH2WIlFr.js";import{u as m,f as D}from"./slidev/context-C-ExvZmy.js";import"./modules/unplugin-icons-481F6Nil.js";import"./index-Diq4705d.js";import"./modules/shiki-DolGubX0.js";import"./layoutHelper-DYp61_9N.js";const w={__name:"dev-advanced-github.md__slidev_309",setup(d){const{$clicksContext:e,$frontmatter:F}=m();return e.setup(),(f,n)=>{const c=t;return r(),p(A,E(u(a(D)(a(F),308))),{default:o(()=>[n[1]||(n[1]=s("h1",null,"Complete workflow example",-1)),n[2]||(n[2]=s("p",null,"Bringing together all 5 days:",-1)),y(c,i({},{title:"",ranges:[]}),{default:o(()=>[...n[0]||(n[0]=[s("pre",{class:"shiki the-unnamed slidev-code",style:{"background-color":"#0E131F",color:"#F3EFF5"}},[s("code",{class:"language-yaml"},[s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5B8","font-style":"italic"}},"# .github/workflows/complete-pipeline.yml")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"name"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"Complete CI/CD Pipeline")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#0ACCD6"}},"on"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"  push"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"    branches"),s("span",{style:{color:"#F3EFF5"}},": [ "),s("span",{style:{color:"#44FFD2"}},"main"),s("span",{style:{color:"#F3EFF5"}}," ]          "),s("span",{style:{color:"#F3EFF5B8","font-style":"italic"}},"# Day 1: Git workflows")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"  pull_request"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"    branches"),s("span",{style:{color:"#F3EFF5"}},": [ "),s("span",{style:{color:"#44FFD2"}},"main"),s("span",{style:{color:"#F3EFF5"}}," ]")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"  schedule"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"    - "),s("span",{style:{color:"#46A1F0"}},"cron"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#2AFFCC"}},"'"),s("span",{style:{color:"#44FFD2"}},"0 2 * * 1"),s("span",{style:{color:"#2AFFCC"}},"'"),s("span",{style:{color:"#F3EFF5B8","font-style":"italic"}},"         # Day 5: Advanced triggers")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"jobs"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"  build-and-test"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"    runs-on"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"ubuntu-latest")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"    steps"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"uses"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"actions/checkout@v4")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      ")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5B8","font-style":"italic"}},"      # Day 2: CI/CD automation")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"name"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"Setup Node.js")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        uses"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"actions/setup-node@v4")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        with"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"          node-version"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#2AFFCC"}},"'"),s("span",{style:{color:"#44FFD2"}},"20"),s("span",{style:{color:"#2AFFCC"}},"'")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"          ")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5B8","font-style":"italic"}},"      # Day 3: Artifact caching")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"name"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"Cache dependencies")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        uses"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"actions/cache@v4")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        with"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"          path"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"~/.npm")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"          key"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"          ")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"name"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"Install dependencies")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        run"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"npm ci")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"        ")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"name"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"Build project")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        run"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"npm run build")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"        ")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"name"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"Run tests")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        run"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"npm test")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"        ")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5B8","font-style":"italic"}},"      # Day 4: Security scanning")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"name"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"SonarQube Scan")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        run"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"sonar-scanner")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        env"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"          SONAR_TOKEN"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"${{ secrets.SONAR_TOKEN }}")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"          ")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5B8","font-style":"italic"}},"      # Day 5: Advanced features")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"name"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"Upload test results")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        uses"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"actions/upload-artifact@v4")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        with"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"          name"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"test-results")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"          path"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"coverage/")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"          ")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"  security"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"    runs-on"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"ubuntu-latest")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"    steps"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"uses"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"actions/checkout@v4")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      ")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5B8","font-style":"italic"}},"      # Day 4 & 5: GitHub-native security")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"name"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"Initialize CodeQL")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        uses"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"github/codeql-action/init@v3")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        with"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"          languages"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"javascript")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"          ")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"name"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"Setup Node.js")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        uses"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"actions/setup-node@v4")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        with"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"          node-version"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#2AFFCC"}},"'"),s("span",{style:{color:"#44FFD2"}},"20"),s("span",{style:{color:"#2AFFCC"}},"'")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"          ")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"name"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"Install and build")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        run"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#F141A8","font-style":"italic"}},"|")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#44FFD2"}},"          npm ci")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#44FFD2"}},"          npm run build")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#44FFD2"}},"          ")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"name"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"Perform CodeQL Analysis")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        uses"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"github/codeql-action/analyze@v3")])])],-1)])]),_:1},16)]),_:1},16)}}};export{w as default};
