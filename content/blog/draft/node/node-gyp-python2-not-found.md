---
categories:
- node
date: 2017-10-03T00:00:00Z
draft: true
title: Node-Gyp Unable To Compile Python2 Not Found

---

```shell
> node-sass@3.13.1 install C:\personal\digitaldrummerj.me\themes\foundation6\scripts\node_modules\node-sass
> node scripts/install.js

Downloading binary from https://github.com/sass/node-sass/releases/download/v3.13.1/win32-x64-57_binding.node
Cannot download "https://github.com/sass/node-sass/releases/download/v3.13.1/win32-x64-57_binding.node":

HTTP error 404 Not Found

Hint: If github.com is not accessible in your location
      try setting a proxy via HTTP_PROXY, e.g.

      export HTTP_PROXY=http://example.com:1234

or configure npm proxy via

      npm config set proxy http://example.com:8080

> node-sass@3.13.1 postinstall C:\personal\digitaldrummerj.me\themes\foundation6\scripts\node_modules\node-sass
> node scripts/build.js

Building: C:\Program Files\nodejs\node.exe C:\personal\digitaldrummerj.me\themes\foundation6\scripts\node_modules\node-gyp\bin\node-gyp.js rebuild --verbose --libsass_ext= --libsass_cflags= --libsass_ldflags= --libsass_library=
gyp info it worked if it ends with ok
gyp verb cli [ 'C:\\Program Files\\nodejs\\node.exe',
gyp verb cli   'C:\\personal\\digitaldrummerj.me\\themes\\foundation6\\scripts\\node_modules\\node-gyp\\bin\\node-gyp.js',
gyp verb cli   'rebuild',
gyp verb cli   '--verbose',
gyp verb cli   '--libsass_ext=',
gyp verb cli   '--libsass_cflags=',
gyp verb cli   '--libsass_ldflags=',
gyp verb cli   '--libsass_library=' ]
gyp info using node-gyp@3.6.2
gyp info using node@8.9.4 | win32 | x64
gyp verb command rebuild []
gyp verb command clean []
gyp verb clean removing "build" directory
gyp verb command configure []
gyp verb check python checking for Python executable "python2" in the PATH
gyp verb `which` failed Error: not found: python2
```