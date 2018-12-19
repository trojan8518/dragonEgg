/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fairygui.main {

	export class UI_scene extends fairygui.GComponent {

		public attack:UI_attribute;
		public defense:UI_attribute;
		public helmet:UI_attribute;
		public gold:UI_attribute;
		public diamond:UI_attribute;
		public level:fairygui.GTextField;
		public operate:UI_operate;

		public static URL:string = "ui://eclrvg1urbsc3s";

		public static createInstance():UI_scene {
			return <UI_scene><any>(fairygui.UIPackage.createObject("main","scene"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.attack = <UI_attribute><any>(this.getChild("attack"));
			this.defense = <UI_attribute><any>(this.getChild("defense"));
			this.helmet = <UI_attribute><any>(this.getChild("helmet"));
			this.gold = <UI_attribute><any>(this.getChild("gold"));
			this.diamond = <UI_attribute><any>(this.getChild("diamond"));
			this.level = <fairygui.GTextField><any>(this.getChild("level"));
			this.operate = <UI_operate><any>(this.getChild("operate"));
		}
	}
}