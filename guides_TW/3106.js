// Killing Grounds
//
// made by HSDN / Kuroine

module.exports = (dispatch, handlers, guide, lang) => {

	let combo_start = false;
	dispatch.hook("S_USER_EFFECT", 1, event => {
		if (event.circle == 3 && event.operation == 1) {
			handlers.marker({ id: event.target, color: "yellow", sub_delay: 1000000 });
		} else if (event.circle == 3 && event.operation == 2) {
			handlers.marker_remove_all({ delay: 1000 });
		}
	});
	return {
		"nd-3106-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" },
			{ type: "marker_remove_all" }			
		],
		"h-3106-1000-99": [
			{ type: "spawn", func: "marker", args: [false, 3, -700, 100, 60000000, false, ["Giant", "Giant Direction"]] }
		],
		"qb-3106-1000-32061001": [
			{ type: "text", sub_type: "message", message: "Debuff (最近)", message_RU: "Дебаф (ближние)" },
			{ type: "text", sub_type: "alert", message: "准备晕...", message_RU: "Скоро давать стан...", delay: 2000 }
		],
		"qb-3106-1000-32061002": [
			{ type: "text", sub_type: "message", message: "Debuff (最远)", message_RU: "Дебаф (дальние)" },
			{ type: "text", sub_type: "alert", message: "准备晕...", message_RU: "Скоро давать стан...", delay: 2000 }
		],
		"s-3106-1000-102-0": [
			{ type: "func", func: () => combo_start = true },
			{ type: "func", func: () => combo_start = false, delay: 1400 }
		],
	    "s-3106-1000-105-0": [{ type: "text", sub_type: "message", message: "击退 旋转", message_RU: "Оборот (откид)", check_func: () => combo_start === true }],
		"s-3106-1000-106-0": [{ type: "text", sub_type: "message", message: "2旋转--", message_RU: "Оборот (откид)" },
			{ type: "spawn", func: "circle", args: [true, 553, 0, 50, 10, 350, 0, 3000] }],
	//	"s-3106-1000-108-0": [{ type: "text", sub_type: "message", message: "击倒", message_RU: "Оборот (откид)" }],
		"s-3106-1000-109-0": [{ type: "text", sub_type: "message", message: "大跳击倒", message_RU: "Прыжок (опрокид)" },
			{ type: "spawn", func: "circle", args: [true, 553, 0, 150, 10, 300, 0, 2500] }],
		"s-3106-1000-201-0": [{ type: "text", sub_type: "message", message: "前方", message_RU: "Удар вперед" }],
		"s-3106-1000-202-0": [{ type: "text", sub_type: "message", message: "前方", message_RU: "Удар вперед" }],
		"s-3106-1000-203-0": [{ type: "text", sub_type: "message", message: "前方 | 波", message_RU: "Удар вперед + волна" }],
		"s-3106-1000-205-0": [{ type: "text", sub_type: "message", message: "旋转", message_RU: "Крутилка" }],
		"s-3106-1000-206-0": [{ type: "text", sub_type: "message", message: "旋转", message_RU: "Крутилка" }],
		"s-3106-1000-207-0": [{ type: "text", sub_type: "message", message: "旋转", message_RU: "Крутилка" }],
		"s-3106-1000-209-0": [
			{ type: "text", sub_type: "message", message: "跺脚 (击倒)---------", message_RU: "Опрокид" },
			{ type: "spawn", func: "circle", args: [true, 553, 0, 0, 10, 400, 0, 1500] }
		],
		"s-3106-1000-210-0": [
			{ type: "text", sub_type: "message", message: "跺脚 (击倒)", message_RU: "Опрокид" },
			{ type: "spawn", func: "circle", args: [true, 553, 0, 0, 10, 400, 0, 1500] }
		],
		"s-3106-1000-211-0": [{ type: "text", sub_type: "message", message: "推", message_RU: "Откид" }],
		"s-3106-1000-212-0": [{ type: "text", sub_type: "message", message: "翻滚", message_RU: "Кувырок" }],
		"s-3106-1000-215-0": [{ type: "text", sub_type: "message", message: "翻滚", message_RU: "Кувырок" }],		
	//	"s-3106-1000-216-0": [{ type: "text", sub_type: "message", message: "翻滚", message_RU: "Кувырок" }],
		"s-3106-1000-508-0": [
			{ type: "text", sub_type: "message", message: "扩散圈", message_RU: "Волны наружу" },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 18, 180, 1500, 5000] },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 12, 360, 1500, 5000] },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 10, 550, 1500, 5000] },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 860, 1500, 5000] }
		],
		"s-3106-1000-509-0": [
			{ type: "text", sub_type: "message", message: "收缩圈", message_RU: "Волны внутрь" },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 18, 180, 1500, 5000] },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 12, 360, 1500, 5000] },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 10, 550, 1500, 5000] },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 860, 1500, 5000] }
		],
	//	"s-3106-1000-506-0": [{ type: "text", sub_type: "message", message: "点名 (晕)", message_RU: "Байт (стан)" }],
		"s-3106-1000-507-0": [{ type: "text", sub_type: "message", message: "束缚 | 跳 (击倒)", message_RU: "Притяжка + прыжок (опрокид)" }],
		// "s-3106-1000-516-0": "s-3106-1000-508-0",
		// "s-3106-1000-517-0": "s-3106-1000-509-0",
		"s-3106-1000-502-0": [{ type: "text", sub_type: "message", message: "狂暴", message_RU: "Бешенство" }],
		"s-3106-1000-518-0": [{ type: "text", sub_type: "message", message: "狂暴", message_RU: "Бешенство" }],
		"s-3106-1000-519-0": [{ type: "text", sub_type: "message", message: "狂暴", message_RU: "Бешенство" }],
		"s-3106-1000-306-0": [{ type: "text", sub_type: "message", message: "旋转", message_RU: "Крутилка" }],
		"s-3106-1000-309-0": [{ type: "text", sub_type: "message", message: "前方", message_RU: "Удар вперед" }],
		"s-3106-1000-321-0": [{ type: "text", sub_type: "message", message: "AoE", message_RU: "АоЕ" }],
		"s-3106-1000-324-0": [{ type: "text", sub_type: "message", message: "AoE", message_RU: "АоЕ" }]

	};
};