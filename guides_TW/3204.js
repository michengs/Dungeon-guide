// Catalepticon (Hard)
//
// made by HSDN

module.exports = (dispatch, handlers, guide, lang) => {

	let combo_count = 0;
    let notice = true;
	dispatch.hook("S_ABNORMALITY_BEGIN", 4, event => {
		if (event.id === 32040001)
			handlers.marker({ id: event.target, color: "yellow", sub_delay: 1000000 });
	});
	function skilld_event(skillid, ent) {
		if (notice && skillid == 131) {
			notice = false;
			handlers.text({
				sub_type: "message",
				message: "----闪避------"		
			});
			dispatch.setTimeout(() => notice = true, 4000);
		}
	}
	return {
		"ns-3204-1000": [{ type: "func", func: () => combo_count = 0 }],
		"nd-3204-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" },
			{ type: "marker_remove_all" }
		],

		"qb-3204-1000-32041000": [
			{ type: "text", sub_type: "message", message: "飞剑一击", message_RU: "Стрелки" },
			{ type: "func", func: () => combo_count = 0 }
		],
		"qb-3204-1000-32042000": [{ type: "text", sub_type: "message", message: "飞剑 + 贯穿", message_RU: "Стрелки + полоса" }],
		"qb-3204-1000-32042006": [
			{ type: "text", sub_type: "message", message: "禁锢", message_RU: "Клетка" },
			{ type: "text", sub_type: "alert", message: "禁锢倒计时准备...", message_RU: "Скоро клетка...", delay: 130000 }
		],
		"qb-3204-1000-32042009": [
			{ type: "text", sub_type: "message", message: "骷髅", message_RU: "Скелеты" },
			{ type: "text", sub_type: "alert", message: "骷髅召唤准备...", message_RU: "Скоро скелеты...", delay: 220000 }
		],

		"h-3204-1000-90": [{ type: "text", sub_type: "message", message: "90%", message_RU: "90%" }],
		"h-3204-1000-75": [{ type: "text", sub_type: "message", message: "75%", message_RU: "70%" }],
		"h-3204-1000-40": [{ type: "text", sub_type: "message", message: "40%", message_RU: "35%" }],

		"s-3204-1000-104-0": [
			{ type: "text", sub_type: "message", message: "眩晕 (AOE)", message_RU: "Стан (АОЕ)" },
			{ type: "spawn", func: "circle", args: [true, 553, 180, -50, 10, 380, 0, 2000] }
		],
		"s-3204-1000-107-0": [
			{ type: "text", sub_type: "message", message: "侧闪", message_RU: "Полоса вперед + полосы по бокам" },
			{ type: "spawn", func: "vector", args: [553, 90, 50, 0, 1000, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 270, 50, 0, 1000, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 90, 50, 180, 1000, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 270, 50, 180, 1000, 0, 2000] },
			{ type: "func", func: () => combo_count++ },
			{ type: "spawn", func: "marker", args: [false, 0, 150, 0, 3000, true, null], check_func: () => combo_count == 2, delay: 1000 }
		],
		"s-3204-1000-110-0": [
			{ type: "text", sub_type: "message", message: "点名 + 波", message_RU: "Таргет + волна" },
			{ type: "spawn", func: "circle", args: [true, 553, 180, -500, 10, 350, 0, 1500] },
			{ type: "spawn", func: "vector", args: [553, 180, -50, 120, 500, 0, 2000], delay: 1500 },
			{ type: "spawn", func: "vector", args: [553, 180, -50, 240, 500, 0, 2000], delay: 1500 },
			{ type: "func", func: () => combo_count++ },
			{ type: "spawn", func: "marker", args: [false, 0, 150, 0, 3000, true, null], check_func: () => combo_count == 2, delay: 2500 }
		],
		"s-3204-1000-112-0": [{ type: "text", sub_type: "message", message: "前推", message_RU: "Волна вперед" },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 70, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 290, 500, 0, 2000] }
		],
		"s-3204-1000-114-0": [{ type: "text", sub_type: "message", message: "内外炸", message_RU: "Внутреннее + внешнее АОЕ" }],
		"s-3204-1000-116-0": [
			{ type: "text", sub_type: "message", message: "贯穿", message_RU: "Полоса вперед" },
			{ type: "spawn", func: "vector", args: [553, 90, 50, 0, 1000, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 270, 50, 0, 1000, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 90, 50, 180, 1000, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 270, 50, 180, 1000, 0, 2000] }
		],
		"s-3204-1000-119-0": [{ type: "text", sub_type: "message", message: "2连击", message_RU: "Два удара" }],
		"s-3204-1000-120-0": [
			{ type: "text", sub_type: "message", message: "2连 + 晕 (AOE)", message_RU: "Два удара + стан (АОЕ)" },
			{ type: "text", sub_type: "message", message: "晕 (AOE)", message_RU: "Стан (АОЕ)", delay: 1500 },
			{ type: "spawn", func: "circle", args: [true, 553, 180, -100, 10, 700, 0, 2500], delay: 1500 }
		],
		"s-3204-1000-123-0": [{ type: "text", sub_type: "message", message: "旋转", message_RU: "Круговая" }],
		"s-3204-1000-125-0": [{ type: "text", sub_type: "message", message: "眩晕 (坦)", message_RU: "Стан (танк)" }],
		"s-3204-1000-127-0": [
			{ type: "text", sub_type: "message", message: "Pizza", message_RU: "Пицца" },
			{ type: "spawn", func: "marker", args: [false, 0, 150, 0, 2000, true, null] }
		],
		"s-3204-1000-128-0": [
			{ type: "text", sub_type: "message", message: "Pizza", message_RU: "Пицца" },
			{ type: "spawn", func: "marker", args: [false, 0, 150, 0, 2000, true, null] }
		],
		"s-3204-1000-148-0": [
			{ type: "text", sub_type: "message", message: "Pizza", message_RU: "Пицца" },
			{ type: "spawn", func: "marker", args: [false, 150, 150, 0, 2000, true, null] },
			{ type: "spawn", func: "marker", args: [false, 340, 150, 0, 2000, true, null], delay: 1500 }
		],
		"s-3204-1031-131-0": [{ type: "func", func: skilld_event, args: [131] }],		
		"s-3204-1000-156-0": [{ type: "text", sub_type: "message", message: "吃buff", message_RU: "Черепа" }],
		"s-3204-1000-157-0": [{ type: "text", sub_type: "message", message: "快速", message_RU: "Круговая" },{ type: "text", sub_type: "message", message: "集中!", message_RU: "Собраться!", delay: 2000 }],
		"s-3204-1000-158-0": [{ type: "text", sub_type: "message", message: "慢速", message_RU: "Круговая" },{ type: "text", sub_type: "message", message: "集中!", message_RU: "Собраться!", delay: 5000 }],
		"s-3204-1000-159-0": [
			{ type: "text", sub_type: "message", message: "AOE", message_RU: "АОЕ" },
			{ type: "marker_remove_all", delay: 3000 }
		]
	};
};