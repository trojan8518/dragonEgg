/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fairygui.main {

	export class UI_scene extends fairygui.GComponent {

		public boxBtn:fairygui.GComponent;
		public heroBtn:fairygui.GComponent;
		public shopBtn:fairygui.GComponent;
		public createBtn:fairygui.GComponent;
		public mergeBtn:fairygui.GComponent;

		public static URL:string = "ui://eclrvg1urbsc3s";

		public static createInstance():UI_scene {
			return <UI_scene><any>(fairygui.UIPackage.createObject("main","scene"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.boxBtn = <fairygui.GComponent><any>(this.getChild("boxBtn"));
			this.heroBtn = <fairygui.GComponent><any>(this.getChild("heroBtn"));
			this.shopBtn = <fairygui.GComponent><any>(this.getChild("shopBtn"));
			this.createBtn = <fairygui.GComponent><any>(this.getChild("createBtn"));
			this.mergeBtn = <fairygui.GComponent><any>(this.getChild("mergeBtn"));
		}
	}
}