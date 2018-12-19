/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fairygui.main {

	export class UI_attribute extends fairygui.GComponent {

		public type:fairygui.Controller;
		public num:fairygui.GTextField;
		public addBtn:fairygui.GButton;
		public attack_effect:fairygui.Transition;
		public defense_effect:fairygui.Transition;
		public helmet_effect:fairygui.Transition;
		public gold_effect:fairygui.Transition;
		public diamond_effect:fairygui.Transition;

		public static URL:string = "ui://eclrvg1uiyvx4i";

		public static createInstance():UI_attribute {
			return <UI_attribute><any>(fairygui.UIPackage.createObject("main","attribute"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.type = this.getController("type");
			this.num = <fairygui.GTextField><any>(this.getChild("num"));
			this.addBtn = <fairygui.GButton><any>(this.getChild("addBtn"));
			this.attack_effect = this.getTransition("attack_effect");
			this.defense_effect = this.getTransition("defense_effect");
			this.helmet_effect = this.getTransition("helmet_effect");
			this.gold_effect = this.getTransition("gold_effect");
			this.diamond_effect = this.getTransition("diamond_effect");
		}
	}
}