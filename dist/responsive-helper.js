var e={breakpoints:{},currentBreakpoint:""},n={getCurrentBreakpoint:function(){for(var n in e.breakpoints){"none"!==window.getComputedStyle(this.$refs[n][0]).display&&(e.currentBreakpoint=n)}},down:function(n){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=Object.keys(e.breakpoints).indexOf(e.currentBreakpoint),o=Object.keys(e.breakpoints).indexOf(n);return t?r<=o:r<o},up:function(n){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=Object.keys(e.breakpoints).indexOf(e.currentBreakpoint),o=Object.keys(e.breakpoints).indexOf(n);return t?r>=o:r>o}};var t=function(e,n,t,r,o,i,s,a,d,c){"boolean"!=typeof s&&(d=a,a=s,s=!1);var p,u="function"==typeof t?t.options:t;if(e&&e.render&&(u.render=e.render,u.staticRenderFns=e.staticRenderFns,u._compiled=!0,o&&(u.functional=!0)),r&&(u._scopeId=r),i?(p=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,d(e)),e&&e._registeredComponents&&e._registeredComponents.add(i)},u._ssrRegister=p):n&&(p=s?function(){n.call(this,c(this.$root.$options.shadowRoot))}:function(e){n.call(this,a(e))}),p)if(u.functional){var f=u.render;u.render=function(e,n){return p.call(n),f(e,n)}}else{var l=u.beforeCreate;u.beforeCreate=l?[].concat(l,p):[p]}return t},r={props:{breakpoints:{type:Array,default:function(){return["xs","sm","md","lg","xl"]}}},computed:{computedBreakpoints:function(){for(var n={},t=0;t<this.breakpoints.length;t++){var r=this.breakpoints[t],o=this.breakpoints[t+1],i="";i=0===t?"d-block d-".concat(o,"-none"):t>0&&void 0!==o?"d-none d-".concat(r,"-block d-").concat(o,"-none"):"d-none d-".concat(r,"-block"),n[r]=i}return e.breakpoints=n,n}},mounted:function(){this.getCurrentBreakpoint(),window.addEventListener("resize",this.getCurrentBreakpoint)},destroyed:function(){window.removeEventListener("resize",this.getCurrentBreakpoint)},methods:{getCurrentBreakpoint:n.getCurrentBreakpoint}},o=function(){var e=this.$createElement,n=this._self._c||e;return n("div",this._l(this.computedBreakpoints,function(e,t){return n("div",{key:t,ref:t,refInFor:!0,class:e})}),0)};o._withStripped=!0;var i=t({render:o,staticRenderFns:[]},void 0,r,void 0,!1,void 0,void 0,void 0);export default{install:function(t,r){var o=Object.assign({name:"responsive-helper"},r);t.prototype.$bp={down:function(){return n.down.apply(n,arguments)},up:function(){return n.up.apply(n,arguments)},currentBreakpoint:function(){return e.currentBreakpoint}},t.component(o.name,i)}};
