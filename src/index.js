import ResponsiveHelper from './ResponsiveHelper.vue';
import { state, methods } from './shared';

const ResponsiveHelperPlugin = {
    install(Vue, options) {
        const defaultOptions = Object.assign({
            name: 'responsive-helper'
        }, options);

        Vue.prototype.$bp = {
            down: (...args) => methods.down(...args),
            up: (...args) => methods.up(...args),
            currentBreakpoint: () => state.currentBreakpoint
        };

        Vue.component(defaultOptions.name, ResponsiveHelper);
    }
};

export default ResponsiveHelperPlugin;
