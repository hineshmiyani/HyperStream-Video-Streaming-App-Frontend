import { relative } from 'path'

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((f) => relative(process.cwd(), f)).join(' --file ')}`

const buildPrettierCommand = (filenames) =>
  `prettier --write ${filenames.map((f) => relative(process.cwd(), f)).join(' ')}`

export default {
  'src/**/*.{ts,tsx,js,jsx,mjs,cjs}': [buildEslintCommand],
  'src/**/*.{js,jsx,mjs,cjs,ts,tsx,css,scss,html,json}': [buildPrettierCommand],
}
