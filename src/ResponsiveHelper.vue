<template>
    <div>
        <div v-for="(bp, key) in computedBreakpoints" :key="key" :class="bp" :ref="key"></div>
    </div>
</template>

<script>
    import { Vue, Component, Prop } from 'vue-property-decorator';
    import indexOf from 'lodash/indexOf';

    @Component
    export default class ResponsiveHelper extends Vue {
        @Prop({
            type: Array,
            default: () => {
                return [ 'xs', 'sm', 'md', 'lg', 'xl' ];
            }
        }) breakpoints;

        computedBreakpoints = {};
        currentBreakpoint = '';

        created() {
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
        }

        mounted() {
            this.getCurrentBreakpoint();
            window.addEventListener('resize', this.getCurrentBreakpoint);
        }

        destroyed() {
            window.removeEventListener('resize', this.getCurrentBreakpoint);
        }

        getCurrentBreakpoint() {
            for (const key in this.computedBreakpoints) {
                const style = window.getComputedStyle(this.$refs[key][0]);
                window.requestAnimationFrame(() => {
                    if (style.display !== 'none') this.currentBreakpoint = key;
                });
            }
        }

        down(bp, equals = true) {
            const curBp = indexOf(this.breakpoints, this.currentBreakpoint);
            const passedBp = indexOf(this.breakpoints, bp);

            if (equals) return curBp <= passedBp;
            else return curBp < passedBp;
        }

        up(bp, equals = true) {
            const curBp = indexOf(this.breakpoints, this.currentBreakpoint);
            const passedBp = indexOf(this.breakpoints, bp);

            if (equals) return curBp >= passedBp;
            else return curBp > passedBp;
        }
    }
</script>
