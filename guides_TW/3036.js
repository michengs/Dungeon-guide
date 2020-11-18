// 困難_暴風的艾爾凱拉斯號
//
// made by michengs
module.exports = (dispatch, handlers, guide, lang) => {
	guide.type = SP;
 let  Triple_Attack = false,
   	 enrage = 0,	
	 steptwo = 0,	
	 counter = 0,
	 timer = null,	
	 timer_two = null;	
	const mech_messages = {
		0: { message: "3连劈" },
		1: { message: "4连劈"}
	};	
	const mech_num = {
		1: { degree1: 0, degree2: 180},
		0: { degree1: 180, degree2: 360}
	};
	const mech_direction = {
		0: { message: "左" },
		1: { message: "右"}
	};		
	function boss_backattack_event() {
		dispatch.clearTimeout(timer_two);
		counter++;
		if (counter >= 2) {
			handlers.text({
				sub_type: "message",
				message: "Back Attack",
				message_RU: "Задний",
				message_TW: (Triple_Attack ? "!" : "后方")
			});
		}                                                                                   //1965
		timer_two = dispatch.setTimeout(() => counter = 0, (enrage ==1) ? 2050 : 2140);     //1980 2010 
	}	   
	function skilld_event(skillid, ent) {                                               //1401  1701  右劈            1402 1702 左
		if ([1401, 1701,1402,1702].includes(skillid)) {		
			const bossskill = (skillid % 2 + enrage) % 2
			handlers.event([ 			
            { type: "text", sub_type: "message", message:  (Triple_Attack ? `${mech_messages[steptwo].message}` + `${mech_direction[bossskill].message}` : "2连劈" + `${mech_direction[bossskill].message}`)	},			
			{ type: "spawn", func: "vector", args: [553, 358, 0, 180, 500, 100, 1500] },
			{ type: "spawn", func: "vector", args: [553, 358, 0, 0, 500, 100, 1500] },	
			{ type: "spawn", func: "semicircle", args: [mech_num[bossskill].degree1, mech_num[bossskill].degree2, 912, 0, 0, 28, 50, 0, 1500] },  
			{ type: "spawn", func: "semicircle", args: [mech_num[bossskill].degree1, mech_num[bossskill].degree2, 912, 0, 0, 25, 100, 0, 1500] },			
			{ type: "spawn", func: "semicircle", args: [mech_num[bossskill].degree1, mech_num[bossskill].degree2, 912, 0, 0, 20, 160, 0, 1500] },  
			{ type: "spawn", func: "semicircle", args: [mech_num[bossskill].degree1, mech_num[bossskill].degree2, 912, 0, 0, 12, 220, 0, 1500] },
			{ type: "spawn", func: "semicircle", args: [mech_num[bossskill].degree1, mech_num[bossskill].degree2, 912, 0, 0, 10, 300, 0, 1500] },
			{ type: "spawn", func: "semicircle", args: [mech_num[bossskill].degree1, mech_num[bossskill].degree2, 912, 0, 0, 8, 360, 0, 1500] }]);	
            }
		if ([3036039, 3036040, 3036041].includes(skillid)) {	
				dispatch.clearTimeout(timer);
				Triple_Attack = true;
				timer = dispatch.setTimeout(() => Triple_Attack = false, 3500);	
		}	
	      }
	return {
		"rb-3036-1000": [{ type: "func", func: () => enrage = 1 },{ type: "text", sub_type: "message", message: "boss愤怒" }],
		"re-3036-1000": [{ type: "func", func: () => enrage = 0 },{ type: "text", sub_type: "message", message: "愤怒结束" }],		
		"ns-3036-1000": [{ type: "text", sub_type: "speech", message: "进入熾熱艾爾凱拉斯號" }],	
		"nd-3036-1001": [{ type: "stop_timers" },{ type: "despawn_all" }],
		"s-3036-1001-1112-0": [{ type: "text", sub_type: "message", message: "后跳" }],
		"nd-3036-1000": [{ type: "stop_timers" },{ type: "despawn_all" }],
		"h-3036-1000-100": [{ type: "func", func: () => steptwo = 0 }],		
		"h-3036-1000-94": [{ type: "text", sub_type: "message", message: "---------------94%----------------" }],		
		"h-3036-1000-79": [{ type: "text", sub_type: "message", message: "---------------79%----------------" }, { type: "func", func: () => steptwo = 1 }],
		"s-3036-1000-1103-0": [{ type: "func", func: boss_backattack_event }],//1103,1106,
		"s-3036-1000-1106-0": [{ type: "func", func: boss_backattack_event }],
		"s-3036-1000-1112-0": [{ type: "text", sub_type: "message", message: "后退" }],
		"s-3036-1000-1117-0": [{ type: "text", sub_type: "message", message: "前方" }],
		"s-3036-1000-1118-0": [{ type: "text", sub_type: "message", message: "砍击| 闪" }],
		"s-3036-1000-1302-0": [{ type: "text", sub_type: "message", message: "AOE" },
			                   { type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 500, 100, 6000]}],
		"s-3036-1000-1303-0": [{ type: "text", sub_type: "message", message: "旋转攻击" }],
		"s-3036-1000-1401-0": [{ type: "func", func: skilld_event, args: [1401] }],
		"s-3036-1000-1402-0": [{ type: "func", func: skilld_event, args: [1402] }],
		"s-3036-1000-1701-0": [{ type: "func", func: skilld_event, args: [1701] }],//右
		"s-3036-1000-1702-0": [{ type: "func", func: skilld_event, args: [1702] }],//左
		"s-3036-1000-1805-0": [{ type: "text", sub_type: "message", message: "中" },	
                               { type: "text", sub_type: "message", delay: 2100, message: "内" },	
                               { type: "text", sub_type: "message", delay: 3050, message: "全 | 外" },							   
		                       { type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 250, 0, 6000]},
		                       { type: "spawn", func: "circle", args: [false, 553, 0, 0, 6, 450, 0, 6000]}],  //650	
		"s-3036-1000-1806-0": [{ type: "text", sub_type: "message", message: "内" },	
                               { type: "text", sub_type: "message", delay: 2100, message: "中" },	
                               { type: "text", sub_type: "message", delay: 3050, message: "全 | 内" },								   
		                       { type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 250, 0, 6000]},
		                       { type: "spawn", func: "circle", args: [false, 553, 0, 0, 6, 450, 0, 6000]}], 							   
		"s-3036-1000-2103-0": [{ type: "func", func: boss_backattack_event }],
		"s-3036-1000-2106-0": [{ type: "func", func: boss_backattack_event }],
		"s-3036-1000-2112-0": [{ type: "text", sub_type: "message", message: "后退" }],
		"s-3036-1000-2117-0": [{ type: "text", sub_type: "message", message: "前方 " }],
		"s-3036-1000-2118-0": [{ type: "text", sub_type: "message", message: "砍击| 闪" }],		
		"qb-3036-1000-3036039": [{ type: "func", func: skilld_event, args: [3036039]}],		
		"qb-3036-1000-3036040": [{ type: "func", func: skilld_event, args: [3036040]}],			
		"qb-3036-1000-3036041": [{ type: "func", func: skilld_event, args: [3036041]}],					
	};
};