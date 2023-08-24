const path = require('path')
const {
  override,
  addWebpackAlias,
  addBabelPlugin,
} = require('customize-cra')

module.exports = override(
  addWebpackAlias({
    '~': path.resolve(__dirname, 'src')
  }),
  addBabelPlugin('@babel/plugin-transform-typescript'),
)
