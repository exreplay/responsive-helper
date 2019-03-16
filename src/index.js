import ResponsiveHelper from './ResponsiveHelper.vue';
import { state, methods } from './shared';

const ResponsiveHelperPlugin = {
    install(Vue, options) {
        const defaultOptions = Object.assign({
            name: 'responsive-helper'
        }, options);

        methods.createSharedVm(Vue);

        Vue.prototype.$bp = {
            down: (...args) => methods.down(...args),
            up: (...args) => methods.up(...args),
            currentBreakpoint() {
                return state.sharedVm.$data.bp;
            }
        };

        Vue.component(defaultOptions.name, ResponsiveHelper);
    }
};

export default ResponsiveHelperPlugin;
