class Money extends egret.Sprite {

	private start_x = 300;
	private start_y = 350;

	private end_x;
	private end_y;

	private _name;

	private num:number;

	public constructor(name: string,num:number) {
		super();

		this._name = name;

		this.num = num;

		this.init(name)
	}

	private async init(name: string) {
		let money = new egret.Bitmap();

		money.texture = await RES.getRes(name)

		this.addChild(money)

		UIUtils.scene._scene._container.addChild(this);

		if (name == 'gold') {
			this.end_x = UIUtils.scene._scene.gold.x;
			this.end_y = UIUtils.scene._scene.gold.y;
		}
		else if (name == 'diamond') {
			this.end_x = UIUtils.scene._scene.diamond.x;
			this.end_y = UIUtils.scene._scene.diamond.y;
		}

		let tw: egret.Tween = egret.Tween.get(this);
		tw.to({ factor: 1 }, 600, egret.Ease.circOut).call(this.overCurveMove, this);
	}

	private get factor(): number {
		return 0;
	}

	private set factor(value: number) {
		if (this._name == 'gold') {
			this.x = (1 - value) * (1 - value) * this.start_x + 2 * value * (1 - value) * (this.start_x + 200) + value * value * this.end_x;
		} else if (this._name == 'diamond') {
			this.x = (1 - value) * (1 - value) * this.start_x + 2 * value * (1 - value) * (this.start_x + 300) + value * value * this.end_x;
		}
		this.y = (1 - value) * (1 - value) * this.start_y + 2 * value * (1 - value) * ((this.end_y - this.start_y) / 3 + this.start_y) + value * value * this.end_y;
	}


	private overCurveMove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}

		if (this._name == 'gold') {
			GameModel.inst.updateData(DataType.GOLD,this.num)
		} else if (this._name == 'diamond') {
			GameModel.inst.updateData(DataType.DIAMOND,this.num)
		}
	}

}