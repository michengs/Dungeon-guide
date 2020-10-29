// Akalath Quarantine
//
// made by michengs

module.exports = (dispatch, handlers, guide, lang) => {
	guide.type = ES;

	let debuff = null;
 
	function firstboss_debuff_event(skillid) {
		switch (skillid) {
			case 3119: // red inside
				if (debuff === 1) { // red deuff
					handlers.text({
						sub_type: "message",
						message: "OUT (blue)",
						message_RU: "ОТ НЕГО",
						message_TW: "出 (蓝色)",
						delay: 500
					});
				}
				if (debuff === 2) { // blue deuff
					handlers.text({
						sub_type: "message",
						message: "IN (red)",
						message_RU: "К НЕМУ",
						message_TW: "进 (红色)",
						delay: 500
					});
				}
				break;

			case 3220: // blue inside
				if (debuff === 1) { // red deuff
					handlers.text({
						sub_type: "message",
						message: "IN (blue)",
						message_RU: "К НЕМУ",
						message_TW: "进 (蓝色)",
						delay: 500
					});
				}
				if (debuff === 2) { // blue deuff
					handlers.text({
						sub_type: "message",
						message: "OUT (red)",
						message_RU: "ОТ НЕГО",
						message_TW: "出 (红色)",
						delay: 500
					});
				}
				break;

			case 30231000: // red debuff added
				debuff = 1;
				break;

			case 30231001: // blue debuff added
				debuff = 2;
				break;

			default: // debuff removed
				debuff = null;
		}
	}

	return {
		// 1 BOSS
		"nd-3023-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		// Debuff removed
		"die": [{ type: "func", func: firstboss_debuff_event }],
		// Debuf added
		"ae-0-0-30231000": [{ type: "func", func: firstboss_debuff_event, args: [30231000] }], // AoE (red)
		"ae-0-0-30231001": [{ type: "func", func: firstboss_debuff_event, args: [30231001] }], // AoE (blue)
		"am-3023-1000-30231000": [{ type: "func", func: firstboss_debuff_event, args: [30231000] }], // Red
		"am-3023-1000-30231001": [{ type: "func", func: firstboss_debuff_event, args: [30231001] }], // Blue
		//
		"s-3023-1000-104-0": [{ type: "text", sub_type: "message", message: "Random Jump", message_RU: "Прыжок + Стан", message_TW: "随仇跳" }],
		"s-3023-1000-105-0": [{ type: "text", sub_type: "message", message: "Back", message_RU: "Поворот назад", message_TW: "后方" }],
		"s-3023-1000-110-0": [
			{ type: "text", sub_type: "message", message: "Stun", message_RU: "Передний стан", message_TW: "晕" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 175, 10, 260, 0, 6000] }
		],
		"s-3023-1000-111-0": [
			{ type: "text", sub_type: "message", message: "Left Slash", message_RU: "Левая полоса", message_TW: "左" },
			{ type: "spawn", func: "vector", args: [553, 270, 200, 180, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 270, 200, 0, 300, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 90, 20, 180, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 90, 20, 0, 300, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 6, 302, 270, 200, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 176, 502, 270, 200, 0, 2000] }
		],
		"s-3023-1000-112-0": [
			{ type: "text", sub_type: "message", message: "Right Slash", message_RU: "Правая полоса", message_TW: "右" },
			{ type: "spawn", func: "vector", args: [553, 90, 200, 180, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 90, 200, 0, 300, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 270, 20, 180, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 270, 20, 0, 300, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 354, 302, 90, 200, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 184, 502, 90, 200, 0, 2000] }
		],
		"s-3023-1000-113-0": [
			{ type: "text", sub_type: "message", message: "Left Slash", message_RU: "Левая полоса", message_TW: "左" },
			{ type: "spawn", func: "vector", args: [553, 270, 200, 180, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 270, 200, 0, 300, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 90, 20, 180, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 90, 20, 0, 300, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 6, 302, 270, 200, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 176, 502, 270, 200, 0, 2000] }
		],
		"s-3023-1000-114-0": [
			{ type: "text", sub_type: "message", message: "Right Slash", message_RU: "Правая полоса", message_TW: "右" },
			{ type: "spawn", func: "vector", args: [553, 90, 200, 180, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 90, 200, 0, 300, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 270, 20, 180, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 270, 20, 0, 300, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 354, 302, 90, 200, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 184, 502, 90, 200, 0, 2000] }
		],
		"s-3023-1000-115-0": [
			{ type: "text", sub_type: "message", message: "Back Attack", message_RU: "Удар назад", message_TW: "后方攻击" },
			{ type: "spawn", func: "semicircle", args: [90, 280, 553, 0, 0, 15, 160, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [90, 275, 553, 0, 0, 10, 250, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [90, 270, 553, 0, 0, 10, 340, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 90, 150, 90, 150, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 270, 150, 270, 150, 0, 2000] }
		],
		"s-3023-1000-116-0": [
			{ type: "text", sub_type: "message", message: "Kaia's Shield", message_RU: "Кайа", message_TW: "减伤开盾", class_position: "priest" },
			{ type: "text", sub_type: "message", message: "Thrall of Protection", message_RU: "Кайа", message_TW: "守护精灵", class_position: "mystic" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 560, 0, 6000] }
		],
		"s-3023-1000-3107-0": [
			{ type: "text", sub_type: "message", message: "Smash", message_RU: "Конус вперед", message_TW: "后砸" },
			{ type: "spawn", func: "vector", args: [553, 90, 80, 10, 1000, 0, 4000] },
			{ type: "spawn", func: "vector", args: [553, 270, 80, 350, 1000, 0, 4000] }
		],
		"s-3023-1000-3115-0": [
			{ type: "text", sub_type: "message", message: "Spin", message_RU: "Крутилка", message_TW: "旋转" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 320, 0, 3500] }
		],
		"s-3023-1000-3116-0": [
			{ type: "text", sub_type: "message", message: "Circles + Spin", message_RU: "Круги + Крутилка", message_TW: "圈 + 旋转" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 320, 0, 5000] }
		],
		"s-3023-1000-3119-0": [
			{ type: "func", func: firstboss_debuff_event, args: [3119] }, // red inside
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 270, 0, 4000] },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 650, 0, 4000] }
		],
		"s-3023-1000-3220-0": [
			{ type: "func", func: firstboss_debuff_event, args: [3220] }, // blue inside
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 270, 0, 4000] },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 650, 0, 4000] }
		],

		// 2 BOSS
		"nd-3023-2000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-3023-2000-164-0": [{ type: "text", sub_type: "message", message: "Counter Attack (bleed)", message_RU: "Отпрыжка (Кровоток)", message_TW: "反击 (流血)" }],
		"s-3023-2000-166-0": [{ type: "text", sub_type: "message", message: "Turn-back", message_RU: "Оборот назад", message_TW: "转身-后方" }],
		"s-3023-2000-175-0": [
			{ type: "text", sub_type: "message", message: "Incoming Stun", message_RU: "Рёв", message_TW: "沉默" },
			{ type: "text", sub_type: "message", delay: 1500, message: "Dodge", message_RU: "Эвейд", message_TW: "闪避" }
		],
		"s-3023-2000-178-0": [{ type: "text", sub_type: "message", message: "Scratching (bleed)", message_RU: "Крутилка (Кровоток)", message_TW: "毒抓" }],
		"s-3023-2000-181-0": [
			{ type: "text", sub_type: "message", message: "Rock Throw", message_RU: "Полоса вперед", message_TW: "插地板(直线)" },
			{ type: "spawn", func: "vector", args: [553, 90, 80, 10, 1000, 0, 4000] },
			{ type: "spawn", func: "vector", args: [553, 270, 80, 350, 1000, 0, 4000] }
		],
		"s-3023-2000-182-0": [{ type: "text", sub_type: "message", message: "Knockdown", message_RU: "Опрокид", message_TW: "踩地击倒" }],
		"s-3023-2000-185-0": [
			{ type: "text", sub_type: "message", message: "Big jump (Kaia's Shield)", message_RU: "Прыжок (кайа)", message_TW: "大跳(减伤开盾)", class_position: "priest" },
			{ type: "text", sub_type: "message", message: "Big jump (Thrall of Protection)", message_RU: "Прыжок (кайа)", message_TW: "大跳(守护精灵)", class_position: "mystic" },
			{ type: "text", sub_type: "alert", delay: 110000, message: "Big jump soon...", message_RU: "Скоро прыжок...", message_TW: "大跳准备...", class_position: "heal" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 500, 0, 6000] },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 750, 0, 6000] }
		],
		"s-3023-2000-202-0": [
			{ type: "text", sub_type: "message", message: "Backstab", message_RU: "Назад + Вперед", message_TW: "后擒" },
			{ type: "spawn", func: "vector", args: [553, 90, 80, 180, 500, 0, 3000] },
			{ type: "spawn", func: "vector", args: [553, 270, 80, 180, 500, 0, 3000] }
		],
		"s-3023-2000-207-0": [{ type: "text", sub_type: "message", message: "Phantom x5 (bleed)", message_RU: "Прыжки x5 (Кровоток)", message_TW: "幻影x5(流血)" }],
		"s-3023-2000-212-0": [{ type: "text", sub_type: "message", message: "Flash (bleed)", message_RU: "Байт (Кровоток)", message_TW: "闪现(流血)" }]
	};
};