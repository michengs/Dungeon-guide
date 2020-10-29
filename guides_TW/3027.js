// Forbidden Arena [Hagufna]
//
// made by michengs / HSDN

/* eslint-disable no-multi-spaces */

module.exports = (dispatch, handlers, guide, lang) => {
	const { HIGHLIGHT_ITEM } = module.parent.exports.spawn;

	let timer1 = null;
	let timer2 = null;
	let print_shield = true;
	let print_hp = true;
	let is_hp_74_39 = false;

	function shield_event() {
		dispatch.clearTimeout(timer1);
		dispatch.clearTimeout(timer2);

		timer1 = dispatch.setTimeout(() => {
			if (!is_hp_74_39) {
				handlers.text({
					sub_type: "message",
					message: "Shield in 5 seconds!",
					message_RU: "Через 5 сек. щит!",
					message_TW: "5秒后破盾!"
				});
			}
		}, 85000);

		timer2 = dispatch.setTimeout(() => {
			if (!is_hp_74_39) {
				handlers.text({
					sub_type: "message",
					message: "Shield in 15 seconds!",
					message_RU: "Через 15 сек. щит!",
					message_TW: "15秒后破盾!"
				});
			}
		}, 75000);
	}

	function boss_hp_event(hp) {
		if ([74, 39].includes(hp)) {
			if (print_hp) {
				dispatch.clearTimeout(timer1);
				dispatch.clearTimeout(timer2);
				print_hp = false;
				is_hp_74_39 = true;
				dispatch.setTimeout(() => print_hp = true, 15000);
			}
		}
		if ([89, 59, 29].includes(hp)) { // до щита
			if (print_shield) {
				print_shield = false;
				is_hp_74_39 = false;
				dispatch.setTimeout(() => print_shield = true, 15000);

				handlers.text({
					sub_type: "alert",
					message: "Ready for Shield",
					message_RU: "Готовность ломать щит",
					message_TW: "准备破盾!"
				});
			}
		}
	}

	return {
		"nd-3027-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"h-3027-1000-89": [{ type: "func", func: boss_hp_event, args: [89] }],
		"h-3027-1000-59": [{ type: "func", func: boss_hp_event, args: [59] }],
		"h-3027-1000-29": [{ type: "func", func: boss_hp_event, args: [29] }],
		"h-3027-1000-74": [{ type: "func", func: boss_hp_event, args: [74] }],
		"h-3027-1000-39": [{ type: "func", func: boss_hp_event, args: [39] }],

		//"s-3027-1001-255-0": [{ type: "spawn", func: "vector", args: [553, 0, 0, 0, 3000, 0, 5000] }],  //0
		//"s-3027-1002-256-0": [{ type: "spawn", func: "vector", args: [553, 0, 0, 0, 3000, 0, 5000] }],  //60
		//"s-3027-1003-257-0": [{ type: "spawn", func: "vector", args: [553, 0, 0, 0, 3000, 0, 5000] }],  //0
		//"s-3027-1004-258-0": [{ type: "spawn", func: "vector", args: [553, 0, 0, 0, 3000, 0, 5000] }],  //60

		"s-3027-1000-108-0": [{ type: "text", class_position:"tank", sub_type: "message", message: "Strike (Slow)", message_RU: "Меч (медленный)", message_TW: "一刀(慢)" }], // 101 121 122 -> 108
		//"s-3027-1000-355-0": [{ type: "text", sub_type: "message", message: "Eviscerate", message_RU: "Потрошение" }],                                 // 102 121 103 -> 355 -> 114
		"s-3027-1000-135-0": [{ type: "text", sub_type: "message", message: "Strike (Slow)", message_RU: "Меч (медленный)", message_TW: "一刀(慢)" }],                         //         104 -> 135 -> 130
		"s-3027-1000-111-0": [{ type: "text", sub_type: "message", message: "Stun | Strike", message_RU: "Стан | Меч", message_TW: "眩晕 | 一刀" }],                              //         104 -> 111 -> 130
		"s-3027-1000-112-0": [{ type: "text", sub_type: "message", message: "Back Jump | Strike", message_RU: "Прыжок назад | Меч", message_TW: "后跳 | 一刀" }],                 //     121 102 -> 112 -> 130

		// прыжок
		"s-3027-1000-116-0": [
			{ type: "text", sub_type: "message", message: "Jump", message_RU: "прыжок)", message_TW: "大跳" },
			{ type: "spawn", func: "circle", args: [true, 413, 0, 180, 8, 560, 0, 1000] }
		],
		"s-3027-1000-116-1": [
			{ type: "text", sub_type: "message", message: "Dodge", message_RU: "Эвейд!", message_TW: "闪避" },
			{ type: "spawn", func: "circle", args: [true, 912, 0, 180, 8, 480, 0, 3000] }
		],

		// 3 оборота -> прыжок (145 -> 139 -> 140)
		"s-3027-1000-145-0": [{ type: "text", sub_type: "message", message: "3x360 | Jump", message_RU: "3 оборота | Прыжок", message_TW: "3圈 | 一刀" }],
		"s-3027-1000-139-0": [
			{ type: "text", sub_type: "message", delay: 1000, message: "Jump", message_RU: "прыжок)", message_TW: "跳" },
			{ type: "spawn", func: "circle", args: [true, 413, 0, 180, 8, 660, 1000, 1000] }
		],
		"s-3027-1000-140-0": [
			{ type: "text", sub_type: "message", message: "Dodge", message_RU: "Эвейд!", message_TW: "闪避" },
			{ type: "spawn", func: "circle", args: [true, 912, 0, 180, 8, 480, 0, 3000] }
		],

		// 109 -> 402 -> 130"
		"s-3027-1000-109-0": [{ type: "text", sub_type: "message", message: "Forward Jump", message_RU: "Прыжок вперед", message_TW: "前跳" }],
		"s-3027-1000-402-0": [{ type: "text", sub_type: "message", message: "Jump", message_RU: "Прыжок", message_TW: "大跳 | 差地" }],

		// 136 -> 144 -> 130
		"s-3027-1000-136-0": [{ type: "text", sub_type: "message", message: "2x360 | Strike", message_RU: "2 оборота | Меч", message_TW: "2圈 | 一刀" }],
		"s-3027-1000-144-0": [{ type: "text", sub_type: "message", message: "Strike", message_RU: "Меч", message_TW: "一刀" }],

		// 134 -> 147
		"s-3027-1000-134-0": [{ type: "text", sub_type: "message", message: "Turn around | Back", message_RU: "Поворот | Удар назад", message_TW: "前戳(转身)" }],
		"s-3027-1000-134-1": [{ type: "text", sub_type: "message", message: "Back", message_RU: "Удар назад", message_TW: "后方" }],
		"s-3027-1000-147-0": [{ type: "text", sub_type: "message", message: "Strike", message_RU: "Меч", message_TW: "一刀" }],

		// 142 -> 143 114 130
		"s-3027-1000-142-0": [{ type: "text", sub_type: "message", message: "2x360 | Strike", message_RU: "2 оборота | Меч", message_TW: "下巴 | 一刀" }],
		"s-3027-1000-143-0": [{ type: "text", sub_type: "message", message: "Strike", message_RU: "Меч", message_TW: "一刀" }],

		"s-3027-1000-141-0": [{ type: "text", sub_type: "message", message: "2x360 | Eviscerate", message_RU: "2 оборота | Потрошение", message_TW: "回旋 | 一刀" }], // 141 -> 146 114 130
		"s-3027-1000-146-0": [{ type: "text", sub_type: "message", message: "Eviscerate | Strike", message_RU: "Потрошение | Меч", message_TW: "下巴 | 一刀" }],      // 146 ->         114 -> 130

		// стяжка -> бублики (350 -> 302)
		"s-3027-1000-350-0": [
			{ type: "text", sub_type: "message", message: "Red: Donuts (Out > In)", message_RU: "Стяжка | Бублики (От него > К нему)", message_TW: "内外炸" },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 12, 240, 0, 5000] },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 8, 480, 0, 5000] },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 3, 950, 0, 5000] },
			{ type: "spawn", func: "item", args: [HIGHLIGHT_ITEM, 0, 0, 3800, 1000] },
			{ type: "text", sub_type: "message", delay: 3800, message: "In", message_RU: "К нему", message_TW: "进" },
			{ type: "spawn", func: "marker", args: [false, 180, 100, 3800, 1000, false, ["CENTER", "IN"]] },
			{ type: "spawn", func: "marker", args: [false, 0, 100, 3800, 1000, false, ["CENTER", "IN"]] },
			{ type: "spawn", func: "marker", args: [false, 90, 100, 3800, 1000, false, ["CENTER", "IN"]] },
			{ type: "spawn", func: "marker", args: [false, 270, 100, 3800, 1000, false, ["CENTER", "IN"]] },
			{ type: "text", sub_type: "alert", delay: 58000, message: "Mechanics soon...", message_RU: "Скоро стяжка...", message_TW: "鉴定准备" }
		],
		// стяжка -> волна (357 -> 110)
		"s-3027-1000-357-0": [
			{ type: "text", sub_type: "message", message: "Purple: Get Out", message_RU: "Стяжка | От него", message_TW: "远离" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 20, 500, 2000, 5000] },
			{ type: "text", sub_type: "alert", delay: 58000, message: "Mechanics soon...", message_RU: "Скоро стяжка...", message_TW: "鉴定准备" }
		],

		//"s-3027-1000-114-0": [{ type: "text", sub_type: "message", message: "Eviscerate (slow)", message_RU: "Потрошение (медленно)" }],
		//"s-3027-1000-130-0": [{ type: "text", sub_type: "message", message: "Target", message_RU: "Таргет" }],
		"s-3027-1000-151-0": [{ type: "text", sub_type: "message", message: "Back teleport | Strike", message_RU: "Телепорт назад | Меч", message_TW: "后方瞬移" }], // 151 149 148 -> 130
		"s-3027-1000-149-1": [{ type: "text", sub_type: "message", message: "Back teleport (Target)", message_RU: "Телепорт назад (таргет)", message_TW: "后方瞬移" }],
		"s-3027-1000-117-0": [{ type: "text", sub_type: "message", message: "Teleport (Target)", message_RU: "Телепорт (таргет)", message_TW: "点名瞬移" }],         //         117 -> 130
		"s-3027-1000-356-0": [{ type: "text", sub_type: "message", message: "Teleport (Target)", message_RU: "Телепорт (таргет)", message_TW: "点名瞬移" }],         //         356 -> 147
		"s-3027-1000-148-1": [{ type: "text", sub_type: "message", message: "Teleport (Target)", message_RU: "Телепорт (таргет)", message_TW: "点名瞬移" }],

		"s-3027-1000-351-0": [
			{ type: "text", sub_type: "message", message: "Shield!", message_RU: "Щит!", message_TW: "破盾" },
			{ type: "func", func: shield_event }
		],
		"s-3027-1000-401-0": [
			{ type: "text", sub_type: "message", message: "30% AOE!", message_RU: "АОЕ" },
			{ type: "text", sub_type: "message", delay: 1600, message: "Dodge!", message_RU: "Эвейд!", message_TW: "闪避" }
		]
	};
};