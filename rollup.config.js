import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

// Define all entry points for folder-wise exports
const entryPoints = [
  'src/index.ts',
  'src/core/index.ts',
  'src/services/index.ts',
  'src/hooks/index.ts',
  'src/utils/index.ts',
  'src/types/index.ts',
];

// Create build configurations for each entry point
const buildConfigs = entryPoints.flatMap(input => {
  const outputPath = input.replace('src/', 'dist/').replace('.ts', '');

  return [
    // CommonJS and ESM builds
    {
      input,
      output: [
        {
          file: `${outputPath}.js`,
          format: 'cjs',
          sourcemap: true,
        },
        {
          file: `${outputPath}.esm.js`,
          format: 'esm',
          sourcemap: true,
        },
      ],
      plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        json(),
        typescript({
          tsconfig: './tsconfig.json',
          exclude: ['**/__tests__/**', '**/*.test.ts', '**/*.test.tsx'],
          declaration: false, // We'll handle declarations separately
        }),
        terser(),
      ],
      external: ['react', 'react-dom', 'axios'],
    },
    // TypeScript declaration files
    {
      input,
      output: [
        {
          file: `${outputPath}.d.ts`,
          format: 'esm',
        },
      ],
      plugins: [dts()],
      external: [/\.css$/],
    },
  ];
});

export default buildConfigs;
