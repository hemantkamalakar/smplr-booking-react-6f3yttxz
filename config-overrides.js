const path = require('path');

module.exports = function override(config, env) {
  // Add CSS Modules support
  config.module.rules.push({
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: false
        },
      },
    ],
    include: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules')
    ]
  });

  return config;
};