export const state = {
    breakpoints: {},
    currentBreakpoint: ''
}

export const methods = {
    getCurrentBreakpoint: function() {
        for (const key in state.breakpoints) {
            const style = window.getComputedStyle(this.$refs[key][0]);
            if (style.display !== 'none') state.currentBreakpoint = key;
        }
    },

    down: function(bp, equals = true) {
        const curBp = Object.keys(state.breakpoints).indexOf(state.currentBreakpoint);
        const passedBp = Object.keys(state.breakpoints).indexOf(bp);

        if (equals) return curBp <= passedBp;
        else return curBp < passedBp;
    },

    up: function(bp, equals = true) {
        const curBp = Object.keys(state.breakpoints).indexOf(state.currentBreakpoint);
        const passedBp = Object.keys(state.breakpoints).indexOf(bp);

        if (equals) return curBp >= passedBp;
        else return curBp > passedBp;
    }
}