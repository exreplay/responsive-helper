var state = {
  breakpoints: {},
  sharedVm: null
};
var methods = {
  createSharedVm: function createSharedVm(Vue) {
    state.sharedVm = new Vue({
      data: {
        bp: ''
      }
    });
  },
  getCurrentBreakpoint: function getCurrentBreakpoint() {
    for (var key in state.breakpoints) {
      var style = window.getComputedStyle(this.$refs[key][0]);
      if (style.display !== 'none') state.sharedVm.$data.bp = key;
    }
  },
  down: function down(bp) {
    var equals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var curBp = Object.keys(state.breakpoints).indexOf(state.sharedVm.$data.bp);
    var passedBp = Object.keys(state.breakpoints).indexOf(bp);
    if (equals) return curBp <= passedBp;else return curBp < passedBp;
  },
  up: function up(bp) {
    var equals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var curBp = Object.keys(state.breakpoints).indexOf(state.sharedVm.$data.bp);
    var passedBp = Object.keys(state.breakpoints).indexOf(bp);
    if (equals) return curBp >= passedBp;else return curBp > passedBp;
  }
};

//
var script = {
  props: {
    breakpoints: {
      type: Array,
      default: function _default() {
        return ['xs', 'sm', 'md', 'lg', 'xl'];
      }
    }
  },
  computed: {
    computedBreakpoints: function computedBreakpoints() {
      var bp = {};

      for (var i = 0; i < this.breakpoints.length; i++) {
        var curBp = this.breakpoints[i];
        var nextBp = this.breakpoints[i + 1];
        var classes = '';

        if (i === 0) {
          classes = "d-block d-".concat(nextBp, "-none");
        } else if (i > 0 && typeof nextBp !== 'undefined') {
          classes = "d-none d-".concat(curBp, "-block d-").concat(nextBp, "-none");
        } else {
          classes = "d-none d-".concat(curBp, "-block");
        }

        bp[curBp] = classes;
      }

      state.breakpoints = bp;
      return bp;
    }
  },
  mounted: function mounted() {
    this.getCurrentBreakpoint();
    window.addEventListener('resize', this.getCurrentBreakpoint);
  },
  destroyed: function destroyed() {
    window.removeEventListener('resize', this.getCurrentBreakpoint);
  },
  methods: {
    getCurrentBreakpoint: methods.getCurrentBreakpoint
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", _vm._l(_vm.computedBreakpoints, function (bp, key) {
    return _c("div", {
      key: key,
      ref: key,
      refInFor: true,
      class: bp
    });
  }), 0);
};

var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

var ResponsiveHelper = normalizeComponent_1({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, undefined, undefined);

var ResponsiveHelperPlugin = {
  install: function install(Vue, options) {
    var defaultOptions = Object.assign({
      name: 'responsive-helper'
    }, options);
    methods.createSharedVm(Vue);
    Vue.prototype.$bp = {
      down: function down() {
        return methods.down.apply(methods, arguments);
      },
      up: function up() {
        return methods.up.apply(methods, arguments);
      },
      currentBreakpoint: function currentBreakpoint() {
        return state.sharedVm.$data.bp;
      }
    };
    Vue.component(defaultOptions.name, ResponsiveHelper);
  }
};

export default ResponsiveHelperPlugin;
