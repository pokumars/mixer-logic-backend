(this["webpackJsonpmixer-logic"]=this["webpackJsonpmixer-logic"]||[]).push([[0],{37:function(e,t,a){e.exports=a(86)},42:function(e,t,a){},43:function(e,t,a){},44:function(e,t,a){},45:function(e,t,a){},46:function(e,t,a){e.exports=a.p+"static/media/cocktail-light-green.b65eb424.svg"},47:function(e,t,a){},70:function(e,t,a){},71:function(e,t,a){},73:function(e,t,a){},74:function(e,t,a){},75:function(e,t,a){},76:function(e,t,a){},77:function(e,t,a){e.exports=a.p+"static/media/404-gif.03692112.gif"},78:function(e,t,a){},79:function(e,t,a){},80:function(e,t,a){e.exports=a.p+"static/media/linkedin-icon.838f6035.svg"},81:function(e,t,a){e.exports=a.p+"static/media/github-icon.7be5b44b.svg"},82:function(e,t,a){e.exports=a.p+"static/media/email-icon.9478f1f5.svg"},83:function(e,t,a){e.exports=a.p+"static/media/cv-icon.9377864d.svg"},84:function(e,t,a){e.exports=a.p+"static/media/cv_oheneba_pokumarboah.34885f43.pdf"},85:function(e,t,a){},86:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(16),c=a.n(l),o=(a(42),a(7)),s=(a(43),a(44),a(45),function(e){var t=e.btnText,a=e.btnColor,n=e.handleClick,l=e.btnType,c=e.testId;return r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{onClick:n,type:l||"button",style:{backgroundColor:a},"data-testid":c||"generic-button"},t))}),i=function(){return r.a.createElement("div",{className:"navbar","data-testid":"navbar"},r.a.createElement("div",{className:"logo-container"},r.a.createElement("a",{href:"/","data-testid":"logo-link"},r.a.createElement("img",{className:"logo","data-testid":"logo",alt:"cocktail glass",src:a(46)}),r.a.createElement("span",null,r.a.createElement("b",null,"mixer logic")," "))),r.a.createElement("div",{className:"navbar-buttons","data-testid":"navbar-buttons",style:{display:"none"}},r.a.createElement(s,{btnText:"Sign In",btnColor:"#05386B",handleClick:function(){return console.log(1)}})))},u=(a(47),a(10)),m=a(11),d=a.n(m),h=a(20),f=a(14),E=a.n(f),p=function(){return E.a.get("".concat("/api/drinks")).then((function(e){return console.log("axios fetch of drinks fulfilled.",e.data.length,"drinks found"),e.data}))},g=function(e){return E.a.get("".concat("/api/drinks","/").concat(e)).then((function(e){return console.log("axios fetch of single drink fulfilled"),e.data}))},b={res:[],empty:""},v=function(e){return e.length<1?"There were no results. Try something different":""},k=function(e,t,a){var n=[];switch(t){case"FIND_BY_METHOD":e.forEach((function(e){e.method.filter((function(e){return-1!==e.toLowerCase().indexOf(a.toLowerCase())})).length>0&&n.push(e)}));break;case"FIND_BY_ALCOHOL":e.forEach((function(e){e.alcohols.filter((function(e){return-1!==e.toLowerCase().indexOf(a.toLowerCase())})).length>0&&n.push(e)}));break;default:return n}return n},w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FIND_BY_NAME":return console.log(t),{res:t.drinksFoundByName,empty:v(t.drinksFoundByName)};case"FIND_BY_METHOD":return console.log(t),{res:t.drinksFoundByMethod,empty:v(t.drinksFoundByMethod)};case"FIND_BY_ALCOHOL":return console.log(t),{res:t.drinksFoundByAlcohol,empty:v(t.drinksFoundByAlcohol)};default:return e}},y=function(){var e=Object(n.useState)(""),t=Object(o.a)(e,2),a=t[0],l=t[1],c=Object(n.useState)("name"),i=Object(o.a)(c,2),m=i[0],f=i[1],E=Object(u.b)(),g=function(){switch(m){case"name":E((e=a,function(){var t=Object(h.a)(d.a.mark((function t(a){var n,r;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,p();case 2:n=t.sent,console.log(n.length,"drinks found in thunk"),r=n.filter((function(t){return-1!==t.name.toLowerCase().indexOf(e.toLowerCase())})),console.log(r.length,"drinksFoundByName in thunk"),a({type:"FIND_BY_NAME",drinksFoundByName:r});case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()));break;case"method":E(function(e){return function(){var t=Object(h.a)(d.a.mark((function t(a){var n,r;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,p();case 2:n=t.sent,console.log(n.length,"drinks found in thunk"),r=k(n,"FIND_BY_METHOD",e),console.log(r.length,"drinksFoundByMethod in thunk"),a({type:"FIND_BY_METHOD",drinksFoundByMethod:r});case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(a));break;case"alcohol/spirit":E(function(e){return function(){var t=Object(h.a)(d.a.mark((function t(a){var n,r;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,p();case 2:n=t.sent,console.log(n.length,"drinks found in thunk"),r=k(n,"FIND_BY_ALCOHOL",e),console.log(r.length,"drinksFoundByAlcohol in thunk"),a({type:"FIND_BY_ALCOHOL",drinksFoundByAlcohol:r});case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(a));break;default:E(a)}var e};return r.a.createElement("div",{className:"search-bar","data-testid":"search-bar"},r.a.createElement("div",{className:"criteria"},r.a.createElement("label",{htmlFor:"searchCriteria"},"Search by "),r.a.createElement("select",{name:"searchCriteria","data-testid":"search-criteria",id:"searchCriteria",onChange:function(){var e=document.getElementById("searchCriteria").value;f(e),console.log(e)}},r.a.createElement("option",{value:"name"},"Name"),r.a.createElement("option",{value:"method"},"Method"),r.a.createElement("option",{value:"alcohol/spirit"},"Alcohol/Spirit"))),r.a.createElement("form",{className:"search",onSubmit:function(e){e.preventDefault(),g()},"data-testid":"search-form"},r.a.createElement("input",{value:a,id:"searchInput","data-testid":"search-input",onChange:function(e){l(e.target.value)},placeholder:"Search..."}),r.a.createElement(s,{btnText:"Search",btnColor:"#05386B",testId:"search-submit",btnType:"submit"})))},N=(a(70),a(71),function(e){return"string"!==typeof e?"":e.charAt(0).toUpperCase()+e.slice(1)}),O=function(e){if(e.length<1)return"-";if(1===e.length)return e[0];if(e.length>1){var t=e.pop();return e.join(", ")+" & "+t}},C=a(2),j=function(e){var t=e.drink,a=Object(C.g)();return r.a.createElement("div",{className:"drink-preview","data-testid":"drink-preview",onClick:function(){a.push("/drink/".concat(t.id))}},r.a.createElement("div",{className:"top-half"},r.a.createElement("div",{className:"headers"},r.a.createElement("h1",null,t.name),r.a.createElement("p",null,r.a.createElement("b",null,"Ingredients"))),r.a.createElement("img",{alt:t.name,className:"drink-image",src:t.imageUrl})),r.a.createElement("div",{className:"bottom-half"},r.a.createElement("p",null,t.ingredients.map((function(e){return N(e[0])})).join(", "))))},x=function(e){var t=e.listOfDrinks,a=e.showNumber,n=void 0!==a&&a;return r.a.createElement("div",{className:"drink-list","data-testid":"drink-list"},!0===n&&r.a.createElement("div",{className:"result-info"},r.a.createElement("span",null,t.length," results found")),r.a.createElement("div",{className:"list"},t.map((function(e){return r.a.createElement(j,{drink:e,key:e.name})}))))},I=function(e){var t=e.results;return r.a.createElement("div",{"data-testid":"search-results"},r.a.createElement(x,{listOfDrinks:t,showNumber:!0}))},B=(a(73),function(e){var t=e.allDrinks;return r.a.createElement("div",{className:"featured-drinks","data-testid":"featured-drinks"},r.a.createElement("h3",null,"Featured Drinks"),r.a.createElement(x,{listOfDrinks:function(e){for(var t,a=[];a.length<3;){var n=(t=e.length,Math.floor(Math.random()*Math.floor(t)));-1===a.indexOf(n)&&a.push(n)}return a}(t).map((function(e){return t[e]})),showNumber:!1}))}),F=(a(74),function(){return r.a.createElement("div",{className:"footer"},r.a.createElement("p",null,"By ",r.a.createElement("a",{href:"https://github.com/pokumars",target:"_blank",rel:"noopener noreferrer"},r.a.createElement("b",null,"Oheneba"))),r.a.createElement("p",null,r.a.createElement("a",{href:"/about"},r.a.createElement("b",null,"ABOUT"))," | ",r.a.createElement("a",{href:"/contact"},r.a.createElement("b",null,"CONTACT"))),r.a.createElement("p",null,"- Source of images and recipes are mentioned below them respectively"),r.a.createElement("p",null,"- Do not send content from this site to anyone under the age of 18"))}),D=(a(75),function(){var e=Object(n.useState)(null),t=Object(o.a)(e,2),a=t[0],l=t[1],c=Object(C.h)().id;console.log(typeof c,c);var s=Object(C.g)();Object(n.useEffect)((function(){console.log("effect in recipe"),console.log("drinkid of",c),g(c).catch((function(e){e.response&&(console.trace(),s.push("/404"),console.log("error status of drink fetch",e.response.status),console.log(e.response.status))})).then((function(e){console.log(e),l(e)}))}),[]);return r.a.createElement("div",{className:"recipe","data-testid":"recipe"},null!==a?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"recipe-top"},r.a.createElement("div",{className:"top-right"},r.a.createElement("img",{alt:a.name,src:a.imageUrl}),r.a.createElement("span",{className:"credits"},a.credits[0].length>0?"".concat(a.credits[0][1]," from ").concat(a.credits[0][0]):"")," ",r.a.createElement("br",null)),r.a.createElement("div",{className:"top-left"},r.a.createElement("h2",{"data-testid":"drink-name-header"},a.name),r.a.createElement("h4",null,"Ingredients"),r.a.createElement("table",null,a.ingredients.map((function(e){return r.a.createElement("tbody",{key:e[0]},r.a.createElement("tr",null,r.a.createElement("td",null,(e[1]?e[1]:"")+" "+(e[2]?e[2]:"")),r.a.createElement("td",null,e[0])))}))))),r.a.createElement("div",{className:"recipe-bottom"},r.a.createElement("div",{className:"bottom-left"},r.a.createElement("h4",null,"HOW TO MIX"),r.a.createElement("ol",null,a.steps.map((function(e){return r.a.createElement("li",{key:e},e)}))),r.a.createElement("span",{className:"credits"},a.credits[1].length>0?"".concat(a.credits[1][1]," from ").concat(a.credits[1][0]):"")),r.a.createElement("div",{className:"bottom-right"},r.a.createElement("div",{className:"extra-details"},r.a.createElement("span",null,r.a.createElement("b",null,"Glass"),": ",N(a.glass)),r.a.createElement("br",null),r.a.createElement("span",null,r.a.createElement("b",null,"Method"),": ",O(a.method.map((function(e){return N(e)})))),r.a.createElement("br",null),r.a.createElement("span",null,r.a.createElement("b",null,"Garnish"),": ",O(a.garnish.map((function(e){return N(e)})))),r.a.createElement("br",null))))):r.a.createElement("h1",null,"Loading recipe"))}),S=(a(76),function(e){var t=e.text,a=e.destination,n=e.color,l=void 0===n?"#05386B":n,c=e.bold,o=void 0===c?"false":c,s=Object(C.g)(),i={color:l,fontWeight:!0===o?"bold":"normal"};return r.a.createElement("button",{onClick:function(){s.push("".concat(a))},className:"custom-link",style:i},t)}),_=function(){return localStorage.getItem("warningClosed")?r.a.createElement(r.a.Fragment,null):r.a.createElement("div",{className:"warning","data-testid":"warning-prompt"},r.a.createElement("span",{className:"closebtn","data-testid":"closebtn",onClick:function(e){e.target.parentNode.style.display="none",localStorage.setItem("warningClosed",!0)}},"\xd7"),"Warning: Do not send this content to underaged individuals.\n  Consume alcohol responsibly.")},T=function(){return r.a.createElement("div",{className:"not-found"},r.a.createElement("img",{src:a(77),alt:"404 gif"}),r.a.createElement("h1",null,"404 not found"),r.a.createElement("p",null,"go back or go to ",r.a.createElement(S,{destination:"/",text:"homepage"})))},M=(a(78),function(){var e=function(e){e.preventDefault(),document.getElementById(e.target.hash.split("#").pop()).scrollIntoView({behavior:"smooth"})};return r.a.createElement("div",{className:"about"},r.a.createElement("h1",null,"About mixer-logic"),r.a.createElement("ul",{className:"toc-navigation"},r.a.createElement("li",null,r.a.createElement("a",{href:"#introduction",onClick:e},"Introduction")),r.a.createElement("li",null,r.a.createElement("a",{href:"#how-to-use"},"How to Use")),r.a.createElement("li",null," ",r.a.createElement("a",{href:"#motivation",onClick:e},"Motivation")),r.a.createElement("li",null,r.a.createElement("a",{href:"#packages-frameworks-used",onClick:e},"Packages/frameworks used")),r.a.createElement("li",null,r.a.createElement("a",{href:"#features",onClick:e},"Features"))),r.a.createElement("h2",{id:"introduction"},"Introduction"),r.a.createElement("p",null,r.a.createElement(S,{destination:"/",text:"Mixer-logic"})," is a webpage (SPA) that can be used to search for different cocktails and their recipes. The search can be done based on name, method and in the future what alcohols it contains."),r.a.createElement("h2",{id:"how-to-use"},"How to use?"),r.a.createElement("p",null,"On the page, the user selects what criteria they want to search by,name or method, and they type in their search query into the search bar and voil\xe0, cocktail results. There is a randomly generated list of featured drinks whenever there has been no search done or there were no results returned for what the user searched."),r.a.createElement("h2",{id:"motivation"}," Motivation"),r.a.createElement("p",null,"I decided to make this web application because I realised that I had not done many personal projects that looked good. I had not come across many things that I was really interested in building until I found one beautifully designed magazine/booklet by ",r.a.createElement("a",{href:"https://www.finlandia.com/en/"},"Finlandia Vodka")," with cocktail recipes. I decided to turn that into a web page."),r.a.createElement("h2",{id:"packages-frameworks-used"},"Packages/frameworks used"),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("a",{href:"https://reactjs.org/"},"React")),r.a.createElement("li",null,r.a.createElement("a",{href:"https://reacttraining.com/react-router/"},"React-Router")),r.a.createElement("li",null,r.a.createElement("a",{href:"https://react-redux.js.org/"},"Redux")),r.a.createElement("li",null,r.a.createElement("a",{href:"https://jestjs.io/"},"Jest")),r.a.createElement("li",null,r.a.createElement("a",{href:"https://testing-library.com/"},"React Testing Library")),r.a.createElement("li",null,r.a.createElement("a",{href:"https://jestjs.io/"},"Jest"))),r.a.createElement("h2",{id:"features"},"Features"),r.a.createElement("ul",null,r.a.createElement("li",null,"Search by name"),r.a.createElement("li",null,"Search by mixing method"),r.a.createElement("li",null,"Randomly generated featured drinks"),r.a.createElement("li",null,"To be added: Search by alcohol type"),r.a.createElement("li",null,"To be added: Login"),r.a.createElement("li",null,"To be added: Save favourite drinks")))}),L=(a(79),function(){return r.a.createElement("div",{className:"contact"},r.a.createElement("h2",{className:"my-name"},"Oheneba Poku-Marboah"),r.a.createElement("div",{className:"socials"},r.a.createElement("a",{href:"https://www.linkedin.com/in/oheneba-poku-marboah-483783173/",className:"contact-element"},r.a.createElement("img",{alt:"linkedin",src:a(80)}),r.a.createElement("strong",null,"LinkedIn")),r.a.createElement("a",{href:"https://github.com/pokumars",className:"contact-element"},r.a.createElement("img",{alt:"github",src:a(81)}),r.a.createElement("strong",null,"GitHub"))),r.a.createElement("div",{className:"my-email contact-element"},r.a.createElement("img",{alt:"cv",src:a(82)}),r.a.createElement("p",null,"Shoot me some feedback @ ohenebakob@yahoo.com")),r.a.createElement("div",{className:"my-cv contact-element"},r.a.createElement("img",{alt:"cv",src:a(83)}),r.a.createElement("p",null,r.a.createElement("a",{href:a(84),target:"_blank",rel:"noopener noreferrer"},"curriculum vitae"))))}),A=(a(85),function(){return E.a.post("".concat("http://localhost:3003/api/login","/reset-password")).then((function(e){return console.log("axios reset password"),console.log("-----response.status --------",e.status),console.log("-----response.data --------",e.data),e}))}),H=function(){var e=Object(n.useState)(""),t=Object(o.a)(e,2),a=t[0],l=t[1],c=Object(n.useState)(""),s=Object(o.a)(c,2),i=s[0],u=s[1];return r.a.createElement("div",{className:"password-reset"},r.a.createElement("h1",null,"Password reset page"),r.a.createElement("form",{className:"password-reset-form",onSubmit:function(e){e.preventDefault(),console.log("*----------password------",a),console.log("*----------confirmPassword------",i),A(a).then((function(e){if(e.status=200)return console.log("redirect them"),r.a.createElement(C.a,{to:"/"})}))},"data-testid":"password-reset-form"},r.a.createElement("p",{className:"hint"},"When the password and confirm password match, the 'Change Password' button will be enabled."),r.a.createElement("label",{for:"fname"},"Password"),r.a.createElement("br",null),r.a.createElement("input",{type:"password",id:"password",name:"password",value:a,onChange:function(e){return l(e.target.value)}}),r.a.createElement("br",null),r.a.createElement("label",{for:"lname"},"Confirm Password"),r.a.createElement("br",null),r.a.createElement("input",{type:"password",id:"confirm",name:"confirm",value:i,onChange:function(e){return u(e.target.value)}}),r.a.createElement("br",null),r.a.createElement("br",null),a!==i&&r.a.createElement("p",{className:"hint"},"The password does not match the confirm passowrd"),r.a.createElement("input",{type:"submit",value:"Change Password",disabled:a!==i||0==i.length||0==a.length})))};var P=function(){var e=Object(n.useState)([1]),t=Object(o.a)(e,2),a=t[0],l=t[1];Object(n.useEffect)((function(){console.log("effect, fetchDrinksHook"),p().then((function(e){return l(e)}))}),[]);var c=Object(u.c)((function(e){return e.searchResults.res})),s=Object(u.c)((function(e){return e.searchResults.empty}));return console.log("render",a.length,"drinks"),console.log(a.length),r.a.createElement("div",{className:"App","data-testid":"app"},r.a.createElement("div",{className:"app-container"},r.a.createElement(i,null),r.a.createElement(C.d,null,r.a.createElement(C.b,{path:"/contact"},r.a.createElement(L,null)),r.a.createElement(C.b,{path:"/drink/:id"},r.a.createElement(D,{drinks:a.length>1&&a})),r.a.createElement(C.b,{path:"/about"},r.a.createElement(_,null),r.a.createElement(M,null)),r.a.createElement(C.b,{path:"/reset-password"},r.a.createElement(H,null)),r.a.createElement(C.b,{exact:!0,path:"/"},r.a.createElement(_,null),r.a.createElement(y,null),c.length<1&&s.length>1&&r.a.createElement("h3",{className:"no-results"},s),c.length<1?a.length>1&&r.a.createElement(B,{allDrinks:a}):r.a.createElement(I,{results:c})),r.a.createElement(C.b,null,r.a.createElement(T,null)))),r.a.createElement(F,null))},R=a(8),Y=a(9),U=a(35),W=a(36),J=Object(Y.combineReducers)({searchResults:w}),G=Object(Y.createStore)(J,Object(U.composeWithDevTools)(Object(Y.applyMiddleware)(W.a)));G.subscribe((function(){var e=G.getState();console.log(e)})),c.a.render(r.a.createElement(u.a,{store:G},r.a.createElement(R.a,null,r.a.createElement(P,null))),document.getElementById("root"))}},[[37,1,2]]]);
//# sourceMappingURL=main.446c2d74.chunk.js.map