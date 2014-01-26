var NODE_ENV = process.env.NODE_ENV;

var rootPath = __dirname;
var siteUrl = NODE_ENV === 'production' ? 'http://fangduncai.com' : 'http://localhost:9778';
var baseUrl = (siteUrl + (NODE_ENV === 'production' ? '/site' : '/'));

var docpadConfig = {

  rootPath: rootPath,
  outPath: rootPath + '/site',
  srcPath: rootPath + '/src',

  templateData: {

    site: {
      url: siteUrl,
      title: "Fundon's blog",
      description: "",
      keywords: ""
    },

    getSiteBaseUrl: function () {
      return baseUrl;
    },

    getPreparedTitle: function () {
      return this.document.title || this.site.title;
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
