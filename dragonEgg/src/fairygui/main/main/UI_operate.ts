/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fairygui.main {

	export class UI_operate extends fairygui.GComponent {

		public top:fairygui.GComponent;
		public bottom:UI_bottom;

		public static URL:string = "ui://eclrvg1uiyvx4s";

		public static createInstance():UI_operate {
			return <UI_operate><any>(fairygui.UIPackage.createObject("main","operate"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.top = <fairygui.GComponent><any>(this.getChild("top"));
			this.bottom = <UI_bottom><any>(this.getChild("bottom"));
		}
	}
}