// RK-9 Kennel
//
// made by michengs

module.exports = (dispatch, handlers, guide, lang) => {
	return {
		// 1 BOSS
		"nd-735-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-735-1000-111-0": [{ type: "text", sub_type: "message", message: "Back + Front", message_RU: "Удар назад + вперед", message_TW: "后 + 前" }],
		"s-735-1000-112-0": [{ type: "text", sub_type: "message", message: "Back", message_RU: "Удар назад", message_TW: "后方" }],
		"s-735-1000-304-0": [{ type: "text", sub_type: "message", message: "Out", message_RU: "От него", message_TW: "出" }],
		"s-735-1000-305-0": [{ type: "text", sub_type: "message", message: "In", message_RU: "К нему", message_TW: "进" }],
		"s-735-1000-306-0": [{ type: "text", sub_type: "message", message: "Bombs", message_RU: "Бомбы", message_TW: "炸弹" }],
		"s-735-1000-307-0": [{ type: "text", sub_type: "message", message: "Pull", message_RU: "Стяжка", message_TW: "拉人" }],
		"s-735-1000-309-0": [{ type: "text", sub_type: "message", message: "Four Missile", message_RU: "Запуск 4 ракет", message_TW: "导弹" }],

		// 2 BOSS
		"nd-735-2000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-735-2000-102-0": [
			{ type: "text", sub_type: "message", message: "Pizza Cutter", message_RU: "Пила (Эвейд)", message_TW: "披萨切割" },
			{ type: "spawn", func: "circle", args: [true, 553, 0, 300, 12, 228, 0, 3000] }
		],
		"s-735-2000-105-0": [
			{ type: "text", sub_type: "message", message: "360", message_RU: "Крутилка (откид)", message_TW: "360" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 278, 0, 4000] }
		],
		"s-735-2000-108-0": [
			{ type: "text", sub_type: "message", message: "Back Swipe", message_RU: "Откид назад", message_TW: "后扫" },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 240, 380, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 120, 380, 0, 2000] }
		],
		"s-735-2000-301-0": [{ type: "text", sub_type: "message", message: "Throwing Orb", message_RU: "Бомба", message_TW: "溜溜球" }],
		"s-735-2000-304-0": [
			{ type: "text", sub_type: "message", message: "Get Out", message_RU: "От него", message_TW: "远离" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 400, 0, 4000] }
		],
		"s-735-2007-201-0": [
			{ type: "spawn", func: "vector", args: [912, 0, 0, 0, 500, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 90, 500, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 180, 500, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 270, 500, 0, 4000] }
		],
		"s-735-2007-306-0": [
			{ type: "spawn", func: "vector", args: [912, 0, 0, 0, 500, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 90, 500, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 180, 500, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 270, 500, 0, 4000] }
		],
		"s-735-2007-307-0": [
			{ type: "spawn", func: "vector", args: [912, 0, 0, 0, 500, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 90, 500, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 180, 500, 0, 4000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 270, 500, 0, 4000] }
		],

		// 3 BOSS
		"nd-735-3000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-735-3000-116-0": [{ type: "text", sub_type: "message", message: "Right Safe", message_RU: "Справа сейф", message_TW: "右安全" },
			{ type: "spawn", func: "point", args: [553, 120, 250, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 130, 240, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 140, 230, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 150, 220, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 160, 210, 0, 3000] },
			{ type: "spawn", func: "vector", args: [553, 170, 210, 180, 290, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 300, 250, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 310, 240, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 320, 230, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 330, 220, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 340, 210, 0, 3000] },
			{ type: "spawn", func: "vector", args: [553, 350, 210, 0, 290, 0, 3000] }
		],
		"s-735-3000-117-0": [{ type: "text", sub_type: "message", message: "Left Safe", message_RU: "Слева сейф", message_TW: "左安全" },
			{ type: "spawn", func: "vector", args: [553, 10, 210, 0, 290, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 20, 210, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 30, 220, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 40, 230, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 50, 240, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 60, 250, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 240, 250, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 230, 240, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 220, 230, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 210, 220, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 200, 210, 0, 3000] },
			{ type: "spawn", func: "vector", args: [553, 190, 210, 180, 290, 0, 3000] }
		],
		"s-735-3000-118-0": [{ type: "text", sub_type: "message", message: "Left Safe", message_RU: "Слева сейф", message_TW: "左安全" },
			{ type: "spawn", func: "vector", args: [553, 10, 210, 0, 290, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 20, 210, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 30, 220, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 40, 230, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 50, 240, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 60, 250, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 240, 250, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 230, 240, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 220, 230, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 210, 220, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 200, 210, 0, 3000] },
			{ type: "spawn", func: "vector", args: [553, 190, 210, 180, 290, 0, 3000] }
		],
		"s-735-3000-119-0": [{ type: "text", sub_type: "message", message: "Right Safe", message_RU: "Справа сейф", message_TW: "右安全" },
			{ type: "spawn", func: "point", args: [553, 120, 250, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 130, 240, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 140, 230, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 150, 220, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 160, 210, 0, 3000] },
			{ type: "spawn", func: "vector", args: [553, 170, 210, 180, 290, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 300, 250, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 310, 240, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 320, 230, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 330, 220, 0, 3000] },
			{ type: "spawn", func: "point", args: [553, 340, 210, 0, 3000] },
			{ type: "spawn", func: "vector", args: [553, 350, 210, 0, 290, 0, 3000] }
		],
		"s-735-3000-129-0": [{ type: "text", class_position: "tank", sub_type: "message", message: "Dodge", message_RU: "Эвейд", message_TW: "闪避" }],
		"s-735-3000-305-0": [{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 300, 0, 7000] }],
		"s-735-3000-321-0": [{ type: "text", sub_type: "message", message: "Shield!", message_RU: "Щит!", message_TW: "破盾" }],
		"s-735-3000-324-0": [{ type: "text", sub_type: "message", message: "Dodge", message_RU: "Эвейд", message_TW: "闪避" }]
	};
};