module.exports = {
    webpackDevMiddleware: config => {
        config.watchOptions.poll = 300;
        return config;
    },
    // async rewrites() {
    //     return [
    //       {
    //         source: '/api/:path*',
    //         destination: 'https://api.example.com/:path*',
    //       },
    //     ]
    //   },
};