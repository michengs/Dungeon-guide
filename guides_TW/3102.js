// Draakon Arena
//
// made by Kuroine / HSDN

module.exports = (dispatch, handlers, guide, lang) => {
	return {
		"nd-3102-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],

		// Ress bait / range check
		"s-3102-1000-107-0": [{ type: "text", sub_type: "message", message: "Spectral Throw (Bait)", message_RU: "Спектральный бросок (байт)", message_TW: "小李飞刀" }],

		// Basic attacks
		"s-3102-1000-103-0": [{ type: "text", sub_type: "message", message: "2 Hits | Bleed", message_RU: "2 удара | Кровоток", message_TW: "2次攻击流血" }],
		"s-3102-1000-113-0": [{ type: "text", sub_type: "message", message: "4 Hits Combo", message_RU: "4 удара комба", message_TW: "4次攻击流血" }],
		"s-3102-1000-105-0": [{ type: "text", sub_type: "message", message: "Uppercut | Stun", message_RU: "Удар снизу | Стан", message_TW: "勾拳| 晕" }],
		"s-3102-1000-106-0": [{ type: "text", sub_type: "message", message: "Stun", message_RU: "Стан", message_TW: "晕" }],
		// 120 > 114
		"s-3102-1000-120-0": [{ type: "text", sub_type: "message", message: "Many Pokes | Stun (AOE)", message_RU: "Несколько ударов | Стан (AOE)", message_TW: "戳" }],
		"s-3102-1000-114-0": [
			{ type: "text", sub_type: "message", message: "Stun (AOE)", message_RU: "Стан (AOE)", message_TW: "晕(aoe)" },
			{ type: "spawn", func: "circle", args: [true, 553, 0, 0, 16, 420, 100, 3000] }
		],
		"s-3102-1000-111-0": [{ type: "text", sub_type: "message", message: "Leap (Stun)", message_RU: "Прыжок (стан)", message_TW: "跳跃（晕）" }],
		"s-3102-1000-115-0": [
			{ type: "text", sub_type: "message", message: "AOE Bombs (Gather)", message_RU: "AOE бомбы (вместе)", message_TW: "AOE爆炸" },
			{ type: "text", sub_type: "message", delay: 3000, message: "Gather!", message_RU: "Собраться!", message_TW: "集中" }
		],
		"s-3102-1000-112-0": [
			{ type: "text", sub_type: "message", message: "Front | Back Kick", message_RU: "Разворот | Откид назад", message_TW: "前 | 后" },
			{ type: "spawn", func: "vector", args: [553, 90, 120, 160, 300, 0, 3000] },
			{ type: "spawn", func: "vector", args: [553, 270, 120, -160, 300, 0, 3000] }
		],
		"s-3102-1000-110-0": [
			{ type: "text", sub_type: "message", message: "Donuts + Wave", message_RU: "Бублики + Волна", message_TW: "内外炸" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 650, 0, 4000] }
		],
		"s-3102-1000-109-0": [
			{ type: "text", sub_type: "message", message: "Knockdown + Spin", message_RU: "Опрокид + Крутилка", message_TW: "击倒 + 旋转" },
			{ type: "spawn", func: "circle", args: [true, 553, 0, 100, 10, 420, 0, 1000] },
			{ type: "spawn", func: "circle", args: [true, 553, 0, 150, 10, 420, 1000, 2000] }
		],
		"s-3102-1000-304-0": [{ type: "text", sub_type: "message", message: "Shield!", message_RU: "ЩИТ!", message_TW: "破盾" }],
		"ab-3102-1000-31021006": [{ type: "text", sub_type: "message", message: "Plague/Regress", message_RU: "Чума/регресс", message_TW: "补师解" }],

		// Right Foot
		"s-3102-1000-121-0": [
			{ type: "text", sub_type: "message", message: "Pizza", message_RU: "Пицца", message_TW: "披萨" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 550, 0, 3000] },
			{ type: "spawn", func: "semicircle", args: [-60, 70, 912, 0, 50, 8, 450, 0, 4000] },
			{ type: "spawn", func: "semicircle", args: [120, 250, 912, 0, 50, 8, 450, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 50, 70, 450, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 50, 120, 450, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 50, 250, 450, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 50, 300, 450, 0, 4000] },
			{ type: "text", sub_type: "message", delay: 1500, message: "Dodge!", message_RU: "Эвейд!", message_TW: "闪避" }
		],
		"s-3102-1000-122-0": [{ type: "spawn", func: "marker", args: [false, 0, 200, 500, 2000, true, null] }],
		"s-3102-1000-123-0": [
			{ type: "spawn", func: "vector", args: [912, 0, 0, 295, 550, 0, 2000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 85, 550, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [85, 295, 912, 0, 0, 6, 550, 0, 2000] }
		],
		// Left Foot
		"s-3102-1000-124-0": [
			{ type: "text", sub_type: "message", message: "Pizza", message_RU: "Пицца", message_TW: "披萨" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 550, 0, 3000] },
			{ type: "spawn", func: "semicircle", args: [-60, 70, 912, 0, 50, 8, 450, 0, 4000] },
			{ type: "spawn", func: "semicircle", args: [120, 250, 912, 0, 50, 8, 450, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 50, 70, 450, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 50, 120, 450, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 50, 250, 450, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 50, 300, 450, 0, 4000] },
			{ type: "text", sub_type: "message", delay: 1500, message: "Dodge!", message_RU: "Эвейд!", message_TW: "闪避" }
		],
		"s-3102-1000-125-0": [{ type: "spawn", func: "marker", args: [false, 0, 200, 500, 3000, true, null] }],
		"s-3102-1000-126-0": [
			{ type: "spawn", func: "vector", args: [912, 0, 0, 295, 550, 0, 2000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 85, 550, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [85, 295, 912, 0, 0, 6, 550, 0, 2000] }
		]
	};
};