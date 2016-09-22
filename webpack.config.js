var baseConfig = {
    context: __dirname,
    entry: {
        index: [
            './index.ts',
        ]
    },
    output: {
        path: __dirname + '/build/',
        pathinfo: true,
        filename: '[name].js',
    },
    tslint: {
        emitErrors: true,
        failOnHint: true,       
    },
    module: {
        preLoaders: [
            {test: /\.ts(x?)$/, loader: "tslint"}
        ],
        loaders: [
            {test: /\.ts(x?)$/, loader: 'babel!ts'},
        ]
    }
};

module.exports = baseConfig;
