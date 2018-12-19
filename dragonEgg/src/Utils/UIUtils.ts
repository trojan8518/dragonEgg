/**
 * UI工具类
 * @author zhangrui 2018.10.16
 */
class UIUtils {

	/**
	 * color:number = 0x33CCFF;        /// 光晕的颜色，十六进制，不包含透明度
     * alpha:number = 0.8;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
     * blurX:number = 35;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
     * blurY:number = 35;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
     * strength:number = 2;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
     * quality:number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
     * inner:boolean = false;            /// 指定发光是否为内侧发光，暂未实现
     * knockout:boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
	 */
    public static setFilter(display: egret.DisplayObject, color: number = 0x000000, alpha: number = 1, blurX: number = 0, blurY: number = 0, strength: number = 0, quality: number = egret.BitmapFilterQuality.HIGH, inner: boolean = false, knockout: boolean = false) {

        var glowFilter: egret.GlowFilter = new egret.GlowFilter(color, alpha, blurX, blurY,
            strength, quality, inner, knockout);

        display.filters = [glowFilter];
    }

    // private static _scene: SceneMediator;

    // public static set sceneMediator(value: SceneMediator) {
    //     this._sceneMediator = value;
    // }

    // public static get sceneMediator(): SceneMediator {
    //     return this._sceneMediator;
    // }

    /** 
     * 设置跳跃数字
    */
    public static setBeatNum(textField: egret.TextField | fairygui.GTextField, value: number, start: number = 0) {
        let num = start;

        let timer = new egret.Timer(50, value - start)

        timer.addEventListener(egret.TimerEvent.TIMER, () => {
            num++;

            textField.text = num.toString();

        }, this);

        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, () => {
            timer.stop()
            timer = null;
        }, this)


    }

    public static autoShowText(textField: fairygui.GTextField, value: number) {
        switch (value.toString().length) {
            case 1:
                textField.fontSize = 18;
                break;
            case 2:
                textField.fontSize = 16;
                break;
            case 3:
                textField.fontSize = 12;
                break;
            case 4:
                textField.fontSize = 10;
                break;
            case 5:
                textField.fontSize = 9;
                break;
        }

        textField.text = value.toString();
    }

    public static randomColor(): number {
        const r = Math.round(Math.random() * 255);

        const g = Math.round(Math.random() * 255);

        const b = Math.round(Math.random() * 255);

        const a = ((Math.random() * 5 + 5) / 10).toFixed(2)

        const color = this.rgb2hex(`rgba(${r},${g},${b},${a})`)

        return color;
    }

    private static rgb2hex(color): number {
        var rgb = color.split(',');
        var r = parseInt(rgb[0].split('(')[1]);
        var g = parseInt(rgb[1]);
        var b = parseInt(rgb[2].split(')')[0]);
        var hex = "0x" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        return parseInt(hex);
    }

    /**
     * 置灰
     */
    public static setAsh(value: egret.DisplayObject) {
        let colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];

        let colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        value.filters = [colorFlilter];

    }

    /**
     * 反色
     */
    public static setAntiColor(value: egret.Texture) {

        let ary: number[] = value.getPixels(0, 0, value.$bitmapWidth, value.$bitmapHeight)

        console.log();
    }

    /**
     * 矩形相交
     */
    public static hitTest(obj1: egret.DisplayObject, obj2: egret.DisplayObject): boolean {
        var rect1: egret.Rectangle = new egret.Rectangle(obj1.x - obj1.anchorOffsetX , obj1.y - obj1.anchorOffsetY , obj1.width , obj1.height);
        // rect1 = obj1.getBounds(rect1,true)
        var rect2: egret.Rectangle = new egret.Rectangle(obj2.x - obj2.anchorOffsetX , obj2.y - obj2.anchorOffsetY , obj2.width , obj2.height);
        // rect2 = obj2.getBounds(rect2,true)
        // rect1.x = obj1.x - obj1.width/2;
        // rect1.y = obj1.y - obj1.height/2;
        // rect2.x = obj2.x - obj2.width/2;
        // rect2.y = obj2.y - obj2.height/2;

        // rect1.x = obj1.x - obj1.anchorOffsetX;
        // rect1.y = obj1.y - obj1.anchorOffsetY;
        // rect2.x = obj2.x - obj2.anchorOffsetX;
        // rect2.y = obj2.y - obj2.anchorOffsetY;

        return rect1.intersects(rect2);
    }

    /**
     * 
     */
    public static getRect(obj: egret.DisplayObject): egret.Rectangle {
        var rect: egret.Rectangle = obj.getBounds();
        rect.x = obj.x - obj.anchorOffsetX;
        rect.y = obj.y - obj.anchorOffsetY;
        return rect;
    }
}