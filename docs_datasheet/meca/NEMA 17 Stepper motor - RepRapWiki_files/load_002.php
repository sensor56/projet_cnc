function isCompatible(){if(navigator.appVersion.indexOf('MSIE')!==-1&&parseFloat(navigator.appVersion.split('MSIE')[1])<6){return false;}return true;}var startUp=function(){mw.config=new mw.Map(true);mw.loader.addSource({"local":{"loadScript":"/mediawiki/load.php","apiScript":"/mediawiki/api.php"}});mw.loader.register([["site","1417281583",[],"site"],["noscript","1417281583",[],"noscript"],["startup","1428588463",[],"startup"],["filepage","1417281583"],["user.groups","1417281583",[],"user"],["user","1417281583",[],"user"],["user.cssprefs","1417281583",["mediawiki.user"],"private"],["user.options","1417281583",[],"private"],["user.tokens","1417281583",[],"private"],["mediawiki.language.data","1428588463",["mediawiki.language.init"]],["skins.chick","1417281583"],["skins.cologneblue","1417281583"],["skins.modern","1417281583"],["skins.monobook","1417281583"],["skins.nostalgia","1417281583"],["skins.simple","1417281583"],["skins.standard","1417281583"],["skins.vector","1417281583"],[
"skins.vector.js","1417281583"],["jquery","1417281583"],["jquery.appear","1417281583"],["jquery.arrowSteps","1417281583"],["jquery.async","1417281583"],["jquery.autoEllipsis","1417281583",["jquery.highlightText"]],["jquery.badge","1417281583",["mediawiki.language"]],["jquery.byteLength","1417281583"],["jquery.byteLimit","1417281583",["jquery.byteLength"]],["jquery.checkboxShiftClick","1417281583"],["jquery.client","1417281583"],["jquery.color","1417281583",["jquery.colorUtil"]],["jquery.colorUtil","1417281583"],["jquery.cookie","1417281583"],["jquery.delayedBind","1417281583"],["jquery.expandableField","1417281583",["jquery.delayedBind"]],["jquery.farbtastic","1417281583",["jquery.colorUtil"]],["jquery.footHovzer","1417281583"],["jquery.form","1417281583"],["jquery.getAttrs","1417281583"],["jquery.hidpi","1417281583"],["jquery.highlightText","1417281583",["jquery.mwExtension"]],["jquery.hoverIntent","1417281583"],["jquery.json","1417281583"],["jquery.localize","1417281583"],[
"jquery.makeCollapsible","1425734345"],["jquery.mockjax","1417281583"],["jquery.mw-jump","1417281583"],["jquery.mwExtension","1417281583"],["jquery.placeholder","1417281583"],["jquery.qunit","1417281583"],["jquery.qunit.completenessTest","1417281583",["jquery.qunit"]],["jquery.spinner","1417281583"],["jquery.jStorage","1417281583",["jquery.json"]],["jquery.suggestions","1417281583",["jquery.autoEllipsis"]],["jquery.tabIndex","1417281583"],["jquery.tablesorter","1425734494",["jquery.mwExtension"]],["jquery.textSelection","1417281583",["jquery.client"]],["jquery.validate","1417281583"],["jquery.xmldom","1417281583"],["jquery.tipsy","1417281583"],["jquery.ui.core","1417281583",["jquery"],"jquery.ui"],["jquery.ui.widget","1417281583",[],"jquery.ui"],["jquery.ui.mouse","1417281583",["jquery.ui.widget"],"jquery.ui"],["jquery.ui.position","1417281583",[],"jquery.ui"],["jquery.ui.draggable","1417281583",["jquery.ui.core","jquery.ui.mouse","jquery.ui.widget"],"jquery.ui"],["jquery.ui.droppable"
,"1417281583",["jquery.ui.core","jquery.ui.mouse","jquery.ui.widget","jquery.ui.draggable"],"jquery.ui"],["jquery.ui.resizable","1417281583",["jquery.ui.core","jquery.ui.widget","jquery.ui.mouse"],"jquery.ui"],["jquery.ui.selectable","1417281583",["jquery.ui.core","jquery.ui.widget","jquery.ui.mouse"],"jquery.ui"],["jquery.ui.sortable","1417281583",["jquery.ui.core","jquery.ui.widget","jquery.ui.mouse"],"jquery.ui"],["jquery.ui.accordion","1417281583",["jquery.ui.core","jquery.ui.widget"],"jquery.ui"],["jquery.ui.autocomplete","1417281583",["jquery.ui.core","jquery.ui.widget","jquery.ui.position"],"jquery.ui"],["jquery.ui.button","1417281583",["jquery.ui.core","jquery.ui.widget"],"jquery.ui"],["jquery.ui.datepicker","1417281583",["jquery.ui.core"],"jquery.ui"],["jquery.ui.dialog","1417281583",["jquery.ui.core","jquery.ui.widget","jquery.ui.button","jquery.ui.draggable","jquery.ui.mouse","jquery.ui.position","jquery.ui.resizable"],"jquery.ui"],["jquery.ui.progressbar","1417281583",[
"jquery.ui.core","jquery.ui.widget"],"jquery.ui"],["jquery.ui.slider","1417281583",["jquery.ui.core","jquery.ui.widget","jquery.ui.mouse"],"jquery.ui"],["jquery.ui.tabs","1417281583",["jquery.ui.core","jquery.ui.widget"],"jquery.ui"],["jquery.effects.core","1417281583",["jquery"],"jquery.ui"],["jquery.effects.blind","1417281583",["jquery.effects.core"],"jquery.ui"],["jquery.effects.bounce","1417281583",["jquery.effects.core"],"jquery.ui"],["jquery.effects.clip","1417281583",["jquery.effects.core"],"jquery.ui"],["jquery.effects.drop","1417281583",["jquery.effects.core"],"jquery.ui"],["jquery.effects.explode","1417281583",["jquery.effects.core"],"jquery.ui"],["jquery.effects.fade","1417281583",["jquery.effects.core"],"jquery.ui"],["jquery.effects.fold","1417281583",["jquery.effects.core"],"jquery.ui"],["jquery.effects.highlight","1417281583",["jquery.effects.core"],"jquery.ui"],["jquery.effects.pulsate","1417281583",["jquery.effects.core"],"jquery.ui"],["jquery.effects.scale",
"1417281583",["jquery.effects.core"],"jquery.ui"],["jquery.effects.shake","1417281583",["jquery.effects.core"],"jquery.ui"],["jquery.effects.slide","1417281583",["jquery.effects.core"],"jquery.ui"],["jquery.effects.transfer","1417281583",["jquery.effects.core"],"jquery.ui"],["mediawiki","1417281583"],["mediawiki.api","1417281583",["mediawiki.util"]],["mediawiki.api.category","1417281583",["mediawiki.api","mediawiki.Title"]],["mediawiki.api.edit","1417281583",["mediawiki.api","mediawiki.Title"]],["mediawiki.api.parse","1417281583",["mediawiki.api"]],["mediawiki.api.watch","1417281583",["mediawiki.api","user.tokens"]],["mediawiki.debug","1417281583",["jquery.footHovzer"]],["mediawiki.debug.init","1417281583",["mediawiki.debug"]],["mediawiki.feedback","1417281583",["mediawiki.api.edit","mediawiki.Title","mediawiki.jqueryMsg","jquery.ui.dialog"]],["mediawiki.hidpi","1417281583",["jquery.hidpi"]],["mediawiki.htmlform","1417281583"],["mediawiki.notification","1417281583",[
"mediawiki.page.startup"]],["mediawiki.notify","1417281583"],["mediawiki.searchSuggest","1425734345",["jquery.autoEllipsis","jquery.client","jquery.placeholder","jquery.suggestions"]],["mediawiki.Title","1417281583",["mediawiki.util"]],["mediawiki.Uri","1417281583"],["mediawiki.user","1417281583",["jquery.cookie","mediawiki.api","user.options","user.tokens"]],["mediawiki.util","1425734345",["jquery.client","jquery.cookie","jquery.mwExtension","mediawiki.notify"]],["mediawiki.action.edit","1417281583",["jquery.textSelection","jquery.byteLimit"]],["mediawiki.action.edit.preview","1417281583",["jquery.form","jquery.spinner"]],["mediawiki.action.history","1417281583",[],"mediawiki.action.history"],["mediawiki.action.history.diff","1417281583",[],"mediawiki.action.history"],["mediawiki.action.view.dblClickEdit","1417281583",["mediawiki.util","mediawiki.page.startup"]],["mediawiki.action.view.metadata","1417281583"],["mediawiki.action.view.postEdit","1417281583",["jquery.cookie"]],[
"mediawiki.action.view.rightClickEdit","1417281583"],["mediawiki.action.watch.ajax","1417281583",["mediawiki.page.watch.ajax"]],["mediawiki.language","1417281583",["mediawiki.language.data","mediawiki.cldr"]],["mediawiki.cldr","1417281583",["mediawiki.libs.pluralruleparser"]],["mediawiki.libs.pluralruleparser","1417281583"],["mediawiki.language.init","1417281583"],["mediawiki.jqueryMsg","1417281583",["mediawiki.util","mediawiki.language"]],["mediawiki.libs.jpegmeta","1417281583"],["mediawiki.page.ready","1417281583",["jquery.checkboxShiftClick","jquery.makeCollapsible","jquery.placeholder","jquery.mw-jump","mediawiki.util"]],["mediawiki.page.startup","1417281583",["jquery.client","mediawiki.util"]],["mediawiki.page.patrol.ajax","1425753929",["mediawiki.page.startup","mediawiki.api","mediawiki.util","mediawiki.Title","mediawiki.notify","jquery.spinner","user.tokens"]],["mediawiki.page.watch.ajax","1425741322",["mediawiki.page.startup","mediawiki.api.watch","mediawiki.util",
"mediawiki.notify","jquery.mwExtension"]],["mediawiki.special","1417281583"],["mediawiki.special.block","1417281583",["mediawiki.util"]],["mediawiki.special.changeemail","1426814040",["mediawiki.util"]],["mediawiki.special.changeslist","1417281583",["jquery.makeCollapsible"]],["mediawiki.special.movePage","1417281583",["jquery.byteLimit"]],["mediawiki.special.preferences","1417281583"],["mediawiki.special.recentchanges","1417281583",["mediawiki.special"]],["mediawiki.special.search","1425734740"],["mediawiki.special.undelete","1417281583"],["mediawiki.special.upload","1425769107",["mediawiki.libs.jpegmeta","mediawiki.util"]],["mediawiki.special.userlogin.signup","1417281583"],["mediawiki.special.javaScriptTest","1417281583",["jquery.qunit"]],["mediawiki.tests.qunit.testrunner","1417281583",["jquery.getAttrs","jquery.qunit","jquery.qunit.completenessTest","mediawiki.page.startup","mediawiki.page.ready"]],["mediawiki.legacy.ajax","1417281583",["mediawiki.util","mediawiki.legacy.wikibits"
]],["mediawiki.legacy.commonPrint","1417281583"],["mediawiki.legacy.config","1417281583",["mediawiki.legacy.wikibits"]],["mediawiki.legacy.IEFixes","1417281583",["mediawiki.legacy.wikibits"]],["mediawiki.legacy.protect","1417281583",["mediawiki.legacy.wikibits","jquery.byteLimit"]],["mediawiki.legacy.shared","1417281583"],["mediawiki.legacy.oldshared","1417281583"],["mediawiki.legacy.upload","1417281583",["mediawiki.legacy.wikibits","mediawiki.util"]],["mediawiki.legacy.wikibits","1417281583",["mediawiki.util"]],["mediawiki.legacy.wikiprintable","1417281583"],["ext.cite","1417281583",["jquery.tooltip"]],["jquery.tooltip","1417281583"],["ext.rtlcite","1417281583"],["ext.math.mathjax","1417281583",[],"ext.math.mathjax"],["ext.math.mathjax.enabler","1417281583"],["ext.nuke","1417281583"],["ext.categoryTree","1425734759"],["ext.categoryTree.css","1417281583"],["ext.lazyload","1417281583",["jquery","mediawiki","mediawiki.hidpi"]]]);mw.config.set({"wgLoadScript":"/mediawiki/load.php","debug"
:false,"skin":"vector","stylepath":"/mediawiki/skins","wgUrlProtocols":"http\\:\\/\\/|https\\:\\/\\/|ftp\\:\\/\\/|irc\\:\\/\\/|ircs\\:\\/\\/|gopher\\:\\/\\/|telnet\\:\\/\\/|nntp\\:\\/\\/|worldwind\\:\\/\\/|mailto\\:|news\\:|svn\\:\\/\\/|git\\:\\/\\/|mms\\:\\/\\/|\\/\\/","wgArticlePath":"/wiki/$1","wgScriptPath":"/mediawiki","wgScriptExtension":".php","wgScript":"/mediawiki/index.php","wgVariantArticlePath":false,"wgActionPaths":{},"wgServer":"http://reprap.org","wgUserLanguage":"en","wgContentLanguage":"en","wgVersion":"1.21.1","wgEnableAPI":true,"wgEnableWriteAPI":true,"wgMainPageTitle":"Main Page","wgFormattedNamespaces":{"-2":"Media","-1":"Special","0":"","1":"Talk","2":"User","3":"User talk","4":"RepRapWiki","5":"RepRapWiki talk","6":"File","7":"File talk","8":"MediaWiki","9":"MediaWiki talk","10":"Template","11":"Template talk","12":"Help","13":"Help talk","14":"Category","15":"Category talk","274":"Widget","275":"Widget talk"},"wgNamespaceIds":{"media":-2,"special":-1,"":0,"talk"
:1,"user":2,"user_talk":3,"reprapwiki":4,"reprapwiki_talk":5,"file":6,"file_talk":7,"mediawiki":8,"mediawiki_talk":9,"template":10,"template_talk":11,"help":12,"help_talk":13,"category":14,"category_talk":15,"widget":274,"widget_talk":275,"image":6,"image_talk":7,"project":4,"project_talk":5},"wgSiteName":"RepRapWiki","wgFileExtensions":["png","jpg","jpeg","svg","amf","stl","sch","gbr","pcb","brd","scad","pdf","tar.gz","zip"],"wgDBname":"mediawiki_121","wgFileCanRotate":true,"wgAvailableSkins":{"cologneblue":"CologneBlue","standard":"Standard","simple":"Simple","modern":"Modern","monobook":"MonoBook","vector":"Vector","nostalgia":"Nostalgia","chick":"Chick","myskin":"MySkin"},"wgExtensionAssetsPath":"/mediawiki/extensions","wgCookiePrefix":"mediawiki_121","wgResourceLoaderMaxQueryLength":-1,"wgCaseSensitiveNamespaces":[]});};if(isCompatible()){document.write(
"\x3cscript src=\"/mediawiki/load.php?debug=false\x26amp;lang=en\x26amp;modules=jquery%2Cmediawiki\x26amp;only=scripts\x26amp;skin=vector\x26amp;version=20130528T131929Z\"\x3e\x3c/script\x3e");}delete isCompatible;
/* cache key: mediawiki_121:resourceloader:filter:minify-js:7:9fc1d74df6f677efac712c25f2e4c43b */