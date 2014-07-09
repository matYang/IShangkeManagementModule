IShangkeManagementModule
========================

yoke


##brunch and bower
(brunch and bower should be installed first)
`brunch w -s` to watch
`brunch build -P` to build production version

`bower init` to init bower.json
`bower install` to install packages from bower.json
`bower install <packageName@version>` to install a specific package
`bower uninstall <packageName>` to uninstall a package
`bower update <packageName>` to update a package
`bower list` to list all installed packages

`bower cache list` to list all cached packages
`bower cache clean` to clean all cached packages

##Steps
1.***`bower install`***

2.***`npm install`***

3.***`brunch w -s`*** or ***`brunch w -sp 1234`*** to use port '1234'

If `bower install` failed,you can use `bower cache clean` to clean cache and retry