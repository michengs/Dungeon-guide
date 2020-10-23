// Gossamer Vault (Hard)
//
// made by michengs

module.exports = (dispatch, handlers, guide, lang) => {
	let boss = null;

	function secondboss_start_event() {
		boss = null;
	}

	function secondboss_debuff_event(skillid) {
		switch (skillid) {
			case 32010224: // false debuff (next true)
				boss = 1;

				dispatch.setTimeout(() => {
					if (boss === 1) {
						handlers.text({
							sub_type: "message",
							message_RU: "Смена дебаффа",
							message: "Debuff reload",
				            message_TW: "重置debuff"
						});
						boss = null;
					}
				}, 80000);
				break;

			case 32010220: // true debuff (next false)
				boss = 0;

				dispatch.setTimeout(() => {
					if (boss === 0) {
						handlers.text({
							sub_type: "message",
							message_RU: "Смена дебаффа",
							message: "Debuff reload",
				            message_TW: "重置debuff"
						});
						boss = null;
					}
				}, 80000);
				break;
		}
	}

	return {
		// 1 BOSS
		"nd-3201-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		//"s-3201-1000-103-0": [{ type: "text", class_position:"tank", sub_type: "message", message: "Dodge", message_RU: "Эвейд!" }],
		"s-3201-1000-104-0": [{ type: "text", class_position:"tank", sub_type: "message", message: "Stun attack", message_RU: "Стан!", message_TW: "眩晕攻击" }],
		"s-3201-1000-107-0": [
			{ type: "text", sub_type: "message", message: "back", message_RU: "|Полоса|", message_TW: "后方" },
			{ type: "text", sub_type: "message", delay: 2250, message: "pull", message_RU: "Откид!!!", message_TW: "拉人" },
			{ type: "spawn", func: "vector", args: [553, 90, 139, 173, 800, 0, 3000] },
			{ type: "spawn", func: "vector", args: [553, 270, 139, -173, 800, 0, 3000] }
		],
		"s-3201-1000-111-0": [
			{ type: "text", sub_type: "message", message: "Back Wave", message_RU: "Волна назад", message_TW: "后波" },
			{ type: "spawn", func: "vector", args: [553, 0, 100, 112, 800, 0, 3000] },
			{ type: "spawn", func: "vector", args: [553, 0, 100, -112, 800, 0, 3000] }
		],
		//"s-3201-1000-112-0": [{ type: "text", sub_type: "message", message: "Left + Right", message_RU: "Лево + Право" }],
		"s-3201-1000-113-0": [
			{ type: "text", sub_type: "message", message: "Jump (Slow)", message_RU: "Прыжок", message_TW: "大跳(慢)" },
			{ type: "text", sub_type: "message", delay: 1500, message: "Pull", message_RU: "Камень!" }
		],
		"s-3201-1000-118-0": [
			{ type: "text", sub_type: "message", message: "Jump P (Slow)", message_RU: "Прыжок", message_TW: "大跳(慢)" },
			{ type: "text", sub_type: "message", delay: 1500, message: "Pull", message_RU: "Камень!" },
		],
		"s-3201-1000-119-0": [
			{ type: "text", sub_type: "message", delay: 1000, message: "Back + Front", message_RU: "Вперед + Назад", message_TW: "后方 + 前方" },
			{ type: "spawn", func: "vector", args: [553, 2, 0, 70, 800, 0, 2500] },
			{ type: "spawn", func: "vector", args: [553, 2, 0, 110, 800, 0, 2500] },
			{ type: "spawn", func: "vector", args: [553, 2, 0, 250, 800, 0, 2500] },
			{ type: "spawn", func: "vector", args: [553, 2, 0, 290, 800, 0, 2500] }
		],
		//"s-3201-1000-121-0": [{ type: "text", class_position:"tank", sub_type: "message", message: "Right", message_RU: "Право" }],
		//"s-3201-1000-122-0": [{ type: "text", class_position:"tank", sub_type: "message", message: "Left", message_RU: "Лево" }],
		"s-3201-1000-124-0": [{ type: "text", class_position:"tank", sub_type: "message", message: "Stun attack", message_RU: "Стан (фаст)", message_TW: "眩晕攻击" }],
		"s-3201-1000-127-0": [
			{ type: "text", class_position:"dps", sub_type: "message", message: "Back", message_RU: "Полоса (фаст)", message_TW: "后方" },
			{ type: "text", class_position:"heal", sub_type: "message", message: "Back", message_RU: "Полоса (фаст)", message_TW: "后方" },
			{ type: "spawn", func: "vector", args: [553, 90, 139, 173, 800, 0, 3000] },
			{ type: "spawn", func: "vector", args: [553, 270, 139, -173, 800, 0, 3000] }
		],
		//"s-3201-1000-128-0": [{ type: "text", class_position:"tank", sub_type: "message", message: "Triple Attack", message_RU: "Комба" }],
		"s-3201-1000-131-0": [
			{ type: "text", class_position:"dps", sub_type: "message", message: "Back Wave", message_RU: "Волна назад (фаст)", message_TW: "后波" },
			{ type: "text", class_position:"heal", sub_type: "message", message: "Back Wave", message_RU: "Волна назад (фаст)", message_TW: "后波" },
			{ type: "spawn", func: "vector", args: [553, 0, 100, 112, 800, 0, 3000] },
			{ type: "spawn", func: "vector", args: [553, 0, 100, -112, 800, 0, 3000] }
		],
		//"s-3201-1000-132-0": [{ type: "text", sub_type: "message", message: "Left + Right", message_RU: "Лево + Право (фаст)" }],
		"s-3201-1000-133-0": [{ type: "text", sub_type: "message", delay: 500, message: "Jump (Fast)", message_RU: "Прыжок (фаст)", message_TW: "大跳(快)" }],
		"s-3201-1000-138-0": [{ type: "text", sub_type: "message", delay: 500, message: "Jump P (Fast)", message_RU: "Прыжок (фаст)", message_TW: "大跳(快)" }],
		"s-3201-1000-139-0": [
			{ type: "text", sub_type: "message", message: "Back + Front (Fast)", message_RU: "Вперед + Назад (фаст)", message_TW: "后 + 前(快)" },
			{ type: "spawn", func: "vector", args: [553, 2, 0, 70, 800, 0, 2500] },
			{ type: "spawn", func: "vector", args: [553, 2, 0, 110, 800, 0, 2500] },
			{ type: "spawn", func: "vector", args: [553, 2, 0, 250, 800, 0, 2500] },
			{ type: "spawn", func: "vector", args: [553, 2, 0, 290, 800, 0, 2500] }
		],
		"s-3201-1000-143-0": [
			{ type: "text", class_position:"tank", sub_type: "message", message: "Left > Right", message_RU: "Слева > Справа", message_TW: "左 > 右" },
			{ type: "text", class_position:"dps", sub_type: "message", message: "Right > Left", message_RU: "Справа > Слева", message_TW: "右 > 左" },
			{ type: "text", class_position:"heal", sub_type: "message", message: "Right > Left", message_RU: "Справа > Слева", message_TW: "右 > 左" },
			{ type: "spawn", func: "marker", args: [false, 150, 300, 100, 2715, true, null] }, // 1
			{ type: "spawn", func: "marker", args: [false, 225, 300, 2800, 4175, true, null] }, // 6
			{ type: "spawn", func: "marker", args: [false, 30, 300, 100, 1000, true, null] }, // 1
			{ type: "spawn", func: "marker", args: [false, 330, 300, 1100, 5000, true, null] } // 7
		],
		"s-3201-1000-145-0": [
			{ type: "text", class_position:"tank", sub_type: "message", message: "Left > Right", message_RU: "Слева > Справа", message_TW: "左 > 右" },
			{ type: "text", class_position:"dps", sub_type: "message", message: "Right > Left", message_RU: "Справа > Слева", message_TW: "右 > 左" },
			{ type: "text", class_position:"heal", sub_type: "message", message: "Right > Left", message_RU: "Справа > Слева", message_TW: "右 > 左" },
			{ type: "spawn", func: "marker", args: [false, 30, 300, 100, 1000, true, null] }, // 1
			{ type: "spawn", func: "marker", args: [false, 330, 300, 1100, 5000, true, null] }, // 7
			{ type: "spawn", func: "marker", args: [false, 150, 300, 100, 2000, true, null] }, // 1
			{ type: "spawn", func: "marker", args: [false, 225, 300, 2500, 5000, true, null] } // 6
		],
		"s-3201-1000-148-0": [
			{ type: "text", sub_type: "message", message: "Right Hand (Flying)", message_RU: "Правая рука (подлет)", message_TW: "右手" },
			{ type: "spawn", func: "circle", args: [false, 553, 20, 150, 10, 320, 0, 4000] }
		],
		"s-3201-1000-149-0": [
			{ type: "text", sub_type: "message", message: "Left Hand (Flying)", message_RU: "Левая рука (подлет)", message_TW: "左手" },
			{ type: "spawn", func: "circle", args: [false, 553, 340, 150, 10, 320, 0, 4000] }
		],
		"s-3201-1000-151-0": [{ type: "text", sub_type: "message", message: "Stun Attack", message_RU: "Стан!", message_TW: "眩晕攻击" }],
		"s-3201-1000-305-0": [{ type: "text", sub_type: "message", message: "Pizza", message_RU: "Pizza", message_TW: "披萨" }],
		"s-3201-1000-311-0": [
			{ type: "text", sub_type: "message", message_RU: "Мёд!", message_TW: "后波" },
			{ type: "text", sub_type: "message", delay: 4000, message: "pull", message_RU: "Откид!", message_TW: "拉" }
		],
		"s-3201-1000-312-0": [
			{ type: "text", sub_type: "message", message_RU: "Мёд (фаст)!", message_TW: "!!" },
			{ type: "text", sub_type: "message", delay: 2000, message: "pull", message_RU: "Откид!", message_TW: "拉" }
		],
		"s-3201-1000-313-0": [
			{ type: "text", sub_type: "message", message: "Circles (Slow)", message_RU: "Кольцо", message_TW: "炸圈(慢)" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 75, 10, 300, 0, 6000] }
		],
		"s-3201-1000-314-0": [
			{ type: "text", sub_type: "message", message: "Circles (Fast)", message_RU: "Кольцо (фаст)", message_TW: "炸圈(快)" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 75, 10, 300, 0, 6000] }
		],

		// 2 BOSS
		"nd-3201-2000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"h-3201-2000-99": [{ type: "func", func: secondboss_start_event }],
		"h-3201-2000-81": [{ type: "text", sub_type: "message", message: "80%", message_RU: "Дебафф" }],
		"h-3201-2000-76": [{ type: "text", sub_type: "message", message: "75%", message_RU: "Камни" }],
		"s-3201-2000-108-0": [{ type: "text", sub_type: "message", message: "Back Attack!", message_RU: "Откид назад!", message_TW: "后方攻击" }],
		"s-3201-2000-150-0": [{ type: "text", sub_type: "message", message: "Phantom", message_RU: "Фантом", message_TW: "分身" }],
		"am-3201-320126-32010224": [
			{ type: "text", sub_type: "alert", delay: 52000, message: "True Debuff in 5 seconds", message_RU: "Правда через 5 сек.", message_TW: "诅咒准备" },
			{ type: "func", func: secondboss_debuff_event, args: [32010224] }
		],
		"am-3201-2000-32010220": [
			{ type: "text", sub_type: "alert", delay: 52000, message: "False Debuff in 5 seconds", message_RU: "Ложь через 5 сек.", message_TW: "诅咒准备" },
			{ type: "func", func: secondboss_debuff_event, args: [32010220] }
		],
		"s-3201-2000-228-0": [ 
			{ type: "text", sub_type: "message", message: "Team Up", message_RU: "Камни (вместе)!!!", message_TW: "集中" },
			{ type: "text", sub_type: "message", delay: 3500, message: "Dodge", message_RU: "Эвейд", message_TW: "闪避" }
		],
		"s-3201-2000-230-0": [{ type: "text", sub_type: "message", message: "AOE", message_RU: "AOE!!" }],

		"s-3201-2000-231-0": [
			{ type: "text", sub_type: "message", message: "Out Safe", message_RU: "От него", message_TW: "外面安全" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 300, 0, 3000] }
		],
		"s-3201-2000-232-0": [{ type: "text", sub_type: "message", message: "In Safe", message_RU: "К нему", message_TW: "里面安全" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 300, 0, 3000] },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 3, 1000, 0, 3000] }
		],
		"s-3201-2000-236-0": [{ type: "text", sub_type: "message", message: "Counter", message_RU: "Конус вперед (байт)", message_TW: "反击" }],
	};
};