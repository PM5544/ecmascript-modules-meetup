import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

const paths = {
  react: `./react.development.mjs`,
  'react-dom': './react-dom.development.mjs',
  App: './App.mjs',
  Counter: './Counter.mjs',
  Switcher: './Switcher.mjs'
};
const external = ['react', 'react-dom', 'App', 'Counter', 'Switcher'];

export default ['App', 'Counter', 'Switcher', 'index'].map(fileName => ({
  input: `./src/03/${fileName}.mjs`,
  output: {
    file: `./public/03/${fileName}.mjs`,
    paths,
    format: 'es'
  },
  external,
  plugins: [
    resolve(),
    babel({
      presets: [
        [
          'env',
          {
            modules: false,
            targets: {
              chrome: '69'
            }
          }
        ]
      ],
      plugins: ['transform-react-jsx', ['transform-class-properties', { spec: true }]]
    })
  ],
  watch: {
    include: './src/03/**',
    clearScreen: false
  }
}));
