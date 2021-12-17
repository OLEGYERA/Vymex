const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    runtimeCompiler: true,
    // devServer: {
    //     open: process.platform === 'darwin',
    //     https: true,
    //     hotOnly: false,
    // },
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/assets/scss/basic.scss";`
            }
        }
    },
    chainWebpack: config => {
        config.resolve.alias
          .set('@Facade', resolve('src/LTE/Facades'))
          .set('@Container', resolve('src/LTE/Containers'))
          .set('@Icon', resolve('src/LTE/Icons'))
          .set('@Core', resolve('src/LTE/Core'))
          .set('@Sketch', resolve('src/LTE/Sketches'))
    },
}