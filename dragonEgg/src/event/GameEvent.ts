class GameEvent extends egret.Event {

    /** 
     * 刷新游戏数据
    */
    public static UPDATE_GAME_DATA: string = "UPDATE_GAME_DATA";

    /**
     * 数据
     */
    public data:any;

    public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false,data = null) {
        super(type, bubbles, cancelable,data);
    }
}