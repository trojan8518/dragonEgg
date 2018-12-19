/** 
 * 伤害提示
 * @author zhangrui 2018.12.18
*/
class CritTips {

	public _view: fairygui.main.UI_critTips;

	public constructor(args: string , parent:egret.DisplayObjectContainer) {
		this._view = <fairygui.main.UI_critTips><any>fairygui.UIPackage.createObject("main",'critTips');

		this._view.tip.title.text = args;

		parent.addChild(this._view._container);

		this._view.show.play(any=>{
			parent.removeChild(this._view._container);
		});
	}
}