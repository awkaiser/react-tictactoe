(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,n){e.exports=n(20)},2:function(e,t,n){e.exports={root:"Space_root__3QfGW",open:"Space_open__3of2Y",symbol:"Space_symbol__32QTx"}},20:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(6),i=n.n(o),c=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function s(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}var u=n(1),l=n(4),h=n.n(l),f=a.a.createContext(),p="MAKE_MOVE",d="RESET_GAME",m=n(2),v=n.n(m),w=a.a.memo(function(e){var t=e.value,n=e.x,o=e.y,i=Object(r.useContext)(f),c=[v.a.root],s=Object(r.useCallback)(function(){return i(function(e,t){return{type:p,x:e,y:t}}(n,o))},[n,o]),u=String.fromCharCode(160);return 1===t?u="X":2===t?u="O":c.push(v.a.open),a.a.createElement("div",{className:c.join(" "),onClick:s},a.a.createElement("div",{className:v.a.symbol},u))},function(e,t){return e.value===t.value});w.displayName="TicTacToeSpace";var b=w,g=n(7),y=n.n(g),x=a.a.memo(function(e){var t=e.rows,n=e.x;return a.a.createElement("div",{className:y.a.root},t.map(function(e,t){return a.a.createElement(b,{key:"".concat(n,"_").concat(t),value:e,x:n,y:t})}))},function(e,t){return e.rows.every(function(e,n){return t.rows[n]===e})&&e.x===t.x});x.displayName="TicTacToeColumn",x.propTypes={rows:h.a.array.isRequired,x:h.a.number.isRequired};var _=x,k=n(8),E=n.n(k);function T(e,t){return t+e.reduce(function(e,t){return e+t},"")}var P=function(e){var t=e.columns;return a.a.createElement("div",{className:E.a.root},t.map(function(e,t){return a.a.createElement(_,{key:T(e,t),rows:e,x:t})}))};P.displayName="TicTacToe";var j=P,O=n(11),C=n(9),N=n(10),S=[[0,0],[2,0],[0,2],[2,2]],A=9;function M(e){var t=e.winner,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return t?n+(1===t?A:-A):0}function R(e){return 8===e.openSpaces.length?0===e.board[1][1]?[1,1]:S[Math.floor(4*Math.random())]:function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if(n>=A)throw new Error("Minimax reached impossible depth");if(0!==t.winner)return{score:M(t,n)};var r=[],a=[];t.openSpaces.forEach(function(o){var i=e(t.cloneMove.apply(t,o),n+1).score;r.push(o),a.push(i)});var o=a.indexOf(Math[1===t.nextPlayer?"max":"min"].apply(Math,a));return{move:r[o],score:a[o]}}(e).move}var W=[[[0,0],[0,1],[0,2]],[[0,0],[1,0],[2,0]],[[2,0],[2,1],[2,2]],[[0,2],[1,2],[2,2]],[[1,0],[1,1],[1,2]],[[0,1],[1,1],[2,1]],[[0,0],[1,1],[2,2]],[[0,2],[1,1],[2,0]]];function B(e,t,n){var r=Object(u.a)(e,2),a=r[0],o=r[1],i=Object(u.a)(t,2),c=i[0],s=i[1],l=Object(u.a)(n,2),h=l[0],f=l[1],p=this[a][o];return this[c][s]===p&&this[h][f]===p?p:0}function G(e){var t=e.openSpaces;if(t.length>4)return 0;var n=W.length,r=0;do{r=B.apply(e.board,W[n-1]),n--}while(!r&&n>0);return r||0!==t.length?r:-1}var q=new(function(){function e(t){Object(C.a)(this,e),this.reset(t)}return Object(N.a)(e,[{key:"reset",value:function(e){return this._state=Object(O.a)({board:[[0,0,0],[0,0,0],[0,0,0]],nextPlayer:1,winner:0},e),e&&(this._state.winner=G(this)),this._state}},{key:"move",value:function(e,t){var n=this._state;if(void 0===e||void 0===t||0!==this.winner||this.board[e][t])return n;if(n.board[e][t]=n.nextPlayer,n.winner=G(this),0===n.winner){if(1===n.nextPlayer)return n.nextPlayer=2,this.move.apply(this,R(this));n.nextPlayer=1}return n}},{key:"cloneMove",value:function(t,n){if(this.board[t][n])return this;var r=this.board.map(function(e){return e.slice()});return r[t][n]=this.nextPlayer,new e({board:r,nextPlayer:1===this.nextPlayer?2:1})}},{key:"board",get:function(){return this._state.board}},{key:"nextPlayer",get:function(){return this._state.nextPlayer}},{key:"openSpaces",get:function(){for(var e=[],t=0;t<3;t++)for(var n=0;n<3;n++)this.board[t][n]||e.push([t,n]);return e}},{key:"winner",get:function(){return this._state.winner}}]),e}()),Q={board:[[0,0,0],[0,0,0],[0,0,0]],winner:0},U=function(e){return{board:e.board,winner:e.winner}};function J(e,t){var n=t.type,r=t.x,a=t.y;switch(n){case p:return U(q.move(r,a));case d:return U(q.reset());default:return e}}var L=n(3),V=n.n(L),X=function(){var e=Object(r.useReducer)(J,Q),t=Object(u.a)(e,2),n=t[0],o=t[1],i=Object(r.useCallback)(function(){return o({type:d})}),c="Game on! :)";return n.winner>0?c="Player "+n.winner+" has won the game!":-1===n.winner&&(c="The game has been drawn!"),a.a.createElement(a.a.Fragment,null,a.a.createElement(f.Provider,{value:o},a.a.createElement(j,{columns:n.board})),a.a.createElement("div",{className:V.a.message},c),a.a.createElement("button",{className:V.a.btn,onClick:i},"Reset Game"),a.a.createElement("div",{className:V.a.github},a.a.createElement("iframe",{frameBorder:"0",height:"20px",scrolling:"0",src:"https://ghbtns.com/github-btn.html?user=awkaiser&repo=react-tictactoe&type=star",title:"github-star",width:"51px"}),a.a.createElement("iframe",{frameBorder:"0",height:"20px",scrolling:"0",src:"https://ghbtns.com/github-btn.html?user=awkaiser&type=follow",title:"github-follow",width:"123px"})))};X.displayName="App";var Y=X;i.a.render(a.a.createElement(Y,null),document.getElementById("tictactoe")),function(e){if("serviceWorker"in navigator){if(new URL("/react-tictactoe",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/react-tictactoe","/service-worker.js");c?(function(e,t){fetch(e).then(function(n){var r=n.headers.get("content-type");404===n.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):s(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):s(t,e)})}}()},3:function(e,t,n){e.exports={message:"App_message__1PmXN",btn:"App_btn__3TYRl",github:"App_github__1jWCP"}},7:function(e,t,n){e.exports={root:"Column_root__3xe4q"}},8:function(e,t,n){e.exports={root:"TicTacToe_root__31QVn"}}},[[12,1,2]]]);
//# sourceMappingURL=main.e94f3ff4.chunk.js.map