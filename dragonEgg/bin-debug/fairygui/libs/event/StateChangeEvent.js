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
    var StateChangeEvent = (function (_super) {
        __extends(StateChangeEvent, _super);
        function StateChangeEvent(type) {
            return _super.call(this, type, false) || this;
        }
        StateChangeEvent.CHANGED = "___stateChanged";
        return StateChangeEvent;
    }(egret.Event));
    fairygui.StateChangeEvent = StateChangeEvent;
    __reflect(StateChangeEvent.prototype, "fairygui.StateChangeEvent");
})(fairygui || (fairygui = {}));
//# sourceMappingURL=StateChangeEvent.js.map