class FightScene extends egret.DisplayObjectContainer {
	private _bg_1: egret.Bitmap;

	private _bg_2: egret.Bitmap;

	private _stage: egret.Stage;

	private _textureW: number;

	private _textureH: number;

	private role: Role;

	private pet: Role;

	private bird: Role;

	private shp: egret.Shape;

	/**
	 * 每一帧帧移动的距离
	 */
	private _speed: number = 5;

	private _monterList: Array<Role>

	private _pasue: boolean = false;

	public static sceneH: number = 380;

	/**
	 * 击杀次数
	 */
	private _killTimes: number = 0;

	/**
	 * 地图背景序号
	 */
	private map_index: number = 0;

	private lightningMC: ZRMovieClip;

	public constructor(stage: egret.Stage) {
		super();

		this._stage = stage;

		this._stage.addEventListener(egret.Event.RESIZE, this.reSizeHandler, this)

		this.init();
	}

	private init() {
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
	}

	private loadBg() {
		let bg = new egret.ImageLoader();
		bg.addEventListener(egret.Event.COMPLETE, this.loadBg1Complete, this);
		bg.load('resource/res/map_' + this.map_index + '.png');
	}

	private loadBg1Complete(e: egret.Event) {
		var imageLoader = <egret.ImageLoader>e.currentTarget;
		let texture = new egret.Texture();
		texture._setBitmapData(imageLoader.data);
		this._textureH = texture.$bitmapHeight;
		this._textureW = texture.$bitmapWidth;
		this._bg_1.texture = texture;
		this._bg_1.x = 0;
		this._bg_1.y = 0;
		this._bg_1.height = FightScene.sceneH;
		this._bg_1.width = FightScene.sceneH / texture.$bitmapHeight * texture.$bitmapWidth;
		this.addChildAt(this._bg_1, 0);

		let bg = new egret.ImageLoader();
		bg.addEventListener(egret.Event.COMPLETE, this.loadBg2Complete, this);
		bg.load('resource/res/map_' + this.map_index + '.png');
	}

	private loadBg2Complete(e: egret.Event) {
		var imageLoader = <egret.ImageLoader>e.currentTarget;
		let texture = new egret.Texture();
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
			this.removeChild(this.shp)

		this._stage.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this)
	}

	/**
	 * 播放闪电特效
	 */
	private showLightning() {
		this.lightningMC = new ZRMovieClip('lightning', true, 50, 1, any => {

		});

		this.lightningMC.x = 420;

		this.lightningMC.y = 0;

		this.lightningMC.scaleY = 2;

		this.lightningMC.scaleY = 3.6;

		this.addChild(this.lightningMC)
	}

	private createRole() {
		this.role.updateData("role_0");

		this.role.r_scaleX = 0.4;

		this.role.r_scaleY = 0.4;

		this.role.x = this._stage.stageWidth * 0.4;

		this.role.y = FightScene.sceneH * 0.9;

		this.role.touchEnabled = false;

		this.addChild(this.role);

		this.role.playAnimation(AnmName.walk, 0)
	}

	private createPet() {
		this.pet.updateData("pet_0");

		this.pet.r_scaleX = -0.2;

		this.pet.r_scaleY = 0.2;

		this.pet.x = this._stage.stageWidth * 0.15;

		this.pet.y = FightScene.sceneH * 0.9;

		this.pet.touchEnabled = false;

		this.addChild(this.pet);

		this.pet.playAnimation(AnmName.walk, 0)
	}

	private createBird() {
		this.bird.updateData("bird");

		this.bird.r_scaleX = -0.2;

		this.bird.r_scaleY = 0.2;

		this.bird.x = this._stage.stageWidth;

		this.bird.y = FightScene.sceneH * 0.3;

		this.bird.touchEnabled = false;

		this.addChild(this.bird);

		this.bird.x = this._stage.stageWidth + 100;

		this.bird.y = 200;

		this.bird.playAnimation(AnmName.walk, 0)

		this.playCurveMove();
	}

	/**
	 * 播放曲线动画
	 */
	public playCurveMove() {
		let tw: egret.Tween = egret.Tween.get(this.bird, { loop: true });
		tw.to({ x: -100, y: 200 }, 5000).call(this.overCurveMove, this);
	}

	private overCurveMove() {
		// this.bird.dispose();

		// this.createBird();
	}

	/**
	 * 播放转场效果
	 */
	private transition() {
		this.addChild(this.shp);
	}

	private createMonster() {
		for (let i = 9; i >= 0; i--) {
			let monster: Role = new Role();

			monster.r_scaleX = -0.4;

			monster.r_scaleY = 0.4;

			monster.updateData("monster_0");

			monster.x = 1280 + 1000 * i;

			monster.y = FightScene.sceneH * 0.9;

			monster.touchEnabled = false;

			this.addChildAt(monster, 2);

			monster.playAnimation(AnmName.steady, 0)

			this._monterList.push(monster);
		}
	}

	private reSizeHandler() {
		// this._bg_1.height = this._stage.stageHeight / FightSet.scale;
		// this._bg_1.width = this._stage.stageHeight / FightSet.scale / this._textureH * this._textureW;

		// this._bg_2.height = this._stage.stageHeight / FightSet.scale;
		// this._bg_2.width = this._stage.stageHeight / FightSet.scale / this._textureH * this._textureW;
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

					// UIUtils.showBird(this,this.stage)

					this.showLightning();

					await this.attack(5, monster);

					break;
				}
			}
		}
	}

	private _atttackTimes: number = 0;

	private async attack(attackTimes: number, monster: Role) {
		this.pet.playAnimation(AnmName.steady, 0);
		await this.role.playAnimation(AnmName.attack, 1, async any => {
			let tips = new HurtTips('123.B', this);

			tips._view.x = this._stage.stageWidth * 0.5;

			tips._view.y = FightScene.sceneH * 0.5;

			let critTips = new CritTips('1234.C', this);

			critTips._view.x = this._stage.stageWidth * 0.7;

			critTips._view.y = FightScene.sceneH * 0.4;

			// UIUtils.showMove('gold');
			// UIUtils.showMove('diamond');
			new Money('gold',10);
			new Money('diamond',10);

			await monster.playAnimation(AnmName.hit, 1, async any => {
				this._atttackTimes++;

				if (this._atttackTimes < attackTimes) {
					this.attack(attackTimes, monster);
				}
				else {
					this._atttackTimes = 0;

					GameModel.inst.updateData(DataType.MONSTER_LEVEL, 1)

					await monster.playAnimation(AnmName.dead, 1)

					this._killTimes++;

					this._pasue = false;

					if (this._killTimes == 9)
						UIUtils.showBossTips();

					if (this._killTimes >= 10) {//下一关
						this._stage.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this)

						this.transition();

						this.clearMonster();

						if (this.map_index == 0)
							this.map_index = 1;
						else if (this.map_index == 1)
							this.map_index = 0;

						this.loadBg();

						GameModel.inst.updateData(DataType.LEVEL, 1)

						this._killTimes = 0;

						// this._pasue = false;

						this.pet.playAnimation(AnmName.walk, 0);

						this.role.playAnimation(AnmName.walk, 0)

						// GameModel.inst.roleVO.monster_level

						// this._atttackTimes = 0;
					} else {
						monster.alive = false;

						this.pet.playAnimation(AnmName.walk, 0);

						this.role.playAnimation(AnmName.walk, 0)
					}
				}
			});
		});
	}

	/**
	 * 清除场景所有怪物
	 */
	private clearMonster() {
		for (let i = this._monterList.length - 1; i >= 0; i--) {
			this._monterList[i].dispose();

			this._monterList.splice(i, 1);
		}
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

		this._speed = value * 8;
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