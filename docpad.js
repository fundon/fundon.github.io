var NODE_ENV = process.env.NODE_DEV;

var rootPath = __dirname;
var siteUrl = NODE_ENV === 'production' ? 'http://fangduncai.com' : 'http://localhost:9778';
var baseUrl = (siteUrl + (NODE_ENV === 'production' ? '/out' : '/'));

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
  }

};

module.exports = docpadConfig;
