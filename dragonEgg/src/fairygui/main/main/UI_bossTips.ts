/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module fairygui.main {

	export class UI_bossTips extends fairygui.GComponent {

		public bg:fairygui.GGraph;
		public title:fairygui.GTextField;
		public effect:fairygui.Transition;

		public static URL:string = "ui://eclrvg1uoot54y";

		public static createInstance():UI_bossTips {
			return <UI_bossTips><any>(fairygui.UIPackage.createObject("main","bossTips"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.bg = <fairygui.GGraph><any>(this.getChild("bg"));
			this.title = <fairygui.GTextField><any>(this.getChild("title"));
			this.effect = this.getTransition("effect");
		}
	}
}