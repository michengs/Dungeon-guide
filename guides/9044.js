﻿// 火神
//made by michengs
let notice_guide = true;
let player, entity, library, effect;
let	shining = false;
let	skill = 0;
let	print = false;
let notice = true; 
let notices = true;
let	printend = false;
const {SpawnMarker, SpawnVector, SpawnCircle,SpawnSemicircle} = require("../lib");
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
        	"id": 110684,
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
function skillds_event(skillids, handlers, event, ent, dispatch) {
if (skillids === 104 ) {
	    skill = 104
	//	setTimeout(() => skill = 0, 500);
		
}else if ( skillids === 134) {
	    skill = 134
	//	setTimeout(() => skill = 0, 500);
}else if ( skillids === 118) {
	    skill = 118
	//	setTimeout(() => skill = 0, 500);
}
}
function skilld_event(skillid, handlers, event, entity, dispatch) {
		
		if (skillid == 90442000) shining = true;
		if (skillid == 90442001) shining = false;
if (skillid == 90442304) {
handlers['text']({"sub_type": "message","message": "Stun","message_TW": "暈王"});	
handlers['text']({
"sub_type": "notification",
"message": "Stun",
"message_TW": "暈王"
});			
}
if (skillid == 90444001 && skill == 104)
	setTimeout(() => {
	if (shining){
		handlers['text']({"sub_type": "msgcp","message": "back","message_TW": "后砸"}); 
	    skill = 0; 
	    notices = false;
		setTimeout(() => notices = true, 1000);		
	}
	
	}, 500);
	
if (skillid == 90442000 && skill == 134) setTimeout(() => {
	if (shining){
		handlers['text']({"sub_type": "msgcp","message": "back","message_TW": "后砸"});
	    skill = 0; 
	    notices = false;
		setTimeout(() => notices = true, 1000);			
}
	}, 300);
if (skillid == 90444001 && skill == 118) setTimeout(() => { 
if (shining){ 
	
handlers['text']({"sub_type": "msgcp","message": "back","message_TW": "后砸"});
	    skill = 0; 
	    notices = false;
		setTimeout(() => notices = true, 1000);		
}
 }, 300);
	if (notice && skillid == 305 ) {
		notice = false;
handlers['text']({"sub_type": "message","message": "laser","message_TW": "注意镭射"});	
handlers['text']({
"sub_type": "notification",
"message": "laser",
"message_TW": "注意镭射!"
});			
		setTimeout(() => notice = true, 4000);
					}
if ( notices && skillid == 137 ) {
handlers['text']({"sub_type": "message","message": "back","message_TW": "后砸"});		
}
//左邊
if ([1121,2121].includes(skillid)) {   
	//SpawnVector(553,90,50,0,500,0,6000,handlers,event,entity);//右前直线
   // SpawnVector(553,90,50,180,500,0,6000,handlers,event,entity);//右后直线
	//SpawnVector(553,270,50,0,500,0,6000,handlers,event,entity);	//左前直线		  
	//SpawnVector(553,270,50,180,500,0,6000,handlers,event,entity);//左后直线
	//构建告示牌/高光   (1目标   2角度   3距离    4延迟  5持续时间 6光柱      7标签)
//function SpawnMarker(target, angle, distance, delay, duration, highlight, label, handlers, event, entity) {
	
	SpawnMarker(false,37,125,0,2533,false,["火神","safe"],handlers,event,entity);	
	SpawnMarker(false,143,125,0,2533,false,["火神","safe"],handlers,event,entity);
  //  SpawnVector(553,90,75,0,500,0,2533,handlers,event,entity);//右前直线
  //  SpawnVector(551,90,50,0,500,0,2533,handlers,event,entity);//右前直线	
	//SpawnVector(551,270,50,0,500,2533,800,handlers,event,entity);//左前直线	
   // SpawnVector(551,90,50,0,500,3333,800,handlers,event,entity);//右前直线		
	//SpawnVector(551,270,50,0,500,4116,2000,handlers,event,entity);//左前直线
	
  //  SpawnVector(553,90,75,180,500,0,2533,handlers,event,entity);//右后直线		
  //  SpawnVector(551,90,50,180,500,0,2533,handlers,event,entity);//右后直线	
	//SpawnVector(551,270,50,180,500,2533,800,handlers,event,entity);//左后直线	
  //  SpawnVector(551,90,50,180,500,3333,800,handlers,event,entity);//右后直线		
	//SpawnVector(551,270,50,180,500,4116,2000,handlers,event,entity);//左后直线	
	
	
    SpawnVector(553,90,50,0,500,0,6000,handlers,event,entity);//右前直线	
	SpawnVector(553,270,50,0,500,0,6000,handlers,event,entity);//左前直线	
    SpawnVector(553,90,50,180,500,0,6000,handlers,event,entity);//右后直线	
	SpawnVector(553,270,50,180,500,0,6000,handlers,event,entity);//左后直线	

	SpawnCircle(false,445,0,0,6,400,0,6000,handlers,event,entity);


	
    handlers['text']({"type": "text","sub_type": "message","delay": 60000,"message":  'Waves soon...',"message_TW": "半月准备"}); 	
}
//右邊
if ([1140,2140].includes(skillid)) {   
	SpawnMarker(false,323,125,0,2533,false,["火神","safe"],handlers,event,entity);	
	SpawnMarker(false,217,125,0,2533,false,["火神","safe"],handlers,event,entity);	
//    SpawnVector(553,270,75,0,500,0,2533,handlers,event,entity);//左前直线		
 //   SpawnVector(551,270,50,0,500,0,2533,handlers,event,entity);//左前直线	
//	SpawnVector(551,90,50,0,500,2533,800,handlers,event,entity);//右前直线	
 //   SpawnVector(551,270,50,0,500,3333,800,handlers,event,entity);//左前直线		
//	SpawnVector(551,90,50,0,500,4116,2000,handlers,event,entity);//右前直线	
  //  SpawnVector(553,270,75,180,500,0,2533,handlers,event,entity);//左后直线		
  //  SpawnVector(551,270,50,180,500,0,2533,handlers,event,entity);//左后直线	
//	SpawnVector(551,90,50,180,500,2533,800,handlers,event,entity);//右后直线	
 //   SpawnVector(551,270,50,180,500,3333,800,handlers,event,entity);//左后直线		
//	SpawnVector(551,90,50,180,500,4116,2000,handlers,event,entity);//右后直线
    SpawnVector(553,90,50,0,500,0,6000,handlers,event,entity);//右前直线	
	SpawnVector(553,270,50,0,500,0,6000,handlers,event,entity);//左前直线	
    SpawnVector(553,90,50,180,500,0,6000,handlers,event,entity);//右后直线	
	SpawnVector(553,270,50,180,500,0,6000,handlers,event,entity);//左后直线		
	SpawnCircle(false,445,0,0,6,400,0,6000,handlers,event,entity);
	
    handlers['text']({"type": "text","sub_type": "message","delay": 60000,"message":  'Waves soon...',"message_TW": "半月准备"}); 	
}
//2加速 123 142
//左邊
if ([1123,2123].includes(skillid)) {   
	SpawnMarker(false,37,125,0,2500,false,["火神","safe"],handlers,event,entity);	
	SpawnMarker(false,143,125,0,2500,false,["火神","safe"],handlers,event,entity);
  //  SpawnVector(553,90,75,0,500,0,2500,handlers,event,entity);//右前直线	
 //   SpawnVector(551,90,50,0,500,0,2500,handlers,event,entity);//右前直线	
//	SpawnVector(551,270,50,0,500,2500,500,handlers,event,entity);//左前直线	
  //  SpawnVector(551,90,50,0,500,3000,800,handlers,event,entity);//右前直线		
	//SpawnVector(551,270,50,0,500,3800,2000,handlers,event,entity);//左前直线
	
   // SpawnVector(553,90,75,180,500,0,2500,handlers,event,entity);//右后直线		
  //  SpawnVector(551,90,50,180,500,0,2500,handlers,event,entity);//右后直线	
	//SpawnVector(551,270,50,180,500,2500,500,handlers,event,entity);//左后直线	
  //  SpawnVector(551,90,50,180,500,3000,800,handlers,event,entity);//右后直线		
//	SpawnVector(551,270,50,180,500,3800,2000,handlers,event,entity);//左后直线	
    SpawnVector(553,90,50,0,500,0,6000,handlers,event,entity);//右前直线	
	SpawnVector(553,270,50,0,500,0,6000,handlers,event,entity);//左前直线	
    SpawnVector(553,90,50,180,500,0,6000,handlers,event,entity);//右后直线	
	SpawnVector(553,270,50,180,500,0,6000,handlers,event,entity);//左后直线	
	SpawnCircle(false,445,0,0,6,400,0,6000,handlers,event,entity);
    handlers['text']({"type": "text","sub_type": "notification","message":  '2',"message_TW": "2加速"}); 	
    handlers['text']({"type": "text","sub_type": "message","delay": 60000,"message":  'Waves soon...',"message_TW": "半月准备"}); 	
}
//右邊
if ([1142,2142].includes(skillid)) {   
	SpawnMarker(false,323,125,0,2500,false,["火神","safe"],handlers,event,entity);	
	SpawnMarker(false,217,125,0,2500,false,["火神","safe"],handlers,event,entity);	
  //  SpawnVector(553,270,75,0,500,0,2500,handlers,event,entity);//左前直线	
  //  SpawnVector(551,270,50,0,500,0,2500,handlers,event,entity);//左前直线	
//	SpawnVector(551,90,50,0,500,2500,500,handlers,event,entity);//右前直线	
  //  SpawnVector(551,270,50,0,500,3000,800,handlers,event,entity);//左前直线		
	//SpawnVector(551,90,50,0,500,3800,2000,handlers,event,entity);//右前直线
	
  //  SpawnVector(553,270,75,180,500,0,2500,handlers,event,entity);//左后直线		
  //  SpawnVector(551,270,50,180,500,0,2500,handlers,event,entity);//左后直线	
//	SpawnVector(551,90,50,180,500,2500,500,handlers,event,entity);//右后直线	
 //   SpawnVector(551,270,50,180,500,3000,800,handlers,event,entity);//左后直线		
//	SpawnVector(551,90,50,180,500,3800,2000,handlers,event,entity);//右后直线
    SpawnVector(553,90,50,0,500,0,6000,handlers,event,entity);//右前直线	
	SpawnVector(553,270,50,0,500,0,6000,handlers,event,entity);//左前直线	
    SpawnVector(553,90,50,180,500,0,6000,handlers,event,entity);//右后直线	
	SpawnVector(553,270,50,180,500,0,6000,handlers,event,entity);//左后直线		
	SpawnCircle(false,445,0,0,6,400,0,6000,handlers,event,entity);
    handlers['text']({"type": "text","sub_type": "notification","message":  '2',"message_TW": "2加速"}); 
    handlers['text']({"type": "text","sub_type": "message","delay": 60000,"message":  'Waves soon...',"message_TW": "半月准备"}); 	
}
//3加速 122 141
//左邊
if ([1122,2122].includes(skillid)) {   
	SpawnMarker(false,37,125,0,2533,false,["火神","safe"],handlers,event,entity);	
	SpawnMarker(false,143,125,0,2533,false,["火神","safe"],handlers,event,entity);
//    SpawnVector(553,90,75,0,500,0,2533,handlers,event,entity);//右前直线
 //   SpawnVector(551,90,50,0,500,0,2533,handlers,event,entity);//右前直线	
//	SpawnVector(551,270,50,0,500,2533,800,handlers,event,entity);//左前直线	
 //   SpawnVector(551,90,50,0,500,3333,500,handlers,event,entity);//右前直线		
//	SpawnVector(551,270,50,0,500,3833,2000,handlers,event,entity);//左前直线
	
 //   SpawnVector(553,90,75,180,500,0,2533,handlers,event,entity);//右后直线	
 //   SpawnVector(551,90,50,180,500,0,2533,handlers,event,entity);//右后直线	
//	SpawnVector(551,270,50,180,500,2533,800,handlers,event,entity);//左后直线	
 //   SpawnVector(551,90,50,180,500,3333,500,handlers,event,entity);//右后直线		
//	SpawnVector(551,270,50,180,500,3833,2000,handlers,event,entity);//左后直线	
    SpawnVector(553,90,50,0,500,0,6000,handlers,event,entity);//右前直线	
	SpawnVector(553,270,50,0,500,0,6000,handlers,event,entity);//左前直线	
    SpawnVector(553,90,50,180,500,0,6000,handlers,event,entity);//右后直线	
	SpawnVector(553,270,50,180,500,0,6000,handlers,event,entity);//左后直线	
	SpawnCircle(false,445,0,0,6,400,0,6000,handlers,event,entity);
    handlers['text']({"type": "text","sub_type": "notification","message":  '3',"message_TW": "3加速"}); 
    handlers['text']({"type": "text","sub_type": "message","delay": 60000,"message":  'Waves soon...',"message_TW": "半月准备"}); 	
}
//右邊
if ([1141,2141].includes(skillid)) {   
	SpawnMarker(false,323,125,0,2533,false,["火神","safe"],handlers,event,entity);	
	SpawnMarker(false,217,125,0,2533,false,["火神","safe"],handlers,event,entity);	
  //  SpawnVector(553,270,75,0,500,0,2533,handlers,event,entity);//左前直线
  //  SpawnVector(551,270,50,0,500,0,2533,handlers,event,entity);//左前直线	
	//SpawnVector(551,90,50,0,500,2533,800,handlers,event,entity);//右前直线	
 //   SpawnVector(551,270,50,0,500,3333,500,handlers,event,entity);//左前直线		
//	SpawnVector(551,90,50,0,500,3833,2000,handlers,event,entity);//右前直线	
	
  //  SpawnVector(553,270,75,180,500,0,2533,handlers,event,entity);//左后直线		
  //  SpawnVector(551,270,50,180,500,0,2533,handlers,event,entity);//左后直线	
	//SpawnVector(551,90,50,180,500,2533,800,handlers,event,entity);//右后直线	
   // SpawnVector(551,270,50,180,500,3333,500,handlers,event,entity);//左后直线		
	//SpawnVector(551,90,50,180,500,3833,2000,handlers,event,entity);//右后直线
    SpawnVector(553,90,50,0,500,0,6000,handlers,event,entity);//右前直线	
	SpawnVector(553,270,50,0,500,0,6000,handlers,event,entity);//左前直线	
    SpawnVector(553,90,50,180,500,0,6000,handlers,event,entity);//右后直线	
	SpawnVector(553,270,50,180,500,0,6000,handlers,event,entity);//左后直线		
	SpawnCircle(false,445,0,0,6,400,0,6000,handlers,event,entity);
    handlers['text']({"type": "text","sub_type": "notification","message":  '3',"message_TW": "3加速"}); 		
    handlers['text']({"type": "text","sub_type": "message","delay": 60000,"message":  'Waves soon...',"message_TW": "半月准备"}); 	
}
					
}
function start_boss() {
print = true;
printend = true;
}
function print_th(handlers) {
if(print) {
handlers['text']({
"sub_type": "message",
"message": "laser (loading)",
"message_TW": "红眼射线 (激活)"
});
}
print = false;
}
function print_end(handlers) {
if(printend) {
handlers['text']({
"sub_type": "message",
"message": "laser (loading)",
"message_TW": "消滅火神"
});
handlers['text']({
"sub_type": "message",
"delay": 30000,
"message": "laser (loading)",
"message_TW": "拿錘"
});
}
printend = false;
}
module.exports = {
	load(dispatch) {
		({ player, entity, library, effect } = dispatch.require.library);
	},
// "h-444-1000-100-0": [{"type": "func","func": guid_voice}],
 "h-444-2000-100": [
 // {"type": "func","func": Spawnitem1.bind(null,542,0,0,0,3000,6000000)},
  //{"type": "func","func": Spawnitem1.bind(null,542,0,0,180,3000,6000000)}
   {"type": "func","func": SpawnMarker.bind(null,false,0,-700,0,60000000,false,["火神","王座方位"])},
        {
            "type": "spawn",
            "id": 513,
            "sub_delay": 99999999,
            "pos": {
                x: -116268,
                y: 115070,
                z: 4022
            }
        } 
  
 ],
 	//构建直线（提示标志 偏移角度 偏移距离  角度 最远距离   时间）
 // "s-444-2000-1104-0": [ {"type": "func","func": skillds_event.bind(null, 104)}],
 // "s-444-2000-2104-0": [ {"type": "func","func": skillds_event.bind(null, 104)}], 
  
  //"s-444-2000-1134-0": [ {"type": "func","func": skillds_event.bind(null, 134)}],  
  // "s-444-2000-2134-0": [ {"type": "func","func": skillds_event.bind(null, 134)}], 
   
 "s-444-1000-2103-0": [{"type": "text","sub_type": "message","message": "Front (Dodge)","message_TW": "前砸 闪避" },		
     {"type": "func","func": Spawnitem2.bind(null,445,356,400,8,350,100,3000)}], 
 
 "s-444-1000-2108-0": [{"type": "text","sub_type": "message","message": 'Back Throw -> Front',"message_TW": "丢锤 (晕眩)" }], 
 "s-444-1000-2111-0": [{"type": "text","sub_type": "message","message":  'Back',"message_TW": "后砸 (慢慢慢慢)" },
     {"type": "func","func": Spawnitem2.bind(null,445,180,500,8,480,100,2000)}				
 ],  
 "s-444-1000-2113-0": [{"type": "text","sub_type": "message","message":  'Throw',"message_TW": "点名 (闪避)" }], 
 
 "s-444-1000-2114-0": [{"type": "text","sub_type": "message","message":  'Front Slam',"message_TW": "捶地 (秒杀)" },
      {"type": "func","func": Spawnitem2.bind(null,445,356,260,10,320,100,4000)}				
				
 ],  
 "s-444-1000-2115-0": [{"type": "text","sub_type": "message","delay": 234,"message":  'Knockup',"message_TW": "击飞闪避" }],  
 "s-444-1000-2116-0": [{"type": "text","sub_type": "message","message":  'Donuts',"message_TW": "甜甜圈" },
	      {"type": "func","func": Spawnitem2.bind(null,445,0,0,8,290,100,6000)}			
 ],   
 "s-444-1000-2117-0": [{"type": "text","sub_type": "message","message":  'Jump (Bait)',"message_TW": "随仇->跳劈 (击倒)" }],  
 "s-444-1000-2118-0": [{"type": "text","sub_type": "message","message":  'Jump (Tank)',"message_TW": "主仇->跳劈 (击倒)" }
 //{"type": "func","func": skillds_event.bind(null, 118)}
 ],  
 "s-444-1000-2121-0": [{"type": "text","sub_type": "message","message":  'Waves (Left)',"message_TW": "左  (4连半月)" },
  {"type": "func","func": SpawnMarker.bind(null,false,37,125,0,2533,false,["火神","safe"])},		
  {"type": "func","func": SpawnMarker.bind(null,false,143,125,0,2533,false,["火神","safe"])},	
  {"type": "func","func": Spawnitem1.bind(null,553,90,50,0,500,6000)},				
  {"type": "func","func": Spawnitem1.bind(null,553,90,50,180,500,6000)},					
  {"type": "func","func": Spawnitem1.bind(null,553,270,50,0,500,6000)},				
  {"type": "func","func": Spawnitem1.bind(null,553,270,50,180,500,6000)},				
  {"type": "text","sub_type": "message","delay": 60000,"message":  'Waves soon...',"message_TW": "半月准备"}				
			
 ],    
 "s-444-1000-2131-0": [{"type": "text","sub_type": "message","message":  'Front -> Left Scratch',"message_TW": "左 范围(挡) | 后拉" },
     {"type": "func","func": Spawnitem2.bind(null,445,358,340,8,660,100,4000)}				
				
 ], 
  "s-444-1000-2132-0": [  
  {"type": "func","func": Spawnitem1.bind(null,553,270,200,0,500,2000)},
  {"type": "func","func": Spawnitem1.bind(null,553,270,200,180,500,2000)}],
 "s-444-1000-2137-0": [
{"type": "text","sub_type": "message","message":  'Hammer back ',"message_TW": "后砸 " },
     {"type": "func","func": Spawnitem2.bind(null,445,180,500,8,480,100,2000)}], 
 
 "s-444-1000-2138-0": [{"type": "text","sub_type": "message","delay": 234,"message":  'Knockup (Bait)',"message_TW": "击飞闪避" }],  
 "s-444-1000-2139-0": [{"type": "text","sub_type": "message","message":  'Dodge!!',"message_TW": "转圈 (击倒)" },
                       {"type": "func","func": SpawnCircle.bind(null,false,912,0,0,20,160,0,2000)},
                       {"type": "func","func": SpawnCircle.bind(null,false,912,0,0,12,220,0,2000)},
                       {"type": "func","func": SpawnCircle.bind(null,false,912,0,0,10,300,0,2000)},
                       {"type": "func","func": SpawnCircle.bind(null,false,912,0,0,8,360,0,2000)}
 ],  
 "s-444-1000-2140-0": [{"type": "text","sub_type": "message","message":  'Waves (Right)',"message_TW": "右  (4连半月)" },
  {"type": "func","func": SpawnMarker.bind(null,false,323,125,0,2533,false,["火神","safe"])},		
  {"type": "func","func": SpawnMarker.bind(null,false,217,125,0,2533,false,["火神","safe"])},		
  {"type": "func","func": Spawnitem1.bind(null,553,90,50,0,500,6000)},				
  {"type": "func","func": Spawnitem1.bind(null,553,90,50,180,500,6000)},					
  {"type": "func","func": Spawnitem1.bind(null,553,270,50,0,500,6000)},				
  {"type": "func","func": Spawnitem1.bind(null,553,270,50,180,500,6000)},				
  {"type": "text","sub_type": "message","delay": 60000,"message":  'Waves soon...',"message_TW": "半月准备"}	
 ],  
//-----------------------------------------------------------------------------------------------------
 "s-444-1000-1103-0": [{"type": "text","sub_type": "message","message":  'Front (Dodge)',"message_TW": "前砸 闪避" },		
     {"type": "func","func": Spawnitem2.bind(null,445,356,400,8,350,100,3000)}], 
 
 "s-444-1000-1108-0": [{"type": "text","sub_type": "message","message":  'Back Throw -> Front',"message_TW": "丢锤 (晕眩)" }], 
 "s-444-1000-1111-0": [{"type": "text","sub_type": "message","message":  'Back',"message_TW": "后砸 (慢慢慢慢)" },
     {"type": "func","func": Spawnitem2.bind(null,445,180,500,8,480,100,2000)}				
 ],  
 "s-444-1000-1113-0": [{"type": "text","sub_type": "message","message":  'Throw',"message_TW": "点名 (闪避)" }], 
 
 "s-444-1000-1114-0": [{"type": "text","sub_type": "message","message":  'Front Slam',"message_TW": "捶地 (秒杀)" },
      {"type": "func","func": Spawnitem2.bind(null,445,356,260,10,320,100,4000)}				
				
 ],  
 "s-444-1000-1115-0": [{"type": "text","sub_type": "message","delay": 1300,"message":  'Knockup',"message_TW": "击飞闪避" }],  
 "s-444-1000-1116-0": [{"type": "text","sub_type": "message","message":  'Donuts',"message_TW": "甜甜圈" },
	      {"type": "func","func": Spawnitem2.bind(null,445,0,0,8,290,100,6000)}			
 ],   
 "s-444-1000-1117-0": [{"type": "text","sub_type": "message","message":  'Jump (Bait)',"message_TW": "随仇->跳劈 (击倒)" }],  
 "s-444-1000-1118-0": [{"type": "text","sub_type": "message","message":  'Jump (Tank)',"message_TW": "主仇->跳劈 (击倒)" }
 //{"type": "func","func": skillds_event.bind(null, 118)}
 ],  
 "s-444-1000-1121-0": [{"type": "text","sub_type": "message","message":  'Waves (Left)',"message_TW": "左  (4连半月)" },
  {"type": "func","func": SpawnMarker.bind(null,false,37,125,0,2533,false,["火神","safe"])},		
  {"type": "func","func": SpawnMarker.bind(null,false,143,125,0,2533,false,["火神","safe"])},	
  {"type": "func","func": Spawnitem1.bind(null,553,90,50,0,500,6000)},				
  {"type": "func","func": Spawnitem1.bind(null,553,90,50,180,500,6000)},					
  {"type": "func","func": Spawnitem1.bind(null,553,270,50,0,500,6000)},				
  {"type": "func","func": Spawnitem1.bind(null,553,270,50,180,500,6000)},				
  {"type": "text","sub_type": "message","delay": 60000,"message":  'Waves soon...',"message_TW": "半月准备"}				
			
 ],    
 "s-444-1000-1131-0": [{"type": "text","sub_type": "message","message":  'Front -> Left Scratch',"message_TW": "左 范围(挡) | 后拉" },
     {"type": "func","func": Spawnitem2.bind(null,445,358,340,8,660,100,4000)},				
      {"type": "func","func": Spawnitem1.bind(null,553,358,340,180,500,4000)},					
      {"type": "func","func": Spawnitem1.bind(null,553,358,340,0,500,4000)}								
 ], 
  "s-444-1000-1132-0": [  
  {"type": "func","func": Spawnitem1.bind(null,553,270,200,0,500,2000)},
  {"type": "func","func": Spawnitem1.bind(null,553,270,200,180,500,2000)}],
 "s-444-1000-1137-0": [
{"type": "text","sub_type": "message","message":  'Hammer back ',"message_TW": "后砸 " },
     {"type": "func","func": Spawnitem2.bind(null,445,180,500,8,480,100,2000)}], 
 
 "s-444-1000-1138-0": [{"type": "text","sub_type": "message","delay": 1300,"message":  'Knockup (Bait)',"message_TW": "击飞闪避" }],  
 "s-444-1000-1139-0": [{"type": "text","sub_type": "message","message":  'Dodge!!',"message_TW": "转圈 (击倒)" },
                       {"type": "func","func": SpawnCircle.bind(null,false,912,0,0,20,160,0,2000)},
                       {"type": "func","func": SpawnCircle.bind(null,false,912,0,0,12,220,0,2000)},
                       {"type": "func","func": SpawnCircle.bind(null,false,912,0,0,10,300,0,2000)},
                       {"type": "func","func": SpawnCircle.bind(null,false,912,0,0,8,360,0,2000)}],  
 "s-444-1000-1140-0": [{"type": "text","sub_type": "message","message":  'Waves (Right)',"message_TW": "右  (4连半月)" },
  {"type": "func","func": SpawnMarker.bind(null,false,323,125,0,2533,false,["火神","safe"])},		
  {"type": "func","func": SpawnMarker.bind(null,false,217,125,0,2533,false,["火神","safe"])},	
  {"type": "func","func": Spawnitem1.bind(null,553,90,50,0,500,6000)},				
  {"type": "func","func": Spawnitem1.bind(null,553,90,50,180,500,6000)},					
  {"type": "func","func": Spawnitem1.bind(null,553,270,50,0,500,6000)},				
  {"type": "func","func": Spawnitem1.bind(null,553,270,50,180,500,6000)},				
  {"type": "text","sub_type": "message","delay": 60000,"message":  'Waves soon...',"message_TW": "半月准备"}	
 ],  
 //-------------------------------------------------------------------------------------------------
 /*
  "h-444-2000-99": [{"type": "func","func": start_boss},
       {
            "type": "spawn",
            "id": 6,
            "sub_delay": 99999999,
            "pos": {
                x: -114567,
                y: 115063,
                z: 4022
            }
        }],
*/
  "h-444-2000-0": [{"type": "func","func": print_end}],
  "s-444-2000-1101-0": [{"type": "text","sub_type": "message","message":  '4 Hit combo',"message_TW": "锤地 270 重击" },
  {"type": "func","func": Spawnitem1.bind(null,553,0,0,195,500,4000)},
  {"type": "func","func": Spawnitem1.bind(null,553,0,0,270,500,3000)}],
 "s-444-2000-1103-0": [{"type": "text","sub_type": "message","message":  'Front (Dodge)',"message_TW": "前砸 闪避" },
				
     {"type": "func","func": Spawnitem2.bind(null,445,356,400,8,350,100,3000)}], 
 
 "s-444-2000-1107-0": [{"type": "text","sub_type": "message","message":  '4 Hit (3)',"message_TW": "重击 闪避" }], 
 "s-444-2000-1108-0": [{"type": "text","sub_type": "message","message":  'Back Throw -> Front',"message_TW": "丢锤 (晕眩)" }], 
 "s-444-2000-1111-0": [{"type": "text","sub_type": "message","message":  'Back',"message_TW": "后砸 (慢慢慢慢)" },
     {"type": "func","func": Spawnitem2.bind(null,445,180,500,8,480,100,2000)}				
 ],  
 "s-444-2000-1112-0": [
 //{"type": "text","sub_type": "message","message_TW": "完美格挡" },
       {"type": "text","sub_type": "message","delay": 1240,"message":  'Perfect Defense',"message_TW": "完美格挡" },
    //  {"type": "text","sub_type": "message","delay": 2040,"message": "1" },	
     {"type": "func","func": Spawnitem2.bind(null,445,356,220,12,210,100,4000)}				
				
 ], 
 
 "s-444-2000-1113-0": [{"type": "text","sub_type": "message","message":  'Throw',"message_TW": "点名 (闪避)" }], 
 
 "s-444-2000-1114-0": [{"type": "text","sub_type": "message","message":  'Front Slam',"message_TW": "捶地 (秒杀)" },
      {"type": "func","func": Spawnitem2.bind(null,445,356,260,10,320,100,4000)}				
				
 ],  
 "s-444-2000-1115-0": [{"type": "text","sub_type": "message","delay": 1300,"message":  'Knockup',"message_TW": "击飞闪避" }],  
 "s-444-2000-1116-0": [{"type": "text","sub_type": "message","message":  'Donuts',"message_TW": "甜甜圈" },
	      {"type": "func","func": Spawnitem2.bind(null,445,0,0,8,290,100,6000)}			
 ],   
 "s-444-2000-1117-0": [{"type": "text","sub_type": "message","message":  'Jump (Bait)',"message_TW": "随仇->跳劈 (击倒)" }],  
 "s-444-2000-1118-0": [{"type": "text","sub_type": "message","message":  'Jump (Tank)',"message_TW": "主仇->跳劈 (击倒)" }
 // {"type": "func","func": skillds_event.bind(null, 118)}
 ],  
 "s-444-2000-1119-0": [{"type": "text","sub_type": "message","message":  'Left swipe',"message_TW": "右 安全→ (坦左移)" },
		{"type": "func","func": SpawnSemicircle.bind(null,0,180,912,0,0,20,160,0,2000)},
		{"type": "func","func": SpawnSemicircle.bind(null,0,180,912,0,0,12,220,0,2000)},
		{"type": "func","func": SpawnSemicircle.bind(null,0,180,912,0,0,10,300,0,2000)},
		{"type": "func","func": SpawnSemicircle.bind(null,0,180,912,0,0,8,360,0,2000)},									  	
	    {"type": "func","func": SpawnThing.bind(null,270,300,100,2000)}			
 ],  
 "s-444-2000-1120-0": [{"type": "text","sub_type": "message","message":  'Right swipe',"message_TW": "左 安全← (坦右移)" },
		{"type": "func","func": SpawnSemicircle.bind(null,180,360,912,0,0,20,160,0,2000)},
		{"type": "func","func": SpawnSemicircle.bind(null,180,360,912,0,0,12,220,0,2000)},
		{"type": "func","func": SpawnSemicircle.bind(null,180,360,912,0,0,10,300,0,2000)},
		{"type": "func","func": SpawnSemicircle.bind(null,180,360,912,0,0,8,360,0,2000)},

 	   {"type": "func","func": SpawnThing.bind(null,90,300,100,2000)}	
 ], 
 "s-444-2000-1121-0": [{"type": "text","sub_type": "message","message":  'Waves (Left)',"message_TW": "左  (4连半月)" },{"type": "func","func":skilld_event.bind(null, 1121)}],  
 "s-444-2000-1122-0": [{"type": "text","sub_type": "message","message":  'Waves (Left) 3nd fast',"message_TW": "左  (4连半月)" },{"type": "func","func":skilld_event.bind(null, 1122)}],  
 "s-444-2000-1123-0": [{"type": "text","sub_type": "message","message":  'Waves (Left) 2nd fast',"message_TW": "左  (4连半月)" },{"type": "func","func":skilld_event.bind(null, 1123)}],  
 "s-444-2000-1125-0": [{"type": "text","sub_type": "message","message":  'Front -> Right Scratch',"message_TW": "右 前砸(闪) | 后拉" }, 
      {"type": "func","func": Spawnitem2.bind(null,445,356,400,8,350,100,3000)},				
      {"type": "func","func": Spawnitem1.bind(null,553,356,400,180,500,3000)},					
      {"type": "func","func": Spawnitem1.bind(null,553,356,400,0,500,3000)}
 ],  
 "s-444-2000-1126-0": [  
  {"type": "func","func": Spawnitem1.bind(null,553,90,200,0,500,2000)},
  {"type": "func","func": Spawnitem1.bind(null,553,90,200,180,500,2000)}],  
 
 "s-444-2000-1131-0": [{"type": "text","sub_type": "message","message":  'Front -> Left Scratch',"message_TW": "左 范围(挡) | 后拉" },
     {"type": "func","func": Spawnitem2.bind(null,445,358,340,8,660,100,4000)},				
      {"type": "func","func": Spawnitem1.bind(null,553,358,340,180,500,4000)},					
      {"type": "func","func": Spawnitem1.bind(null,553,358,340,0,500,4000)}				
				
 ], 
  "s-444-2000-1132-0": [  
  {"type": "func","func": Spawnitem1.bind(null,553,270,200,0,500,2000)},
  {"type": "func","func": Spawnitem1.bind(null,553,270,200,180,500,2000)}], 
 "s-444-2000-1135-0": [
 //{"type": "text","sub_type": "message","message_TW": "完美格挡" },
       {"type": "text","sub_type": "message","delay": 200,"message":  'Perfect Defense',"message_TW": "完美格挡" },//------------------------------------------------------
    //  {"type": "text","sub_type": "message","delay": 1535,"message": "1" },		  
      {"type": "func","func": Spawnitem2.bind(null,445,356,220,12,210,100,4000)}	
 ],  
 "s-444-2000-1137-0": [
//{"type": "func","func": skilld_event.bind(null, 137)},
{"type": "text","sub_type": "message","message":  'Hammer back ',"message_TW": "后砸 " },
     {"type": "func","func": Spawnitem2.bind(null,445,180,500,8,480,100,2000)}], 
 
 "s-444-2000-1138-0": [{"type": "text","sub_type": "message","delay": 1300,"message":  'Knockup (Bait)',"message_TW": "击飞闪避" }],  
 "s-444-2000-1139-0": [{"type": "text","sub_type": "message","message":  'Dodge!!',"message_TW": "转圈 (击倒)" }],  
 "s-444-2000-1140-0": [{"type": "text","sub_type": "message","message":  'Waves (Right)',"message_TW": "右  (4连半月)" },{"type": "func","func":skilld_event.bind(null, 1140)}],  
 "s-444-2000-1141-0": [{"type": "text","sub_type": "message","message":  'Waves (Right) 3nd fast',"message_TW": "右  (4连半月)" },{"type": "func","func":skilld_event.bind(null, 1141)}],  
 "s-444-2000-1142-0": [{"type": "text","sub_type": "message","message":  'Waves (Right) 2nd fast',"message_TW": "右  (4连半月)" },{"type": "func","func":skilld_event.bind(null, 1142)}],  
  "s-444-2000-1307-0": [{"type": "text","sub_type": "message","message":  '!',"message_TW": "隕石集中" },
        {"type": "text","sub_type": "message","delay": 20000,"message":  'last aerolite',"message_TW": "准备解王" }
  
  ], 
 "s-444-2000-1308-0": [{"type": "text","sub_type": "message","message":  'Stun (1)',"message_TW": "第1次晕" }],  
 "s-444-2000-1309-0": [{"type": "text","sub_type": "message","message":  'Stun (2)',"message_TW": "第2次晕" }],  
 "s-444-2000-1310-0": [{"type": "text","sub_type": "message","message":  'Stun (3)',"message_TW": "第3次晕" }], 
 "s-444-2000-1311-0": [{"type": "text","sub_type": "message","message":  'Wrath',"message_TW": "补师开盾 (右手放锤)" },
  {"type": "func","func": Spawnitem1.bind(null,553,0,0,0,500,6000)},
  {"type": "func","func": Spawnitem1.bind(null,553,0,0,180,500,6000)}				
				
 ],  
 "s-444-2000-1312-0": [{"type": "text","sub_type": "message","message":  'Wrath!',"message_TW": "补师开盾 (左右放锤)" },
   {"type": "func","func": Spawnitem1.bind(null,553,0,0,0,500,6000)},
  {"type": "func","func": Spawnitem1.bind(null,553,0,0,180,500,6000)}], 
//---------------------------------------------------------------------------------------------------
  "s-444-2000-2101-0": [{"type": "text","sub_type": "message","message":  '4 Hit combo',"message_TW": "锤地 270 重击" },
  {"type": "func","func": Spawnitem1.bind(null,553,0,0,195,500,4000)},
  {"type": "func","func": Spawnitem1.bind(null,553,0,0,270,500,3000)}],
 "s-444-2000-2103-0": [{"type": "text","sub_type": "message","message":  'Front (Dodge)',"message_TW": "前砸闪避" },
				
     {"type": "func","func": Spawnitem2.bind(null,445,356,400,8,350,100,3000)}], 
 
 "s-444-2000-2107-0": [{"type": "text","sub_type": "message","message":  '4 Hit (3)',"message_TW": "重击 闪避" }], 
 "s-444-2000-2108-0": [{"type": "text","sub_type": "message","message":  'Back Throw -> Front',"message_TW": "丢锤 (晕眩)" }], 
 "s-444-2000-2111-0": [{"type": "text","sub_type": "message","message":  'Back',"message_TW": "后砸 (慢慢慢慢)" },
     {"type": "func","func": Spawnitem2.bind(null,445,180,500,8,480,100,2000)}				
 ],  
 
 "s-444-2000-2112-0": [
 //{"type": "text","sub_type": "message","message_TW": "完美格挡" },
       {"type": "text","sub_type": "message","delay": 2000,"message":  'Perfect Defense',"message_TW": "完美格挡慢" },
       {"type": "text","sub_type": "message","delay": 2700,"message": "2" },	   
   //   {"type": "text","sub_type": "message","delay": 2800,"message": "1" },	
   //   {"type": "text","sub_type": "message","delay": 3690,"message": "2" },	
     {"type": "func","func": Spawnitem2.bind(null,445,356,220,12,210,100,4000)}				
				
 ], 
 
 "s-444-2000-2113-0": [{"type": "text","sub_type": "message","message":  'Throw',"message_TW": "点名 (闪避)" }], 
 
 "s-444-2000-2114-0": [{"type": "text","sub_type": "message","message":  'Front Slam',"message_TW": "捶地 (秒杀)" },
      {"type": "func","func": Spawnitem2.bind(null,445,356,260,10,320,100,4000)}				
				
 ],  
 "s-444-2000-2115-0": [{"type": "text","sub_type": "message","delay": 234,"message":  'Knockup',"message_TW": "击飞闪避" }],  
 "s-444-2000-2116-0": [{"type": "text","sub_type": "message","message":  'Donuts',"message_TW": "甜甜圈" },
	      {"type": "func","func": Spawnitem2.bind(null,445,0,0,8,290,100,6000)}			
 ],   
 "s-444-2000-2117-0": [{"type": "text","sub_type": "message","message":  'Jump (Bait)',"message_TW": "随仇->跳劈 (击倒)" }],  
 "s-444-2000-2118-0": [{"type": "text","sub_type": "message","message":  'Jump (Tank)',"message_TW": "主仇->跳劈 (击倒)" }
  //{"type": "func","func": skillds_event.bind(null, 118)}
 ],  
 "s-444-2000-2119-0": [{"type": "text","sub_type": "message","message":  'Left swipe',"message_TW": "右 安全→ (坦左移)" },
		{"type": "func","func": SpawnSemicircle.bind(null,0,180,912,0,0,20,160,0,2000)},
		{"type": "func","func": SpawnSemicircle.bind(null,0,180,912,0,0,12,220,0,2000)},
		{"type": "func","func": SpawnSemicircle.bind(null,0,180,912,0,0,10,300,0,2000)},
		{"type": "func","func": SpawnSemicircle.bind(null,0,180,912,0,0,8,360,0,2000)},	
	   {"type": "func","func": SpawnThing.bind(null,270,300,100,2000)}			
 ],  
 "s-444-2000-2120-0": [{"type": "text","sub_type": "message","message":  'Right swipe',"message_TW": "左 安全← (坦右移)" },
		{"type": "func","func": SpawnSemicircle.bind(null,180,360,912,0,0,20,160,0,2000)},
		{"type": "func","func": SpawnSemicircle.bind(null,180,360,912,0,0,12,220,0,2000)},
		{"type": "func","func": SpawnSemicircle.bind(null,180,360,912,0,0,10,300,0,2000)},
		{"type": "func","func": SpawnSemicircle.bind(null,180,360,912,0,0,8,360,0,2000)},
 	   {"type": "func","func": SpawnThing.bind(null,90,300,100,2000)}	
 ], 
 "s-444-2000-2121-0": [{"type": "text","sub_type": "message","message":  'Waves (Left)',"message_TW": "左  (4连半月)" },{"type": "func","func":skilld_event.bind(null, 2121)}],  
 "s-444-2000-2122-0": [{"type": "text","sub_type": "message","message":  'Waves (Left) 3nd fast',"message_TW": "左  (4连半月)" },{"type": "func","func":skilld_event.bind(null, 2122)}],  
 "s-444-2000-2123-0": [{"type": "text","sub_type": "message","message":  'Waves (Left) 2nd fast',"message_TW": "左  (4连半月)" },{"type": "func","func":skilld_event.bind(null, 2123)}],  
 "s-444-2000-2125-0": [{"type": "text","sub_type": "message","message":  'Front -> Right Scratch',"message_TW": "右前砸(闪) | 后拉" }, 
      {"type": "func","func": Spawnitem2.bind(null,445,356,400,8,350,100,3000)},				
      {"type": "func","func": Spawnitem1.bind(null,553,356,400,180,500,3000)},					
      {"type": "func","func": Spawnitem1.bind(null,553,356,400,0,500,3000)}
 ],  
 "s-444-2000-2126-0": [  
  {"type": "func","func": Spawnitem1.bind(null,553,90,200,0,500,2000)},
  {"type": "func","func": Spawnitem1.bind(null,553,90,200,180,500,2000)}],  
 
 "s-444-2000-2131-0": [{"type": "text","sub_type": "message","message":  'Front -> Left Scratch',"message_TW": "左 范围(挡) | 后拉" },
     {"type": "func","func": Spawnitem2.bind(null,445,358,340,8,660,100,4000)},				
      {"type": "func","func": Spawnitem1.bind(null,553,358,340,180,500,4000)},					
      {"type": "func","func": Spawnitem1.bind(null,553,358,340,0,500,4000)}								
 ], 
  "s-444-2000-2132-0": [  
  {"type": "func","func": Spawnitem1.bind(null,553,270,200,0,500,2000)},
  {"type": "func","func": Spawnitem1.bind(null,553,270,200,180,500,2000)}], 
 "s-444-2000-2135-0": [
 //{"type": "text","sub_type": "message","message_TW": "完美格挡快" },
      {"type": "text","sub_type": "message","delay": 200,"message":  'Perfect Defense',"message_TW": "完美格挡" },//--------------------------------
      {"type": "text","sub_type": "message","delay": 1535,"message": "2" },	  
     // {"type": "text","sub_type": "message","delay": 1535,"message": "1" },	
     // {"type": "text","sub_type": "message","delay": 2535,"message": "2" },		  
      {"type": "func","func": Spawnitem2.bind(null,445,356,220,12,210,100,4000)}	
 ],  
 "s-444-2000-2137-0": [
//{"type": "func","func": skilld_event.bind(null, 137)},
{"type": "text","sub_type": "message","message":  'Hammer back ',"message_TW": "后砸 " },
     {"type": "func","func": Spawnitem2.bind(null,445,180,500,8,480,100,2000)}], 
 
 "s-444-2000-2138-0": [{"type": "text","sub_type": "message","delay": 234,"message":  'Knockup (Bait)',"message_TW": "击飞闪避" }],  
 "s-444-2000-2139-0": [{"type": "text","sub_type": "message","message":  'Dodge!!',"message_TW": "转圈 (击倒)" }],  
 
 "s-444-2000-2140-0": [{"type": "text","sub_type": "message","message":  'Waves (Right)',"message_TW": "右  (4连半月)" },{"type": "func","func":skilld_event.bind(null, 2140)}],   
 "s-444-2000-2141-0": [{"type": "text","sub_type": "message","message":  'Waves (Right) 3nd fast',"message_TW": "右  (4连半月)" },{"type": "func","func":skilld_event.bind(null, 2141)}],  
 "s-444-2000-2142-0": [{"type": "text","sub_type": "message","message":  'Waves (Right) 2nd fast',"message_TW": "右  (4连半月)" },{"type": "func","func":skilld_event.bind(null, 2142)}],  
   "ab-444-2000-90442000": [{"type": "func","func": skilld_event.bind(null, 90442000)}],	
   "ab-444-2000-90442001": [{"type": "func","func": skilld_event.bind(null, 90442001)}],
   "ab-444-2000-90442304": [{"type": "func","func": skilld_event.bind(null, 90442304)}],
   "ab-444-2000-90444001": [{"type": "func","func": skilld_event.bind(null, 90444001)}],
  
  "s-444-2500-1201-0": [{"type": "func","func": print_th}],
  "s-444-2500-1305-0": [{"type": "func","func": skilld_event.bind(null, 305)},
   {"type": "func","func": Spawnitem1.bind(null,551,0,0,0,3000,4000)}]  
};