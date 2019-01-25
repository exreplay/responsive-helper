import Vue from 'vue';
import indexOf from 'lodash/indexOf';
import map from 'lodash/map';

export default {
    props: {
        breakpoints: {
            type: Array,
            default: () => {
                return [ 'xs', 'sm', 'md', 'lg', 'xl' ];
            }
        }
    },
    data: function() {
        return {
            computedBreakpoints: {},
            currentBreakpoint: ''
        }
    },
    render (h) {
        return h('div', map(this.computedBreakpoints, (item, key) => {
            console.log(key);
            return h('div', {
                class: item,
                ref: key,
                key
            })
        }));
    },
    created: function() {
        for (let i = 0; i < this.breakpoints.length; i++) {
            const curBp = this.breakpoints[i];
            const nextBp = this.breakpoints[i + 1];
            let classes = '';

            if (i === 0) {
                classes = `d-block d-${nextBp}-none`;
            } else if (i > 0 && typeof nextBp !== 'undefined') {
                classes = `d-none d-${curBp}-block d-${nextBp}-none`;
            } else {
                classes = `d-none d-${curBp}-block`;
            }

            Vue.set(this.computedBreakpoints, curBp, classes);
        }

        Vue.prototype.$bp = {
            down: (...args) => this.down(...args),
            up: (...args) => this.up(...args),
            currentBreakpoint: () => this.currentBreakpoint
        };
    },
    mounted: function() {
        this.getCurrentBreakpoint();
        window.addEventListener('resize', this.getCurrentBreakpoint);
    },
    destroyed: function() {
        window.removeEventListener('resize', this.getCurrentBreakpoint);
    },
    methods: {
        getCurrentBreakpoint: function() {
            for (const key in this.computedBreakpoints) {
                const style = window.getComputedStyle(this.$refs[key]);
                window.requestAnimationFrame(() => {
                    if (style.display !== 'none') this.currentBreakpoint = key;
                });
            }
        },
        down: function(bp, equals = true) {
            const curBp = indexOf(this.breakpoints, this.currentBreakpoint);
            const passedBp = indexOf(this.breakpoints, bp);

            if (equals) return curBp <= passedBp;
            else return curBp < passedBp;
        },
        up: function(bp, equals = true) {
            const curBp = indexOf(this.breakpoints, this.currentBreakpoint);
            const passedBp = indexOf(this.breakpoints, bp);

            if (equals) return curBp >= passedBp;
            else return curBp > passedBp;
        }
    }
}
