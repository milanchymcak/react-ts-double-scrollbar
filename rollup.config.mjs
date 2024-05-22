import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/DoubleScrollbar.tsx',
    output: [
        {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
        },
        {
        file: 'dist/index.es.js',
        format: 'es',
        sourcemap: true,
        },
    ],
    plugins: [
        resolve(),
        commonjs(),
        typescript({
        tsconfig: 'tsconfig.json',
        }),
    ],
    external: ['react', 'react-dom'],
};