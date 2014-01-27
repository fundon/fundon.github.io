var NODE_ENV = process.env.NODE_ENV;

var rootPath = __dirname;
var siteUrl = NODE_ENV === 'production' ? 'http://fangduncai.com' : 'http://localhost:9778';
var baseUrl = (siteUrl + (NODE_ENV === 'production' ? '/blog' : '/'));

var docpadConfig = {

  rootPath: rootPath,
  outPath: rootPath + '/blog',
  srcPath: rootPath + '/src',

  templateData: {

    site: {
      url: siteUrl,
      title: "Fundon's Moving Castle",
      description: "",
      keywords: "@fundon, moving castle, web",
      author: '@fundon',
      email: 'cfddream@gmail.com',
      copyright: '© 2014'
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
      sanitize: false
    }
  },

  environments: {
    development: {
      outPath: rootPath + '/.out'
    }
  }

};

module.exports = docpadConfig;
