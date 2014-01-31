var NODE_ENV = process.env.NODE_ENV;

var rootPath = __dirname;
var siteUrl = NODE_ENV === 'production' ? 'http://fangduncai.com' : 'http://localhost:9778';
var baseUrl = (NODE_ENV === 'production' ? '/content/' : '/');

var docpadConfig = {

  rootPath: rootPath,
  outPath: rootPath + '/content',
  srcPath: rootPath + '/src',

  templateData: {

    site: {
      url: siteUrl,
      title: "Fundon's Moving Castle",
      description: "",
      keywords: "@fundon, moving castle, web",
      author: '@fundon',
      email: 'cfddream@gmail.com',
      copyright: '© 2014',

      baseUrl: baseUrl,

      styles: [
        '//cdnjs.cloudflare.com/ajax/libs/pure/0.3.0/pure-min.css',
        '//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.3/css/font-awesome.min.css',
        '//cdnjs.cloudflare.com/ajax/libs/colors/1.0/colors.min.css',
        '//fonts.googleapis.com/css?family=OFL+Sorts+Mill+Goudy+TT:regular,italic',
        'vendor/prism.css',
        'styles/main.css'
      ],
      scripts: ['vendor/prism.js']
    },

    getPreparedTitle: function () {
      return this.document.title || this.site.title;
    },

    getPreparedDescription: function () {
      return this.document.description || this.site.description;
    },

    getPreparedKeywords: function () {
      return this.site.keywords.concat(this.document.keywords || []).join(', ');
    }

  },

  plugins: {
    marked: {
      markedOptions: {
        sanitize: false,
        langPrefix: 'language-'
      }
    },
    stylus: {
      stylusLibraries: {
        nib: true
      }
    }
  },

  collections: {
    all: function (db) {
      return this.getCollection('html')
        .findAllLive({
          standalone: false
        }, [{date: -1}]);
    },
    blog: function (db) {
      return db.findAllLive({
          standalone: false,
          relativeOutDirPath: 'blog'
        }, [{date: -1}]);
    }
  },

  environments: {
    development: {
      outPath: rootPath + '/.out'
    }
  }

};

module.exports = docpadConfig;
