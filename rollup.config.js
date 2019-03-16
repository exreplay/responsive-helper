import commonjs from 'rollup-plugin-commonjs' ;
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';
import { terser } from 'rollup-plugin-terser';

const plugins = [
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
    })
];
const minPlugins = [
    ...plugins,
    terser()
]

const esm = {
    input: 'src/index.js',
    output: {
        format: 'esm',
        file: 'dist/responsive-helper.js'
    },
    plugins
};

const esmMin = JSON.parse(JSON.stringify(esm));
esmMin.output.file = 'dist/responsive-helper.min.js';
esmMin.plugins = minPlugins

const iife = {
    input: 'src/index.js',
    output: {
        format: 'iife',
        name: 'ResponsiveHelper',
        file: 'dist/responsive-helper.iife.js'
    },
    plugins
};

const iifeMin = JSON.parse(JSON.stringify(esm));
iifeMin.output.file = 'dist/responsive-helper.iife.min.js';
iifeMin.plugins = minPlugins

const umd = {
    input: 'src/index.js',
    output: {
        format: 'umd',
        name: 'ResponsiveHelper',
        file: 'dist/responsive-helper.umd.js'
    },
    plugins 
};

const umdMin = JSON.parse(JSON.stringify(esm));
umdMin.output.file = 'dist/responsive-helper.umd.min.js';
umdMin.plugins = minPlugins

export default [
    esm,
    esmMin,
    iife,
    iifeMin,
    umd,
    umdMin
];