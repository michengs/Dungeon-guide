// Corrupted Skynest (Hard)
//
// made by michengs / HSDN / ZC

module.exports = (dispatch, handlers, guide, lang) => {
	guide.type = SP;

	const { player } = dispatch.require.library;
	const { MARKER_ITEM } = module.parent.exports.spawn;

	let debuff = null;
	let timer1 = null;
	let timer2 = null;
	let timer3 = null;
	let boss_ent = null;
	let boss_offset = 0;
	let qbacting = null;
	let blue = false;
	let red = false;
	let debuff_tracker_started = false;

	const mech_messages = {
		0: { message: "IN", message_RU: "К НЕМУ", message_TW: "进" },
		1: { message: "OUT", message_RU: "ОТ НЕГО", message_TW: "出" },
		2: { message: "Left", message_RU: "Лево", message_TW: "左" },
		3: { message: "Right", message_RU: "Право", message_TW: "右" }
	};

	const qbacting_messages = {
		0: { message: "different", message_RU: "разные", message_TW: "不同" },
		1: { message: "same", message_RU: "одинаковые", message_TW: "相同" }
	};

	const debuff_messages = {
		0: { message: "Ready to get Fire debuff", message_RU: "Готовность к переключению на Огонь", message_TW: "准备吃火" },
		1: { message: "Ready to get Ice debuff", message_RU: "Готовность к переключению на Лед", message_TW: "准备吃冰" }
	};

	// NULL % 2 = 0
	//    1 % 2 = 1
	//    0 % 2 = 0
	//    2 % 2 = 0

	function spawn_marker(out) {
		if (!boss_ent) return;

		let distance = 220;
		let caption = "IN";

		if (out) {
			distance = 620;
			caption = "OUT";
		}

		handlers.event([
			{ type: "spawn", func: "marker", args: [false, 45 + boss_offset, distance, 0, 4000, true, [caption, "SAFE"]] },
			{ type: "spawn", func: "marker", args: [false, 135 + boss_offset, distance, 0, 4000, true, [caption, "SAFE"]] },
			{ type: "spawn", func: "marker", args: [false, 225 + boss_offset, distance, 0, 4000, true, [caption, "SAFE"]] },
			{ type: "spawn", func: "marker", args: [false, 315 + boss_offset, distance, 0, 4000, true, [caption, "SAFE"]] }
		], boss_ent);
	}

	function debuff_added(id) {
		debuff_removed();
		debuff = id; // debuff event id

		timer1 = dispatch.setTimeout(() => {
			if (debuff != null) {
				dispatch.setTimeout(() => {
					handlers.text({
						sub_type: "alert",
						message: (`${debuff_messages[debuff % 2].message}`),
						message_RU: (`${debuff_messages[debuff % 2].message_RU}`),
						message_TW: (`${debuff_messages[debuff % 2].message_TW}`)
					});
				}, 2000);
				handlers.text({
					sub_type: "message",
					message: "Warning! Debuff 15 seconds",
					message_RU: "Дебафф 15 сек.",
					message_TW: "Debuff 15 s."
				});
			}
		}, 40000);

		timer2 = dispatch.setTimeout(() => {
			if (debuff != null) {
				handlers.text({
					sub_type: "message",
					message: "Warning! Debuff 10 seconds",
					message_RU: "Дебафф 10 сек.",
					message_TW: "Debuff 10 s."
				});
			}
		}, 45000);

		timer3 = dispatch.setTimeout(() => {
			if (debuff != null) {
				handlers.text({
					sub_type: "message",
					message: "Warning! Debuff 5 seconds",
					message_RU: "Дебафф 5 сек.",
					message_TW: "Debuff 5 s."
				});
			}
		}, 50000);

		if (blue) {
			handlers.text({
				sub_type: "message",
				message: (`${mech_messages[(qbacting + debuff + 1) % 2].message}`),
				message_RU: (`${mech_messages[(qbacting + debuff + 1) % 2].message_RU}`),
				message_TW: (`${mech_messages[(qbacting + debuff + 1) % 2].message_TW}`)
			});

			spawn_marker((qbacting + debuff + 1) % 2);
		} else if (red) {
			handlers.text({
				sub_type: "message",
				message: (`${mech_messages[(qbacting + debuff) % 2].message}`),
				message_RU: (`${mech_messages[(qbacting + debuff) % 2].message_RU}`),
				message_TW: (`${mech_messages[(qbacting + debuff) % 2].message_TW}`)
			});

			spawn_marker((qbacting + debuff) % 2);
		}
	}

	function debuff_removed() {
		debuff = null;
		dispatch.clearTimeout(timer1);
		dispatch.clearTimeout(timer2);
		dispatch.clearTimeout(timer3);
	}

	function skilld_event(skillid, ent) {
		const abnormality_change = (added, event) => {
			// Fire/Ice debuff
			if (player.isMe(event.target.toString()) && [30260001, 30260002, 31260001, 31260002].includes(event.id)) {
				if (added) {
					debuff_added(event.id);
				} else {
					debuff_removed();
				}
			}

			// Argon Priest Essence buff
			if (player.isMe(event.target.toString()) && [30261701, 31261701].includes(event.id)) {
				if (added && boss_ent) {
					handlers.spawn({ // spawn teleport mark
						sub_type: "item",
						id: MARKER_ITEM,
						sub_delay: 50000,
						pos: {
							x: 53192,
							y: 100761,
							z: 14233
						}
					}, boss_ent);
				}
			}
		};

		// In-Out quest balloons (qbacting => ярость 0, ужас 1)
		if ([3026004, 3126004, 3026005, 3126005].includes(skillid)) {
			qbacting = skillid % 2;
		}

		// Fire/Ice debuff (debuff % 2 => синий 0, красный 1)
		if ([30260001, 31260001, 30260002, 31260002].includes(skillid) && !debuff_tracker_started) {
			debuff_added(skillid);
		}

		// In-Out identification
		if ([212, 213, 214, 215].includes(skillid)) {
			boss_ent = ent;

			handlers.event([
				{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 8, 440, 200, 11000] },
				{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 4, 840, 200, 11000] }
			]);
		}

		if ([212, 214].includes(skillid)) { // Fire claw (141,  142)
			boss_offset = 10;

			handlers.event([
				{ type: "spawn", func: "vector", args: [553, 0, 0, 190, 840, 200, 11000] },
				{ type: "spawn", func: "vector", args: [553, 0, 0, 10, 840, 200, 11000] }
			]);
		}

		if ([213, 215].includes(skillid)) { // Ice claw (143,  144)
			boss_offset = -10;

			handlers.event([
				{ type: "spawn", func: "vector", args: [553, 0, 0, 170, 840, 200, 11000] },
				{ type: "spawn", func: "vector", args: [553, 0, 0, 350, 840, 200, 11000] }
			]);
		}

		if ([213, 214].includes(skillid)) { // Ice inside
			dispatch.setTimeout(() => {
				if (debuff != null) {
					handlers.text({
						sub_type: "message",
						message: (`Ice inside (${qbacting_messages[qbacting].message}) | ${mech_messages[debuff % 2 + 2].message} | ${mech_messages[(qbacting + debuff + 1) % 2].message}`),
						message_RU: (`Внутри лед (${qbacting_messages[qbacting].message_RU}) | ${mech_messages[debuff % 2 + 2].message_RU} | ${mech_messages[(qbacting + debuff + 1) % 2].message_RU}`),
						message_TW: (`Внутри лед (${qbacting_messages[qbacting].message_TW}) | ${mech_messages[debuff % 2 + 2].message_TW} | ${mech_messages[(qbacting + debuff + 1) % 2].message_TW}`)
					});

					spawn_marker((qbacting + debuff + 1) % 2);
				} else {
					handlers.text({
						sub_type: "message",
						message: (`Ice inside (${qbacting_messages[qbacting].message})`),
						message_RU: (`Внутри лед (${qbacting_messages[qbacting].message_RU})`),
						message_TW: (`Внутри лед (${qbacting_messages[qbacting].message_TW})`)
					});
				}
			}, 500);

			blue = true;
			red = false;

			dispatch.setTimeout(() => {
				blue = false;
				red = true;
			}, 6600);

			dispatch.setTimeout(() => red = false, 9400);
		}

		if ([212, 215].includes(skillid)) { // Fire inside
			dispatch.setTimeout(() => {
				if (debuff != null) {
					handlers.text({
						sub_type: "message",
						message: (`Fire inside (${qbacting_messages[qbacting].message}) | ${mech_messages[debuff % 2 + 2].message} | ${mech_messages[(qbacting + debuff) % 2].message}`),
						message_RU: (`Внутри огонь (${qbacting_messages[qbacting].message_RU}) | ${mech_messages[debuff % 2 + 2].message_RU} | ${mech_messages[(qbacting + debuff) % 2].message_RU}`),
						message_TW: (`Внутри огонь (${qbacting_messages[qbacting].message_TW}) | ${mech_messages[debuff % 2 + 2].message_TW} | ${mech_messages[(qbacting + debuff) % 2].message_TW}`)
					});

					spawn_marker((qbacting + debuff) % 2);
				} else {
					handlers.text({
						sub_type: "message",
						message: (`Fire inside (${qbacting_messages[qbacting].message})`),
						message_RU: (`Внутри огонь (${qbacting_messages[qbacting].message_RU})`),
						message_TW: (`Внутри огонь (${qbacting_messages[qbacting].message_TW})`)
					});
				}
			}, 500);

			blue = false;
			red = true;

			dispatch.setTimeout(() => {
				blue = true;
				red = false;
			}, 6600);

			dispatch.setTimeout(() => blue = false, 9400);
		}

		if (!debuff_tracker_started) {
			dispatch.hook("S_ABNORMALITY_BEGIN", 4, abnormality_change.bind(null, true));
			dispatch.hook("S_ABNORMALITY_END", 1, abnormality_change.bind(null, false));

			debuff_tracker_started = true;
		}
	}

	const skills = {
		"112-0": [{ type: "text", sub_type: "message", message: "Ice DOT", message_RU: "Лед (полоса)", message_TW: "冰" }],
		"110-0": [{ type: "text", sub_type: "message", message: "Fire DOT", message_RU: "Огонь (лужа)", message_TW: "火" }],
		"108-0": [
			{ type: "text", sub_type: "message", message: "Turn Right (Repel)", message_RU: "Поворот вправо (откид)", message_TW: "右转(击退)" },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 8, 440, 0, 2000] }
		],
		"158-0": [
			{ type: "text", sub_type: "message", message: "Turn Right (Repel)", message_RU: "Поворот вправо (откид)", message_TW: "右转(击退)" },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 8, 440, 0, 2000] }
		],
		"109-0": [
			{ type: "text", sub_type: "message", message: "Turn Left (Repel)", message_RU: "Поворот влево (откид)", message_TW: "左转(击退)" },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 8, 440, 0, 2000] }
		],
		"159-0": [
			{ type: "text", sub_type: "message", message: "Turn Left (Repel)", message_RU: "Поворот влево (откид)", message_TW: "左转(击退)" },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 8, 440, 0, 2000] }
		],
		"120-0": [{ type: "text", sub_type: "message", message: "Together", message_RU: "Яростный рев", message_TW: "集中" }],
		"145-0": [{ type: "text", sub_type: "message", message: "Stun", message_RU: "Стан", message_TW: "晕" }],
		"157-0": [{ type: "text", sub_type: "message", message: "Change", message_RU: "Смена", message_TW: "交换" }],
		"103-0": [
			{ type: "text", sub_type: "message", message: "尾巴(击飞)", message_RU: "Хвост (полет)" },
			{ type: "text", sub_type: "message", message: "Arise!", message_RU: "Удочка!", delay: 1500, class_position: "priest" },
			{ type: "spawn", func: "semicircle", args: [140, 260, 912, 0, 0, 10, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 135, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 260, 500, 0, 2000] }
		],
		"153-0": [
			{ type: "text", sub_type: "message", message: "Tail (Flying)", message_RU: "Хвост (полет)", message_TW: "尾巴(击飞)" },
			{ type: "text", sub_type: "message", message: "Arise!", message_RU: "Удочка!", message_TW: "拉人", delay: 1500, class_position: "priest" },
			{ type: "spawn", func: "semicircle", args: [140, 260, 912, 0, 0, 10, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 135, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 260, 500, 0, 2000] }
		],
		"114-0": [{ type: "text", sub_type: "message", message: "Front Fire", message_RU: "Огонь впереди", message_TW: "前方 火" }],
		"118-0": [{ type: "text", sub_type: "message", message: "Jump", message_RU: "Прыжок", message_TW: "跳" }],
		"118-1": [{ type: "text", sub_type: "message", message: "Dodge", message_RU: "Эвейд!", message_TW: "闪避" }],

		// AOE лед (большой)
		"104-0": [
			{ type: "text", sub_type: "message", message: "Ice Storm DOTs", message_RU: "Ледяные лужи", message_TW: "冰风暴持续" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 500, 0, 5000] }
		],
		// AOE огонь (большой)
		"105-0": [{ type: "text", sub_type: "message", message: "Fire Bombs", message_RU: "Огненные бомбы", message_TW: "炸弹"  },
			{ type: "spawn", func: "circle", args: [false, 553, 135, 500, 10, 270, 0, 3000] },
			{ type: "spawn", func: "circle", args: [false, 553, 315, 500, 10, 270, 0, 3250] },
			{ type: "spawn", func: "circle", args: [false, 553, 45, 500, 10, 270, 0, 3500] },
			{ type: "spawn", func: "circle", args: [false, 553, 235, 500, 10, 270, 0, 3750] },
			{ type: "spawn", func: "circle", args: [false, 553, 90, 500, 10, 270, 0, 4000] },
			{ type: "spawn", func: "circle", args: [false, 553, 270, 500, 10, 270, 0, 4250] },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 500, 10, 270, 0, 4500] },
			{ type: "spawn", func: "circle", args: [false, 553, 180, 500, 10, 270, 0, 4750] }
		],
		// AOE лед (малый)
		"154-0": [{ type: "text", sub_type: "message", message: "Ice Storm", message_RU: "Ледяной шторм", message_TW: "冰风暴"  }, { type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 500, 0, 6000] }],
		// AOE огонь (малый)
		"155-0": [{ type: "text", sub_type: "message", message: "Fire (Knockdown)", message_RU: "Огненный столб (опрокид)", message_TW: "火焰(击倒)" },
			{ type: "text", sub_type: "message", delay: 1200, message: "Dodge", message_RU: "Эвейд", message_TW: "闪避" }
		],

		"206-0": [{ type: "text", sub_type: "message", message: "Jump Back", message_RU: "Прыжок назад", message_TW: "后跳" }],
		"206-2": [{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 15, 350, 0, 3000] }],
		"137-0": [{ type: "text", sub_type: "message", message: "Knockdown", message_RU: "Опрокидывание", message_TW: "击倒" }],
		"138-0": [{ type: "text", sub_type: "message", message: "AOE", message_RU: "AOE" },{ type: "text", sub_type: "message", delay: 2000,  message_TW: "闪避" }],
		"139-0": [
			{ type: "text", sub_type: "message", message: "60 degrees (Fire to all)", message_RU: "60° (Огонь всем)", message_TW: "温度60" },
			{ type: "text", sub_type: "message", delay: 4000, message: "Lower the temp", message_RU: "Снизить температуру", message_TW: "降温" }
		],
		"140-0": [
			{ type: "text", sub_type: "message", message: "40 degrees (Ice to all)", message_RU: "40° (Лед всем)", message_TW: "温度40" },
			{ type: "text", sub_type: "message", delay: 4000, message: "Raise the temp", message_RU: "Повысить температуру", message_TW: "升温" }
		],

		"die": [{ type: "func", func: debuff_removed }],
		"nd-3126-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-3126-1000-1212-0": [{ type: "func", func: skilld_event, args: [212] }],
		"s-3126-1000-1215-0": [{ type: "func", func: skilld_event, args: [215] }],
		"s-3126-1000-1213-0": [{ type: "func", func: skilld_event, args: [213] }],
		"s-3126-1000-1214-0": [{ type: "func", func: skilld_event, args: [214] }],
		"qb-3126-1000-3026005": [{ type: "func", func: skilld_event, args: [3026005] }], // ужас, одинаковые цвета
		"qb-3126-1000-3026004": [{ type: "func", func: skilld_event, args: [3026004] }], // ярость, разные цвета
		"qb-3126-1000-3126005": [{ type: "func", func: skilld_event, args: [3126005] }], // ужас, одинаковые цвета
		"qb-3126-1000-3126004": [{ type: "func", func: skilld_event, args: [3126004] }], // ярость, разные цвета
		"am-3126-1000-30260001": [{ type: "func", func: skilld_event, args: [30260001] }], // красный
		"am-3126-1000-30260002": [{ type: "func", func: skilld_event, args: [30260002] }], // синий
		"am-3126-1000-31260001": [{ type: "func", func: skilld_event, args: [31260001] }], // красный
		"am-3126-1000-31260002": [{ type: "func", func: skilld_event, args: [31260002] }], // синий

		"s-3126-1000-1107-0": [{ type: "text", sub_type: "message", message: "[Debuff] Farthest", message_RU: "[Дебафф] Дальние", message_TW: "注视最远" }],
		"s-3126-1000-2107-0": [{ type: "text", sub_type: "message", message: "[Debuff] Closest", message_RU: "[Дебафф] Ближние", message_TW: "注视最近" }],
		"am-3126-1000-31260251": [{ type: "text", sub_type: "message", message: "[Debuff] Layer 1", message_RU: "[Дебафф] 1 стак", message_TW: "Debuff 一层" }],
		"am-3126-1000-31260067": [{ type: "text", sub_type: "message", message: "[Debuff] Layer 2", message_RU: "[Дебафф] 2 стак", message_TW: "Debuff 二层" }],
		"am-3126-1000-31260068": [
			{ type: "text", sub_type: "message", message: "[Debuff] Layer 3", message_RU: "[Дебафф] 3 стак", message_TW: "Debuff 三层" },
			{ type: "text", sub_type: "message", delay: 120000, message: "[Debuff] 2 minutes passed", message_RU: "[Дебафф] Прошло 2 минуты (стаки удалены)", message_TW: "Debuff 2分钟结束" }
		]
	};

	let object = {};

	for (let [key, value] of Object.entries(skills)) {
		if (key.length === 5) {
			object[`s-3126-1000-1${key}`] = value;
			object[`s-3126-1000-2${key}`] = value;
		} else {
			object[key] = value;
		}
	}

	return object;
};