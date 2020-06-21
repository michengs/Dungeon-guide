// Draakon  Arena (Hard)
//
// made by Kuroine

let player, entity, library, effect;

const {SpawnItem, SpawnVector, SpawnCircle} = require("../lib");

module.exports = {
	load(dispatch) {
		({ player, entity, library, effect } = dispatch.require.library);
	},

	// RESS Bait //Range Check
	"s-3202-1000-107-0": [{"type": "text","sub_type": "message","message": 'Spectral Throw',"message_TW": '幽灵投掷',"message_RU": "Спектральный бросок"}],

	// Basic Attacks
	"s-3202-1000-103-0": [{"type": "text","sub_type": "message","message": '2 Hits | Bleed',"message_TW": '2次攻击流血',"message_RU": "2 удара комба (кровоток)"}],
	"s-3202-1000-113-0": [{"type": "text","sub_type": "message","message": '4 Hits Combo',"message_TW": '4次攻击流血',"message_RU": "4 удара комба"}],
	"s-3202-1000-105-0": [{"type": "text","sub_type": "message","message": 'Uppercut | Stun (INC)',"message_TW": '勾拳| 晕',"message_RU": "Передний стан"}],
	"s-3202-1000-106-0": [{"type": "text","sub_type": "message","message": 'Stun',"message_TW": '晕',"message_RU": "Стан"}],

	"s-3202-1000-120-0": [{"type": "text","sub_type": "message","message": 'Many Pokes | Stun',"message_TW": '戳',"message_RU": "Стан 120"}],
	"s-3202-1000-114-0": [{"type": "text","sub_type": "message","message": 'Stun (AOE)',"message_TW": '晕（AOE）',"message_RU": "Стан (AOE)"}],
	
	// Leap
	"s-3202-1000-111-0": [{"type": "text","sub_type": "message","message": 'Leap (Stun)',"message_TW": '跳跃（晕）',"message_RU": "Прыжок (стан)"}],

	"s-3202-1000-115-0": [{"type": "text","sub_type": "message","message": 'AOE Bombs (SPREAD IF NO NINJA)',"message_TW": 'AOE爆炸',"message_RU": "AOE бомбы"},
						 {"type": "text","sub_type": "message","delay": 3000,"message": 'Gather!',"message_TW": '聚集',"message_RU": "Собраться!"}],

	"s-3202-1000-112-0": [{"type": "text","sub_type": "message","message": 'Front-Back Kick',"message_TW": '前-后-踢',"message_RU": "Удар спереди"}],

	"s-3202-1000-110-0": [{"type": "text","sub_type": "message","message": 'Jump (In-out-wave)',"message_TW": '跳 (进-出-水波)',"message_RU": "Прыжок (к-от волна)"}],

	"s-3202-1000-109-0": [{"type": "text","sub_type": "message","message": 'Knockdown-Spin',"message_TW": '击倒旋转',"message_RU": "Удар - Крутилка"},
						 {"type": "func","func": SpawnCircle.bind(null,false,445,0,0,12,457,0,5000)}],
	
	"s-3202-1000-304-0": [{"type": "text","sub_type": "message","message": 'Shield!',"message_TW": '破盾',"message_RU": "ЩИТ!"}],
	"ab-3202-1000-32021006": [{"type": "text","sub_type": "message","message": 'Plague/Regress',"message_TW": '诅咒',"message_RU": "Чума/регресс"}],

	// Pizza Boi
	"s-3202-1000-121-0": [{"type": "text","sub_type": "message","message": 'Right Foot - incoming Stomp (IN | OUT WAVES)',"message_TW": '右跺脚进 | 出 水波',"message_RU": "Правая нога - входящий удар (волны К | От)"},
						 {"type": "func","func": SpawnCircle.bind(null,false,445,0,0,12,707,0,5000)},
						 // LEFT MARKERS
						 {"type": "func","func": SpawnCircle.bind(null,false,445,0,0,12,707,0,5000)},
						 {"type": "func","func": SpawnVector.bind(null,912,0,0,245,400,0,4000)},
						 {"type": "func","func": SpawnVector.bind(null,912,0,0,305,400,0,4000)},
						 // RIGHT MARKERS
						 {"type": "func","func": SpawnVector.bind(null,912,0,0,65,400,0,4000)},
						 {"type": "func","func": SpawnVector.bind(null,912,0,0,125,400,0,4000)},
						 {"type": "text","sub_type": "message","delay": 1900,"message": 'Dodge!',"message_TW": '闪',"message_RU": "Эвейд!"}],
	"s-3202-1000-122-0": [{"type": "text","sub_type": "message","message": 'Front-back pizza',"message_TW": '前后披萨',"message_RU": "Пицца спереди назад"},
						 {"type": "func","func": SpawnItem.bind(null,89544,0,200,100,4000)}],
	"s-3202-1000-123-0": [{"type": "text","sub_type": "message","message": 'Back pizza',"message_TW": '后方披萨',"message_RU": "Задняя пицца"},
						 {"type": "text","sub_type": "message","delay":100,"message": 'IN | OUT WAVES',"message_TW": '(进 | 出 水波)',"message_RU": "Волны К | От"}],

	"s-3202-1000-127-0": [{"type": "text","sub_type": "message","message": '(IN | OUT WAVES)',"message_TW": '(进 | 出 水波)',"message_RU": "(волны К | От)"},
						 {"type": "func","func": SpawnCircle.bind(null,false,445,0,0,18,157,0,5000)},
						 {"type": "func","func": SpawnCircle.bind(null,false,445,0,0,12,307,0,5000)}],

	"s-3202-1000-124-0": [{"type": "text","sub_type": "message","message": 'Left Foot - incoming Stomp (OUT | IN WAVES)',"message_TW": '左跺脚准备 (出 | 进 水波)',"message_RU": "Левая нога - входящий удар (волны От | К)"},
						{"type": "func","func": SpawnCircle.bind(null,false,445,0,0,12,707,0,5000)},
						// LEFT MARKERS
						{"type": "func","func": SpawnVector.bind(null,912,0,0,245,400,0,4000)},
						{"type": "func","func": SpawnVector.bind(null,912,0,0,305,400,0,4000)},
						// RIGHT MARKERS
						{"type": "func","func": SpawnVector.bind(null,912,0,0,65,400,0,4000)},
						{"type": "func","func": SpawnVector.bind(null,912,0,0,125,400,0,4000)},
						{"type": "text","sub_type": "message","delay": 1900,"message": 'Dodge!',"message_TW": '闪',"message_RU": "Эвейд"}],
	"s-3202-1000-125-0": [{"type": "text","sub_type": "message","message": 'Front-back pizza',"message_TW": '前后圈',"message_RU": "Пицца спереди назад"},
	  					 {"type": "func","func": SpawnItem.bind(null,89544,0,200,100,4000)}],
	"s-3202-1000-126-0": [{"type": "text","sub_type": "message","message": 'Back pizza',"message_TW": '后方圈',"message_RU": "Задняя пицца"},
						{"type": "text","sub_type": "message","delay":100,"message": 'OUT | IN WAVES',"message_TW": '出 | 进 水波',"message_RU": "Волны От | К"}],
						//128
	"s-3202-1000-128-0": [{"type": "text","sub_type": "message","message": '(OUT | IN WAVES)',"message_TW": '出 | 进 水波',"message_RU": "(волны От | К)"},
						 {"type": "func","func": SpawnCircle.bind(null,false,445,0,0,18,143,0,5000)},
						 {"type": "func","func": SpawnCircle.bind(null,false,445,0,0,12,293,0,5000)}]
};