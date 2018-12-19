class Scene {

	public _scene: fairygui.main.UI_scene;

	public constructor(scene: fairygui.main.UI_scene) {
		this._scene = scene;

		this.init();
	}

	private init() {
		fairygui.GRoot.inst.addEventListener(GameEvent.UPDATE_GAME_DATA, (e: GameEvent) => {
			switch (e.data) {
				case DataType.LEVEL:
					this._scene.level.text = GameModel.inst.roleVO.level + '-' + GameModel.inst.roleVO.monster_level;
					break;
				case DataType.MONSTER_LEVEL:
					this._scene.level.text = GameModel.inst.roleVO.level + '-' + GameModel.inst.roleVO.monster_level;
					break;
				case DataType.GOLD:
					this._scene.gold.num.text = GameModel.inst.roleVO.gold.toString();

					this._scene.gold.gold_effect.play();
					break;
				case DataType.DIAMOND:
					this._scene.diamond.num.text = GameModel.inst.roleVO.diamond.toString();

					this._scene.diamond.diamond_effect.play();
					break;
				case DataType.ATTACK:
					this._scene.attack.num.text = GameModel.inst.roleVO.attack.toString();

					this._scene.attack.attack_effect.play();
					break;
				case DataType.DEFENSE:
					this._scene.defense.num.text = GameModel.inst.roleVO.defense.toString();

					this._scene.defense.defense_effect.play();
					break;
				case DataType.HELMET:
					this._scene.helmet.num.text = GameModel.inst.roleVO.helmet.toString();

					this._scene.helmet.helmet_effect.play();
					break;
			}
			console.log();
		}, this)
	}
}