# Responsive Helper

This package is a helper component to determine Bootstrap 4 breakpoints in Vue.js.

## Installation

To install the package use one of the following commands:

```bash
npm install @averjs/responsive-helper
# OR
yarn add @averjs/responsive-helper
```

## Usage

Register the plugin:
```js
import Vue from 'vue';
import ResponsiveHelper from '@averjs/responsive-helper';

Vue.use(ResponsiveHelper);
```

Implement it in eg. App.vue:
```html
<template>
    <div id="app">
        <responsive-helper />
        <span v-text="bp"></span>
    </div>
</template>

<script>
    export default {
        computed() {
            bp() {
                return this.$bp.currentBreakpoint();
            }
        }
    }
</script>
```

The component adds a instance property called `$bp`. It exposes 3 Methods described below. By wrapping those methods inside a computed property you can make use of reactivity, like shown above.

## Options

- `name` ***String*** (*optional*)
The name for the component.

## Props

- `breakpoints` ***Array*** (*optional*)   
An array of strings with the breakpoints. Default values are [ 'xs', 'sm', 'md', 'lg', 'xl' ].

## Methods

### down
Checks if the passed breakpoint is smaller or equal the given breakpoint.

- bp ***String*** (*required*)  
You can pass a string with the breakpoint you want to check.

- equals ***Boolen*** (*optional*) **Default: true**  
Set to false if you dont want the given breakpoint to be included in calculation.

### up
The same as down but the other way.

### currentBreakpoint
Returns the current breakpoint which is set when the window gets resized.
