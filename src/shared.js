export const state = {
    breakpoints: {},
    sharedVm: null
}

export const methods = {
    createSharedVm: function(Vue) {
        state.sharedVm = new Vue({
            data: {
                bp: ''
            }
        });
    },

    getCurrentBreakpoint: function() {
        for (const key in state.breakpoints) {
            const style = window.getComputedStyle(this.$refs[key][0]);
            if (style.display !== 'none') state.sharedVm.$data.bp = key;
        }
    },

    down: function(bp, equals = true) {
        const curBp = Object.keys(state.breakpoints).indexOf(state.sharedVm.$data.bp);
        const passedBp = Object.keys(state.breakpoints).indexOf(bp);

        if (equals) return curBp <= passedBp;
        else return curBp < passedBp;
    },

    up: function(bp, equals = true) {
        const curBp = Object.keys(state.breakpoints).indexOf(state.sharedVm.$data.bp);
        const passedBp = Object.keys(state.breakpoints).indexOf(bp);

        if (equals) return curBp >= passedBp;
        else return curBp > passedBp;
    }
}