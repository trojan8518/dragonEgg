class ZRMovieClip extends egret.Sprite {
	/** 
	 * 资源组名称
	*/
	private _groupName: string;

	private _img: egret.Bitmap;

	/** 
	 * 定時器
	*/
	private _timer: egret.Timer;

	private _index: number;

	private _repeateCount: number;

	private _callBackFunc: Function;

	private _autoDispose:boolean;

	/** 
	 * 
	*/
	public constructor(groupName: string, autoPlay: boolean = true, delay: number = 50, repeatCount: number = 1, callBackFunc: Function = null,autoDispose:boolean = true) {
		super();

		this._groupName = groupName;

		this._repeateCount = repeatCount;

		this._callBackFunc = callBackFunc;

		this._autoDispose = autoDispose;

		if (!this._timer)
			this._timer = new egret.Timer(1000)

		this._timer.delay = delay;

		this.init();
	}

	private async init() {

		// RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);

		// RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);

		this._img = new egret.Bitmap();

		this.addChild(this._img);

		this._index = 1;

		await RES.loadGroup(this._groupName);

		this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);

		this._timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timer_completeHandler, this);

		this._timer.repeatCount = RES.getGroupByName(this._groupName).length * this._repeateCount;

		this.play();

		if(this._groupName == 'lightning')
			SoundUtils.play(SoundType.LIGHTNING,1);
	}

	/**
     * game资源组加载完成
     */
	private onResourceLoadComplete(event: RES.ResourceEvent): void {
		this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);

		this._timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timer_completeHandler, this);

		this._timer.repeatCount = RES.getGroupByName(this._groupName).length * this._repeateCount;

		this.play();
	}

	private timerHandler() {
		if (this._index > RES.getGroupByName(this._groupName).length)
			this._index = 1;

		this._img.texture = RES.getRes(this._groupName + '_' + this._index + '_png');

		this._index++;

		console.log();
	}

	private timer_completeHandler() {
		if (this._callBackFunc)
			this._callBackFunc();
		this.dispose();
	}

    /**
     * 资源组加载出错
     */
	private onResourceLoadError(event: RES.ResourceEvent): void {
		console.warn("Group:" + event.groupName + " has failed to load");
		this.onResourceLoadComplete(event);
	}

	/** 
	 * 播放
	*/
	private play() {
		this._timer.start();
	}

	public dispose() {
		if (this.parent)
			this.parent.removeChild(this);

		this._timer.stop();

		// this._timer = null;

		this._img.texture = null;

		// this._img = null;
	}

}
