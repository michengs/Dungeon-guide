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
		}

		timer_two = dispatch.setTimeout(() => counter = 0, wasEnraged ? 2000 : 2350);
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
		}, 2000);	
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
		
		"h-3036-1000-79": [{ type: "func", func: start_boss }],
		
	//	"s-3036-1000-1101-0": [{ type: "text", sub_type: "message", message: "다르칸B_왼쪽 평타_atk01_start+atk01_End_노말1101 " }],
	//	"s-3036-1000-1102-0": [{ type: "text", sub_type: "message", message: "다르칸B_오른쪽 평타_atk02_start+atk02_End_노말 1102" }],
		"s-3036-1000-1103-0": [{ type: "func", func: boss_backattack_event }],//1103,1106,
	//	"s-3036-1000-1104-0": [{ type: "text", sub_type: "message", message: "点名" }],
	//	"s-3036-1000-1105-0": [{ type: "func", func: boss_backattack_event }],
		"s-3036-1000-1106-0": [{ type: "func", func: boss_backattack_event }],
		
	//	"s-3036-1000-1107-0": [{ type: "text", sub_type: "message", message: "다르칸B_2지선다형(오른쪽)_연계1_atk02_loop+atk02_Comboatk01_노말1107 " }],
			
	//	"s-3036-1000-1108-0": [{ type: "func", func: boss_backattack_event }],
	//	"s-3036-1000-1109-0": [{ type: "text", sub_type: "message", message: "다르칸B_왼쪽 라운드 어택_roundAtk01_노말 1109" }],
	//	"s-3036-1000-1110-0": [{ type: "text", sub_type: "message", message: "다르칸B_오른쪽 라운드 어택_roundAtk02_노말 1110" }],
	//	"s-3036-1000-1111-0": [{ type: "text", sub_type: "message", message: "后方攻击" }],
		"s-3036-1000-1112-0": [{ type: "text", sub_type: "message", message: "后退" }],
	//	"s-3036-1000-1113-0": [{ type: "text", sub_type: "message", message: "다르칸B_전진 베기_heavyatk01_노말1113 " }],
	//	"s-3036-1000-1114-0": [{ type: "text", sub_type: "message", message: "다르칸B_원거리 칼 던지기_UltraAtk01_노말 1114" }],
	//	"s-3036-1000-1115-0": [{ type: "text", sub_type: "message", message: "다르칸B_원거리 누킹(발사동작)_longAtk_Start+longAtk_Loop+longAtk_End_노말 1115" }],
	//	"s-3036-1000-1116-0": [{ type: "text", sub_type: "message", message: "다르칸B_원거리 누킹(발사체)_노말 1116" }],
		"s-3036-1000-1117-0": [{ type: "text", sub_type: "message", message: "前方" }],
		"s-3036-1000-1118-0": [{ type: "text", sub_type: "message", message: "砍击| 闪" }],
	//	"s-3036-1000-1119-0": [{ type: "text", sub_type: "message", message: "다르칸B_2지선다형(왼쪽)_연계1_atk01_loop+atk01_Comboatk01_노말 1119" }],
	//	"s-3036-1000-1120-0": [{ type: "text", sub_type: "message", message: "다르칸B_2지선다형(오른쪽)_연계1_atk02_loop+atk02_Comboatk01_노말1120 " }],
	//	"s-3036-1000-1121-0": [{ type: "text", sub_type: "message", message: "다르칸B_2지선다형_내네찢_연계전용 1121" }],
	//	"s-3036-1000-1122-0": [{ type: "text", sub_type: "message", message: "다르칸B_2지선다형_내네찢_연계전용21122 " }],
	//	"s-3036-1000-1150-0": [{ type: "text", sub_type: "message", message: "다르칸B_액티브무브_activeMove_Start+activeMove_Loop+activeMove_End_노말 1150" }],
	//	"s-3036-1000-1301-0": [{ type: "text", sub_type: "message", message: "다르칸B_광역 디버프_modealram_Start+modealram_Loop+modealram_End 1301" }],
		"s-3036-1000-1302-0": [{ type: "text", sub_type: "message", message: "AOE" },
			                   { type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 500, 100, 6000]}],
		"s-3036-1000-1303-0": [{ type: "text", sub_type: "message", message: "旋转攻击" }],
	//	"s-3036-1000-1304-0": [{ type: "text", sub_type: "message", message: "다르칸B_암흑 폭발(시작)_UltraAtk_Start1304 " }],
	//	"s-3036-1000-1305-0": [{ type: "text", sub_type: "message", message: "다르칸B_암흑 폭발(종료)_UltraAtk_End 1305" }],
	//	"s-3036-1000-1306-0": [{ type: "text", sub_type: "message", message: "다르칸B_다중 타겟 발사체 시전(발사동작)_Command 1306" }],
	//	"s-3036-1000-1307-0": [{ type: "text", sub_type: "message", message: "다르칸B_다중 타겟 발사체 시전(발사체)_Command1307 " }],
	//	"s-3036-1000-1308-0": [{ type: "text", sub_type: "message", message: "다르칸B_암흑 폭발(1번)_UltraAtk_Loop1308 " }],
	//	"s-3036-1000-1309-0": [{ type: "text", sub_type: "message", message: "다르칸B_암흑 폭발(2번)_UltraAtk_Loop1309 " }],
	//	"s-3036-1000-1310-0": [{ type: "text", sub_type: "message", message: "다르칸B_암흑 폭발(3번)_UltraAtk_Loop1310 " }],
	//	"s-3036-1000-1311-0": [{ type: "text", sub_type: "message", message: "다르칸B_암흑 폭발(4번)_UltraAtk_Loop1311 " }],
	//	"s-3036-1000-1312-0": [{ type: "text", sub_type: "message", message: "다르칸B_하수인소환모션_환탑용_modealram_Start+modealram_Loop+modealram_End1312 " }],
	//	"s-3036-1000-1399-0": [{ type: "text", sub_type: "message", message:"(인던전용)다르칸B_소멸연출용_modealram_Start+modealram_Loop+modealram_End1313 " }],
		
		"s-3036-1000-1401-0": [{ type: "func", func: skilld_event, args: [1401] }],
			
		"s-3036-1000-1402-0": [{ type: "func", func: skilld_event, args: [1402] }],
							   
	//	"s-3036-1000-1403-0": [{ type: "text", sub_type: "message", message: "그로기1403 " }],
	//	"s-3036-1000-1404-0": [{ type: "text", sub_type: "message", message: "보호막패턴1404 " }],
	//	"s-3036-1000-1405-0": [{ type: "text", sub_type: "message", message: "wait 1405" }],
	//	"s-3036-1000-1406-0": [{ type: "text", sub_type: "message", message:"(인던전용)칼던지기_도트존 1406" }],
	//	"s-3036-1000-1407-0": [{ type: "text", sub_type: "message", message: "Hard_10%_광폭화그로기1407 " }],
		
		"s-3036-1000-1701-0": [{ type: "func", func: skilld_event, args: [1701] }],//右
							   
		"s-3036-1000-1702-0": [{ type: "func", func: skilld_event, args: [1702] }],//左
							   
	//	"s-3036-1000-1801-0": [{ type: "text", sub_type: "message", message: "다르칸B_광역 디버프_modealram_Start+modealram_Loop+modealram_End1801 " }],
	//	"s-3036-1000-1802-0": [{ type: "text", sub_type: "message", message: "광역 연계 근중원테스트용 1802" }],
	//	"s-3036-1000-1803-0": [{ type: "text", sub_type: "message", message: "광역 연계 원중근테스트용1803 " }],
	//	"s-3036-1000-1804-0": [{ type: "text", sub_type: "message", message: "테스트용1, 2타1804 " }],
		"s-3036-1000-1805-0": [{ type: "text", sub_type: "message", message: "中-外-全-内" },
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 20, 50, 0, 1620]},//内
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 12, 150, 10, 1620]},								   							   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 8, 250, 0, 1620]},
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 12, 450, 0, 1620]},//S外						   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 10, 550, 0, 1620]},								   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 8, 650, 0, 1620]},						
				               { type: "spawn", func: "circle", args: [false, 912, 0, 0, 19,  250, 1620, 900]}, //外						   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 17, 350, 1620, 900]},	
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 13, 450, 1620, 900]},							   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 10, 550, 1620, 900]},						   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 7, 650, 1620, 1900]},						
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 20,  50, 2520, 1830]}, //全						   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 18, 150, 2520, 1830]},							   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 16, 250, 2520, 1830]},							   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 14, 350, 2520, 1830]},						   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 12, 450, 2520, 1830]},					   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 10, 550, 2520, 1830]},								   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 8, 650, 2520, 1830]},			
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 20, 50, 4350, 2000]},//内
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 12, 150, 4350, 2000]},								   							   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 8, 250, 4350, 2000]}],  //650
					
		"s-3036-1000-1806-0": [{ type: "text", sub_type: "message", message: "外-中-全-外" },//中 2120 ,3020 4850ms        1620 2520  4350 

				               { type: "spawn", func: "circle", args: [false, 912, 0, 0, 19,  250, 0, 1620]}, //外						   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 17, 350, 0, 1620]},	
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 13, 450, 0, 1620]},							   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 10, 550, 0, 1620]},						   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 7, 650, 0, 1620]},
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 20, 50, 1620, 900]},//内
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 12, 150, 1620, 900]},								   							   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 8, 250, 1620, 900]},
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
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 19,  250, 4350, 2000]}, //外					   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 17, 350, 4350, 2000]},							   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 12, 450, 4350, 2000]},					   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 10, 550, 4350, 2000]},						   
		                       { type: "spawn", func: "circle", args: [false, 912, 0, 0, 7, 650, 4350, 2000]}],
			
	//	"s-3036-1000-2101-0": [{ type: "text", sub_type: "message", message: "다르칸B_왼쪽 평타_atk01_start+atk01_End_분노 " }],
	//	"s-3036-1000-2102-0": [{ type: "text", sub_type: "message", message: "다르칸B_오른쪽 평타_atk02_start+atk02_End_분노 " }],
		"s-3036-1000-2103-0": [{ type: "func", func: boss_backattack_event }],
	//	"s-3036-1000-2104-0": [{ type: "text", sub_type: "message", message: "다르칸B_2지선다형(왼쪽)_연계1_atk01_loop+atk01_Comboatk01_분노 " }],
	//	"s-3036-1000-2105-0": [{ type: "func", func: boss_backattack_event }],
		"s-3036-1000-2106-0": [{ type: "func", func: boss_backattack_event }],
	//	"s-3036-1000-2107-0": [{ type: "text", sub_type: "message", message: "다르칸B_2지선다형(오른쪽)_연계1_atk02_loop+atk02_Comboatk01_분노 " }],
	//	"s-3036-1000-2108-0": [{ type: "func", func: boss_backattack_event }],
	//	"s-3036-1000-2109-0": [{ type: "text", sub_type: "message", message: "다르칸B_왼쪽 라운드 어택_roundAtk01_분노 " }],
	//	"s-3036-1000-2110-0": [{ type: "text", sub_type: "message", message: "다르칸B_오른쪽 라운드 어택_roundAtk02_분노 " }],
	//	"s-3036-1000-2111-0": [{ type: "text", sub_type: "message", message: "后方攻击" }],
		"s-3036-1000-2112-0": [{ type: "text", sub_type: "message", message: "后退" }],
	//	"s-3036-1000-2113-0": [{ type: "text", sub_type: "message", message: "다르칸B_전진 베기_heavyatk01_분노 " }],
	//	"s-3036-1000-2114-0": [{ type: "text", sub_type: "message", message: "点名" }],
	//	"s-3036-1000-2115-0": [{ type: "text", sub_type: "message", message: "다르칸B_원거리 누킹(발사동작)_longAtk_Start+longAtk_Loop+longAtk_End_분노 " }],
	//	"s-3036-1000-2116-0": [{ type: "text", sub_type: "message", message: "다르칸B_원거리 누킹(발사체)_분노 " }],
		"s-3036-1000-2117-0": [{ type: "text", sub_type: "message", message: "前方 " }],
		"s-3036-1000-2118-0": [{ type: "text", sub_type: "message", message: "砍击| 闪" }],
	//	"s-3036-1000-2119-0": [{ type: "text", sub_type: "message", message: "다르칸B_2지선다형(왼쪽)_연계1_atk01_loop+atk01_Comboatk01_분노 " }],
	//	"s-3036-1000-2120-0": [{ type: "text", sub_type: "message", message: "다르칸B_2지선다형(오른쪽)_연계1_atk02_loop+atk02_Comboatk01_분노 " }],
	//	"s-3036-1000-2121-0": [{ type: "text", sub_type: "message", message: "다르칸B_2지선다형_내네찢_연계전용 " }],
	//	"s-3036-1000-2122-0": [{ type: "text", sub_type: "message", message: "다르칸B_2지선다형_내네찢_연계전용2 " }],
	//	"s-3036-1000-2150-0": [{ type: "text", sub_type: "message", message: "다르칸B_액티브무브_activeMove_Start+activeMove_Loop+activeMove_End_분노" }]		
	};
};