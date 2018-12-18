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
    var MovieClip = (function (_super) {
        __extends(MovieClip, _super);
        function MovieClip() {
            var _this = _super.call(this) || this;
            _this.interval = 0;
            _this.repeatDelay = 0;
            _this.timeScale = 1;
            _this._playing = true;
            _this._frameCount = 0;
            _this._frame = 0;
            _this._start = 0;
            _this._end = 0;
            _this._times = 0;
            _this._endAt = 0;
            _this._status = 0; //0-none, 1-next loop, 2-ending, 3-ended
            _this._smoothing = true;
            _this._frameElapsed = 0; //当前帧延迟
            _this._reversed = false;
            _this._repeatedCount = 0;
            //comment out below line before 5.1.0
            if (!egret.nativeRender) {
                _this.$renderNode = new egret.sys.NormalBitmapNode();
            }
            //comment out below line after 5.1.0
            //this.$renderNode = new egret.sys.BitmapNode();
            _this.touchEnabled = false;
            _this.setPlaySettings();
            return _this;
        }
        MovieClip.prototype.createNativeDisplayObject = function () {
            this.$nativeDisplayObject = new egret_native.NativeDisplayObject(11 /* BITMAP_TEXT */);
        };
        Object.defineProperty(MovieClip.prototype, "frames", {
            get: function () {
                return this._frames;
            },
            set: function (value) {
                this._frames = value;
                if (this._frames != null)
                    this._frameCount = this._frames.length;
                else
                    this._frameCount = 0;
                if (this._end == -1 || this._end > this._frameCount - 1)
                    this._end = this._frameCount - 1;
                if (this._endAt == -1 || this._endAt > this._frameCount - 1)
                    this._endAt = this._frameCount - 1;
                if (this._frame < 0 || this._frame > this._frameCount - 1)
                    this._frame = this._frameCount - 1;
                this.drawFrame();
                this._frameElapsed = 0;
                this._repeatedCount = 0;
                this._reversed = false;
                this.checkTimer();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClip.prototype, "frameCount", {
            get: function () {
                return this._frameCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClip.prototype, "frame", {
            get: function () {
                return this._frame;
            },
            set: function (value) {
                if (this._frame != value) {
                    if (this._frames != null && value >= this._frameCount)
                        value = this._frameCount - 1;
                    this._frame = value;
                    this._frameElapsed = 0;
                    this.drawFrame();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClip.prototype, "playing", {
            get: function () {
                return this._playing;
            },
            set: function (value) {
                if (this._playing != value) {
                    this._playing = value;
                    this.checkTimer();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClip.prototype, "smoothing", {
            get: function () {
                return this._smoothing;
            },
            set: function (value) {
                this._smoothing = value;
            },
            enumerable: true,
            configurable: true
        });
        MovieClip.prototype.rewind = function () {
            this._frame = 0;
            this._frameElapsed = 0;
            this._reversed = false;
            this._repeatedCount = 0;
            this.drawFrame();
        };
        MovieClip.prototype.syncStatus = function (anotherMc) {
            this._frame = anotherMc._frame;
            this._frameElapsed = anotherMc._frameElapsed;
            this._reversed = anotherMc._reversed;
            this._repeatedCount = anotherMc._repeatedCount;
            this.drawFrame();
        };
        MovieClip.prototype.advance = function (timeInMiniseconds) {
            var beginFrame = this._frame;
            var beginReversed = this._reversed;
            var backupTime = timeInMiniseconds;
            while (true) {
                var tt = this.interval + this._frames[this._frame].addDelay;
                if (this._frame == 0 && this._repeatedCount > 0)
                    tt += this.repeatDelay;
                if (timeInMiniseconds < tt) {
                    this._frameElapsed = 0;
                    break;
                }
                timeInMiniseconds -= tt;
                if (this.swing) {
                    if (this._reversed) {
                        this._frame--;
                        if (this._frame <= 0) {
                            this._frame = 0;
                            this._repeatedCount++;
                            this._reversed = !this._reversed;
                        }
                    }
                    else {
                        this._frame++;
                        if (this._frame > this._frameCount - 1) {
                            this._frame = Math.max(0, this._frameCount - 2);
                            this._repeatedCount++;
                            this._reversed = !this._reversed;
                        }
                    }
                }
                else {
                    this._frame++;
                    if (this._frame > this._frameCount - 1) {
                        this._frame = 0;
                        this._repeatedCount++;
                    }
                }
                if (this._frame == beginFrame && this._reversed == beginReversed) {
                    var roundTime = backupTime - timeInMiniseconds; //这就是一轮需要的时间
                    timeInMiniseconds -= Math.floor(timeInMiniseconds / roundTime) * roundTime; //跳过
                }
            }
            this.drawFrame();
        };
        //从start帧开始，播放到end帧（-1表示结尾），重复times次（0表示无限循环），循环结束后，停止在endAt帧（-1表示参数end）
        MovieClip.prototype.setPlaySettings = function (start, end, times, endAt, endCallback, callbackObj) {
            if (start === void 0) { start = 0; }
            if (end === void 0) { end = -1; }
            if (times === void 0) { times = 0; }
            if (endAt === void 0) { endAt = -1; }
            if (endCallback === void 0) { endCallback = null; }
            if (callbackObj === void 0) { callbackObj = null; }
            this._start = start;
            this._end = end;
            if (this._end == -1 || this._end > this._frameCount - 1)
                this._end = this._frameCount - 1;
            this._times = times;
            this._endAt = endAt;
            if (this._endAt == -1)
                this._endAt = this._end;
            this._status = 0;
            this._callback = endCallback;
            this._callbackObj = callbackObj;
            this.frame = start;
        };
        MovieClip.prototype.update = function () {
            if (!this._playing || this._frameCount == 0 || this._status == 3)
                return;
            var dt = fairygui.GTimers.deltaTime;
            if (this.timeScale != 1)
                dt *= this.timeScale;
            this._frameElapsed += dt;
            var tt = this.interval + this._frames[this._frame].addDelay;
            if (this._frame == 0 && this._repeatedCount > 0)
                tt += this.repeatDelay;
            if (this._frameElapsed < tt)
                return;
            this._frameElapsed -= tt;
            if (this._frameElapsed > this.interval)
                this._frameElapsed = this.interval;
            if (this.swing) {
                if (this._reversed) {
                    this._frame--;
                    if (this._frame <= 0) {
                        this._frame = 0;
                        this._repeatedCount++;
                        this._reversed = !this._reversed;
                    }
                }
                else {
                    this._frame++;
                    if (this._frame > this._frameCount - 1) {
                        this._frame = Math.max(0, this._frameCount - 2);
                        this._repeatedCount++;
                        this._reversed = !this._reversed;
                    }
                }
            }
            else {
                this._frame++;
                if (this._frame > this._frameCount - 1) {
                    this._frame = 0;
                    this._repeatedCount++;
                }
            }
            if (this._status == 1) {
                this._frame = this._start;
                this._frameElapsed = 0;
                this._status = 0;
            }
            else if (this._status == 2) {
                this._frame = this._endAt;
                this._frameElapsed = 0;
                this._status = 3; //ended
                //play end
                if (this._callback != null) {
                    var callback = this._callback;
                    var caller = this._callbackObj;
                    this._callback = null;
                    this._callbackObj = null;
                    callback.call(caller);
                }
            }
            else {
                if (this._frame == this._end) {
                    if (this._times > 0) {
                        this._times--;
                        if (this._times == 0)
                            this._status = 2; //ending
                        else
                            this._status = 1; //new loop
                    }
                    else if (this._start != 0)
                        this._status = 1; //new loop
                }
            }
            this.drawFrame();
        };
        MovieClip.prototype.drawFrame = function () {
            if (this._frameCount > 0 && this._frame < this._frames.length) {
                var frame = this._frames[this._frame];
                this._texture = frame.texture;
                this._frameRect = frame.rect;
            }
            else
                this._texture = null;
            if (this["$updateRenderNode"]) {
                var self_1 = this;
                self_1.$renderDirty = true;
                var p = self_1.$parent;
                if (p && !p.$cacheDirty) {
                    p.$cacheDirty = true;
                    p.$cacheDirtyUp();
                }
                var maskedObject = self_1.$maskedObject;
                if (maskedObject && !maskedObject.$cacheDirty) {
                    maskedObject.$cacheDirty = true;
                    maskedObject.$cacheDirtyUp();
                }
            }
            else {
                var self_2 = this;
                self_2.$invalidateContentBounds();
            }
        };
        MovieClip.prototype.checkTimer = function () {
            if (this._playing && this._frameCount > 0 && this.stage != null)
                fairygui.GTimers.inst.add(1, 0, this.update, this);
            else
                fairygui.GTimers.inst.remove(this.update, this);
        };
        //comment this function before 5.1.0
        MovieClip.prototype.$updateRenderNode = function () {
            var texture = this._texture;
            if (texture) {
                var offsetX = Math.round(texture.$offsetX) + this._frameRect.x;
                var offsetY = Math.round(texture.$offsetY) + this._frameRect.y;
                var bitmapWidth = texture.$bitmapWidth;
                var bitmapHeight = texture.$bitmapHeight;
                var textureWidth = texture.$getTextureWidth();
                var textureHeight = texture.$getTextureHeight();
                var destW = Math.round(texture.$getScaleBitmapWidth());
                var destH = Math.round(texture.$getScaleBitmapHeight());
                var sourceWidth = texture.$sourceWidth;
                var sourceHeight = texture.$sourceHeight;
                egret.sys.BitmapNode.$updateTextureData(this.$renderNode, texture.$bitmapData, texture.$bitmapX, texture.$bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureWidth, textureHeight, destW, destH, sourceWidth, sourceHeight, egret.BitmapFillMode.SCALE, this._smoothing);
            }
        };
        //comment out this function after 5.1.0
        /*
        $render(): void {
            var texture = this._texture;
            if (texture) {
                var offsetX: number = Math.round(texture._offsetX) + this._frameRect.x;
                var offsetY: number = Math.round(texture._offsetY) + this._frameRect.y;
                var bitmapWidth: number = texture._bitmapWidth;
                var bitmapHeight: number = texture._bitmapHeight;
                var textureWidth: number = texture.$getTextureWidth();
                var textureHeight: number = texture.$getTextureHeight();
                var destW: number = Math.round(texture.$getScaleBitmapWidth());
                var destH: number = Math.round(texture.$getScaleBitmapHeight());
                var sourceWidth: number = texture._sourceWidth;
                var sourceHeight: number = texture._sourceHeight;

                egret.sys.BitmapNode.$updateTextureData
                    //before 3.1.7 egret.Bitmap.$drawImage
                    (<egret.sys.BitmapNode>this.$renderNode, texture._bitmapData,
                    texture._bitmapX, texture._bitmapY,
                    bitmapWidth, bitmapHeight,
                    offsetX, offsetY,
                    textureWidth, textureHeight,
                    destW, destH,
                    sourceWidth, sourceHeight,
                    null, egret.BitmapFillMode.SCALE, this._smoothing);
            }
        }*/
        MovieClip.prototype.$measureContentBounds = function (bounds) {
            if (this._texture) {
                var x = this._frameRect.x;
                var y = this._frameRect.y;
                var w = this._texture.$getTextureWidth();
                var h = this._texture.$getTextureHeight();
                bounds.setTo(x, y, w, h);
            }
            else {
                bounds.setEmpty();
            }
        };
        MovieClip.prototype.$onAddToStage = function (stage, nestLevel) {
            _super.prototype.$onAddToStage.call(this, stage, nestLevel);
            if (this._playing && this._frameCount > 0)
                fairygui.GTimers.inst.add(1, 0, this.update, this);
        };
        MovieClip.prototype.$onRemoveFromStage = function () {
            _super.prototype.$onRemoveFromStage.call(this);
            fairygui.GTimers.inst.remove(this.update, this);
        };
        return MovieClip;
    }(egret.DisplayObject));
    fairygui.MovieClip = MovieClip;
    __reflect(MovieClip.prototype, "fairygui.MovieClip");
})(fairygui || (fairygui = {}));
