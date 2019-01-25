# Responsive Helper

This package is a helper component to determine Bootstrap 4 breakpoints in Vue.js

## Installation

To install the package use one of the following commands:

```bash
npm install @averjs/responsive-helper
# OR
yarn add @averjs/responsive-helper
```

## Usage

Add the component to Vue like you would do with any other component.
```js
import ResponsiveHelper from '@averjs/responsive-helper';

export default {
    components: {
        ResponsiveHelper
    }
}

// OR

export default {
    components: {
        ResponsiveHelper: () => import('@averjs/responsive-helper')
    }
}
```

The component registers a global variable called `$bp`. It exposes 3 Methods described below.

```js
export default {
    //...
    mounted() {
        console.log(this.$bp.currentBreakpoint());
    }
    //...
}
```

## Props

- `breakpoints` ***Array*** (*optional*)   
An of strings with the breakpoints. Default values are [ 'xs', 'sm', 'md', 'lg', 'xl' ].

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
