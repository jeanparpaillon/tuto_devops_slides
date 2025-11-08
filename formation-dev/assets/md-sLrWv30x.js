import{_ as c}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-DPN-3ftV.js";import{b as p,o as r,w as n,g as s,e as y,m as i,D as l,v as u,x as E,z as e}from"./modules/vue-Cho9hMGZ.js";import{_ as A}from"./default.vue_vue_type_script_setup_true_lang-jH2WIlFr.js";import{u as m,f as D}from"./slidev/context-C-ExvZmy.js";import"./modules/unplugin-icons-481F6Nil.js";import"./index-Diq4705d.js";import"./modules/shiki-DolGubX0.js";import"./layoutHelper-DYp61_9N.js";const x={__name:"dev-github-actions-exercises.md__slidev_139",setup(d){const{$clicksContext:a,$frontmatter:F}=m();return a.setup(),(C,o)=>{const t=c;return r(),p(A,u(E(e(D)(e(F),138))),{default:n(()=>[o[1]||(o[1]=s("h1",null,"Bonus: Complete CI/CD workflow",-1)),o[2]||(o[2]=s("p",null,"Combine all exercises into a complete workflow:",-1)),y(t,i({},{title:"",ranges:[]}),{default:n(()=>[...o[0]||(o[0]=[s("pre",{class:"shiki the-unnamed slidev-code",style:{"background-color":"#0E131F",color:"#F3EFF5"}},[s("code",{class:"language-yaml"},[s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"name"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"CI/CD")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#0ACCD6"}},"on"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"  push"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"    branches"),s("span",{style:{color:"#F3EFF5"}},": [ "),s("span",{style:{color:"#44FFD2"}},"main"),s("span",{style:{color:"#F3EFF5"}}," ]")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"  pull_request"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"    branches"),s("span",{style:{color:"#F3EFF5"}},": [ "),s("span",{style:{color:"#44FFD2"}},"main"),s("span",{style:{color:"#F3EFF5"}}," ]")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"jobs"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"  test"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"    runs-on"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"ubuntu-latest")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"    steps"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"uses"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"actions/checkout@v4")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"uses"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"actions/setup-node@v4")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        with"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"          node-version"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#2AFFCC"}},"'"),s("span",{style:{color:"#44FFD2"}},"20"),s("span",{style:{color:"#2AFFCC"}},"'")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"          cache"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#2AFFCC"}},"'"),s("span",{style:{color:"#44FFD2"}},"npm"),s("span",{style:{color:"#2AFFCC"}},"'")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"run"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"npm ci")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"run"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"npm test")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"  docker"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"    needs"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"test")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"    if"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"github.event_name == 'push'")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"    runs-on"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"ubuntu-latest")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"    permissions"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"      contents"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"read")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"      packages"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"write")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"    steps"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"uses"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"actions/checkout@v4")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"uses"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"docker/login-action@v3")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        with"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"          registry"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"ghcr.io")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"          username"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"${{ github.actor }}")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"          password"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"${{ secrets.GITHUB_TOKEN }}")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F3EFF5"}},"      - "),s("span",{style:{color:"#46A1F0"}},"uses"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"docker/build-push-action@v5")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"        with"),s("span",{style:{color:"#F3EFF5"}},":")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"          context"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#0ACCD6"}},".")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"          push"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#0ACCD6"}},"true")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#46A1F0"}},"          tags"),s("span",{style:{color:"#F3EFF5"}},": "),s("span",{style:{color:"#44FFD2"}},"ghcr.io/${{ github.repository }}:${{ github.sha }}")])])],-1)])]),_:1},16)]),_:1},16)}}};export{x as default};
