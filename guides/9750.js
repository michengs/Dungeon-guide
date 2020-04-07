// 火神
//made by michengs
let notice_guide = true;
let player, entity, library, effect;
let	shining = false;
let	skill = 0;
let	print = false;
let notice = true; 
let notices = true;
let	printend = false;
function guid_voice(handlers) {   
if(notice_guide) {
handlers['text']({
"sub_type": "message",
"delay": 2000,
"message_TW": "获取更多信息 proxy频道输入:補助 help"
});

handlers['text']({
"sub_type": "notification",
"delay": 2000,
"message_TW": "获取更多信息 proxy频道输入:補助 help"
});
}
notice_guide = false;

}	
	function  applyDistance(loc, distance, degrees) {
        let r = loc.w; //(loc.w / 0x8000) * Math.PI;
     	let	rads = (degrees * Math.PI/180);
	    let	finalrad = r - rads;
        loc.x += Math.cos(finalrad) * distance;
        loc.y += Math.sin(finalrad) * distance;
        return loc;
    }
function SpawnThingobject( degrees, radius, delay, times, handlers, event, entity ) {
	let shield_loc = entity['loc'].clone();
	shield_loc.w = entity['loc'].w;			
   let angle =  Math.PI * degrees / 180 
        handlers['spawn']({
			"sub_type": "build_object",
        	"id": 1,
			"delay": delay,			
        	"sub_delay": times,
        	"distance": radius,
        	"offset": angle,
			"ownerName": "巴哈勒",
			"message": "王坐方向"
        }, {loc: shield_loc});  
}

	
// 	召喚光柱 ，告示牌提示（  角度 距离   延迟时间 时间）
function SpawnThing( degrees, radius, delay, times, handlers, event, entity ) {
	let shield_loc = entity['loc'].clone();
	shield_loc.w = entity['loc'].w;			
   let angle =  Math.PI * degrees / 180 
        handlers['spawn']({
			"sub_type": "build_object",
        	"id": 1,
			"delay": delay,			
        	"sub_delay": times,
        	"distance": radius,
        	"offset": angle,
			"ownerName": "SAFE SPOT",
			"message": "SAFE"
        }, {loc: shield_loc});  
        handlers['spawn']({
			"sub_type": "item",
        	"id": 88850,
			"delay": delay,			
        	"sub_delay": times,
        	"distance": radius,
        	"offset": angle
        }, {loc: shield_loc});	
}
// 	召喚点 ，提示（ 提示标志 角度 距离   延迟时间 时间）
function Spawnitem( item,degrees, radius, delay, times, handlers, event, entity ) {
	let shield_loc = entity['loc'].clone();
	shield_loc.w = entity['loc'].w;			
   let angle =  Math.PI * degrees / 180 
        handlers['spawn']({
        	"id": item,
			"delay": delay,			
        	"sub_delay": times,
        	"distance": radius,
        	"offset": angle
        }, {loc: shield_loc});	
}

	//构建直线（提示标志 偏移角度 偏移距离  角度 最远距离   时间）
function Spawnitem1(item,degree,distance,angles, maxRadius, times, handlers, event, entity) {
	
	let shield_loc = entity['loc'].clone();
	shield_loc.w = entity['loc'].w;	
    let	degrees = 360 - degree;	
	applyDistance(shield_loc, distance, degrees);		
    let angle = angles * Math.PI/180
    for (let radius=50 ; radius<=maxRadius; radius+=50) {
        handlers['spawn']({
        	"id": item,
        	"sub_delay": times,
        	"distance": radius,
        	"offset": angle
        }, {loc: shield_loc});
    }
}

	//构建圆形范围提示    （提示标志  偏移角度 偏移距离 间隔 半径 延迟 时间）
function Spawnitem2(item,degree,distance, intervalDegrees, radius, delay, times, handlers, event, entity ) {
	let shield_loc = entity['loc'].clone();
	shield_loc.w = entity['loc'].w;
    let	degrees = 360 - degree;	
	applyDistance(shield_loc, distance, degrees);
    for (let angle = -Math.PI; angle <= Math.PI; angle +=  Math.PI * intervalDegrees / 180) {
        handlers['spawn']({
        	"id": item,
			"delay": delay,			
        	"sub_delay": times,
        	"distance": radius,
        	"offset": angle
        }, {loc: shield_loc});
    }
}


module.exports = {
	load(dispatch) {
		({ player, entity, library, effect } = dispatch.require.library);
	},
 "s-750-1001-1101-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "1101巨型虫植物前方触水攻击atk 01老马" }], 
 "s-750-1001-1102-0": [{"type": "text","sub_type": "message","message":  '_',"message_TW": "旋转攻击" }], 
 "s-750-1001-1103-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "1103巨型虫植物地板触水攻击heavyatk 01老马" }], 
 "s-750-1001-1104-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "1104巨型虫植物根传唤攻击longAtk 01老话" }], 
 "s-750-1001-1105-0": [{"type": "text","sub_type": "message","message":  '_',"message_TW": "远离" },
	                    {"type": "func","func": Spawnitem2.bind(null,445,0,0,8,375,100,4000)}], 
 "s-750-1001-1106-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "1106巨型虫植物右转攻击roundAtk 01老话" }], 
 "s-750-1001-1107-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "1107巨型虫植物左转攻击roundAtk 02" }], 
 "s-750-1001-1108-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "1108巨大食用物赞助动作1spSummon 01老话" }], 
 "s-750-1001-1109-0": [{"type": "text","sub_type": "message","message":  '_',"message_TW": "準備遠離" }], 
 "s-750-1001-1110-0": [{"type": "text","sub_type": "message","message":  '_',"message_TW": "擊倒" }], 
 "s-750-1001-1301-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "1301巨大虫植物大气wait" }], 
 "s-750-1001-2101-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "2101巨大虫植物前方触水攻击atk 01愤怒" }], 
 "s-750-1001-2102-0": [{"type": "text","sub_type": "message","message":  '_',"message_TW": "旋转攻击" }], 
 "s-750-1001-2103-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "2103巨型虫植物地板触水攻击heavyatk 01愤怒" }], 
 "s-750-1001-2104-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "2104巨型虫植物根传唤攻击longAtk 01愤怒" }], 
 "s-750-1001-2105-0": [{"type": "text","sub_type": "message","message":  '_',"message_TW": "远离" },
	                    {"type": "func","func": Spawnitem2.bind(null,445,0,0,8,375,100,4000)}], 
 "s-750-1001-2106-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "2106巨大虫植物右转攻击roundAtk 01愤怒" }], 
 "s-750-1001-2107-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "2107巨大食虫植物左转攻击roundAtk 02愤怒" }], 
 "s-750-1001-2108-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "2108巨大食用物赞助动作1spSummon 01愤怒" }], 
 "s-750-1001-2109-0": [{"type": "text","sub_type": "message","message":  '_',"message_TW": "準備遠離" }], 
 "s-750-1001-2110-0": [{"type": "text","sub_type": "message","message":  '_',"message_TW": "擊倒" }], 


//-----------------------------------------------------------------------------------------------------2
 "s-750-45016-1308-0": [{"type": "text","sub_type": "message","message":  '_',"message_TW": "圈" },
	                    {"type": "func","func": Spawnitem2.bind(null,445,0,0,8,375,100,6000)}], 

"s-750-1002-1101-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大马蜂右手攻击atk 01老话" }],
"s-750-1002-1102-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨型马蜂左手拍攻击atk 02老话" }],
"s-750-1002-1103-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "用巨型马蜂前脚进行蜂箱旋转攻击heavyAtkcomboatk 01" }],
"s-750-1002-1105-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "用巨型马蜂的前锋攻击heavyAtk 03老末" }],
"s-750-1002-1106-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨型马蜂空中飞来发射毒针的longAtk老马" }],
"s-750-1002-1107-0": [{"type": "text","sub_type": "message","message":  '_',"message_TW": "飞天攻击" }],
"s-750-1002-1109-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨型马蜂左转攻击roundAtk 01老话" }],
"s-750-1002-1110-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大马蜂右转攻击roundAtk 02" }],
"s-750-1002-1151-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨型马蜂活动activemove nove" }],
"s-750-1002-1201-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨型马蜂模式提醒modeAlarm" }],
"s-750-1002-1202-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨马蜂巢longMove nove" }],
"s-750-1002-1203-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨型马蜂grogy" }],
"s-750-1002-1204-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大马蜂逃跑runAway" }],
"s-750-1002-1301-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨型马蜂待机动作" }],
"s-750-1002-1302-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的马蜂不可保障的50%" }],
"s-750-1002-1303-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨型马蜂模式闹钟modeAlarm老马2" }],
"s-750-1002-1304-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨型马蜂模式提醒modeAlarm老马3" }],
"s-750-1002-1305-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨型马蜂模式提醒modeAlarm老话4" }],
"s-750-1002-1306-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨型马蜂模式提醒modeAlarm老马5" }],
"s-750-1002-1307-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨型马蜂模式提醒modeAlarm老马6" }],
"s-750-1002-1308-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨型马蜂模式提醒modeAlarm老马7" }],
"s-750-1002-1309-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大马蜂模式闹钟modeAlarm老话8" }],
"s-750-1002-1310-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨型马蜂模式提醒modeAlarm老马9" }],
"s-750-1002-1311-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨型马蜂模式提醒modeAlarm老马10" }],
"s-750-1002-2101-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大马蜂右手攻击atk 01愤怒" }],
"s-750-1002-2102-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大马蜂左手拍攻击atk 02愤怒" }],
"s-750-1002-2103-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "用巨型马蜂前脚进行蜂箱旋转攻击heavyAtkcomboatk 01" }],
"s-750-1002-2105-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "用巨型马蜂的前锋攻击heavyAtk 03愤怒" }],
"s-750-1002-2106-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨型马蜂空中飞来发射毒针的longAtk愤怒" }],
"s-750-1002-2107-0": [{"type": "text","sub_type": "message","message":  '_',"message_TW": "飞天攻击" }],
"s-750-1002-2109-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨型马蜂左转攻击roundAtk 01愤怒" }],
"s-750-1002-2110-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大马蜂右转攻击roundAtk 02愤怒" }],
"s-750-1002-2151-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨型马蜂活动activeMove愤怒" }],
"s-750-1002-2201-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨型马蜂模式提醒modeAlarm愤怒" }],
"s-750-1002-2202-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的马蜂longMove愤怒" }],
"s-750-1002-2203-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨型马蜂grogy" }],
"s-750-1002-2204-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大马蜂逃跑runAway" }],
"s-750-1002-2301-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨型马蜂待机动作" }],
"s-750-1002-2302-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的马蜂不可保障的50%" }],					
 "s-750-1002-1108-0": [{"type": "text","sub_type": "message","message":  '_',"message_TW": "壓人" }], 
 "s-750-1002-2108-0": [{"type": "text","sub_type": "message","message":  '_',"message_TW": "壓人" }], 
 "s-750-1002-2104-0": [{"type": "text","sub_type": "message","message":  '_',"message_TW": "拉人" },
                      {"type": "text","sub_type": "message","delay": 3000,"message":  'Perfect Defense',"message_TW": "閃避" }],  
 "s-750-1002-1104-0": [{"type": "text","sub_type": "message","message":  '_',"message_TW": "拉人" },
                      {"type": "text","sub_type": "message","delay": 3000,"message":  'Perfect Defense',"message_TW": "閃避" }],
					  
					  
"s-750-1003-1101-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的金龟角攻击Atk 01老马" }],
"s-750-1003-1102-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的金龟角角角拍Atk 02" }],
"s-750-1003-1103-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的金龟子下角拍发射体老马" }],
"s-750-1003-1104-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大金龟左面攻击roundAtk 01老马" }],
"s-750-1003-1105-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的金龟右面攻击roundAtk 02" }],
"s-750-1003-1106-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的金龟攻击空中攻击heavyatk01comboatk 01老话" }],
"s-750-1003-1107-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大金龟粉尘攻击heavyatk01comboatk 02老话" }],
"s-750-1003-1108-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的金龟前方石堆longAtk 01老马" }],
"s-750-1003-1109-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的金龟前方石堆发射体longAtk 01老马" }],
"s-750-1003-1110-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "掷巨金龟追踪型石块longAtk 02" }],
"s-750-1003-1111-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的金龟抛出追踪型石块的发射体longAtk 02匹马" }],
"s-750-1003-1112-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大金龟愤怒时奋进攻击modealarm" }],
"s-750-1003-1113-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大金龟部下Monster spAtk01End 01" }],
"s-750-1003-1114-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的金龟攻击气体spatk02End 02" }],
"s-750-1003-1151-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的金龟是Active activetiveMove" }],
"s-750-1003-1201-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大金龟长款MongMove nove" }],
"s-750-1003-1202-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的金龟grogy" }],
"s-750-1003-1203-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大金龟逃跑runAway" }],
"s-750-1003-1204-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大金龟2招待期" }],
"s-750-1003-1205-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的金龟扑通" }],
"s-750-1003-1301-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的金龟子光逆1打" }],
"s-750-1003-1302-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的金龟子光逆2打" }],
"s-750-1003-1303-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的金龟是光逆冲击3打" }],
"s-750-1003-1304-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的金龟攻击前方斯顿" }],
"s-750-1003-1305-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的金龟远程也攻击你" }],
"s-750-1003-1306-0": [{"type": "text","sub_type": "message","message":  '_',"message_TW": "远离" }],
"s-750-1003-1307-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的金龟3段落雷技能" }],
"s-750-1003-1308-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "诱发巨大金龟的反应" }],
"s-750-1003-1309-0": [{"type": "text","sub_type": "message","message":  '_',"message_TW": "破盾" }],
"s-750-1003-1310-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大金龟反应" }],
"s-750-1003-2101-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的金龟角攻击Atk 01愤怒" }],
"s-750-1003-2102-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的金龟角角角角拍Atk 02愤怒" }],
"s-750-1003-2103-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的金龟角角角下拍发射体愤怒" }],
"s-750-1003-2104-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大金龟左面攻击roundAtk 01愤怒" }],
"s-750-1003-2105-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大金龟右侧攻击roundAtk 02愤怒" }],
"s-750-1003-2106-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大金龟攻击空中轰炸攻击heavyatk01comboatk 01愤怒" }],
"s-750-1003-2107-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大金龟粉尘攻击heavyatk01comboatk 02愤怒" }],
"s-750-1003-2108-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的金龟前方石堆longAtk 01愤怒" }],
"s-750-1003-2109-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的金龟前方石堆发射体longAtk 01愤怒" }],
"s-750-1003-2110-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "将巨大的金龟抛出追踪型石头的longAtk 02愤怒" }],
"s-750-1003-2111-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的金龟抛出追踪型石块的发射体longAtk 02愤怒" }],
"s-750-1003-2112-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大金龟愤怒的攻击modealarm愤怒" }],
"s-750-1003-2113-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大金龟部下Monster spAtk01End 01" }],
"s-750-1003-2114-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大金龟攻击气体spatk02愤怒" }],
"s-750-1003-2151-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大金龟是Active activetiveMove愤怒" }],
"s-750-1003-2201-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大金龟长款MongMove愤怒" }],
"s-750-1003-2301-0": [{"type": "text","sub_type": "message","message":  '_',"message_TW": "打水晶柱" }],
"s-750-1003-2302-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的金龟子光逆2打" }],
"s-750-1003-2303-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的金龟是光逆冲击3打" }],
"s-750-1003-2304-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的金龟攻击前方斯顿" }],
"s-750-1003-2305-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的金龟远程也攻击你" }],
"s-750-1003-2306-0": [{"type": "text","sub_type": "message","message":  '_',"message_TW": "远离" }],
"s-750-1003-2307-0": [{"type": "text","sub_type": "MSG","message":  '_',"message_TW": "巨大的金龟3段落雷技能" }]					  
					  

};