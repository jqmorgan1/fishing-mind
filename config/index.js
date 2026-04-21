const config = {
  projectName: 'fishing-mind-taro',
  date: '2024-04-21',
  designWidth: 375,
  deviceRatio: {
    375: 1,
    750: 2,
    828: 2.208
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {}
  },
  framework: 'react',
  compiler: 'webpack5',
  cache: {
    enable: false
  },
  mini: {
    debugReactFragment: true,
    compile: {
      exclude: ['src/utils/login.ts']
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 1024
        }
      },
      cssModules: {
        enable: true,
        config: {
          namingPattern: 'module',
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: ['ie >= 8', 'last 2 versions']
        }
      },
      cssModules: {
        enable: true,
        config: {
          namingPattern: 'module',
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    devServer: {
      port: 10086,
      disableHostCheck: true
    },
    router: {
      mode: 'hash',
      customRoutes: {}
    },
    chain(chain) {
      chain.merge({
        resolve: {
          alias: {
            '@/components': '@/components',
            '@/pages': '@/pages',
            '@/services': '@/services',
            '@/store': '@/store',
            '@/utils': '@/utils'
          }
        }
      })
    }
  }
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  }
  return merge({}, config, require('./prod'));
};
