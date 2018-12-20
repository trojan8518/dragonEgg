class Role extends egret.Sprite {
	/**
	 * 骨骼动画显示对象
	 */
	protected _display: dragonBones.EgretArmatureDisplay;

	/**
	 * 骨骼工厂
	 */
	public static factory: dragonBones.EgretFactory;

	public static armatureConfig: Map<string, boolean>;

	protected _callback: Function;
	protected _callbackParams: any[];
	protected _callbackObj: any;

	public lastName: string;

	protected _skeData: any;
	protected _texData: any;
	protected _pngData: any;

	/**
	 * 行走动作速度
	 */
	public walk_timeScale: number = 1;

	/**
	 * 行走动作速度
	 */
	public attack_timeScale: number = 1;

	/**
	 * 当前动作名称
	 */
	public current_animationName: string;

	/**
	 * 是否活着
	 */
	public alive: boolean = true;

	private _r_scaleX: number = 1;

	private _r_scaleY: number = 1;

	private _hpBar: fairygui.main.UI_hpBar;

	public constructor() {
		super();

		if (!Role.factory) {
			Role.factory = dragonBones.EgretFactory.factory;
			Role.armatureConfig = new Map<string, boolean>();
		}
	}

	/**
	 * 创建血条
	 */
	private createHpBar() {
		if (this._hpBar) return;

		this._hpBar = <fairygui.main.UI_hpBar><any>fairygui.UIPackage.createObject("main", "hpBar");

		if(this._r_scaleX > 0)
		this._hpBar.x = this._hpBar.width >> 1;
		else if(this._r_scaleX < 0)
		this._hpBar.x = - this._hpBar.width >> 1;

		this._hpBar.y = - this.display.height * this._r_scaleY * 0.8 ;
		// this._hpBar.y = -100;

		this.addChild(this._hpBar._container);
	}

	public get display(): dragonBones.EgretArmatureDisplay {
		return this._display;
	}

	public set r_scaleX(value: number) {
		this._r_scaleX = value;
	}

	public set r_scaleY(value: number) {
		this._r_scaleY = value;
	}

	/**
	 * 刷新皮肤
	 */
	public updateData(name: string) {
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
				return;//add by ldj, 不重复添加db动画资源到factory,2018-7-12 15:22:19
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
	}

	/**
	 * 显示皮肤
	 */
	protected showSkin(data_: any, key_: string) {
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
	}

	/**
	 * 初始化骨骼对象
	 */
	private initDisplay() {
		this._display = Role.factory.buildArmatureDisplay('animation', this.lastName, this.lastName, this.lastName);

		this.stopAnimation();

		this.display.scaleX = this._r_scaleX;

		this.display.scaleY = this._r_scaleY;

		this.addChild(this._display);

		if (this.lastName.indexOf('monster') != -1) {
			this.createHpBar();
		}

		if (this.needWaitPlay) {
			if (this._display.armature.animation.hasAnimation(this.needWaitPlay.name)) {
				this.playAnm(this.needWaitPlay.name, this.needWaitPlay.playTimes)
			}

			this.needWaitPlay = null;
		} else {
			this.initDefaultAnm();
		}
	}

	/**
	 * 初始化显示默认骨骼动画
	 */
	private initDefaultAnm() {
		if (this._display.armature.animation.hasAnimation(AnmName.steady)) {
			this.playAnm(AnmName.steady, 0)
		}
	}

	private needWaitPlay: { name: string, playTimes: number } = null;

	/**
	 * 播放骨骼动画
	 */
	public playAnimation(name: string, playTimes: number, callback: Function = null, callbackParams: any[] = null, callbackObj: any = null) {
		if (!this._display) {
			this.needWaitPlay = { "name": name, "playTimes": playTimes };
		} else {
			this.playAnm(name, playTimes)
		}

		this.current_animationName = name;

		this._callback = callback;
		this._callbackParams = callbackParams;
		this._callbackObj = callbackObj;
		if (this._callback) {
			this._display.addDBEventListener(dragonBones.EventObject.COMPLETE, this.onComplete, this);
		}
	}


	private playAnm(name, playTimes) {
		if (name == AnmName.walk) {
			SoundUtils.play(SoundType.MOVE, 0)
		} else if (name == AnmName.hit) {
			SoundUtils.play(SoundType.BEHIT, 1)
		} else {
			SoundUtils.stop(SoundType.MOVE)
		}
		this._display.animation.play(name, playTimes);

		if (name == AnmName.walk)
			this.display.animation.timeScale = this.walk_timeScale;
		else if (name == AnmName.attack)
			this.display.animation.timeScale = this.attack_timeScale;
	}

	/**
	 * 停止播放
	 */
	public stopAnimation() {
		if (this._display) {
			this._display.animation.reset();
			this._display.animation.stop();
		}
		this._callbackObj = null;
		this._callback = null;
		this._callbackParams = null;
	}

	/**
	 * 动画播放完成
	 */
	private onComplete(e: any) {
		this._display.armature.eventDispatcher.removeEvent(dragonBones.EventObject.COMPLETE, this.onComplete, this);
		if (this._callback) {
			let callback: Function = this._callback;
			let callbackParams: any[] = this._callbackParams;
			let obj: any = this._callbackObj;
			this._callback = null;
			this._callbackParams = null;
			this._callbackObj = null;
			callback.call(obj, callbackParams);
		}
	}

	/**
	 * 是否有动作
	 */
	private hasAnimation(name: string) {
		if (!this._display) {
			return false;
		}
		return this._display.animation.hasAnimation(name);
	}

	/**
	 * 销毁
	 */
	public dispose() {
		this.filters = [];
		if (this.parent)
			this.parent.removeChild(this);

		if (this._display && this._display.parent)
			this._display.parent.removeChild(this._display);

		if (this._display) {
			this._display.dispose();

			this._display = null;
		}
	}
}

class AnmName {
	public static steady = "steady";
	public static walk = "walk";
	public static attack = "attack";
	public static hit = "hit";
	public static dead = "dead";
}