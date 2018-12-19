class Scene {

	private _scene: fairygui.main.UI_scene;

	public constructor(scene: fairygui.main.UI_scene) {
		this._scene = scene;

		this._scene.height = fairygui.GRoot.inst.height;

		this.init();
	}

	private init() {
	}
}