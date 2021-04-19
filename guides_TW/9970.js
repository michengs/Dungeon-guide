// Ruinous Manor
//
// made by Emilia-s2 / HSDN/ MC

module.exports = (dispatch, handlers, guide, lang) => {
	guide.type = SP;
	let debuff = false,
	     timer = null,	
	     back_time = 0,
		 total_time = 0,
		 start__time = 0;
	function skilld_event(skillid, ent) {

		if ([97000052].includes(skillid)) {
		    timer = dispatch.setTimeout(() => {
	        debuff = false;
		     }, 100000);		
			if (debuff) { 
			debuff_removed();
			}else{
	        debuff = true;
			}
	       }

		if ([1301, 2301].includes(skillid)) { //            
				if (!debuff) {
					handlers.text({
						sub_type: "message",
						message: "靠近"
					});
				} else {
					handlers.text({
						sub_type: "message",
						message: "遠離"
					});
			}
		}
		if ([1317, 1318,1319].includes(skillid)) { // 判断吃球
			    start__time = new Date();
				total_time = parseInt((100000 - (start__time - back_time))/1000)               
				if (!debuff) {
					handlers.text({
						sub_type: "message",
						message: "吃红球"
					});
				} else {
				if (total_time > 6) {
					handlers.text({
						sub_type: "message",
						message: "吃黄球" + "debuff倒计时" + `${total_time}` + "秒"
					});
				} else {
					handlers.text({
						sub_type: "message",
						message:  `${total_time}` + "秒后吃红球"
					});	
				}		
			}
		}
	}

	function debuff_removed() {
		debuff = false;
		dispatch.clearTimeout(timer);
	}

	return {

		// 3 BOSS
		"nd-970-3000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-970-3000-1102-0": [{ type: "text", sub_type: "message", message: "左", message_RU: "Левая рука" }],
		"s-970-3000-2102-0": [{ type: "text", sub_type: "message", message: "左", message_RU: "Левая рука" }],
		"s-970-3000-1101-0": [{ type: "text", sub_type: "message", message: "右", message_RU: "Правая рука" }],
		"s-970-3000-2101-0": [{ type: "text", sub_type: "message", message: "右", message_RU: "Правая рука" }],
		"s-970-3000-1103-0": [{ type: "text", sub_type: "message", message: "尾刀", message_RU: "Хвост" }],
		"s-970-3000-2103-0": [{ type: "text", sub_type: "message", message: "尾刀", message_RU: "Хвост" }],
		"s-970-3000-1301-0": [{ type: "text", sub_type: "message", message: "命运圈", message_RU: "Круги" },{ type: "func", func: skilld_event, args: [1301] }],
		"s-970-3000-2301-0": [{ type: "text", sub_type: "message", message: "命运圈", message_RU: "Круги" },{ type: "func", func: skilld_event, args: [2301] }],
		"s-970-3000-1110-0": [{ type: "text", sub_type: "message", message: "尾部AOE(慢)", message_RU: "Хвост АОЕ (прыгать вперед)" },	
                              { type: "text", sub_type: "message", delay: 1500, message: "闪避" }],
		"s-970-3000-2110-0": [{ type: "text", sub_type: "message", message: "尾部AOE(快)", message_RU: "Хвост АОЕ (прыгать вперед)" }],
		"s-970-3000-1304-0": [{ type: "text", sub_type: "message", message: "内外鉴定准备", message_RU: "Готовность!" }],
		"s-970-3000-1303-0": [{ type: "text", sub_type: "message", message: "内外鉴定准备", message_RU: "Готовность!" }],
		"s-970-3000-1113-0": [
			{ type: "text", sub_type: "message", message: "出 -> 进", message_RU: "От него > К нему" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 15, 300, 0, 5000] }
		],
		"s-970-3000-2113-0": [
			{ type: "text", sub_type: "message", message: "出 -> 进", message_RU: "От него > К нему" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 15, 300, 0, 5000] }
		],
		"s-970-3000-1116-0": [
			{ type: "text", sub_type: "message", message: "进 > 出", message_RU: "К нему > От него" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 15, 300, 0, 5000] }
		],
		"s-970-3000-2116-0": [
			{ type: "text", sub_type: "message", message: "进 > 出", message_RU: "К нему > От него" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 15, 300, 0, 5000] }
		],
		"am-970-3000-97000052": [{ type: "func", func: () => back_time = new Date() },{ type: "func", func: skilld_event, args: [97000052] }],
		"s-970-3000-1318-0": [{ type: "func", func: skilld_event, args: [1318]}],
		"s-970-3000-1317-0": [{ type: "func", func: skilld_event, args: [1317]}],
		"s-970-3000-1319-0": [{ type: "func", func: skilld_event, args: [1319]}],
		"s-970-3000-1322-0": [{ type: "text", sub_type: "message", message: "內外炸解王!", message_RU: "Эвейд!" }],
		"s-970-3000-1311-0": [{ type: "text", sub_type: "message", message: "解王!", message_RU: "Клинс!" }],
		"s-970-3000-1120-0": [{ type: "text", sub_type: "message", message: "镭射", message_RU: "Головы" }],
		"s-970-3000-2120-0": [{ type: "text", sub_type: "message", message: "镭射", message_RU: "Головы" }]
	};
};