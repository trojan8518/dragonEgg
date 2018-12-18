class FightScene extends egret.DisplayObjectContainer {
	private _bg_1: egret.Bitmap;

	private _bg_2: egret.Bitmap;

	private _stage: egret.Stage;

	private _textureW: number;

	private _textureH: number;

	private role: Role;

	private pet: Role;

	/**
	 * 每一帧帧移动的距离
	 */
	private _speed: number = 5;

	private _monterList: Array<Role>

	private _pasue: boolean = false;

	/**
	 * 击杀次数
	 */
	private _killTimes: number = 0;

	public constructor(stage: egret.Stage) {
		super();

		this._stage = stage;

		this._stage.addEventListener(egret.Event.RESIZE, this.reSizeHandler, this)

		this.init();
	}

	private init() {
		this.role = new Role();

		this.pet = new Role();

		this._monterList = [];

		let bg = new egret.ImageLoader();
		bg.addEventListener(egret.Event.COMPLETE, this.loadBg1Complete, this);
		bg.load('resource/res/map_0.png');
	}

	private loadBg1Complete(e: egret.Event) {
		var imageLoader = <egret.ImageLoader>e.currentTarget;
		let texture = new egret.Texture();
		texture._setBitmapData(imageLoader.data);
		this._textureH = texture.$bitmapHeight;
		this._textureW = texture.$bitmapWidth;
		this._bg_1 = new egret.Bitmap(texture);
		this._bg_1.x = 0;
		this._bg_1.y = 0;
		this._bg_1.height = this._stage.stageHeight / FightSet.scale;
		this._bg_1.width = this._stage.stageHeight / FightSet.scale / texture.$bitmapHeight * texture.$bitmapWidth;
		this.addChild(this._bg_1);

		let bg = new egret.ImageLoader();
		bg.addEventListener(egret.Event.COMPLETE, this.loadBg2Complete, this);
		bg.load('resource/res/map_0.png');
	}

	private loadBg2Complete(e: egret.Event) {
		var imageLoader = <egret.ImageLoader>e.currentTarget;
		let texture = new egret.Texture();
		texture._setBitmapData(imageLoader.data);
		this._textureH = texture.$bitmapHeight;
		this._textureW = texture.$bitmapWidth;
		this._bg_2 = new egret.Bitmap(texture);
		this._bg_2.x = this._bg_1.x + this._bg_1.width;
		this._bg_2.y = 0;
		this._bg_2.height = this._stage.stageHeight / FightSet.scale;
		this._bg_2.width = this._stage.stageHeight / FightSet.scale / texture.$bitmapHeight * texture.$bitmapWidth;
		this.addChild(this._bg_2);

		this.createPet();

		this.createRole();

		this.createMonster();

		this._stage.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this)
	}

	private createRole() {
		this.role.updateData("role_0");

		this.role.x = this._stage.stageWidth * 0.4;

		this.role.y = this._stage.stageHeight / FightSet.scale * 0.9;

		this.role.scaleX = 0.4;

		this.role.scaleY = 0.4;

		this.role.touchEnabled = false;

		this.addChild(this.role);

		this.role.playAnimation(AnmName.walk, 0)
	}

	private createPet() {
		this.pet.updateData("pet_0");

		this.pet.x = this._stage.stageWidth * 0.15;

		this.pet.y = this._stage.stageHeight / FightSet.scale * 0.9;

		this.pet.scaleX = -0.2;

		this.pet.scaleY = 0.2;

		this.pet.touchEnabled = false;

		this.addChild(this.pet);

		this.pet.playAnimation(AnmName.walk, 0)
	}

	private createMonster() {
		for (let i = 9; i >= 0; i--) {
			let monster: Role = new Role();

			monster.updateData("monster_0");

			monster.x = 1280 + 1000 * i;

			monster.y = this._stage.stageHeight / FightSet.scale * 0.9;

			monster.scaleX = -0.4;

			monster.scaleY = 0.4;

			monster.touchEnabled = false;

			this.addChildAt(monster, 2);

			monster.playAnimation(AnmName.steady, 0)

			this._monterList.push(monster);
		}
	}

	private reSizeHandler() {
		this._bg_1.height = this._stage.stageHeight / FightSet.scale;
		this._bg_1.width = this._stage.stageHeight / FightSet.scale / this._textureH * this._textureW;

		this._bg_2.height = this._stage.stageHeight / FightSet.scale;
		this._bg_2.width = this._stage.stageHeight / FightSet.scale / this._textureH * this._textureW;
	}

	/**
	 * 帧刷新
	 */
	private enterFrameHandler() {
		if (!this._pasue) {
			this.roll();
		}
	}

	/**
	 * 滚屏
	 */
	private async roll() {
		this._bg_1.x -= this._speed;
		this._bg_2.x -= this._speed;

		for (let i = this._monterList.length - 1; i >= 0; i--) {
			this._monterList[i].x -= this._speed;

			if (this._monterList[i].x + this._monterList[i].width / 2 < 0)//清除已经移出屏幕的骨骼动画
			{
				this._monterList[i].dispose();

				this._monterList.splice(i, 1);
			}
		}

		if (this._bg_1.x <= -this._bg_1.width) {

			this._bg_1.x = this._bg_2.x + this._bg_2.width;
		} else if (this._bg_2.x <= -this._bg_2.width) {

			this._bg_2.x = this._bg_1.x + this._bg_1.width;
		}

		for (let i = this._monterList.length - 1; i >= 0; i--) {
			let monster = this._monterList[i];

			if (monster.alive && monster.display && this.role.display) {
				if (monster.x - this.role.x < 200) {//播放战斗过程
					this._pasue = true;

					await this.attack(2, monster)

					break;
				}
			}
		}
	}

	private _atttackTimes: number = 0;

	private async attack(attackTimes: number, monster: Role) {
		this.pet.playAnimation(AnmName.steady, 0);
		await this.role.playAnimation(AnmName.attack, 1, async any => {
			await monster.playAnimation(AnmName.hit, 1, async any => {
				this._atttackTimes++;

				if (this._atttackTimes < attackTimes) {
					this.attack(attackTimes, monster);
				}
				else {
					await monster.playAnimation(AnmName.dead, 1)

					this._killTimes++;

					if (this._killTimes >= 10) {

					} else {
						monster.alive = false;

						this._pasue = false;

						this.pet.playAnimation(AnmName.walk, 0);

						this.role.playAnimation(AnmName.walk, 0)

						this._atttackTimes = 0;
					}
				}
			});
		});
	}

	public set walk_timeScale(value) {
		this.role.walk_timeScale = value;

		if (this.role.display && this.role.current_animationName == AnmName.walk) {
			this.role.display.animation.timeScale = value;
		}

		this.pet.walk_timeScale = value;

		if (this.pet.display && this.pet.current_animationName == AnmName.walk) {
			this.pet.display.animation.timeScale = value;
		}

		this._speed = value * 5;
	}

	public set attack_timeScale(value) {
		this.role.attack_timeScale = value;

		if (this.role && this.role.display && this.role.current_animationName == AnmName.attack) {
			this.role.display.animation.timeScale = value;
		}

		this.pet.attack_timeScale = value;

		if (this.pet && this.role.display && this.pet.current_animationName == AnmName.attack) {
			this.pet.display.animation.timeScale = value;
		}
	}
}

class FightSet {
	/**
		 * stage与战斗场景背景图的高度比例
		 */
	public static scale: number = 3;
}