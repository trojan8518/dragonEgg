/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fairygui.main {

	export class UI_hpBar extends fairygui.GProgressBar {

		public bg:fairygui.GGraph;

		public static URL:string = "ui://eclrvg1uoot554";

		public static createInstance():UI_hpBar {
			return <UI_hpBar><any>(fairygui.UIPackage.createObject("main","hpBar"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.bg = <fairygui.GGraph><any>(this.getChild("bg"));
		}
	}
}