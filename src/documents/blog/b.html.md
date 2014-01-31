---
title: "&sect; Installation via ``.css``"
layout: "post"
---

### &sect; Installation via ``.css``

If the Sass version isn't your cup of tea, we've provided a CSS version. Simply place the contents of ``typeplate.css`` inside your project's stylesheet (reset style, typeplate, author styles).

###### Option #1 This method is not the best as it results in more HTTP requests.
```markup
<head>
    <link rel="stylesheet" href="[project_path]/css/normalize.css"><!-- Reset of your choice (optional). We like normalize even though it's not a reset -->
    <link rel="stylesheet" href="[project_path]/css/typeplate.css"><!-- typeplate styles -->
    <link rel="stylesheet" href="[project_path]/css/main.css"><!-- main stylesheet -->
</head>
```

###### Option #2 This method is the best as it results in less HTTP requests.

```markup
<head>
	<link rel="stylesheet" href="[project_path]/css/main.css"><!-- main stylesheet with typeplate.css inside -->
</head>
```
