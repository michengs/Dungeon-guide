// 困難_暴風的艾爾凱拉斯號
//
// made by michengs
module.exports = (dispatch, handlers, guide, lang) => {
	guide.type = SP;
 let Triple_Attack = false,
   	 enrage = 0,	
	 hp_79 = 0,	
	 counter = 0,
	 time1 = null,	
	 time2 = null,
	 num = null,	
     start_enraged_time_A = null, 	
     start_enraged_time_C = null, 		 
     total_time2 = null,
     back_time = 0,
	 end_back_time = 0,
	 is_one_back = false ,
     print	= false ;     	 
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
		dispatch.clearTimeout(time2);
		counter++;
		if (counter >= 2 && !Triple_Attack) {
			handlers.text({
				sub_type: "message",
				message: "后方连击"
			});
		}                                                                                   //1965
		time2 = dispatch.setTimeout(() => counter = 0, (enrage ==1) ? 2200  : 2500  );     //1980 2010 
	}
	function boss_backattack() {
        end_back_time  = new Date() - back_time
		if (!print) {
			print = true
        if ( 0 < end_back_time && end_back_time < 1500)
        {
        is_one_back = true ;
        } else {
        is_one_back = false ;				
		}
			handlers.text({
				sub_type: "message",
				message:  (is_one_back ? '后方!!!' : '!!!') 
			});
		}                                                                                   //1965
		dispatch.setTimeout(() => print = false,  3500  );     //1980 2010 
	}	
	function skilld_event(skillid, ent) {                                               //1401  1701  右劈0-180            1402 1702 左 180-360
		if ([1401, 1701,1402,1702].includes(skillid)) {
			    start_enraged_time_C = new Date();
				total_time2 = (start_enraged_time_C - start_enraged_time_A)	    //if total_time2 = 35500   enrage = 1     预判900ms后愤怒状态              修正值增加
				if (total_time2 >= 35100 ) {
				enrage = 0	
				} else {
				enrage = 1		
				}
				switch (skillid) {
				case 1401: // 
				case 1402: //				
		         num = (skillid % 2 + enrage  ) % 2	
					break;
				case 1701: // 
				case 1702: // 				
		         num = skillid % 2   
					break;
			}		
			handlers.event([ 			
            { type: "text", sub_type: "message", message:  (Triple_Attack ? `${mech_messages[hp_79].message}` + `${mech_direction[num].message}` : "2连劈" + `${mech_direction[num].message}`)	},			
			{ type: "spawn", func: "vector", args: [553, 358, 0, 180, 900, 100, 1500] },
			{ type: "spawn", func: "vector", args: [553, 358, 0, 0, 900, 100, 1500] },		
			{ type: "spawn", func: "semicircle", args: [mech_num[num].degree1, mech_num[num].degree2, 912, 0, 0, 28, 50, 0, 1500] },  
			{ type: "spawn", func: "semicircle", args: [mech_num[num].degree1, mech_num[num].degree2, 912, 0, 0, 25, 100, 0, 1500] },			
			{ type: "spawn", func: "semicircle", args: [mech_num[num].degree1, mech_num[num].degree2, 912, 0, 0, 20, 160, 0, 1500] },  
			{ type: "spawn", func: "semicircle", args: [mech_num[num].degree1, mech_num[num].degree2, 912, 0, 0, 12, 220, 0, 1500] },
			{ type: "spawn", func: "semicircle", args: [mech_num[num].degree1, mech_num[num].degree2, 912, 0, 0, 10, 300, 0, 1500] },
			{ type: "spawn", func: "semicircle", args: [mech_num[num].degree1, mech_num[num].degree2, 912, 0, 0, 8, 360, 0, 1500] }]);	
            }
		if ([3036039, 3036040, 3036041].includes(skillid)) {	
				dispatch.clearTimeout(time1);
				Triple_Attack = true;
				time1 = dispatch.setTimeout(() => Triple_Attack = false, 3500);	
		}	
	     }
	return {
			"ns-3036-1001": [
			{ type: "spawn", func: "marker", args: [false, 281, -500, 100, 60000000, false, ["達鲁坎", "安全区"]] },
			{ type: "spawn", func: "point", args: [513, 261, 500, 100, 60000000] }
		],
			"ns-3036-1000": [
			{ type: "spawn", func: "marker", args: [false, 281, -500, 100, 60000000, false, ["達鲁坎", "安全区"]] },
			{ type: "spawn", func: "point", args: [513, 261, 500, 100, 60000000] }
		],		
		"rb-3036-1000": [{ type: "func", func: () => enrage = 1 },{ type: "func", func: () => start_enraged_time_A = new Date() },{ type: "text", sub_type: "message", message: "boss愤怒" }],
		"re-3036-1000": [{ type: "func", func: () => enrage = 0 },{ type: "text", sub_type: "message", message: "愤怒结束" }],			
		"nd-3036-1001": [{ type: "stop_timers" },{ type: "despawn_all" }],
		"s-3036-1001-1112-0": [{ type: "text", sub_type: "message", message: "后跳" }],
		"nd-3036-1000": [{ type: "stop_timers" },{ type: "despawn_all" }],
		"h-3036-1000-100": [{ type: "func", func: () => hp_79 = 0 }],			
		"h-3036-1000-94": [{ type: "text", sub_type: "message", message: "---------------94%----------------" }],		
		"h-3036-1000-79": [{ type: "text", sub_type: "message", message: "---------------79%----------------" }, { type: "func", func: () => hp_79 = 1 }],
		"h-3036-1000-35": [{ type: "text", sub_type: "message", message: "---------------注意倒计时--------------" }],	
		"h-3036-1000-34": [{ type: "text", sub_type: "message", message: "---------------第三层缩圈准备--------------" }],			
		"h-3036-1000-65": [{ type: "text", sub_type: "message", message: "----------------第二层缩圈准备--------------" }],	
		
		"s-3036-1000-1102-0": [{ type: "func", func: () => back_time = new Date() }],
		"s-3036-1000-1101-0": [{ type: "func", func: boss_backattack }],
		"s-3036-1000-2102-0": [{ type: "func", func: () => back_time = new Date() }],
		"s-3036-1000-2101-0": [{ type: "func", func: boss_backattack }],		
		"s-3036-1000-1103-0": [{ type: "func", func: boss_backattack_event }],//1103,1106,
		"s-3036-1000-1106-0": [{ type: "func", func: boss_backattack_event }],
		"s-3036-1000-1112-0": [{ type: "text", sub_type: "message", message: "后退" }],
		
		"s-3036-1000-1114-0": [{ type: "text", sub_type: "message", message: "隐形火坑" },			
			                   { type: "spawn", func: "vector", args: [912, 90, 150, 0, 1300, 0, 5830]},
                               { type: "spawn", func: "vector", args: [912, 90, 75, 0, 1300, 0, 5830]},
                               { type: "spawn", func: "vector", args: [912, 0, 0, 0, 1300, 0, 5830]},							   
			                   { type: "spawn", func: "vector", args: [912, 270, 75, 0, 1300, 0, 5830]},
                               { type: "spawn", func: "vector", args: [912, 270, 150, 0, 1300, 0, 5830]}],		//6830    5830ms
		"s-3036-1000-2114-0": [{ type: "text", sub_type: "message", message: "隐形火坑" },
			                   { type: "spawn", func: "vector", args: [912, 90, 150, 0, 1300, 0, 5830]},
                               { type: "spawn", func: "vector", args: [912, 90, 75, 0, 1300, 0, 5830]},
                               { type: "spawn", func: "vector", args: [912, 0, 0, 0, 1300, 0, 5830]},							   
			                   { type: "spawn", func: "vector", args: [912, 270, 75, 0, 1300, 0, 5830]},
                               { type: "spawn", func: "vector", args: [912, 270, 150, 0, 1300, 0, 5830]}],		//6830    5830ms		
		"s-3036-1000-1117-0": [{ type: "text", sub_type: "message", message: "前方" }],
		"s-3036-1000-1118-0": [{ type: "text", sub_type: "message", message: "砍击| 闪" },
			                   { type: "spawn", func: "semicircle", args: [0, 60, 912, 0, 0, 15, 60, 0, 2000] },		
			                   { type: "spawn", func: "semicircle", args: [0, 55, 912, 0, 0, 15, 160, 0, 2000] },
			                   { type: "spawn", func: "semicircle", args: [0, 45, 912, 0, 0, 10, 250, 0, 2000] },
			                   { type: "spawn", func: "semicircle", args: [0, 45, 912, 0, 0, 10, 340, 0, 2000] },
							   { type: "spawn", func: "semicircle", args: [300, 360, 912, 0, 0, 15, 60, 0, 2000] },			
							   { type: "spawn", func: "semicircle", args: [305, 360, 912, 0, 0, 15, 160, 0, 2000] },
							   { type: "spawn", func: "semicircle", args: [310, 360, 912, 0, 0, 10, 250, 0, 2000] },
							   { type: "spawn", func: "semicircle", args: [315, 360, 912, 0, 0, 10, 340, 0, 2000] }],
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
		                       { type: "spawn", func: "circle", args: [false, 553, 0, 0, 6, 430, 0, 6000]}],  //650	
		"s-3036-1000-1806-0": [{ type: "text", sub_type: "message", message: "内" },	
                               { type: "text", sub_type: "message", delay: 2100, message: "中" },	
                               { type: "text", sub_type: "message", delay: 3050, message: "全 | 内" },								   
		                       { type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 250, 0, 6000]},
		                       { type: "spawn", func: "circle", args: [false, 553, 0, 0, 6, 430, 0, 6000]}], 
		"s-3036-1000-1801-0": [{ type: "text", sub_type: "message", message: "----沉默------" }],
		"s-3036-1000-2115-0": [{ type: "text", sub_type: "message", delay: 3200,  message: "闪" },
		                       { type: "text", sub_type: "message", message: "3" },		
		                       { type: "text", sub_type: "message", delay: 1000,  message: "2" },
		                       { type: "text", sub_type: "message", delay: 2000,  message: "1" }],		
		"s-3036-1000-1115-0": [{ type: "text", sub_type: "message", delay: 3200,  message: "闪" },
		                       { type: "text", sub_type: "message", message: "3" },		
		                       { type: "text", sub_type: "message", delay: 1000,  message: "2" },
		                       { type: "text", sub_type: "message", delay: 2000,  message: "1" }],			
		"s-3036-1000-2103-0": [{ type: "func", func: boss_backattack_event }],
		"s-3036-1000-2106-0": [{ type: "func", func: boss_backattack_event }],
		"s-3036-1000-2112-0": [{ type: "text", sub_type: "message", message: "后退" }],	
		"s-3036-1000-2117-0": [{ type: "text", sub_type: "message", message: "前方 " }],
		"s-3036-1000-2118-0": [{ type: "text", sub_type: "message", message: "砍击| 闪" },
								{ type: "spawn", func: "semicircle", args: [0, 60, 912, 0, 0, 15, 60, 0, 2000] },		
								{ type: "spawn", func: "semicircle", args: [0, 55, 912, 0, 0, 15, 160, 0, 2000] },
								{ type: "spawn", func: "semicircle", args: [0, 45, 912, 0, 0, 10, 250, 0, 2000] },
								{ type: "spawn", func: "semicircle", args: [0, 45, 912, 0, 0, 10, 340, 0, 2000] },
								{ type: "spawn", func: "semicircle", args: [300, 360, 912, 0, 0, 15, 60, 0, 2000] },			
								{ type: "spawn", func: "semicircle", args: [305, 360, 912, 0, 0, 15, 160, 0, 2000] },
								{ type: "spawn", func: "semicircle", args: [310, 360, 912, 0, 0, 10, 250, 0, 2000] },
								{ type: "spawn", func: "semicircle", args: [315, 360, 912, 0, 0, 10, 340, 0, 2000] }],		
		"qb-3036-1000-3036039": [{ type: "func", func: skilld_event, args: [3036039]},{ type: "text", sub_type: "message", delay: 75000,  message: (hp_79 ? '4连劈准备就绪!!!' : '3连劈准备就绪!!!') }],		
		"qb-3036-1000-3036040": [{ type: "func", func: skilld_event, args: [3036040]}],			
		"qb-3036-1000-3036041": [{ type: "func", func: skilld_event, args: [3036041]}],					
	};
};