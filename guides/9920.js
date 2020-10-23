// Antaroth's Abyss (Hard)
//
// made by Yuyuko / HSDN

module.exports = (dispatch, handlers, guide, lang) => {
	guide.type = SP;

	let counter = 0;
	let timer = null;

	function thirdboss_backattack_event() {
		dispatch.clearTimeout(timer);
		counter++;

		if (counter >= 2) {
			handlers.text({
				sub_type: "message",
				message: "Back Attack",
				message_RU: "Задний",
				message_TW: "后方攻击"
			});
		}

		timer = dispatch.setTimeout(() => counter = 0, 3000);
	}

	let colour_to_use = null;

	const COLOURS_OFFSETS = {
		"red": 0,
		"yellow": 120,
		"blue": 240,
	};

	function thirdboss_set_clockwise_event(clockwise, ent) {
		dispatch.setTimeout(() => {
			const colour_rotation = clockwise ? ["red", "yellow", "blue"] : ["blue", "yellow", "red"];

			for (let i = 0; i < 3; i++) {
				let current_colour = colour_rotation[(colour_rotation.indexOf(colour_to_use) + i) % 3];

				handlers.spawn({
					func: "marker",
					args: [false, COLOURS_OFFSETS[current_colour], 150, i * 2600, (i + 1) * 3000, true, null] 
				}, ent);
			}

			// eslint-disable-next-line no-param-reassign
			dispatch.setTimeout(() => clockwise = null, 12000);
		}, 1000);
	}

	function thirdboss_change_colour_event(colour) {
		colour_to_use = colour;
	}

	let SPAWNING_FIRST_CIRCLE_FLOWERS = [
		{ type: "text", class_position: "tank", sub_type: "message", message: "Right Safe > Inward Waves", message_RU: "Вправо сейф > Волны внутрь", message_TW: "右安全 > 收缩圈" },
		{ type: "text", class_position: "dps", sub_type: "message", message: "Left Safe > Inward Waves", message_RU: "Влево сейф > Волны внутрь", message_TW: "左安全 > 收缩圈" },
		{ type: "text", class_position: "heal", sub_type: "message", message: "Left Safe > Inward Waves", message_RU: "Влево сейф > Волны внутрь", message_TW: "左安全 > 收缩圈" },
		{ type: "spawn", func: "marker", args: [false, 90, -250, 0, 2500, true, null] },
		{ type: "spawn", func: "vector", args: [553, 0, 0, 180, 500, 0, 2500] },
		{ type: "spawn", func: "vector", args: [553, 0, 0, 0, 500, 0, 1500] },
		{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 18, 143, 1500, 5000] },
		{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 12, 293, 1500, 5000] }
	];

	let SPAWNING_SECOND_CIRCLE_FLOWERS = [
		{ type: "text", class_position: "tank", sub_type: "message", message: "Left Safe > Outward Waves", message_RU: "Влево сейф > Волны наружу", message_TW: "左安全 > 扩散圈" },
		{ type: "text", class_position: "dps", sub_type: "message", message: "Right Safe > Outward Waves", message_RU: "Вправо сейф > Волны наружу", message_TW: "右安全 > 扩散圈" },
		{ type: "text", class_position: "heal", sub_type: "message", message: "Right Safe > Outward Waves", message_RU: "Вправо сейф > Волны наружу", message_TW: "右安全 > 扩散圈" },
		{ type: "spawn", func: "marker", args: [false, 270, -250, 0, 2500, true, null] },
		{ type: "spawn", func: "vector", args: [553, 0, 0, 180, 500, 0, 2500] },
		{ type: "spawn", func: "vector", args: [553, 0, 0, 0, 500, 0, 1500] },
		{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 18, 157, 1500, 5000] },
		{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 12, 307, 1500, 5000] }
	];

	return {
		// 1 BOSS

		"nd-920-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],

		// Not enraged
		"s-920-1000-1117-0": [{ type: "text", sub_type: "message", message: "IN > OUT", message_RU: "К нему > От него", message_TW: "进 > 出" }],
		"s-920-1000-1116-0": [{ type: "text", sub_type: "message", message: "OUT > IN", message_RU: "От него > К нему", message_TW: "出 > 进" }],
		"s-920-1000-1109-0": [{ type: "text", sub_type: "message", message: "back", message_RU: "Откид назад", message_TW: "后方攻击" }],
		"s-920-1000-1130-0": [{ type: "text", sub_type: "message", message: "Full > Outer > Inner", message_RU: "Общий > Внешний > Внутренний", message_TW: "!!!" }],
		"s-920-2000-1108-0": [{ type: "text", sub_type: "message", message: "Target Swing", message_RU: "Таргет", message_TW: "目标" }],
		"s-920-2000-1113-0": [{ type: "text", sub_type: "message", message: "Left Slash", message_RU: "Левая полоса", message_TW: "左" }],
		"s-920-2000-1114-0": [{ type: "text", sub_type: "message", message: "Right Slash", message_RU: "Правая полоса", message_TW: "右" }],
		"s-920-2000-1106-0": [{ type: "text", sub_type: "message", message: "Spin Attack", message_RU: "Крутилка", message_TW: "旋转" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 320, 0, 3500] }
		],
		"s-920-2000-1105-0": [{ type: "text", sub_type: "message", message: "Back Attack", message_RU: "Удар назад", message_TW: "后方" }],
		"s-920-2000-1104-0": [{ type: "text", sub_type: "message", message: "Random Jump", message_RU: "Прыжок (стан)", message_TW: "随仇跳" }],
		"s-920-2000-1110-0": [{ type: "text", sub_type: "message", message: "Stun Attack", message_RU: "Передний стан", message_TW: "眩晕" }],
		"s-920-2000-1111-0": [{ type: "text", sub_type: "message", message: "Left Slash", message_RU: "Левая полоса", message_TW: "左" }],
		"s-920-2000-1112-0": [{ type: "text", sub_type: "message", message: "Right Slash", message_RU: "Правая полоса", message_TW: "右" }],

		// Enraged
		"s-920-1000-2117-0": [{ type: "text", sub_type: "message", message: "Stay In > Get Out", message_RU: "К нему > От него", message_TW: "出 > 进" }],
		"s-920-1000-2116-0": [{ type: "text", sub_type: "message", message: "Get Out > Stay In", message_RU: "От него > К нему", message_TW: "远离 > 靠近" }],
		"s-920-1000-2109-0": [{ type: "text", sub_type: "message", message: "Back Attack", message_RU: "Откид назад", message_TW: "后方" }],
		"s-920-1000-2130-0": [{ type: "text", sub_type: "message", message: "Full > Inner > Outer", message_RU: "Общий > Внутренний > Внешний", message_TW: "！！！" }],

		// Special attacks
		"s-920-1000-1300-0": [{ type: "text", sub_type: "message", delay: 600, message: "Dodge!", message_RU: "Эвейд!", message_TW: "闪避" }],


		// 2 BOSS

		"nd-920-2000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"h-920-2000-50": [{ type: "text", sub_type: "message", message: "50%", message_RU: "50%" }],
		"h-920-2000-20": [{ type: "text", sub_type: "message", message: "20%", message_RU: "20%" }],

		"s-920-2000-2108-0": [{ type: "text", sub_type: "message", message: "Target Swing", message_RU: "Таргет", message_TW: "目标" }],
		"s-920-2000-2113-0": [{ type: "text", sub_type: "message", message: "Left Slash", message_RU: "Левая полоса", message_TW: "左" }],
		"s-920-2000-2114-0": [{ type: "text", sub_type: "message", message: "Right Slash", message_RU: "Правая полоса", message_TW: "右" }],
		"s-920-2000-2106-0": [{ type: "text", sub_type: "message", message: "Spin Attack", message_RU: "Крутилка", message_TW: "旋转攻击" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 320, 0, 3500] }
		],
		"s-920-2000-2105-0": [{ type: "text", sub_type: "message", message: "Back Attack", message_RU: "Удар назад", message_TW: "后方" }],
		"s-920-2000-2104-0": [{ type: "text", sub_type: "message", message: "Random Jump", message_RU: "Прыжок (стан)", message_TW: "随仇跳" }],
		"s-920-2000-2110-0": [{ type: "text", sub_type: "message", message: "Stun Attack", message_RU: "Передний стан", message_TW: "眩晕" }],
		"s-920-2000-2111-0": [{ type: "text", sub_type: "message", message: "Left Slash", message_RU: "Левая полоса", message_TW: "左" }],
		"s-920-2000-2112-0": [{ type: "text", sub_type: "message", message: "Right Slash", message_RU: "Правая полоса", message_TW: "右" }],

		// Special attacks
		"s-920-2000-3119-0": [{ type: "text", sub_type: "message", message: "Red: Out safe", message_RU: "Красный: Наружу сейф", message_TW: "红色: 外面安全" }],
		"s-920-2000-3220-0": [{ type: "text", sub_type: "message", message: "Blue: In safe", message_RU: "Синий: Внутрь сейф", message_TW: "蓝色: 里面安全" }],
		"s-920-2000-3116-0": [{ type: "text", sub_type: "message", message: "Circles", message_RU: "Круги", message_TW: "圈" }],


		// 3 BOSS

		"nd-920-3000-0": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],

		// Not enraged
		"s-920-3000-1315-0": [{ type: "text", sub_type: "message", message: "Pushback", message_RU: "Откид (кайа)", message_TW: "推人" }],
		"s-920-3000-1107-0": [{ type: "text", sub_type: "message", message: "Random Jump", message_RU: "Прыжок (стан)", message_TW: "随仇跳" }],
		"s-920-3000-1204-0": [{ type: "text", sub_type: "message", message: "Energy Beam", message_RU: "Волна", message_TW: "爆发点名" }],
		// heart thrust+anticlockwise spin+right swipe+AOEs from out to in
		"s-920-3000-1109-0": SPAWNING_FIRST_CIRCLE_FLOWERS,
		// heart thrust+clockwise spin+left swipe+AOEs from in to out
		"s-920-3000-1111-0": SPAWNING_SECOND_CIRCLE_FLOWERS,
		//
		"s-920-3000-1113-0": [{ type: "text", sub_type: "message", message: "Front | Back Slam", message_RU: "Передний | Задний", message_TW: "前方 | 后方" }],
		"s-920-3000-1115-0": [{ type: "text", sub_type: "message", message: "Spinning Attack", message_RU: "Круговая", message_TW: "旋转攻击" }],
		"s-920-3000-1104-0": [{ type: "func", func: thirdboss_backattack_event }],
		//"s-920-3000-1202-0": [{ type: "text", sub_type: "message", message: "spin or front, back slam", message_RU: "Круговая | Задний" }],
		"s-920-3000-1120-0": [{ type: "text", sub_type: "message", message: "Energy Beam", message_RU: "Волна", message_TW: "爆发点名" }],

		// Enraged
		"s-920-3000-2204-0": [{ type: "text", sub_type: "message", message: "Energy Beam", message_RU: "Волна", message_TW: "爆发点名" }],
		// heart thrust+anticlockwise spin+right swipe+AOEs from out to in
		"s-920-3000-2109-0": SPAWNING_FIRST_CIRCLE_FLOWERS,
		// heart thrust+clockwise spin+left swipe+AOEs from in to out
		"s-920-3000-2111-0": SPAWNING_SECOND_CIRCLE_FLOWERS,
		//
		"s-920-3000-2113-0": [{ type: "text", sub_type: "message", message: "Front | Back Slam", message_RU: "Передний | Задний", message_TW: "前方 | 后方" }],
		"s-920-3000-2104-0": [{ type: "func", func: thirdboss_backattack_event }],
		"s-920-3000-2115-0": [{ type: "text", sub_type: "message", message: "Spinning Attack", message_RU: "Круговая", message_TW: "旋转攻击" }],
		"s-920-3000-2107-0": [{ type: "text", sub_type: "message", message: "Random Jump", message_RU: "Прыжок (стан)", message_TW: "随仇跳" }],
		//"s-920-3000-2202-0": [{ type: "text", sub_type: "message", message: "spin or front, back slam", message_RU: "Круговая | Задний" }],
		"s-920-3000-2120-0": [{ type: "text", sub_type: "message", message: "Energy Beam", message_RU: "Волна", message_TW: "爆发点名" }],

		// Special attacks
		"s-920-3000-1400-0": [{ type: "text", sub_type: "message", message: "Clones: Beam", message_RU: "Копии: волны", message_TW: "分身(点名)" }],
		"s-920-3000-1401-0": [{ type: "text", sub_type: "message", message: "Clones: Spin", message_RU: "Копии: круговые", message_TW: "分身(旋转)" }],
		// color marks in cage
		"ae-0-0-9203037": [{ type: "text", sub_type: "message", message: "Red", message_RU: "Красный", message_TW: "红色" }, { type: "func", func: thirdboss_change_colour_event, args: ["red"] }],
		"ae-0-0-9203038": [{ type: "text", sub_type: "message", message: "Yellow", message_RU: "Желтый", message_TW: "黄色" }, { type: "func", func: thirdboss_change_colour_event, args: ["yellow"] }],
		"ae-0-0-9203039": [{ type: "text", sub_type: "message", message: "Blue", message_RU: "Синий", message_TW: "蓝色" }, { type: "func", func: thirdboss_change_colour_event, args: ["blue"] }],
		// anti-clockwise
		"s-920-3000-1317-0": [{ type: "func", func: thirdboss_set_clockwise_event, args: [false] }],
		// clockwise
		"s-920-3000-1318-0": [{ type: "func", func: thirdboss_set_clockwise_event, args: [true] }]
	};
};