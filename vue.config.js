module.exports = {
    outputDir: 'public',
    indexPath: '../index.html',
    filenameHashing: false,
    devServer: {
        disableHostCheck: true
    },
    configureWebpack: {
        output: {
            filename: '[name].js',
            chunkFilename: '[name].js'
        }
    },
    css: {
        extract: {
            filename: '[name].css',
        },
    },
}