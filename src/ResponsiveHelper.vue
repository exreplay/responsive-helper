<template>
    <div>
        <div v-for="(bp, key) in computedBreakpoints" :class="bp" :ref="key" :key="key"></div>
    </div>
</template>

<script>
    import { state, methods } from './shared';

    export default {
        props: {
            breakpoints: {
                type: Array,
                default: () => {
                    return [ 'xs', 'sm', 'md', 'lg', 'xl' ];
                }
            }
        },
        computed: {
            computedBreakpoints() {
                const bp = {};

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

                    bp[curBp] = classes;
                }

                state.breakpoints = bp;

                return bp;
            }
        },
        mounted() {
            this.getCurrentBreakpoint();
            window.addEventListener('resize', this.getCurrentBreakpoint);
        },
        destroyed() {
            window.removeEventListener('resize', this.getCurrentBreakpoint);
        },
        methods: {
            getCurrentBreakpoint: methods.getCurrentBreakpoint
        }
    }
</script>
