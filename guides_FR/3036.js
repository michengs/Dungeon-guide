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
     total_time2 = null;		 
	const mech_messages = {
		0: { message: "3 coups de ligne" },
		1: { message: "4 coups de ligne"}
	};	
	const mech_num = {
		1: { degree1: 0, degree2: 180},
		0: { degree1: 180, degree2: 360}
	};
	const mech_direction = {
		0: { message: "A gauche" },
		1: { message: "À droite"}
	};		
	function boss_backattack_event() {
		dispatch.clearTimeout(time2);
		counter++;
		if (counter >= 2 && !Triple_Attack) {
			handlers.text({
				sub_type: "message",
				message: "À l’arrière"
			});
		}                                                                                   //1965
		time2 = dispatch.setTimeout(() => counter = 0, (enrage ==1) ? 2200  : 2500  );     //1980 2010 
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
            { type: "text", sub_type: "message", message:  (Triple_Attack ? `${mech_messages[hp_79].message}` + `${mech_direction[num].message}` : "2 coups de ligne" + `${mech_direction[num].message}`)	},			
			{ type: "spawn", func: "vector", args: [553, 358, 0, 180, 500, 100, 1500] },
			{ type: "spawn", func: "vector", args: [553, 358, 0, 0, 500, 100, 1500] },		
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
		"rb-3036-1000": [{ type: "func", func: () => enrage = 1 },{ type: "func", func: () => start_enraged_time_A = new Date() },{ type: "text", sub_type: "message", message: "La colère des patrons" }],
		"re-3036-1000": [{ type: "func", func: () => enrage = 0 },{ type: "text", sub_type: "message", message: "Fin de la colère" }],			
		"nd-3036-1001": [{ type: "stop_timers" },{ type: "despawn_all" }],
		"nd-3036-1000": [{ type: "stop_timers" },{ type: "despawn_all" }],
		"h-3036-1000-100": [{ type: "func", func: () => hp_79 = 0 }],		
		"h-3036-1000-94": [{ type: "text", sub_type: "message", message: "---------------94%----------------" }],		
		"h-3036-1000-79": [{ type: "text", sub_type: "message", message: "---------------79%----------------" }, { type: "func", func: () => hp_79 = 1 }],
		"s-3036-1000-1103-0": [{ type: "func", func: boss_backattack_event }],//1103,1106,
		"s-3036-1000-1106-0": [{ type: "func", func: boss_backattack_event }],
		"s-3036-1000-1112-0": [{ type: "text", sub_type: "message", message: "En arrière" }],
		"s-3036-1000-1117-0": [{ type: "text", sub_type: "message", message: "Vers l’avant" }],
		"s-3036-1000-1118-0": [{ type: "text", sub_type: "message", message: "Couper le coup| trucs" }],
		"s-3036-1000-1302-0": [{ type: "text", sub_type: "message", message: "AOE" },
			                   { type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 500, 100, 6000]}],
		"s-3036-1000-1303-0": [{ type: "text", sub_type: "message", message: "Attaque par rotation" }],
		"s-3036-1000-1401-0": [{ type: "func", func: skilld_event, args: [1401] }],
		"s-3036-1000-1402-0": [{ type: "func", func: skilld_event, args: [1402] }],
		"s-3036-1000-1701-0": [{ type: "func", func: skilld_event, args: [1701] }],//右
		"s-3036-1000-1702-0": [{ type: "func", func: skilld_event, args: [1702] }],//左
		"s-3036-1000-1805-0": [{ type: "text", sub_type: "message", message: "dans" },	
                               { type: "text", sub_type: "message", delay: 2100, message: "Dans le" },	
                               { type: "text", sub_type: "message", delay: 3050, message: "L’échelle des galiléennes" },							   
		                       { type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 250, 0, 6000]},
		                       { type: "spawn", func: "circle", args: [false, 553, 0, 0, 6, 450, 0, 6000]}],  //650	
		"s-3036-1000-1806-0": [{ type: "text", sub_type: "message", message: "Dans le" },	
                               { type: "text", sub_type: "message", delay: 2100, message: "dans" },	
                               { type: "text", sub_type: "message", delay: 3050, message: "À l’échelle du galiléennes" },								   
		                       { type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 250, 0, 6000]},
		                       { type: "spawn", func: "circle", args: [false, 553, 0, 0, 6, 450, 0, 6000]}], 
		"s-3036-1000-1801-0": [{ type: "text", sub_type: "message", message: "----Le silence------" }],
		"s-3036-1000-2115-0": [{ type: "text", sub_type: "message", delay: 3500,  message: "trucs" }],		
		"s-3036-1000-1115-0": [{ type: "text", sub_type: "message", delay: 3500,  message: "trucs" }],			
		"s-3036-1000-2103-0": [{ type: "func", func: boss_backattack_event }],
		"s-3036-1000-2106-0": [{ type: "func", func: boss_backattack_event }],
		"s-3036-1000-2112-0": [{ type: "text", sub_type: "message", message: "En arrière" }],	
		"s-3036-1000-2117-0": [{ type: "text", sub_type: "message", message: "Vers l’avant " }],
		"s-3036-1000-2118-0": [{ type: "text", sub_type: "message", message: "Couper le coup| trucs" }],		
		"qb-3036-1000-3036039": [{ type: "func", func: skilld_event, args: [3036039]}],		
		"qb-3036-1000-3036040": [{ type: "func", func: skilld_event, args: [3036040]}],			
		"qb-3036-1000-3036041": [{ type: "func", func: skilld_event, args: [3036041]}],					
	};
};