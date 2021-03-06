/*
 * Copyright (C) 2018 MetaBrainz Foundation
 *
 * This file is part of MusicBrainz, the open internet music database,
 * and is licensed under the GPL version 2, or (at your option) any
 * later version: http://www.gnu.org/licenses/gpl-2.0.txt
 */

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const DBDefs = require('./root/static/scripts/common/DBDefs');
const {dirs, PUBLIC_PATH} = require('./webpack/constants');
const moduleConfig = require('./webpack/moduleConfig');
const providePluginConfig = require('./webpack/providePluginConfig');

module.exports = {
  context: dirs.CHECKOUT,

  entry: {
    'server-components': path.resolve(dirs.ROOT, 'server/components'),
  },

  externals: [
    nodeExternals({modulesFromFile: true}),
     /*
      * Components must use the same context and gettext instances
      * created in the server process, so those must be externals.
      */
    function (context, request, callback) {
      const resolvedRequest = path.resolve(context, request);
      const requestFromCheckout = path.relative(dirs.CHECKOUT, resolvedRequest);
      if (/^root\/(context|server\/gettext)/.test(requestFromCheckout)) {
        /*
         * Output a path relative to the build dir, since that's where
         * the server-components bundle will be.
         */
        return callback(null, 'commonjs ' + path.relative(dirs.BUILD, resolvedRequest));
      }
      callback();
    }
  ],

  mode: DBDefs.DEVELOPMENT_SERVER ? 'development' : 'production',

  module: moduleConfig,

  node: {
    __dirname: false,
    __filename: false,
  },

  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: dirs.BUILD,
    publicPath: PUBLIC_PATH,
  },

  plugins: [
    new webpack.IgnorePlugin({resourceRegExp: /jquery/}),
    new webpack.ProvidePlugin(providePluginConfig),
  ],

  resolve: {
    alias: {
      DBDefs$: path.resolve(dirs.SCRIPTS, 'common', 'DBDefs.js'),
    },
  },

  target: 'node',
};

if (String(process.env.WATCH_MODE) === '1') {
  Object.assign(module.exports, require('./webpack/watchConfig'));
}
