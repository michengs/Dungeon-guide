// Killing Grounds
//
// made by HSDN / Kuroine

module.exports = (dispatch, handlers, guide, lang) => {

	let combo_start = false;

	return {
		"nd-3106-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],

		"qb-3106-1000-32061001": [{ type: "text", sub_type: "message", message: "Debuff (最近)", message_RU: "Дебаф (ближние)" }],
		"qb-3106-1000-32061002": [{ type: "text", sub_type: "message", message: "Debuff (最远)", message_RU: "Дебаф (дальние)" }],

		"s-3106-1000-102-0": [
			{ type: "func", func: () => combo_start = true },
			{ type: "func", func: () => combo_start = false, delay: 4000 }
		],
		// "s-3106-1000-105-0": [{ type: "text", sub_type: "message", message: "Knockback Spin", message_RU: "Оборот (откид)", check_func: () => combo_start === true }],
		"s-3106-1000-106-0": [{ type: "text", sub_type: "message", message: "击倒旋转", message_RU: "Оборот (откид)" }],
		"s-3106-1000-108-0": [{ type: "text", sub_type: "message", message: "击倒旋转", message_RU: "Оборот (откид)" }],
		"s-3106-1000-109-0": [{ type: "text", sub_type: "message", message: "大跳击倒", message_RU: "Прыжок (опрокид)" }],
		"s-3106-1000-201-0": [{ type: "text", sub_type: "message", message: "前方", message_RU: "Удар вперед" }],
		"s-3106-1000-202-0": [{ type: "text", sub_type: "message", message: "前方", message_RU: "Удар вперед" }],
		"s-3106-1000-203-0": [{ type: "text", sub_type: "message", message: "前方 + 波", message_RU: "Удар вперед + волна" }],
		"s-3106-1000-205-0": [{ type: "text", sub_type: "message", message: "旋转", message_RU: "Крутилка" }],
		"s-3106-1000-206-0": [{ type: "text", sub_type: "message", message: "旋转", message_RU: "Крутилка" }],
		"s-3106-1000-207-0": [{ type: "text", sub_type: "message", message: "旋转", message_RU: "Крутилка" }],
		"s-3106-1000-209-0": [
			{ type: "text", sub_type: "message", message: "跺脚 (击倒)", message_RU: "Опрокид" },
			{ type: "spawn", func: "circle", args: [true, 553, 0, 0, 10, 400, 0, 2500] }
		],
		"s-3106-1000-210-0": [
			{ type: "text", sub_type: "message", message: "跺脚 (击倒)", message_RU: "Опрокид" },
			{ type: "spawn", func: "circle", args: [true, 553, 0, 0, 10, 400, 0, 2500] }
		],
		"s-3106-1000-211-0": [{ type: "text", sub_type: "message", message: "推", message_RU: "Откид" }],
		"s-3106-1000-216-0": [{ type: "text", sub_type: "message", message: "翻滚", message_RU: "Кувырок" }],
		"s-3106-1000-508-0": [
			{ type: "text", sub_type: "message", message: "扩散圈", message_RU: "Волны наружу" },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 18, 157, 1500, 5000] },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 12, 307, 1500, 5000] }
		],
		"s-3106-1000-509-0": [
			{ type: "text", sub_type: "message", message: "收缩圈", message_RU: "Волны внутрь" },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 18, 157, 1500, 5000] },
			{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 12, 307, 1500, 5000] }
		],
		"s-3106-1000-506-0": [{ type: "text", sub_type: "message", message: "点名 (晕)", message_RU: "Байт (стан)" }],
		"s-3106-1000-507-0": [{ type: "text", sub_type: "message", message: "束缚 + 跳 (击倒)", message_RU: "Притяжка + прыжок (опрокид)" }],
		// "s-3106-1000-516-0": "s-3106-1000-508-0",
		// "s-3106-1000-517-0": "s-3106-1000-509-0",

		"s-3106-1000-518-0": [{ type: "text", sub_type: "message", message: "解除", message_RU: "Бешенство" }],
		"s-3106-1000-519-0": [{ type: "text", sub_type: "message", message: "解除", message_RU: "Бешенство" }],
		"s-3106-1000-307-0": [{ type: "text", sub_type: "message", message: "旋转", message_RU: "Крутилка" }],
		"s-3106-1000-309-0": [{ type: "text", sub_type: "message", message: "前方", message_RU: "Удар вперед" }],
		"s-3106-1000-321-0": [{ type: "text", sub_type: "message", message: "AoE", message_RU: "АоЕ" }],
		"s-3106-1000-324-0": [{ type: "text", sub_type: "message", message: "AoE", message_RU: "АоЕ" }]
	};
};