/** 
 * 声音播放工具类
 * @author zhangrui
*/
class SoundUtils {

	/** 
	 * 音频文件集合
	*/
	private static soundMap: Map<string, egret.Sound>;

	private static soundChannelMap: Map<string, egret.SoundChannel>;

	/** 
	 * 背景音乐音量
	*/
	private static _bg_sound_volume: number = 50;

	/** 
	 * 音效音量
	*/
	private static _sound_volume: number = 50;

	public constructor() {

	}

	/** 
	 * 开始加载
	*/
	public static startLoad(): void {
		if (!this.soundMap)
			this.soundMap = new Map<string, egret.Sound>();

		if (!this.soundChannelMap)
			this.soundChannelMap = new Map<string, egret.SoundChannel>();

		let bgType = "bg";//2个bgm随机
		this.soundMap.set(SoundType.BACKGROUND, RES.getRes(SoundType.BACKGROUND + '_MP3'));
		this.soundMap.set(SoundType.BEHIT, RES.getRes(SoundType.BEHIT + '_MP3'));
		this.soundMap.set(SoundType.BOOM, RES.getRes(SoundType.BOOM + '_MP3'));
		this.soundMap.set(SoundType.BTN, RES.getRes(SoundType.BTN + '_MP3'));
		this.soundMap.set(SoundType.COIN, RES.getRes(SoundType.COIN + '_MP3'));
		this.soundMap.set(SoundType.CRITICAL, RES.getRes(SoundType.CRITICAL + '_MP3'));
		this.soundMap.set(SoundType.DIEBOOM, RES.getRes(SoundType.DIEBOOM + '_MP3'));
		this.soundMap.set(SoundType.ERROR, RES.getRes(SoundType.ERROR + '_MP3'));
		this.soundMap.set(SoundType.GIRL_SHOUTING, RES.getRes(SoundType.GIRL_SHOUTING + '_MP3'));
		this.soundMap.set(SoundType.HAMMER, RES.getRes(SoundType.HAMMER + '_MP3'));
		this.soundMap.set(SoundType.INTROMUSIC, RES.getRes(SoundType.INTROMUSIC + '_MP3'));
		this.soundMap.set(SoundType.LIGHTNING, RES.getRes(SoundType.LIGHTNING + '_MP3'));
		this.soundMap.set(SoundType.LVUP, RES.getRes(SoundType.LVUP + '_MP3'));
		this.soundMap.set(SoundType.MAN_SHOUTING, RES.getRes(SoundType.MAN_SHOUTING + '_MP3'));
		this.soundMap.set(SoundType.MONKEY_SHOUTING, RES.getRes(SoundType.MONKEY_SHOUTING + '_MP3'));
		this.soundMap.set(SoundType.MOVE, RES.getRes(SoundType.MOVE + '_MP3'));
		this.soundMap.set(SoundType.POPUP, RES.getRes(SoundType.POPUP + '_MP3'));
		this.soundMap.set(SoundType.STORY, RES.getRes(SoundType.STORY + '_MP3'));
		this.soundMap.set(SoundType.UPGRADE, RES.getRes(SoundType.UPGRADE + '_MP3'));
		this.soundMap.set(SoundType.YEAH, RES.getRes(SoundType.YEAH + '_MP3'));


		egret.lifecycle.onPause = () => {
			// this.soundMap.get(SoundType.BG).stop();
			this.soundChannelMap.delete(SoundType.BACKGROUND)
			egret.ticker.pause();   // 关闭渲染和心跳
		}
		egret.lifecycle.onResume = () => {
			this.play(SoundType.BACKGROUND, 0);

			egret.ticker.resume();  // 打开渲染和心跳
		}
	}

	/** 
	 * 播放
	 * @param type 音乐类型
	 * @param loops 播放次数，默认值是 0，循环播放。 大于 0 为播放次数，如 1 为播放 1 次；小于等于 0，为循环播放。
	*/
	public static play(type: string, loops: number) {

		// console.log("播放音效---名称：" + type);
		// console.log("音效当前音量---" + SoundUtils.sound_volume);
		// console.log("bgm当前音量---" + SoundUtils._bg_sound_volume);

		var sound: egret.Sound = this.soundMap.get(type);

		var channel: egret.SoundChannel;

		if (loops > 0) {//播放固定次数的音乐
			if (!this.soundChannelMap.get(type)) {
				this.soundChannelMap.set(type, channel);
			}

			channel = sound.play(0, loops);

			channel.volume = 0.01 * this._sound_volume;
		} else {//循环播放的音乐
			if (!this.soundChannelMap.get(type)) {
				channel = sound.play(0, loops);

				channel.volume = 0.01 * this._bg_sound_volume;

				this.soundChannelMap.set(type, channel);
			}
		}
	}

	/** 
	 * 播放
	 * @param type 音乐类型
	*/
	public static stop(type: string) {
		let channel = this.soundChannelMap.get(type);

		if (channel) {
			channel.stop();

			this.soundChannelMap.delete(type);
		}
	}

	/** 
	 * 设置背景音乐音量
	*/
	public static set bg_sound_volume(value: number) {
		this._bg_sound_volume = value;

		if (this.soundChannelMap && this.soundChannelMap.get(SoundType.BACKGROUND)) {
			this.soundChannelMap.get(SoundType.BACKGROUND).volume = 0.01 * value;

			// this.soundChannelMap.get(SoundType.BG).stop();
		}
	}

	/** 
	 * 获取背景音乐音量
	*/
	public static get bg_sound_volume(): number {
		return this._bg_sound_volume;
	}

	/** 
	 * 设置音效音量
	*/
	public static set sound_volume(value: number) {
		this._sound_volume = value;
	}

	/** 
	 * 获取音效音量
	*/
	public static get sound_volume(): number {
		return this._sound_volume;
	}


}

class SoundType {
	/** 
	 * 背景音樂
	*/
	public static BACKGROUND: string = "BACKGROUND";

	/** 
	 * 背景音樂
	*/
	public static BEHIT: string = "BEHIT";

	/** 
	 * 背景音樂
	*/
	public static BOOM: string = "BOOM";

	/** 
	 * 背景音樂
	*/
	public static BTN: string = "BTN";

	/** 
	 * 背景音樂
	*/
	public static COIN: string = "COIN";

	/** 
	 * 背景音樂
	*/
	public static CRITICAL: string = "CRITICAL";

	/** 
	 * 背景音樂
	*/
	public static DIEBOOM: string = "DIEBOOM";

	/** 
	 * 背景音樂
	*/
	public static ERROR: string = "ERROR";

	/** 
	 * 背景音樂
	*/
	public static GIRL_SHOUTING: string = "GIRL_SHOUTING";

	/** 
	 * 背景音樂
	*/
	public static HAMMER: string = "HAMMER";

	/** 
	 * 背景音樂
	*/
	public static INTROMUSIC: string = "INTROMUSIC";

	/** 
	 * 背景音樂
	*/
	public static LIGHTNING: string = "LIGHTNING";

	/** 
	 * 背景音樂
	*/
	public static LVUP: string = "LVUP";

	/** 
	 * 背景音樂
	*/
	public static MAN_SHOUTING: string = "MAN_SHOUTING";

	/** 
	 * 背景音樂
	*/
	public static MONKEY_SHOUTING: string = "MONKEY_SHOUTING";

	/** 
	 * 背景音樂
	*/
	public static MOVE: string = "MOVE";

	/** 
	 * 背景音樂
	*/
	public static POPUP: string = "POPUP";

	/** 
	 * 背景音樂
	*/
	public static STORY: string = "STORY";

	/** 
	 * 背景音樂
	*/
	public static UPGRADE: string = "UPGRADE";

	/** 
	 * 背景音樂
	*/
	public static YEAH: string = "YEAH";

}