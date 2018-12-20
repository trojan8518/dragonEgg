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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var FightScene = (function (_super) {
    __extends(FightScene, _super);
    function FightScene(stage) {
        var _this = _super.call(this) || this;
        /**
         * 每一帧帧移动的距离
         */
        _this._speed = 5;
        _this._pasue = false;
        /**
         * 击杀次数
         */
        _this._killTimes = 0;
        /**
         * 地图背景序号
         */
        _this.map_index = 0;
        _this._atttackTimes = 0;
        _this._stage = stage;
        _this._stage.addEventListener(egret.Event.RESIZE, _this.reSizeHandler, _this);
        _this.init();
        return _this;
    }
    FightScene.prototype.init = function () {
        this.role = new Role();
        this.pet = new Role();
        this.bird = new Role();
        this._bg_1 = new egret.Bitmap();
        this._bg_2 = new egret.Bitmap();
        this.shp = new egret.Shape();
        this.shp.graphics.beginFill(0x000000, 1);
        this.shp.graphics.drawRect(0, 0, this.width, this.height);
        this.shp.graphics.endFill();
        this._monterList = [];
        this.loadBg();
        this.createPet();
        this.createRole();
        this.createBird();
    };
    FightScene.prototype.loadBg = function () {
        var bg = new egret.ImageLoader();
        bg.addEventListener(egret.Event.COMPLETE, this.loadBg1Complete, this);
        bg.load('resource/res/map_' + this.map_index + '.png');
    };
    FightScene.prototype.loadBg1Complete = function (e) {
        var imageLoader = e.currentTarget;
        var texture = new egret.Texture();
        texture._setBitmapData(imageLoader.data);
        this._textureH = texture.$bitmapHeight;
        this._textureW = texture.$bitmapWidth;
        this._bg_1.texture = texture;
        this._bg_1.x = 0;
        this._bg_1.y = 0;
        this._bg_1.height = FightScene.sceneH;
        this._bg_1.width = FightScene.sceneH / texture.$bitmapHeight * texture.$bitmapWidth;
        this.addChildAt(this._bg_1, 0);
        var bg = new egret.ImageLoader();
        bg.addEventListener(egret.Event.COMPLETE, this.loadBg2Complete, this);
        bg.load('resource/res/map_' + this.map_index + '.png');
    };
    FightScene.prototype.loadBg2Complete = function (e) {
        var imageLoader = e.currentTarget;
        var texture = new egret.Texture();
        texture._setBitmapData(imageLoader.data);
        this._textureH = texture.$bitmapHeight;
        this._textureW = texture.$bitmapWidth;
        this._bg_2.texture = texture;
        this._bg_2.x = this._bg_1.x + this._bg_1.width;
        this._bg_2.y = 0;
        this._bg_2.height = FightScene.sceneH;
        this._bg_2.width = FightScene.sceneH / texture.$bitmapHeight * texture.$bitmapWidth;
        this.addChildAt(this._bg_2, 1);
        this.createMonster();
        if (this.shp.parent)
            this.removeChild(this.shp);
        this._stage.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    /**
     * 播放闪电特效
     */
    FightScene.prototype.showLightning = function () {
        this.lightningMC = new ZRMovieClip('lightning', true, 50, 1, function (any) {
        });
        this.lightningMC.x = 420;
        this.lightningMC.y = 0;
        this.lightningMC.scaleY = 2;
        this.lightningMC.scaleY = 3.6;
        this.addChild(this.lightningMC);
    };
    FightScene.prototype.createRole = function () {
        this.role.updateData("role_0");
        this.role.r_scaleX = 0.8;
        this.role.r_scaleY = 0.8;
        this.role.x = this._stage.stageWidth * 0.4;
        this.role.y = FightScene.sceneH * 0.9;
        this.role.touchEnabled = false;
        this.addChild(this.role);
        this.role.playAnimation(AnmName.walk, 0);
    };
    FightScene.prototype.createPet = function () {
        this.pet.updateData("pet_0");
        this.pet.r_scaleX = -0.2;
        this.pet.r_scaleY = 0.2;
        this.pet.x = this._stage.stageWidth * 0.15;
        this.pet.y = FightScene.sceneH * 0.9;
        this.pet.touchEnabled = false;
        this.addChild(this.pet);
        this.pet.playAnimation(AnmName.walk, 0);
    };
    FightScene.prototype.createBird = function () {
        this.bird.updateData("bird");
        this.bird.r_scaleX = -0.4;
        this.bird.r_scaleY = 0.4;
        this.bird.x = this._stage.stageWidth;
        this.bird.y = FightScene.sceneH * 0.3;
        this.bird.touchEnabled = false;
        this.addChild(this.bird);
        this.bird.x = this._stage.stageWidth + 100;
        this.bird.y = 200;
        this.bird.playAnimation(AnmName.walk, 0);
        this.playCurveMove();
    };
    /**
     * 播放曲线动画
     */
    FightScene.prototype.playCurveMove = function () {
        var tw = egret.Tween.get(this.bird, { loop: true });
        tw.to({ x: -100, y: 200 }, 5000).call(this.overCurveMove, this);
    };
    FightScene.prototype.overCurveMove = function () {
        // this.bird.dispose();
        // this.createBird();
    };
    /**
     * 播放转场效果
     */
    FightScene.prototype.transition = function () {
        this.addChild(this.shp);
    };
    FightScene.prototype.createMonster = function () {
        for (var i = 9; i >= 0; i--) {
            var monster = new Role();
            monster.r_scaleX = -0.8;
            monster.r_scaleY = 0.8;
            monster.updateData("monster_0");
            monster.x = 1280 + 1000 * i;
            monster.y = FightScene.sceneH * 0.9;
            monster.touchEnabled = false;
            this.addChildAt(monster, 2);
            monster.playAnimation(AnmName.steady, 0);
            this._monterList.push(monster);
        }
    };
    FightScene.prototype.reSizeHandler = function () {
        // this._bg_1.height = this._stage.stageHeight / FightSet.scale;
        // this._bg_1.width = this._stage.stageHeight / FightSet.scale / this._textureH * this._textureW;
        // this._bg_2.height = this._stage.stageHeight / FightSet.scale;
        // this._bg_2.width = this._stage.stageHeight / FightSet.scale / this._textureH * this._textureW;
    };
    /**
     * 帧刷新
     */
    FightScene.prototype.enterFrameHandler = function () {
        if (!this._pasue) {
            this.roll();
        }
    };
    /**
     * 滚屏
     */
    FightScene.prototype.roll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, i, monster;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._bg_1.x -= this._speed;
                        this._bg_2.x -= this._speed;
                        for (i = this._monterList.length - 1; i >= 0; i--) {
                            this._monterList[i].x -= this._speed;
                            if (this._monterList[i].x + this._monterList[i].width / 2 < 0) {
                                this._monterList[i].dispose();
                                this._monterList.splice(i, 1);
                            }
                        }
                        if (this._bg_1.x <= -this._bg_1.width) {
                            this._bg_1.x = this._bg_2.x + this._bg_2.width;
                        }
                        else if (this._bg_2.x <= -this._bg_2.width) {
                            this._bg_2.x = this._bg_1.x + this._bg_1.width;
                        }
                        i = this._monterList.length - 1;
                        _a.label = 1;
                    case 1:
                        if (!(i >= 0)) return [3 /*break*/, 4];
                        monster = this._monterList[i];
                        if (!(monster.alive && monster.display && this.role.display)) return [3 /*break*/, 3];
                        if (!(monster.x - this.role.x < 200)) return [3 /*break*/, 3];
                        this._pasue = true;
                        // UIUtils.showBird(this,this.stage)
                        this.showLightning();
                        return [4 /*yield*/, this.attack(5, monster)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        i--;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FightScene.prototype.attack = function (attackTimes, monster) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pet.playAnimation(AnmName.steady, 0);
                        return [4 /*yield*/, this.role.playAnimation(AnmName.attack, 1, function (any) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                var tips, critTips;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            tips = new HurtTips('123.B', this);
                                            tips._view.x = this._stage.stageWidth * 0.5;
                                            tips._view.y = FightScene.sceneH * 0.5;
                                            critTips = new CritTips('1234.C', this);
                                            critTips._view.x = this._stage.stageWidth * 0.7;
                                            critTips._view.y = FightScene.sceneH * 0.4;
                                            // UIUtils.showMove('gold');
                                            // UIUtils.showMove('diamond');
                                            new Money('gold', 10);
                                            new Money('diamond', 10);
                                            return [4 /*yield*/, monster.playAnimation(AnmName.hit, 1, function (any) { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                this._atttackTimes++;
                                                                if (!(this._atttackTimes < attackTimes)) return [3 /*break*/, 1];
                                                                this.attack(attackTimes, monster);
                                                                return [3 /*break*/, 3];
                                                            case 1:
                                                                this._atttackTimes = 0;
                                                                GameModel.inst.updateData(DataType.MONSTER_LEVEL, 1);
                                                                return [4 /*yield*/, monster.playAnimation(AnmName.dead, 1)];
                                                            case 2:
                                                                _a.sent();
                                                                this._killTimes++;
                                                                this._pasue = false;
                                                                if (this._killTimes == 9)
                                                                    UIUtils.showBossTips();
                                                                if (this._killTimes >= 10) {
                                                                    this._stage.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
                                                                    this.transition();
                                                                    this.clearMonster();
                                                                    if (this.map_index == 0)
                                                                        this.map_index = 1;
                                                                    else if (this.map_index == 1)
                                                                        this.map_index = 0;
                                                                    this.loadBg();
                                                                    GameModel.inst.updateData(DataType.LEVEL, 1);
                                                                    this._killTimes = 0;
                                                                    // this._pasue = false;
                                                                    this.pet.playAnimation(AnmName.walk, 0);
                                                                    this.role.playAnimation(AnmName.walk, 0);
                                                                    // GameModel.inst.roleVO.monster_level
                                                                    // this._atttackTimes = 0;
                                                                }
                                                                else {
                                                                    monster.alive = false;
                                                                    this.pet.playAnimation(AnmName.walk, 0);
                                                                    this.role.playAnimation(AnmName.walk, 0);
                                                                }
                                                                _a.label = 3;
                                                            case 3: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 清除场景所有怪物
     */
    FightScene.prototype.clearMonster = function () {
        for (var i = this._monterList.length - 1; i >= 0; i--) {
            this._monterList[i].dispose();
            this._monterList.splice(i, 1);
        }
    };
    Object.defineProperty(FightScene.prototype, "walk_timeScale", {
        set: function (value) {
            this.role.walk_timeScale = value;
            if (this.role.display && this.role.current_animationName == AnmName.walk) {
                this.role.display.animation.timeScale = value;
            }
            this.pet.walk_timeScale = value;
            if (this.pet.display && this.pet.current_animationName == AnmName.walk) {
                this.pet.display.animation.timeScale = value;
            }
            this._speed = value * 8;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FightScene.prototype, "attack_timeScale", {
        set: function (value) {
            this.role.attack_timeScale = value;
            if (this.role && this.role.display && this.role.current_animationName == AnmName.attack) {
                this.role.display.animation.timeScale = value;
            }
            this.pet.attack_timeScale = value;
            if (this.pet && this.role.display && this.pet.current_animationName == AnmName.attack) {
                this.pet.display.animation.timeScale = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    FightScene.sceneH = 380;
    return FightScene;
}(egret.DisplayObjectContainer));
__reflect(FightScene.prototype, "FightScene");
//# sourceMappingURL=FightScene.js.map