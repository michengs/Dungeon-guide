// Bahaar's Sanctum
//
// made by michengs

module.exports = (dispatch, handlers, guide, lang) => {
	guide.type = SP;

	let print = false;
	let notice = true;
	let printend = false;

	function skilld_event(skillid, ent) {
		if (skillid == 90442304) {
			handlers.text({ sub_type: "notification", message: "Stun", message_RU: "Стан!!!", message_TW: "晕" });
			handlers.text({ sub_type: "message", message: "Stun", message_RU: "Стан!!!", message_TW: "晕" });
		}

		if (notice && skillid == 305) {
			notice = false;
			handlers.text({
				sub_type: "message",
				message: "Laser",
				message_RU: "Лазер",
				message_TW: "雷射"
				
			});

			dispatch.setTimeout(() => notice = true, 4000);
		}

		// Wawes
		if ([1121, 2121, 1140, 2140, 1123, 2123, 1142, 2142, 1122, 2122, 1141, 2141].includes(skillid)) {
			handlers.event([
				{ type: "spawn", func: "vector", args: [553, 90, 50, 0, 500, 0, 6000] },
				{ type: "spawn", func: "vector", args: [553, 270, 50, 0, 500, 0, 6000] },
				{ type: "spawn", func: "vector", args: [553, 90, 50, 180, 500, 0, 6000] },
				{ type: "spawn", func: "vector", args: [553, 270, 50, 180, 500, 0, 6000] },
				{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 6, 400, 0, 6000] },
				{ type: "text", sub_type: "alert", delay: 60000, message: "Waves soon...", message_RU: "Скоро волны...", message_TW: "半月准备..." }
			]);
		}

		// Left
		if ([1121, 2121].includes(skillid)) {
			handlers.event([
				{ type: "spawn", func: "marker", args: [false, 37, 125, 0, 2533, false, ["safe", "safe"]] },
				{ type: "spawn", func: "marker", args: [false, 143, 125, 0, 2533, false, ["safe", "safe"]] }
			]);
		}

		// Right
		if ([1140, 2140].includes(skillid)) {
			handlers.event([
				{ type: "spawn", func: "marker", args: [false, 323, 125, 0, 2533, false, ["safe", "safe"]] },
				{ type: "spawn", func: "marker", args: [false, 217, 125, 0, 2533, false, ["safe", "safe"]] }
			]);
		}

		// 2nd fast 123 142
		// Left
		if ([1123, 2123].includes(skillid)) {
			handlers.event([
				{ type: "spawn", func: "marker", args: [false, 37, 125, 0, 2500, false, ["safe", "safe"]] },
				{ type: "spawn", func: "marker", args: [false, 143, 125, 0, 2500, false, ["safe", "safe"]] }
			]);
		}

		// Right
		if ([1142, 2142].includes(skillid)) {
			handlers.event([
				{ type: "spawn", func: "marker", args: [false, 323, 125, 0, 2500, false, ["safe", "safe"]] },
				{ type: "spawn", func: "marker", args: [false, 217, 125, 0, 2500, false, ["safe", "safe"]] }
			]);
		}

		// 3rd fast 122 141
		// Left
		if ([1122, 2122].includes(skillid)) {
			handlers.event([
				{ type: "spawn", func: "marker", args: [false, 37, 125, 0, 2533, false, ["safe", "safe"]] },
				{ type: "spawn", func: "marker", args: [false, 143, 125, 0, 2533, false, ["safe", "safe"]] }
			]);
		}

		// Right
		if ([1141, 2141].includes(skillid)) {
			handlers.event([
				{ type: "spawn", func: "marker", args: [false, 323, 125, 0, 2533, false, ["safe", "safe"]] },
				{ type: "spawn", func: "marker", args: [false, 217, 125, 0, 2533, false, ["safe", "safe"]] }
			]);
		}
	}

	function start_boss() {
		print = true;
		printend = true;
	}

	function print_th() {
		if (print) {
			handlers.text({
				sub_type: "message",
				message: "Laser (loading)",
				message_RU: "Лазер (зарядка)",
				message_TW: "镭射加载中...."
			});
		}

		print = false;
	}

	function print_end() {
		if (printend) {
			handlers.text({
				sub_type: "message",
				message: "Laser (loading)",
				message_RU: "Лазер (зарядка)",
				message_TW: "镭射加载中...."
			});
			handlers.text({
				sub_type: "message",
				delay: 30000,
				message: "Laser (loading)",
				message_RU: "Лазер (зарядка)",
				message_TW: "镭射加载中...."
			});
		}

		printend = false;
	}

	return {
		// PHASE 1
		"nd-444-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],

		// ---------------------------------------- Not enraged ----------------------------------------
		"s-444-1000-2103-0": [
			{ type: "text", sub_type: "message", message: "Front (Dodge)", message_RU: "Удар вперед (эвейд)", message_TW: "前方（闪）" },
			{ type: "spawn", func: "circle", args: [false, 445, 356, 400, 8, 350, 100, 3000] }
		],
		"s-444-1000-2108-0": [{ type: "text", sub_type: "message", message: "Back Throw | Front", message_RU: "Стан назад | Черенок", message_TW: "丢锤 | 前方" }],
		"s-444-1000-2111-0": [
			{ type: "text", sub_type: "message", message: "Back", message_RU: "Удар назад", message_TW: "后方" },
			{ type: "spawn", func: "circle", args: [false, 445, 180, 500, 8, 480, 100, 2000] }
		],
		"s-444-1000-2113-0": [{ type: "text", sub_type: "message", message: "Throw (Bait)", message_RU: "Молот (байт)", message_TW: "点名砸" }],
		"s-444-1000-2114-0": [
			{ type: "text", sub_type: "message", message: "Front Slam", message_RU: "Удар назад", message_TW: "捶地秒杀" },
			{ type: "spawn", func: "circle", args: [false, 445, 356, 260, 10, 320, 100, 4000] }
		],
		"s-444-1000-2115-0": [{ type: "text", sub_type: "message", delay: 234, message: "Knockup", message_RU: "Черкаш (полет)", message_TW: "右蓄力(击飞)" }],
		"s-444-1000-2116-0": [
			{ type: "text", sub_type: "message", message: "Donuts", message_RU: "Бублики", message_TW: "甜甜圈" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 290, 100, 6000] }
		],
		"s-444-1000-2117-0": [{ type: "text", sub_type: "message", message: "Jump (Bait)", message_RU: "Прыжок (байт)", message_TW: "大跳 (点名)" }],
		"s-444-1000-2118-0": [{ type: "text", sub_type: "message", message: "Jump (Tank)", message_RU: "Прыжок (танк)", message_TW: "大跳(砸坦)" }],
		"s-444-1000-2121-0": [{ type: "text", sub_type: "message", message: "Waves (Left)", message_RU: "Волны (левая)", message_TW: "左半月" }, { type: "func", func: skilld_event, args: [2121] }],
		//
		"s-444-1000-2131-0": [
			{ type: "text", sub_type: "message", message: "Front | Left Scratch", message_RU: "Удар в вперед | Левый черкаш", message_TW: "左 范围(挡) | 后拉" },
			{ type: "spawn", func: "circle", args: [false, 445, 358, 340, 8, 660, 100, 4000] },
			{ type: "spawn", func: "vector", args: [553, 358, 0, 180, 500, 100, 4000] },
			{ type: "spawn", func: "vector", args: [553, 358, 0, 0, 500, 100, 4000] }
		],
		"s-444-1000-2132-0": [
			{ type: "spawn", func: "vector", args: [553, 270, 200, 0, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 270, 200, 180, 500, 0, 2000] }
		],
		//
		"s-444-1000-2137-0": [
			{ type: "text", sub_type: "message", message: "Hammer Back", message_RU: "Удар назад", message_TW: "后砸" },
			{ type: "spawn", func: "circle", args: [false, 445, 180, 500, 8, 480, 100, 2000] }
		],
		"s-444-1000-2138-0": [{ type: "text", sub_type: "message", delay: 234, message: "Knockup (Bait)", message_RU: "Черкаш (полет)", message_TW: "左 蓄力(击飞)" }],
		"s-444-1000-2139-0": [
			{ type: "text", sub_type: "message", message: "Dodge!", message_RU: "Эвейд!", message_TW: "闪避" },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 20, 160, 0, 2000] },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 12, 220, 0, 2000] },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 10, 300, 0, 2000] },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 8, 360, 0, 2000] }
		],
		"s-444-1000-2140-0": [
			{ type: "text", sub_type: "message", message: "Waves (Right)", message_RU: "Волны (правая)", message_TW: "右半月" },
			{ type: "func", func: skilld_event, args: [2140] }
		],

		// ---------------------------------------- Enraged ----------------------------------------
		"s-444-1000-1103-0": [
			{ type: "text", sub_type: "message", message: "Front (Dodge)", message_RU: "Удар вперед (эвейд)", message_TW: "前方(闪)" },
			{ type: "spawn", func: "circle", args: [false, 445, 356, 400, 8, 350, 100, 3000] }
		],
		"s-444-1000-1108-0": [{ type: "text", sub_type: "message", message: "Back Throw | Front", message_RU: "Стан назад | Черенок", message_TW: "丢锤 | 前方" }],
		"s-444-1000-1111-0": [
			{ type: "text", sub_type: "message", message: "Back", message_RU: "Удар назад", message_TW: "后方" },
			{ type: "spawn", func: "circle", args: [false, 445, 180, 500, 8, 480, 100, 2000] }
		],
		"s-444-1000-1113-0": [{ type: "text", sub_type: "message", message: "Throw (Bait)", message_RU: "Молот (байт)", message_TW: "扔锤(点名)" }],
		"s-444-1000-1114-0": [
			{ type: "text", sub_type: "message", message: "Front Slam", message_RU: "Удар назад", message_TW: "锤地(秒杀)" },
			{ type: "spawn", func: "circle", args: [false, 445, 356, 260, 10, 320, 100, 4000] }
		],
		"s-444-1000-1115-0": [{ type: "text", sub_type: "message", delay: 1300, message: "Knockup", message_RU: "Черкаш (полет)", message_TW: "(右蓄力击飞)" }],
		"s-444-1000-1116-0": [
			{ type: "text", sub_type: "message", message: "Donuts", message_RU: "Бублики", message_TW: "甜甜圈" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 290, 100, 6000] }
		],
		"s-444-1000-1117-0": [{ type: "text", sub_type: "message", message: "Jump (Bait)", message_RU: "Прыжок (байт)", message_TW: "随仇 跳劈（击倒）" }],
		"s-444-1000-1118-0": [{ type: "text", sub_type: "message", message: "Jump (Tank)", message_RU: "Прыжок (танк)", message_TW: "主仇 跳劈（击倒）" }],
		"s-444-1000-1121-0": [
			{ type: "text", sub_type: "message", message: "Waves (Left)", message_RU: "Волны (левая)", message_TW: "左（四连半月）" },
			{ type: "func", func: skilld_event, args: [1121] }
		],
		"s-444-1000-1131-0": [
			{ type: "text", sub_type: "message", message: "Front | Left Scratch", message_RU: "Удар вперед | Левый черкаш", message_TW: "左范围（挡后拉）" },
			{ type: "spawn", func: "circle", args: [false, 445, 358, 340, 8, 660, 100, 4000] },
			{ type: "spawn", func: "vector", args: [553, 358, 0, 180, 500, 100, 4000] },
			{ type: "spawn", func: "vector", args: [553, 358, 0, 0, 500, 100, 4000] }
		],
		"s-444-1000-1132-0": [
			{ type: "spawn", func: "vector", args: [553, 270, 200, 0, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 270, 200, 180, 500, 0, 2000] }
		],
		"s-444-1000-1137-0": [
			{ type: "text", sub_type: "message", message: "Hammer Back", message_RU: "Удар назад", message_TW: "后砸" },
			{ type: "spawn", func: "circle", args: [false, 445, 180, 500, 8, 480, 100, 2000] }
		],
		"s-444-1000-1138-0": [{ type: "text", sub_type: "message", delay: 1300, message: "Knockup (Bait)", message_RU: "Черкаш (полет)", message_TW: "左蓄力（击飞）" }],
		"s-444-1000-1139-0": [
			{ type: "text", sub_type: "message", message: "Dodge!", message_RU: "Эвейд!", message_TW: "转圈击倒" },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 20, 160, 0, 2000] },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 12, 220, 0, 2000] },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 10, 300, 0, 2000] },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 8, 360, 0, 2000] }
		],
		"s-444-1000-1140-0": [
			{ type: "text", sub_type: "message", message: "Waves (Right)", message_RU: "Волны (правая)", message_TW: "右（四连半月）" },
			{ type: "func", func: skilld_event, args: [1140] }
		],


		// PHASE 2
		"nd-444-2000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" },
			{ type: "func", func: print_end }
		],
		"ns-444-2000": [
			//{ type: "spawn", func: "vector", args: [542, 0, 0, 0, 3000, 0, 6000000] },
			//{ type: "spawn", func: "vector", args: [542, 0, 0, 180, 3000, 0, 6000000] },
			{ type: "spawn", func: "marker", args: [false, 0, -700, 100, 60000000, false, ["Throne", "Throne Direction"]] },
			{ type: "spawn", func: "point", args: [513, 0, 800, 100, 60000000] },
			{ type: "func", func: start_boss }
		],

		// ---------------------------------------- Not enraged ----------------------------------------
		"s-444-2000-1101-0": [
			{ type: "text", sub_type: "message", message: "4 Hit Combo", message_RU: "270", message_TW: "270（重击）" },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 195, 500, 0, 4000] },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 270, 500, 0, 3000] }
		],
		"s-444-2000-1103-0": [
			{ type: "text", sub_type: "message", message: "Front (Dodge)", message_RU: "Удар вперед (эвейд)", message_TW: "前砸（闪避）" },
			{ type: "spawn", func: "circle", args: [false, 445, 356, 400, 8, 350, 100, 3000] }
		],
		"s-444-2000-1107-0": [{ type: "text", sub_type: "message", message: "4 Hit (3)", message_RU: "4", message_TW: "重击（闪避）" }],
		"s-444-2000-1108-0": [{ type: "text", sub_type: "message", message: "Back Throw | Front", message_RU: "Стан назад | Удар вперед", message_TW: "丢锤（眩晕）" }],
		"s-444-2000-1111-0": [
			{ type: "text", sub_type: "message", message: "Back", message_RU: "Удар назад", message_TW: "后砸（慢慢）" },
			{ type: "spawn", func: "circle", args: [false, 445, 180, 500, 8, 480, 100, 2000] }
		],
		"s-444-2000-1112-0": [
			//{ type: "text", sub_type: "message", message: "Perfect Defense", message_RU: "Идеальный блок" },
			{ type: "text", sub_type: "message", delay: 1240, message: "Perfect Defense", message_RU: "Идеальный блок", message_TW: "完美格挡" },
			//{ type: "text", sub_type: "message", delay: 2040, message: "1" },
			{ type: "spawn", func: "circle", args: [false, 445, 356, 220, 12, 210, 100, 4000] }
		],
		"s-444-2000-1113-0": [{ type: "text", sub_type: "message", message: "Throw (Bait)", message_RU: "Молот (байт)", message_TW: "点名（闪避）" }],
		"s-444-2000-1114-0": [
			{ type: "text", sub_type: "message", message: "Front Slam", message_RU: "Удар назад", message_TW: "捶地（秒杀）" },
			{ type: "spawn", func: "circle", args: [false, 445, 356, 260, 10, 320, 100, 4000] }
		],
		"s-444-2000-1115-0": [{ type: "text", sub_type: "message", delay: 1300, message: "Knockup", message_RU: "Черкаш (полет)", message_TW: "右蓄力（击飞）" }],
		"s-444-2000-1116-0": [
			{ type: "text", sub_type: "message", message: "Donuts", message_RU: "Бублики", message_TW: "甜甜圈" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 290, 100, 6000] }
		],
		"s-444-2000-1117-0": [{ type: "text", sub_type: "message", message: "Jump (Bait)", message_RU: "Прыжок (байт)", message_TW: "随仇 > 跳劈（击倒）" }],
		"s-444-2000-1118-0": [{ type: "text", sub_type: "message", message: "Jump (Tank)", message_RU: "Прыжок (танк)", message_TW: "主仇 > 跳劈（击倒）" }],
		"s-444-2000-1119-0": [
			{ type: "text", sub_type: "message", message: "Left Swipe", message_RU: "Слева", message_TW: "右安全（坦左移）" },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 20, 160, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 12, 220, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 10, 300, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 8, 360, 0, 2000] },
			{ type: "spawn", func: "marker", args: [false, 270, 300, 100, 2000, true, null] }
		],
		"s-444-2000-1120-0": [
			{ type: "text", sub_type: "message", message: "Right Swipe", message_RU: "Справа", message_TW: "左安全（坦右移）" },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 20, 160, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 12, 220, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 10, 300, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 8, 360, 0, 2000] },
			{ type: "spawn", func: "marker", args: [false, 90, 300, 100, 2000, true, null] }
		],
		"s-444-2000-1121-0": [
			{ type: "text", sub_type: "message", message: "Waves (Left)", message_RU: "Волны (левая)", message_TW: "左（四连半月）" },
			{ type: "func", func: skilld_event, args: [1121] }
		],
		"s-444-2000-1122-0": [
			{ type: "text", sub_type: "message", message: "Waves (Left) 3nd fast", message_RU: "Волны (левая) 3-я быстрая", message_TW: "左（3加速）" },
			{ type: "func", func: skilld_event, args: [1122] }
		],
		"s-444-2000-1123-0": [
			{ type: "text", sub_type: "message", message: "Waves (Left) 2nd fast", message_RU: "Волны (левая) 2-я быстрая", message_TW: "左（2加速）" },
			{ type: "func", func: skilld_event, args: [1123] }
		],
		//
		"s-444-2000-1125-0": [
			{ type: "text", sub_type: "message", message: "Front | Right Scratch", message_RU: "Удар вперед | Правый черкаш", message_TW: "右前（闪）后拉" }, 
			{ type: "spawn", func: "circle", args: [false, 445, 356, 400, 8, 350, 100, 3000] },
			{ type: "spawn", func: "vector", args: [553, 356, 0, 180, 500, 100, 3000] },
			{ type: "spawn", func: "vector", args: [553, 356, 0, 0, 500, 100, 3000] }
		],
		"s-444-2000-1126-0": [
			{ type: "spawn", func: "vector", args: [553, 90, 200, 0, 500, 100, 2000] },
			{ type: "spawn", func: "vector", args: [553, 90, 200, 180, 500, 100, 2000] }
		],
		"s-444-2000-1131-0": [
			{ type: "text", sub_type: "message", message: "Front | Left Scratch", message_RU: "Удар вперед | Левый черкаш", message_TW: "左范围（挡）后拉" },
			{ type: "spawn", func: "circle", args: [false, 445, 358, 340, 8, 660, 100, 4000] },
			{ type: "spawn", func: "vector", args: [553, 358, 0, 180, 500, 100, 4000] },
			{ type: "spawn", func: "vector", args: [553, 358, 0, 0, 500, 100, 4000] }
		],
		"s-444-2000-1132-0": [
			{ type: "spawn", func: "vector", args: [553, 270, 200, 0, 500, 100, 2000] },
			{ type: "spawn", func: "vector", args: [553, 270, 200, 180, 500, 100, 2000] }
		],
		//
		"s-444-2000-1135-0": [
			//{ type: "text", sub_type: "message", message: "Perfect Defense", message_RU: "Идеальный блок" },
			{ type: "text", sub_type: "message", delay: 200, message: "Perfect Defense", message_RU: "Идеальный блок", message_TW: "完美格挡" },
			//{ type: "text", sub_type: "message", delay: 1535, message: "1" },
			{ type: "spawn", func: "circle", args: [false, 445, 356, 220, 12, 210, 100, 4000] }
		],
		"s-444-2000-1137-0": [
			{ type: "text", sub_type: "message", message: "Hammer back", message_RU: "Удар назад", message_TW: "后砸" },
			{ type: "spawn", func: "circle", args: [false, 445, 180, 500, 8, 480, 100, 2000] }
		],
		"s-444-2000-1138-0": [{ type: "text", sub_type: "message", delay: 1300, message: "Knockup (Bait)", message_RU: "Черкаш (полет)", message_TW: "左蓄力（击飞）" }],
		"s-444-2000-1139-0": [{ type: "text", sub_type: "message", message: "Dodge!", message_RU: "Эвейд!", message_TW: "转圈（击倒）" }],
		"s-444-2000-1140-0": [
			{ type: "text", sub_type: "message", message: "Waves (Right)", message_RU: "Волны (правая)", message_TW: "右（4连半月）" },
			{ type: "func", func: skilld_event, args: [1140] }
		],
		"s-444-2000-1141-0": [
			{ type: "text", sub_type: "message", message: "Waves (Right) 3nd fast", message_RU: "Волны (правая) 3-я быстрая", message_TW: "右（3加速）" },
			{ type: "func", func: skilld_event, args: [1141] }
		],
		"s-444-2000-1142-0": [
			{ type: "text", sub_type: "message", message: "Waves (Right) 2nd fast", message_RU: "Волны (правая) 2-я быстрая", message_TW: "右（2加速）" },
			{ type: "func", func: skilld_event, args: [1142] }
		],
		"s-444-2000-1307-0": [{ type: "text", sub_type: "message", message: "!", message_RU: "!" },
			{ type: "text", sub_type: "message", delay: 20000, message: "Last aerolite", message_RU: "Последний метеор", message_TW: "陨石结束" }
		],
		"ab-444-2000-90442303": [{ type: "text", sub_type: "message", message: "Plague/Regress", message_RU: "Регресс", message_TW: "补师解王" }],
		"s-444-2000-1308-0": [{ type: "text", sub_type: "message", message: "Stun (1)", message_RU: "Стан (1)" }],
		"s-444-2000-1309-0": [{ type: "text", sub_type: "message", message: "Stun (2)", message_RU: "Стан (2)" }],
		"s-444-2000-1310-0": [{ type: "text", sub_type: "message", message: "Stun (3)", message_RU: "Стан (3)" }],
		"s-444-2000-1311-0": [
			{ type: "text", sub_type: "message", message: "Wrath", message_RU: "Облепиха", message_TW: "补师开盾（击飞）" },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 0, 500, 0, 6000] },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 180, 500, 0, 6000] }
		],
		"s-444-2000-1312-0": [
			{ type: "text", sub_type: "message", message: "Wrath!", message_RU: "Облепиха", message_TW: "补师开盾（击飞）" },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 0, 500, 0, 6000] },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 180, 500, 0, 6000] }
		],

		// ---------------------------------------- Enraged ----------------------------------------
		"s-444-2000-2101-0": [
			{ type: "text", sub_type: "message", message: "4 Hit combo", message_RU: " 270 ", message_TW: "270（重击）" },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 195, 500, 0, 4000] },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 270, 500, 0, 3000] }
		],
		"s-444-2000-2103-0": [
			{ type: "text", sub_type: "message", message: "Front (Dodge)", message_RU: "Удар вперед (эвейд)", message_TW: "前砸（闪避）" },
			{ type: "spawn", func: "circle", args: [false, 445, 356, 400, 8, 350, 100, 3000] }
		],
		"s-444-2000-2107-0": [{ type: "text", sub_type: "message", message: "4 Hit (3)", message_RU: "4", message_TW: "重击（闪避）" }],
		"s-444-2000-2108-0": [{ type: "text", sub_type: "message", message: "Back Throw | Front", message_RU: "Стан назад | Удар вперед", message_TW: "丢锤（眩晕）" }],
		"s-444-2000-2111-0": [
			{ type: "text", sub_type: "message", message: "Back", message_RU: "Удар назад", message_TW: "后砸（慢慢慢）" },
			{ type: "spawn", func: "circle", args: [false, 445, 180, 500, 8, 480, 100, 2000] }
		],
		"s-444-2000-2112-0": [
			//{ type: "text", sub_type: "message", message: "Perfect Defense", message_RU: "Идеальный блок" },
			{ type: "text", sub_type: "message", delay: 2000, message: "Perfect Defense", message_RU: "Идеальный блок", message_TW: "完美格挡" },
			{ type: "text", sub_type: "message", delay: 2700, message: "x2" },
			//{ type: "text", sub_type: "message", delay: 2800, message: "1" },
			//{ type: "text", sub_type: "message", delay: 3690, message: "2" },
			{ type: "spawn", func: "circle", args: [false, 445, 356, 220, 12, 210, 100, 4000] }
		],
		"s-444-2000-2113-0": [{ type: "text", sub_type: "message", message: "Throw (Bait)", message_RU: "Молот (байт)", message_TW: "点名（闪避）" }],
		"s-444-2000-2114-0": [
			{ type: "text", sub_type: "message", message: "Front Slam", message_RU: "Удар назад", message_TW: "捶地（秒杀）" },
			{ type: "spawn", func: "circle", args: [false, 445, 356, 260, 10, 320, 100, 4000] }
		],
		"s-444-2000-2115-0": [{ type: "text", sub_type: "message", delay: 234, message: "Knockup", message_RU: "Черкаш (полет)", message_TW: "右蓄力（击飞）" }],
		"s-444-2000-2116-0": [
			{ type: "text", sub_type: "message", message: "Donuts", message_RU: "Бублики", message_TW: "甜甜圈" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 290, 100, 6000] }
		],
		"s-444-2000-2117-0": [{ type: "text", sub_type: "message", message: "Jump (Bait)", message_RU: "Прыжок (байт)", message_TW: "随仇 > 跳劈（击倒）" }],
		"s-444-2000-2118-0": [{ type: "text", sub_type: "message", message: "Jump (Tank)", message_RU: "Прыжок (танк)", message_TW: "主仇 > 跳劈（击倒）" }],
		"s-444-2000-2119-0": [
			{ type: "text", sub_type: "message", message: "Left Swipe", message_RU: "Слева", message_TW: "右安全（坦左移）" },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 20, 160, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 12, 220, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 10, 300, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 8, 360, 0, 2000] },
			{ type: "spawn", func: "marker", args: [false, 270, 300, 100, 2000, true, null] }
		],
		"s-444-2000-2120-0": [
			{ type: "text", sub_type: "message", message: "Right Swipe", message_RU: "Справа", message_TW: "左安全（坦右移）" },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 20, 160, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 12, 220, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 10, 300, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 8, 360, 0, 2000] },
			{ type: "spawn", func: "marker", args: [false, 90, 300, 100, 2000, true, null] }
		],
		"s-444-2000-2121-0": [
			{ type: "text", sub_type: "message", message: "Waves (Left)", message_RU: "Волны (левая)", message_TW: "左（4连半月）" },
			{ type: "func", func: skilld_event, args: [2121] }
		],
		"s-444-2000-2122-0": [
			{ type: "text", sub_type: "message", message: "Waves (Left) 3nd fast", message_RU: "Волны (левая) 3-я быстрая", message_TW: "左（3加速）" },
			{ type: "func", func: skilld_event, args: [2122] }
		],
		"s-444-2000-2123-0": [
			{ type: "text", sub_type: "message", message: "Waves (Left) 2nd fast", message_RU: "Волны (левая) 2-я быстрая", message_TW: "左（2加速）" },
			{ type: "func", func: skilld_event, args: [2123] }
		],
		//
		"s-444-2000-2125-0": [
			{ type: "text", sub_type: "message", message: "Front | Right Scratch", message_RU: "Удар вперед | Правый черкаш", message_TW: "右前（闪）后拉" },
			{ type: "spawn", func: "circle", args: [false, 445, 356, 400, 8, 350, 100, 3000] },
			{ type: "spawn", func: "vector", args: [553, 356, 0, 180, 500, 100, 3000] },
			{ type: "spawn", func: "vector", args: [553, 356, 0, 0, 500, 100, 3000] }
		],
		"s-444-2000-2126-0": [
			{ type: "spawn", func: "vector", args: [553, 90, 200, 0, 500, 100, 2000] },
			{ type: "spawn", func: "vector", args: [553, 90, 200, 180, 500, 100, 2000] }
		],
		"s-444-2000-2131-0": [
			{ type: "text", sub_type: "message", message: "Front | Left Scratch", message_RU: "Удар вперед | Левый черкаш", message_TW: "左前（闪）后拉" },
			{ type: "spawn", func: "circle", args: [false, 445, 358, 340, 8, 660, 100, 4000] },
			{ type: "spawn", func: "vector", args: [553, 358, 0, 180, 500, 100, 4000] },
			{ type: "spawn", func: "vector", args: [553, 358, 0, 0, 500, 100, 4000] }
		],
		"s-444-2000-2132-0": [
			{ type: "spawn", func: "vector", args: [553, 270, 200, 0, 500, 100, 2000] },
			{ type: "spawn", func: "vector", args: [553, 270, 200, 180, 500, 100, 2000] }
		],
		//
		"s-444-2000-2135-0": [
			//{ type: "text", sub_type: "message", message: "Perfect Defense", message_RU: "Идеальный блок" },
			{ type: "text", sub_type: "message", delay: 200, message: "Perfect Defense", message_RU: "Идеальный блок", message_TW: "完美格挡" },
			{ type: "text", sub_type: "message", delay: 1535, message: "x2" },
			//{ type: "text", sub_type: "message", delay: 1535, message: "1" },
			//{ type: "text", sub_type: "message", delay: 2535, message: "2" },
			{ type: "spawn", func: "circle", args: [false, 445, 356, 220, 12, 210, 100, 4000] }
		],
		"s-444-2000-2137-0": [
			{ type: "text", sub_type: "message", message: "Hammer back", message_RU: "Удар назад", message_TW: "后砸" },
			{ type: "spawn", func: "circle", args: [false, 445, 180, 500, 8, 480, 100, 2000] }
		],
		"s-444-2000-2138-0": [{ type: "text", sub_type: "message", delay: 234, message: "Knockup (Bait)", message_RU: "Черкаш (полет)", message_TW: "左蓄力（击飞）" }],
		"s-444-2000-2139-0": [{ type: "text", sub_type: "message", message: "Dodge!", message_RU: "Эвейд!", message_TW: "转圈（击倒）" }],
		"s-444-2000-2140-0": [
			{ type: "text", sub_type: "message", message: "Waves (Right)", message_RU: "Волны (правая)", message_TW: "右（4连半月）" },
			{ type: "func", func: skilld_event, args: [2140] }
		],
		"s-444-2000-2141-0": [
			{ type: "text", sub_type: "message", message: "Waves (Right) 3nd fast", message_RU: "Волны (правая) 3-я быстрая", message_TW: "右（3加速）" },
			{ type: "func", func: skilld_event, args: [2141] }
		],
		"s-444-2000-2142-0": [
			{ type: "text", sub_type: "message", message: "Waves (Right) 2nd fast", message_RU: "Волны (правая) 2-я быстрая", message_TW: "右（2加速）" },
			{ type: "func", func: skilld_event, args: [2142] }
		],

		"ab-444-2000-90442000": [{ type: "func", func: skilld_event, args: [90442000] }],
		"ab-444-2000-90442001": [{ type: "func", func: skilld_event, args: [90442001] }],
		"ab-444-2000-90442304": [{ type: "func", func: skilld_event, args: [90442304] }],
		"ab-444-2000-90444001": [{ type: "func", func: skilld_event, args: [90444001] }],
		"s-444-2500-1201-0": [{ type: "func", func: print_th }],
		"s-444-2500-1305-0": [
			{ type: "func", func: skilld_event, args: [305] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 0, 3000, 0, 4000] }
		]
	};
};