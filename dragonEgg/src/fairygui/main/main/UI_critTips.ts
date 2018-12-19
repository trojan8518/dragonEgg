/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fairygui.main {

	export class UI_critTips extends fairygui.GComponent {

		public tip:UI_critTip;
		public show:fairygui.Transition;

		public static URL:string = "ui://eclrvg1uoot553";

		public static createInstance():UI_critTips {
			return <UI_critTips><any>(fairygui.UIPackage.createObject("main","critTips"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.tip = <UI_critTip><any>(this.getChild("tip"));
			this.show = this.getTransition("show");
		}
	}
}