/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fairygui.main {

	export class UI_hurtTips extends fairygui.GComponent {

		public tip:UI_tip;
		public show:fairygui.Transition;

		public static URL:string = "ui://eclrvg1uq8yd4v";

		public static createInstance():UI_hurtTips {
			return <UI_hurtTips><any>(fairygui.UIPackage.createObject("main","hurtTips"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.tip = <UI_tip><any>(this.getChild("tip"));
			this.show = this.getTransition("show");
		}
	}
}