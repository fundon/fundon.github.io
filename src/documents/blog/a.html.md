---
title: "&sect; Installation via ``.scss @import``"
layout: "post"
---

### &sect; Installation via ``.scss @import``

Simply download our ``_typeplate.scss`` partial file and import from your project's primary ``.scss`` file like so:

```css
@import "compass"; // Not required. For example purposes only.
@import "[your_project_path]/reset"; // Not required. For example purposes only.
@import "[your_project_path]/typeplate";

// Custom Author Styles
// ====================================
```

Authors can also take this one step further and include a custom variables file from outside the _typeplate.scss partial file. This allows authors to override the default variables set within ``_typeplate.scss``.

```css
@import "[your_project_path]/typeplate-vars"; // Must come first
@import "[your_project_path]/typeplate"; // Must follow typeplate-vars
```
