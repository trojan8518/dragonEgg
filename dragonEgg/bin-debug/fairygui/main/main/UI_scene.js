/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var fairygui;
(function (fairygui) {
    var main;
    (function (main) {
        var UI_scene = (function (_super) {
            __extends(UI_scene, _super);
            function UI_scene() {
                return _super.call(this) || this;
            }
            UI_scene.createInstance = function () {
                return (fairygui.UIPackage.createObject("main", "scene"));
            };
            UI_scene.prototype.constructFromXML = function (xml) {
                _super.prototype.constructFromXML.call(this, xml);
                this.level = (this.getChild("level"));
                this.attack = (this.getChild("attack"));
                this.defense = (this.getChild("defense"));
                this.helmet = (this.getChild("helmet"));
                this.gold = (this.getChild("gold"));
                this.diamond = (this.getChild("diamond"));
                this.operate = (this.getChild("operate"));
                this.role_hpBar = (this.getChild("role_hpBar"));
                this.boss_hpBar = (this.getChild("boss_hpBar"));
            };
            UI_scene.URL = "ui://eclrvg1urbsc3s";
            return UI_scene;
        }(fairygui.GComponent));
        main.UI_scene = UI_scene;
        __reflect(UI_scene.prototype, "fairygui.main.UI_scene");
    })(main = fairygui.main || (fairygui.main = {}));
})(fairygui || (fairygui = {}));
//# sourceMappingURL=UI_scene.js.map