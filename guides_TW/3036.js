// 困難_暴風的艾爾凱拉斯號
//
// made by michengs
module.exports = (dispatch, handlers, guide, lang) => {
	guide.type = SP;
	let status_tracker_started = false;	
	let Triple_Attack = false;
	let timer = null;
	let	steptwo = 0;
	let wasEnraged = false ;
    let boss_ID = null;
	let bossWord  = null;  
	let counter = 0;
	let timer_two = null;
	const mech_messages = {
		0: { message: "3连劈" },
		1: { message: "4连劈"}
	};
	function boss_backattack_event() {
		dispatch.clearTimeout(timer_two);
		counter++;
		if (counter >= 2) {
			handlers.text({
				sub_type: "message",
				message: "Back Attack",
				message_RU: "Задний",
				message_TW: "后方攻击"
			});
		}                                                                                   //1965
                                                                                           //1970     2040
		timer_two = dispatch.setTimeout(() => counter = 0, wasEnraged ? 2000 : 2040);     //1980 2010 
	}	 
	function start_boss() {
		steptwo = 1;
	}	 
	function start_dungeon_event() {
		function sBossGageInfo(event) {
			if (!boss_ID || (boss_ID!=event.id)) boss_ID = event.id;	
		}	
		function sInfo(event) {
			bossWord = parseInt(event.message.match(/\d+/ig));
		if ([3036039, 3036040, 3036041].includes(bossWord)) {			
		   Triple_Attack_FUN()  		
		}		
	   }	
		function enraged_change(event) {
	    if (boss_ID!=event.gameId) return;	
		if (event.enraged && !wasEnraged) {
			    wasEnraged = true
				handlers.text({
					sub_type: "message",
					message: "boss愤怒"
				});		
		} else  if(!event.enraged && wasEnraged) {
				    wasEnraged = false
				    handlers.text({
					sub_type: "message",
					message: "愤怒结束"
				});	
		}
	   }	
		if (!status_tracker_started) {
			dispatch.hook("S_NPC_STATUS", 2, enraged_change);
			dispatch.hook("S_BOSS_GAGE_INFO", 3, sBossGageInfo);
			dispatch.hook('S_QUEST_BALLOON', 1,  sInfo);
			status_tracker_started = true;
		}
	  }	
	function skilld_event(skillid, ent) {
		if ([1401, 1701,].includes(skillid)) {
		if (wasEnraged) {
			handlers.event([
            { type: "text", sub_type: "message", message:  (Triple_Attack ? `${mech_messages[steptwo].message}` : "2连劈击")	},			
			{ type: "spawn", func: "vector", args: [553, 358, 0, 180, 500, 100, 1500] },
			{ type: "spawn", func: "vector", args: [553, 358, 0, 0, 500, 100, 1500] },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 20, 160, 0, 1500] },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 12, 220, 0, 1500] },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 10, 300, 0, 1500] },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 8, 360, 0, 1500] }		
			]);
		}else{
			handlers.event([
            { type: "text", sub_type: "message", message:  (Triple_Attack ? `${mech_messages[steptwo].message}` : "2连劈击")	},			
			{ type: "spawn", func: "vector", args: [553, 358, 0, 180, 500, 100, 1500] },
			{ type: "spawn", func: "vector", args: [553, 358, 0, 0, 500, 100, 1500] },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 20, 160, 0, 1500] },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 12, 220, 0, 1500] },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 10, 300, 0, 1500] },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 8, 360, 0, 1500] }	
			]);				
		}
      }		
		if ([1402, 1702,].includes(skillid)) {
		if (!wasEnraged) {
			handlers.event([
            { type: "text", sub_type: "message", message:  (Triple_Attack ? `${mech_messages[steptwo].message}` : "2连劈击")	},			
			{ type: "spawn", func: "vector", args: [553, 358, 0, 180, 500, 100, 1500] },
			{ type: "spawn", func: "vector", args: [553, 358, 0, 0, 500, 100, 1500] },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 20, 160, 0, 1500] },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 12, 220, 0, 1500] },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 10, 300, 0, 1500] },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 8, 360, 0, 1500] }		
			]);
		}else{
			handlers.event([
            { type: "text", sub_type: "message", message:  (Triple_Attack ? `${mech_messages[steptwo].message}` : "2连劈击")	},			
			{ type: "spawn", func: "vector", args: [553, 358, 0, 180, 500, 100, 1500] },
			{ type: "spawn", func: "vector", args: [553, 358, 0, 0, 500, 100, 1500] },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 20, 160, 0, 1500] },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 12, 220, 0, 1500] },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 10, 300, 0, 1500] },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 8, 360, 0, 1500] }	
			]);				
		}
      }		
	}
	function Triple_Attack_FUN() {
		dispatch.clearTimeout(timer);		
		Triple_Attack = true;
		timer = dispatch.setTimeout(() => {
		Triple_Attack = false;
		}, 2800);	
	}	
	return {
		"ns-3036-1000": [{ type: "func", func: start_dungeon_event },
		                 { type: "text", sub_type: "speech", message: "进入熾熱艾爾凱拉斯號" }
		],	
		// 
		"nd-3036-1001": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"s-3036-1001-1112-0": [{ type: "text", sub_type: "message", message: "后跳" }],
		"nd-3036-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"h-3036-1000-94": [{ type: "text", sub_type: "message", message: "---------------94%----------------" }],		
		"h-3036-1000-79": [{ type: "text", sub_type: "message", message: "---------------79%----------------" },{ type: "func", func: start_boss }],
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
		"s-3036-1000-1805-0": [{ type: "text", sub_type: "message", message: "中-内-全-外" },
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 20, 50, 0, 1620]},//内
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 18, 150, 10, 1620]},								   							   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 16, 250, 0, 1620]},
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 12, 450, 0, 1620]},//S外						   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 10, 550, 0, 1620]},								   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 8, 650, 0, 1620]},						
				               { type: "spawn", func: "circle", args: [false, 912, 0, 0, 16,  250, 1620, 900]}, //外						   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 14, 350, 1620, 900]},	
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 12, 450, 1620, 900]},							   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 10, 550, 1620, 900]},						   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 8, 650, 1620, 1900]},						
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 20,  50, 2520, 1830]}, //全						   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 18, 150, 2520, 1830]},							   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 16, 250, 2520, 1830]},							   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 14, 350, 2520, 1830]},						   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 12, 450, 2520, 1830]},					   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 10, 550, 2520, 1830]},								   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 8, 650, 2520, 1830]},			
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 20, 50, 4350, 2000]},//内
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 18, 150, 4350, 2000]},								   							   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 16, 250, 4350, 2000]}],  //650
		"s-3036-1000-1806-0": [{ type: "text", sub_type: "message", message: "内-中-全-内" },//中 2120 ,3020 4850ms        1620 2520  4350 
				               { type: "spawn", func: "circle", args: [false, 912, 0, 0, 16,  250, 0, 1620]}, //外						   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 14, 350, 0, 1620]},	
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 12, 450, 0, 1620]},							   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 10, 550, 0, 1620]},						   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 8, 650, 0, 1620]},
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 20, 50, 1620, 900]},//内
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 18, 150, 1620, 900]},								   							   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 16, 250, 1620, 900]},
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 12, 450, 1620, 900]},//S外						   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 10, 550, 1620, 900]},								   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 8, 650, 1620, 900]},
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 20,  50, 2520, 1830]}, //全						   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 18, 150, 2520, 1830]},							   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 16, 250, 2520, 1830]},							   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 14, 350, 2520, 1830]},						   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 12, 450, 2520, 1830]},					   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 10, 550, 2520, 1830]},								   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 8, 650, 2520, 1830]},
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 16,  250, 4350, 2000]}, //外					   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 14, 350, 4350, 2000]},							   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 12, 450, 4350, 2000]},					   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 10, 550, 4350, 2000]},						   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 8, 650, 4350, 2000]}],
		"s-3036-1000-2103-0": [{ type: "func", func: boss_backattack_event }],
		"s-3036-1000-2106-0": [{ type: "func", func: boss_backattack_event }],
		"s-3036-1000-2112-0": [{ type: "text", sub_type: "message", message: "后退" }],
		"s-3036-1000-2117-0": [{ type: "text", sub_type: "message", message: "前方 " }],
		"s-3036-1000-2118-0": [{ type: "text", sub_type: "message", message: "砍击| 闪" }],
	};
};