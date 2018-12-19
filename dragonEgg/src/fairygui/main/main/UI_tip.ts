/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fairygui.main {

	export class UI_tip extends fairygui.GComponent {

		public title:fairygui.GTextField;

		public static URL:string = "ui://eclrvg1uq8yd4u";

		public static createInstance():UI_tip {
			return <UI_tip><any>(fairygui.UIPackage.createObject("main","tip"));
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