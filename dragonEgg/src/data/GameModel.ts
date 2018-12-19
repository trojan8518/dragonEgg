class GameModel {

	/**
	 * 用户数据
	 */
	public roleVO:RoleVO;

	private static _inst: GameModel;

	public constructor() {
		this.roleVO.level = 1;
		this.roleVO.monster_level = 1;
		this.roleVO.gold = 0;
		this.roleVO.diamond = 0;
		this.roleVO.attack = 0;
		this.roleVO.defense = 0;
		this.roleVO.helmet = 0;
	}

	public static get inst(): GameModel {
		if (!GameModel._inst)
			GameModel._inst = new GameModel();

		return GameModel._inst;
	}

	/**
	 * 刷新游戏数据
	 * @dataType		数据类型
	 * @num				刷新数量
	 */
	public updateData(dataType:string,num:number){
		switch(dataType){
			case DataType.LEVEL:
			break;
			case DataType.MONSTER_LEVEL:
			
			break;
			case DataType.GOLD:
			
			break;
			case DataType.DIAMOND:
			
			break;
			case DataType.ATTACK:
			
			break;
			case DataType.DEFENSE:
			
			break;
			case DataType.HELMET:
			
			break;
		}
	}
}

/**
 * 数据类型
 */
class DataType{
	/**
	 * 当前关卡等级
	 */
	public static LEVEL:string = 'LEVEL';

	/**
	 * 当前怪物关卡等级
	 */
	public static MONSTER_LEVEL:string = 'MONSTER_LEVEL';

	/**
	 * 金币
	 */
	public static GOLD:string = 'GOLD';

	/**
	 * 钻石
	 */
	public static DIAMOND:string = 'DIAMOND';

	/**
	 * 攻击力
	 */
	public static ATTACK:string = 'ATTACK';

	/**
	 * 防御力
	 */
	public static DEFENSE:string = 'DEFENSE';

	/**
	 * 头盔属性
	 */
	public static HELMET:string = 'HELMET';
}