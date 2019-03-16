import commonjs from 'rollup-plugin-commonjs' ;
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';
import { terser } from 'rollup-plugin-terser';

const esm = {
    input: 'src/index.js',
    output: {
        format: 'esm',
        file: 'dist/responsive-helper.js'
    },
    plugins: [
        resolve(),
        commonjs(),
        vue({
            compileTemplate: true
        }),
        babel({
            runtimeHelpers: true,
            extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue'],
            babelrc: false,
		    presets: [['@babel/preset-env', { modules: false }]],
        }),
        terser()
    ]
};

const iife = Object.assign({ ...esm }, {
    output: {
        format: 'iife',
        name: 'ResponsiveHelper',
        file: 'dist/responsive-helper.umd.js'
    } 
})

export default [
    esm,
    iife
];