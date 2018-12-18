/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var main;
    (function (main) {
        var mainBinder = (function () {
            function mainBinder() {
            }
            mainBinder.bindAll = function () {
                fairygui.UIObjectFactory.setPackageItemExtension(main.UI_scene.URL, main.UI_scene);
            };
            return mainBinder;
        }());
        main.mainBinder = mainBinder;
        __reflect(mainBinder.prototype, "fairygui.main.mainBinder");
    })(main = fairygui.main || (fairygui.main = {}));
})(fairygui || (fairygui = {}));
