// Draakon Arena
//
// made by Kuroine

let player, entity, library, effect;

const {HIGHLIGHT_ITEM_RED, SpawnItem, SpawnVector, SpawnCircle} = require("../lib");

module.exports = {
	load(dispatch) {
		({ player, entity, library, effect } = dispatch.require.library);
	},

	// RESS Bait //Range Check
	"s-3102-1000-107-0": [{"type": "text","sub_type": "message","message_TW": "幽灵投掷","message": 'Spectral Throw',"message_RU": "Спектральный бросок"}],

	// Basic Attacks
	"s-3102-1000-103-0": [{"type": "text","sub_type": "message","message_TW": "2次攻击流血","message": '2 Hits | Bleed',"message_RU": "2 удара | Кровоток"}],
	"s-3102-1000-113-0": [{"type": "text","sub_type": "message","message_TW": "4次攻击流血","message": '4 Hits Combo',"message_RU": "4 удара комба"}],
	"s-3102-1000-105-0": [{"type": "text","sub_type": "message","message_TW": "勾拳| 晕","message": 'Uppercut | Stun (INC)',"message_RU": "Передний стан"}],
	"s-3102-1000-106-0": [{"type": "text","sub_type": "message","message_TW": "晕","message": 'Stun',"message_RU": "Стан"}],

	"s-3102-1000-120-0": [{"type": "text","sub_type": "message","message_TW": "戳","message": 'Many Pokes | Stun',"message_RU": "Несколько ударов | Стан"}],
	"s-3102-1000-114-0": [{"type": "text","sub_type": "message","message_TW": "晕（AOE）","message": 'Stun (AOE)',"message_RU": "Стан (AOE)"}],

	// Leap
	"s-3102-1000-111-0": [{"type": "text","sub_type": "message","message_TW": "跳跃（晕）","message": 'Leap (Stun)',"message_RU": "Прыжок (стан)"}],

	"s-3102-1000-115-0": [{"type": "text","sub_type": "message","message_TW": "AOE爆炸","message": 'AOE Bombs (SPREAD IF NO NINJA)',"message_RU": "AOE бомбы"},
						 {"type": "text","sub_type": "message","delay": 3000,"message": 'Gather!',"message_RU": "Собраться!"}],

	"s-3102-1000-112-0": [{"type": "text","sub_type": "message","message_TW": "前-后-踢","message": 'Front-Back Kick',"message_RU": "Удар спереди"}],

	"s-3102-1000-110-0": [{"type": "text","sub_type": "message","message_TW": "跳 (进-出-水波)","message": 'Jump (In-out-wave)',"message_RU": "Прыжок (к-от волна)"}],

	"s-3102-1000-109-0": [{"type": "text","sub_type": "message","message_TW": "击倒旋转","message": 'Knockdown-Spin',"message_RU": "Удар - Крутилка"},
						 {"type": "func","func": SpawnCircle.bind(null,false,445,0,0,12,457,0,5000)}],
	
	"s-3102-1000-304-0": [{"type": "text","sub_type": "message","message_TW": "破盾","message": 'Shield!',"message_RU": "ЩИТ!"}],
	"ab-3102-1000-31021006": [{"type": "text","sub_type": "message","message_TW": "诅咒","message": 'Plague/Regress',"message_RU": "Чума/регресс"}],

	// Pizza Boi
	"s-3102-1000-121-0": [{"type": "text","sub_type": "message","message_TW": "右脚","message": 'Right Foot',"message_RU": "Правая нога"},
						 // LEFT MARKERS
						 {"type": "func","func": SpawnVector.bind(null,912,0,0,255,400,0,4000)},
						 {"type": "func","func": SpawnVector.bind(null,912,0,0,295,400,0,4000)},
						 // RIGHT MARKERS
						 {"type": "func","func": SpawnVector.bind(null,912,0,0,75,400,0,4000)},
						 {"type": "func","func": SpawnVector.bind(null,912,0,0,115,400,0,4000)},
						 {"type": "text","sub_type": "message","delay": 1900,"message": 'Dodge!',"message_RU": "Эвейд!"}],
	"s-3102-1000-122-0": [{"type": "text","sub_type": "message","message_TW": "前后披萨","message": 'Front-back pizza',"message_RU": "Пицца спереди назад"},
						 {"type": "func","func": SpawnItem.bind(null,HIGHLIGHT_ITEM_RED,0,200,100,4000)}],
	"s-3102-1000-123-0": [{"type": "text","sub_type": "message","message_TW": "后方披萨","message": 'Back pizza',"message_RU": "Задняя пицца"}],

	"s-3102-1000-124-0": [{"type": "text","sub_type": "message","message_TW": "左脚","message": 'Left Foot',"message_RU": "Левая нога"},
						// LEFT MARKERS
						{"type": "func","func": SpawnVector.bind(null,912,0,0,255,400,0,4000)},
						{"type": "func","func": SpawnVector.bind(null,912,0,0,295,400,0,4000)},
						// RIGHT MARKERS
						{"type": "func","func": SpawnVector.bind(null,912,0,0,75,400,0,4000)},
						{"type": "func","func": SpawnVector.bind(null,912,0,0,115,400,0,4000)},
						{"type": "text","sub_type": "message","delay": 1900,"message": 'Dodge!',"message_RU": "Эвейд!"}],
	"s-3102-1000-125-0": [{"type": "text","sub_type": "message","message_TW": "前后披萨","message": 'Front-back pizza',"message_RU": "Пицца спереди назад"},
						 {"type": "func","func": SpawnItem.bind(null,HIGHLIGHT_ITEM_RED,0,200,100,4000)}],
	"s-3102-1000-126-0": [{"type": "text","sub_type": "message","message_TW": "后方披萨","message": 'Back pizza',"message_RU": "Задняя пицца"}]
};