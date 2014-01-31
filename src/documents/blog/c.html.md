---
title: "&sect; Installation via Bower"
layout: "post"
---

### &sect; Installation via Bower

Yup that&rsquo;s right! We&rsquo;re in the bower package registry. Simply run ``bower install typeplate`` for the CSS, Sass versions and watch the magic happen. This is an example of how to include either the CSS or Sass version in your project.

**Sass**

```scss
@import "compass";
@import "[your_project_path]/reset";
@import "[root_project_path]/bower_components/typeplate/scss/typeplate";
```

Since bower allows authors to keep packages and dependencies updated easily it also overrides any custom changes made to the package(s) contents served from the components directory -used by bower to organize packages. To alleviate this frustration we've provided a variable file to override the packages opinionated defaults. Simply duplicate the ``_typeplate-vars.scss`` file and include it from your own directory (most likely your sass directory where you keep all your related sass project files.)

**Sass w/custom variable overrides**

```scss
@import "compass";
@import "[your_project_path]/reset"; // your browser reset of choice
@import "[your_project_path]/scss/typeplate-vars"; // duplicated var file outside bower's components directory
@import "[root_project_path]/bower_components/typeplate/scss/typeplate"; // the bower package directory and included file
```

**CSS**

You could also use the CSS version instead (btw… we don't condone this method depicted below. In reality you should copy the contents of the CSS file and paste the contents in the top of your projects stylesheet):

```html
<head>
	<link rel="stylesheet" href="[root_project_path]/bower_components/normalize-css/normalize.css">
	<link rel="stylesheet" href="[root_project_path]/bower_components/typeplate/css/typeplate.css">
</head>
```
