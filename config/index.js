process.env.NODE_ENV = (process.env.NODE_ENV || 'development').trim();

import path     from 'path';
import { argv } from 'yargs';

const config = new Map();

// location path eval
var windowpath = 'window.location.origin + "/"';

// ------------------------------------
// User Configuration
// ------------------------------------
// NOTE: Due to limitations with Webpack's custom require, which is used for
// looking up all *.spec.js files, if you edit dir_src you _must_ also edit
// the path in ~/karma.entry.js.
config.set('dir_src',  'src');
config.set('common', 'common');
config.set('dir_dist', 'dist');
config.set('public', 'public');
config.set('dir_views', 'views');

config.set('server_host',  process.env.NODE_ENV == 'development' ? 'localhost' : process.env.NODE_HOST ? process.env.NODE_HOST : 'localhost');
config.set('server_port',  process.env.NODE_PORT || 3131);
config.set('server_protocol', 'http');
config.set('webpack_port', 3030);

config.set('vendor_dependencies', [
  'history',
  'immutable',
  'react',
  'react-redux',
  'react-router',
  'redux',
  'redux-devtools',
  'redux-devtools/lib/react'
]);

config.set('webpack_lint_in_dev', true);

/*  *********************************************
-------------------------------------------------

All Internal Configuration Below
Edit at your own risk

-------------------------------------------------
************************************************/
// ------------------------------------
// Environment
// ------------------------------------
config.set('env', process.env.NODE_ENV);
config.set('globals', {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.get('env'))
  },
  'NODE_ENV'     : config.get('env'),
  '__DEV__'      : config.get('env') === 'development',
  '__PROD__'     : config.get('env') === 'production',
  '__DEBUG__'    : config.get('env') === 'development' && !argv.no_debug,
  '__DEBUG_NW__' : !!argv.nw,
  'SERVER_ADDR'  : config.get('env') === 'production' ? "eval('" + windowpath + "')" : JSON.stringify(config.get('server_protocol') + '://' + config.get('server_host') + ':' + config.get('server_port') + '/'),
  'oRATIO_ADDR'  : JSON.stringify(config.get('server_protocol') + '://' + 'api.tryoratio.com' + '/' + "v1/")
});

// ------------------------------------
// Webpack
// ------------------------------------
config.set('webpack_public_path',
  `http://${config.get('server_host')}:${config.get('webpack_port')}/`
);

// ------------------------------------
// Project
// ------------------------------------
config.set('path_project', path.resolve(__dirname, '../'));

// ------------------------------------
// Utilities
// ------------------------------------
const paths = (() => {
  const base    = [config.get('path_project')],
        resolve = path.resolve;

  const project = (...args) => resolve.apply(resolve, [...base, ...args]);

  return {
    project : project,
    src     : project.bind(null, config.get('dir_src')),
    dist    : project.bind(null, config.get('dir_dist')),
    common  : project.bind(null, config.get('common')),
    publicpath  : project.bind(null, config.get('public')),
    views: project.bind(null, config.get('dir_views'))
  };
})();

config.set('utils_paths', paths);
config.set('utils_aliases', [
  'actions',
  'components',
  'constants',
  'containers',
  'layouts',
  'models',
  'reducers',
  'routes',
  'services',
  'stores',
  'styles',
  'utils',
  'views'
].reduce((acc, x) => ((acc[x] = paths.src(x)) && acc), {}));

export default config;
