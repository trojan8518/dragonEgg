/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fairygui.main {

	export class UI_critTip extends fairygui.GComponent {

		public title:fairygui.GTextField;

		public static URL:string = "ui://eclrvg1uoot552";

		public static createInstance():UI_critTip {
			return <UI_critTip><any>(fairygui.UIPackage.createObject("main","critTip"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.title = <fairygui.GTextField><any>(this.getChild("title"));
		}
	}
}