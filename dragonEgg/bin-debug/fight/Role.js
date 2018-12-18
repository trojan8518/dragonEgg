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
var Role = (function (_super) {
    __extends(Role, _super);
    function Role() {
        var _this = _super.call(this) || this;
        /**
         * 行走动作速度
         */
        _this.walk_timeScale = 1;
        /**
         * 行走动作速度
         */
        _this.attack_timeScale = 1;
        /**
         * 是否活着
         */
        _this.alive = true;
        _this.needWaitPlay = null;
        if (!Role.factory) {
            Role.factory = dragonBones.EgretFactory.factory;
            Role.armatureConfig = new Map();
        }
        return _this;
    }
    Object.defineProperty(Role.prototype, "display", {
        get: function () {
            return this._display;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 刷新皮肤
     */
    Role.prototype.updateData = function (name) {
        if (this.lastName == name) {
            return;
        }
        this.lastName = name;
        if (this._display) {
            this._display.dispose();
        }
        if (RES.isGroupLoaded(name)) {
            if (Role.factory.getDragonBonesData(this.lastName)) {
                this.initDisplay();
                return; //add by ldj, 不重复添加db动画资源到factory,2018-7-12 15:22:19
            }
            this._skeData = null;
            this._texData = null;
            this._pngData = null;
            this._skeData = RES.getRes(name + "_ske_json");
            this._texData = RES.getRes(name + "_tex_json");
            this._pngData = RES.getRes(name + "_tex_png");
            Role.factory.parseDragonBonesData(this._skeData, this.lastName);
            Role.factory.parseTextureAtlasData(this._texData, this._pngData, this.lastName);
            Role.armatureConfig.set(this.lastName, true);
            this.initDisplay();
            return;
        }
        if (!Role.armatureConfig.get(name)) {
            this._skeData = null;
            this._texData = null;
            this._pngData = null;
            RES.getResAsync(name + "_ske_json", this.showSkin, this);
            RES.getResAsync(name + "_tex_json", this.showSkin, this);
            RES.getResAsync(name + "_tex_png", this.showSkin, this);
        }
        else {
            this.initDisplay();
        }
    };
    /**
     * 显示皮肤
     */
    Role.prototype.showSkin = function (data_, key_) {
        switch (key_) {
            case this.lastName + "_ske_json":
                this._skeData = data_;
                break;
            case this.lastName + "_tex_json":
                this._texData = data_;
                break;
            case this.lastName + "_tex_png":
                this._pngData = data_;
                break;
        }
        if (!this._skeData || !this._texData || !this._pngData) {
            return;
        }
        if (!Role.factory.getDragonBonesData(this.lastName))
            Role.factory.parseDragonBonesData(this._skeData, this.lastName);
        if (!Role.factory.getTextureAtlasData(this.lastName))
            Role.factory.parseTextureAtlasData(this._texData, this._pngData, this.lastName);
        Role.armatureConfig.set(this.lastName, true);
        this.initDisplay();
    };
    /**
     * 初始化骨骼对象
     */
    Role.prototype.initDisplay = function () {
        this._display = Role.factory.buildArmatureDisplay('animation', this.lastName, this.lastName, this.lastName);
        this.stopAnimation();
        this.addChild(this._display);
        if (this.needWaitPlay) {
            if (this._display.armature.animation.hasAnimation(this.needWaitPlay.name)) {
                this.playAnm(this.needWaitPlay.name, this.needWaitPlay.playTimes);
            }
            this.needWaitPlay = null;
        }
        else {
            this.initDefaultAnm();
        }
    };
    /**
     * 初始化显示默认骨骼动画
     */
    Role.prototype.initDefaultAnm = function () {
        if (this._display.armature.animation.hasAnimation(AnmName.steady)) {
            this.playAnm(AnmName.steady, 0);
        }
    };
    /**
     * 播放骨骼动画
     */
    Role.prototype.playAnimation = function (name, playTimes, callback, callbackParams, callbackObj) {
        if (callback === void 0) { callback = null; }
        if (callbackParams === void 0) { callbackParams = null; }
        if (callbackObj === void 0) { callbackObj = null; }
        if (!this._display) {
            this.needWaitPlay = { "name": name, "playTimes": playTimes };
        }
        else {
            this.playAnm(name, playTimes);
        }
        this.current_animationName = name;
        this._callback = callback;
        this._callbackParams = callbackParams;
        this._callbackObj = callbackObj;
        if (this._callback) {
            this._display.addDBEventListener(dragonBones.EventObject.COMPLETE, this.onComplete, this);
        }
    };
    Role.prototype.playAnm = function (name, playTimes) {
        this._display.animation.play(name, playTimes);
        if (name == AnmName.walk)
            this.display.animation.timeScale = this.walk_timeScale;
        else if (name == AnmName.attack)
            this.display.animation.timeScale = this.attack_timeScale;
    };
    /**
     * 停止播放
     */
    Role.prototype.stopAnimation = function () {
        if (this._display) {
            this._display.animation.reset();
            this._display.animation.stop();
        }
        this._callbackObj = null;
        this._callback = null;
        this._callbackParams = null;
    };
    /**
     * 动画播放完成
     */
    Role.prototype.onComplete = function (e) {
        this._display.armature.eventDispatcher.removeEvent(dragonBones.EventObject.COMPLETE, this.onComplete, this);
        if (this._callback) {
            var callback = this._callback;
            var callbackParams = this._callbackParams;
            var obj = this._callbackObj;
            this._callback = null;
            this._callbackParams = null;
            this._callbackObj = null;
            callback.call(obj, callbackParams);
        }
    };
    /**
     * 是否有动作
     */
    Role.prototype.hasAnimation = function (name) {
        if (!this._display) {
            return false;
        }
        return this._display.animation.hasAnimation(name);
    };
    /**
     * 销毁
     */
    Role.prototype.dispose = function () {
        this.filters = [];
        if (this.parent)
            this.parent.removeChild(this);
        if (this._display && this._display.parent)
            this._display.parent.removeChild(this._display);
        if (this._display) {
            this._display.dispose();
            this._display = null;
        }
    };
    return Role;
}(egret.Sprite));
__reflect(Role.prototype, "Role");
var AnmName = (function () {
    function AnmName() {
    }
    AnmName.steady = "steady";
    AnmName.walk = "walk";
    AnmName.attack = "attack";
    AnmName.hit = "hit";
    AnmName.dead = "dead";
    return AnmName;
}());
__reflect(AnmName.prototype, "AnmName");
