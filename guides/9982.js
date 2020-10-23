// Grotto of Lost Souls (Hard)
//
// made by michengs

module.exports = (dispatch, handlers, guide, lang) => {
	let power = true;
	let Level = 0;
	let powerMsg = null;
	let notice = true;
	let steptwo = false;

	function start_boss() {
		power = false;
		Level = 0;
		notice = true;
		powerMsg = null;
		steptwo = false;
	}

	function skilld_event(skillid) {
		if (!notice) return;

		if (notice && [118, 139, 141, 150, 152].includes(skillid)) {
			notice = false;
			dispatch.setTimeout(() => notice = true, 4000);
		}

		if (skillid === 300) {
			power = true;
			Level = 0;
			powerMsg = null;
		}

		if (skillid === 360 || skillid === 399)
			Level = 0;

		if (power && [118, 143, 145, 146, 144, 147, 148, 154, 155, 161, 162, 213, 215].includes(skillid)) {
			Level++;
			powerMsg = `{${Level}}`;

			if (Level == 4) {
				handlers.text({
					sub_type: "message",
					message_RU: "Полностью заряжен!",
					message: "Fully charged!",
				    message_TW: "电量填充完毕!!"
				});
				handlers.text({
					sub_type: "alert",
					message_RU: "Полностью заряжен!",
					message: "Fully charged!",
				    message_TW: "电量填充完毕!!"
				});

			} else if (Level == 2 && steptwo) {
				handlers.text({
					sub_type: "message",
					message_RU: "Полностью заряжен!",
					message: "Fully charged!!",
				    message_TW: "电量填充完毕!!"
				});
				handlers.text({
					sub_type: "alert",
					message_RU: "Полностью заряжен!",
					message: "Fully charged!",
				    message_TW: "电量填充完毕!!"
				});
			}

			if (powerMsg !== null && skillid !== 399) {
				if (!steptwo && Level !== 4) {
					handlers.text({
						sub_type: "message",
						message_RU: powerMsg,
						message: powerMsg
					});
				}

				if (steptwo && Level !== 2) {
					handlers.text({
						sub_type: "message",
						message_RU: powerMsg,
						message: powerMsg
					});
				}
			}
		}

		if (skillid === 399)
			steptwo = true;
	}

	return {
		// 1 BOSS
		"nd-982-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-982-1000-106-0": [{ type: "text", class_position: "tank", sub_type: "message", message: "重击", message_RU: "Тяжелый удар", message_TW: "重击" }],
		"s-982-1000-107-0": [
			{ type: "text", class_position: "dps", sub_type: "message", message: "后扫", message_RU: "Откид (конус)", message_TW: "后喷击退" },
			{ type: "text", class_position: "heal", sub_type: "message", message: "后扫 (Kaia)", message_RU: "Откид (кайя)", message_TW: "后喷击退" }
		],
		"s-982-1000-108-0": [{ type: "text", sub_type: "message", message: "Bait (Flying)", message_RU: "Байт (подлет)", message_TW: "点名击飞" }, ],
		"s-982-1000-109-0": [{ type: "text", sub_type: "message", message: "滚石 (Small)", message_RU: "Камни (малые)", message_TW: "滚石" }],
		"s-982-1000-110-0": [{ type: "text", sub_type: "message", message: "滚石 (Large)", message_RU: "Камни (большие)", message_TW: "滚石" }],
		"s-982-1000-301-0": [{ type: "text", sub_type: "message", message: "Flower Stuns", message_RU: "Оглушающие цветы", message_TW: "食人花眩晕" }],
		"s-982-1000-307-0": [{ type: "text", sub_type: "message", message: "Cage", message_RU: "Клетка", message_TW: "笼子禁锢" }],
		"s-982-1000-309-0": [{ type: "text", sub_type: "message", message: "1 Flower", message_RU: "1 цветок!", message_TW: "1朵花" }],
		"s-982-1000-310-0": [{ type: "text", sub_type: "message", message: "2 Flower", message_RU: "2 цветка!", message_TW: "2朵花" }],
		"s-982-1000-116-0": [{ type: "text", sub_type: "message", message: "Big AoE Attack!", message_RU: "AOE!!", message_TW: "全屏攻击" }],
		"s-982-1000-312-0": [{ type: "text", sub_type: "message", message: "Golden Flower!", message_RU: "Золотой цветок!!", message_TW: "金色花" }],

		// 2 BOSS
		"nd-982-2000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-982-2000-105-0": [{ type: "text", sub_type: "message", message: "Spin", message_RU: "Кувырок", message_TW: "翻滚" }],
		"s-982-2000-113-0": [{ type: "text", sub_type: "message", message: "Stun Inc", message_RU: "Стан", message_TW: "双手眩晕" }],
		"s-982-2000-114-0": [
			{ type: "text", sub_type: "message", message: "Get In", message_RU: "К нему", message_TW: "靠近" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 15, 260, 0, 3000] }
		],
		"s-982-2000-116-0": [
			{ type: "text", sub_type: "message", message: "Front then Back", message_RU: "Вперед | Назад", message_TW: "前后砸" },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 270, 500, 0, 5000] },
			{ type: "spawn", func: "vector", args: [553, 180, 0, 90, 500, 0, 5000] }
		],
		"s-982-2000-301-0": [
			{ type: "text", sub_type: "message", message: "Get Out + Dodge", message_RU: "От него | Эвейд", message_TW: "远离 + 闪避" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 15, 260, 0, 3000] }
		],
		"s-982-2000-302-0": [
			{ type: "text", sub_type: "message", message: "Get In + Dodge", message_RU: "К нему | Эвейд", message_TW: "靠近 + 闪避" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 15, 260, 0, 3000] }
		],

		// 3 БОСС
		"nd-982-3000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"h-982-3000-99": [{ type: "func", func: start_boss }],
		"h-982-3000-30": [{ type: "text", sub_type: "message", message: "30%", message_RU: "30%" }],
		"s-982-3000-118-0": [
			{ type: "text", sub_type: "message", message: "Front Triple", message_RU: "Передняя комба", message_TW: "三连击" },
			{ type: "func", func: skilld_event, args: [118] }
		],
		"s-982-3000-143-0": [
			{ type: "text", sub_type: "message", message: "Left Rear", message_RU: "Слева сзади", message_TW: "左后" },
			{ type: "func", func: skilld_event, args: [143] }
		],
		"s-982-3000-145-0": [
			{ type: "text", sub_type: "message", message: "Left Rear", message_RU: "Слева сзади", message_TW: "左后" },
			{ type: "func", func: skilld_event, args: [145] }
		],
		"s-982-3000-146-0": [
			{ type: "text", sub_type: "message", message: "Left Rear (Pulses)", message_RU: "Слева сзади (бублик)", message_TW: "左后扩散" },
			{ type: "spawn", func: "marker", args: [false, 215, 370, 0, 8000, true, null] },
			{ type: "spawn", func: "circle", args: [false, 445, 215, 370, 15, 160, 2500, 8000] },
			{ type: "spawn", func: "circle", args: [false, 445, 215, 370, 12, 320, 2500, 8000] },
			{ type: "spawn", func: "circle", args: [false, 445, 215, 370, 10, 480, 2500, 8000] },
			{ type: "spawn", func: "circle", args: [false, 445, 215, 370, 8, 640, 2500, 8000] },
			{ type: "spawn", func: "circle", args: [false, 445, 215, 370, 6, 800, 2500, 8000] },
			{ type: "func", func: skilld_event, args: [146] }
		],
		"s-982-3000-154-0": [
			{ type: "text", sub_type: "message", message: "Left Rear (Pulses)", message_RU: "Слева сзади (бублик)", message_TW: "左后扩散" },
			{ type: "spawn", func: "marker", args: [false, 215, 370, 0, 8000, true, null] },
			{ type: "spawn", func: "circle", args: [false, 445, 215, 370, 15, 160, 2500, 8000] },
			{ type: "spawn", func: "circle", args: [false, 445, 215, 370, 12, 320, 2500, 8000] },
			{ type: "spawn", func: "circle", args: [false, 445, 215, 370, 10, 480, 2500, 8000] },
			{ type: "spawn", func: "circle", args: [false, 445, 215, 370, 8, 640, 2500, 8000] },
			{ type: "spawn", func: "circle", args: [false, 445, 215, 370, 6, 800, 2500, 8000] },
			{ type: "func", func: skilld_event, args: [154] } 
		],
		"s-982-3000-144-0": [
			{ type: "text", sub_type: "message", message: "Right Rear", message_RU: "Справа сзади", message_TW: "右后" },
			{ type: "func", func: skilld_event, args: [144] }
		],
		"s-982-3000-147-0": [
			{ type: "text", sub_type: "message", message: "Right Rear", message_RU: "Справа сзади", message_TW: "右后" },
			{ type: "func", func: skilld_event, args: [147] }
		],
		"s-982-3000-148-0": [
			{ type: "text", sub_type: "message", message: "Right Rear (Pulses)", message_RU: "Справа сзади (бублик)", message_TW: "右后扩散" },
			{ type: "spawn", func: "marker", args: [false, 155, 388, 0, 8000, true, null] }, 
			{ type: "spawn", func: "circle", args: [false, 445, 155, 388, 15, 160, 2500, 8000] },
			{ type: "spawn", func: "circle", args: [false, 445, 155, 388, 12, 320, 2500, 8000] },
			{ type: "spawn", func: "circle", args: [false, 445, 155, 388, 10, 480, 2500, 8000] },
			{ type: "spawn", func: "circle", args: [false, 445, 155, 388, 8, 640, 2500, 8000] },
			{ type: "spawn", func: "circle", args: [false, 445, 155, 388, 6, 800, 2500, 8000] },
			{ type: "func", func: skilld_event, args: [148] }
		],
		"s-982-3000-155-0": [
			{ type: "text", sub_type: "message", message: "Right Rear (Pulses)", message_RU: "Справа сзади (бублик)", message_TW: "右后扩散" },
			{ type: "spawn", func: "marker", args: [false, 155, 388, 0, 8000, true, null] }, 
			{ type: "spawn", func: "circle", args: [false, 445, 155, 388, 15, 160, 2500, 8000] },
			{ type: "spawn", func: "circle", args: [false, 445, 155, 388, 12, 320, 2500, 8000] },
			{ type: "spawn", func: "circle", args: [false, 445, 155, 388, 10, 480, 2500, 8000] },
			{ type: "spawn", func: "circle", args: [false, 445, 155, 388, 8, 640, 2500, 8000] },
			{ type: "spawn", func: "circle", args: [false, 445, 155, 388, 6, 800, 2500, 8000] },
			{ type: "func", func: skilld_event, args: [155] }
		],
		"s-982-3000-161-0": [
			{ type: "text", sub_type: "message", message: "Back then Front", message_RU: "Назад | Вперед", message_TW: "后砸 前砸" },
			{ type: "func", func: skilld_event, args: [161] }
		],
		"s-982-3000-162-0": [
			{ type: "text", sub_type: "message", message: "Back then Front", message_RU: "Назад | Вперед", message_TW: "后砸 前砸" },
			{ type: "func", func: skilld_event, args: [162] }
		],
		"s-982-3000-213-0": [
			{ type: "text", sub_type: "message", message: "Tail", message_RU: "Хвост!", message_TW: "尾巴" },
			{ type: "func", func: skilld_event, args: [213] }
		],
		"s-982-3000-215-0": [
			{ type: "text", sub_type: "message", message: "Tail!", message_RU: "Хвост!", message_TW: "尾巴" },
			{ type: "func", func: skilld_event, args: [215] }
		],
		"s-982-3000-139-0": [
			{ type: "text", sub_type: "message", message: "Left Safe", message_RU: "Лево сейф", message_TW: "左安全" },
			{ type: "spawn", func: "vector", args: [912, 90, 0, 0, 500, 0, 5000] },
			{ type: "spawn", func: "vector", args: [912, 270, 0, 180, 500, 0, 5000] },
			{ type: "spawn", func: "marker", args: [false, 270, 200, 0, 8000, true, null] },
			{ type: "func", func: skilld_event, args: [139] }
		],
		"s-982-3000-150-0": [
			{ type: "text", sub_type: "message", message: "Left Safe", message_RU: "Лево сейф", message_TW: "左安全" },
			{ type: "spawn", func: "vector", args: [912, 90, 0, 0, 500, 0, 5000] },
			{ type: "spawn", func: "vector", args: [912, 270, 0, 180, 500, 0, 5000] },
			{ type: "spawn", func: "marker", args: [false, 270, 200, 0, 8000, true, null] },
			{ type: "func", func: skilld_event, args: [150] }
		],
		"s-982-3000-141-0": [
			{ type: "text", sub_type: "message", message: "Right Safe", message_RU: "Право сейф", message_TW: "右安全" },
			{ type: "spawn", func: "vector", args: [912, 90, 0, 0, 500, 0, 5000] },
			{ type: "spawn", func: "vector", args: [912, 270, 0, 180, 500, 0, 5000] },
			{ type: "spawn", func: "marker", args: [false, 90, 200, 0, 8000, true, null] },
			{ type: "func", func: skilld_event, args: [141] }
		],
		"s-982-3000-152-0": [
			{ type: "text", sub_type: "message", message: "Right Safe", message_RU: "Право сейф", message_TW: "右安全" },
			{ type: "spawn", func: "vector", args: [912, 90, 0, 0, 500, 0, 5000] },
			{ type: "spawn", func: "vector", args: [912, 270, 0, 180, 500, 0, 5000] },
			{ type: "spawn", func: "marker", args: [false, 90, 200, 0, 8000, true, null] },
			{ type: "func", func: skilld_event, args: [152] }
		],
		"s-982-3000-300-0": [
			{ type: "text", sub_type: "message", message: "Dodge! (Awakening 1)", message_RU: "Эвейд! (пробуждение 1)", message_TW: "一次觉醒(推人)" },
			{ type: "func", func: skilld_event, args: [300] }
		],
		"s-982-3000-399-0": [
			{ type: "text", sub_type: "message", message: "Dodge! (Awakening 2)", message_RU: "Эвейд! (пробуждение 2)", message_TW: "二次觉醒(推人)" },
			{ type: "func", func: skilld_event, args: [399] }
		],
		"s-982-3000-360-0": [
			{ type: "text", sub_type: "message", message: "Explosion!", message_RU: "Взрыв!", message_TW: "爆炸" },
			{ type: "func", func: skilld_event, args: [360] }
		]
	};
};