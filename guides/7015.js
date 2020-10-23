// Escape from Balder's Refuge
//
// made by Emilia-s2

module.exports = (dispatch, handlers, guide, lang) => {
	return {
		"nd-620-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-620-1000-107-0": [{ type: "text", sub_type: "message", message: "Attack (Back)", message_RU: "Атака (задняя)", message_TW: "攻击（后）" }],
		"s-620-1000-115-0": [{ type: "text", sub_type: "message", message: "Fireballs", message_RU: "Шары", message_TW: "火球" }],
		"s-620-1000-127-0": [
			{ type: "text", sub_type: "message", message: "Jump Back", message_RU: "Прыжок назад", message_TW: "后跳" },
			{ type: "spawn", func: "circle", args: [false, 553, 180, 376, 12, 232, 0, 6750] }
		],	
		"s-620-1000-120-0": [{ type: "text", sub_type: "message", message: "Fire Wave", message_RU: "Волна", message_TW: "火焰攻击" }],
		"s-620-1000-121-0": [{ type: "text", sub_type: "message", message: "Repel (Dodge)", message_RU: "Откид (эвейд)", message_TW: "击退(闪)" }],
		"s-620-1000-119-0": [{ type: "text", sub_type: "message", message: "Explosion | In", message_RU: "Взрыв | К нему", message_TW: "爆炸(进)" }],
		"s-620-1000-108-0": [{ type: "text", sub_type: "message", message: "Attack (Back)", message_RU: "Атака (задняя)", message_TW: "攻击(后方)" }],
		"s-620-1000-103-0": [{ type: "text", sub_type: "message", message: "Stun Frontal", message_RU: "Передний стан", message_TW: "击晕" }],
		"s-620-1000-209-0": [{ type: "text", sub_type: "message", message: "Back to Middle + Fireballs", message_RU: "Возарат + Шары", message_TW: "后跳 扔火球" }],
		"s-620-1000-125-0": [{ type: "text", sub_type: "message", message: "Fireballs", message_RU: "Шары", message_TW: "火球" }],

		"s-620-1001-303-0": [{ type: "text", sub_type: "message", message: "AOE", message_RU: "АОЕ" }],
		"s-620-1002-303-0": [{ type: "alias", id: "s-620-1001-303-0" }],
		"s-620-1003-303-0": [{ type: "alias", id: "s-620-1001-303-0" }],
		"s-620-1004-303-0": [{ type: "alias", id: "s-620-1001-303-0" }],
		"s-620-1005-303-0": [{ type: "alias", id: "s-620-1001-303-0" }],

		"s-620-1000-129-0": [{ type: "text", sub_type: "message", message: "Fireballs", message_RU: "Шары", message_TW: "火球" }],
		"s-620-1000-106-0": [{ type: "text", sub_type: "message", message: "Random Jump", message_RU: "Случайный прыжок", message_TW: "随机跳" }],
	};
};