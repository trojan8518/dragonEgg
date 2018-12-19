/** 
 * 伤害提示
 * @author zhangrui 2018.12.18
*/
class HurtTips {

	public _view: fairygui.main.UI_hurtTips;

	public constructor(args: string , parent:egret.DisplayObjectContainer) {
		this._view = <fairygui.main.UI_hurtTips><any>fairygui.UIPackage.createObject("main",'hurtTips');

		this._view.tip.title.text = args;

		parent.addChild(this._view._container);

		this._view.show.play(any=>{
			parent.removeChild(this._view._container);
		});
	}
}