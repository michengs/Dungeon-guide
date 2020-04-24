//made by michengs

let player, entity, library, effect;
let timer1;
let timer2;
let notices = true;
let print = true;
let printHP = true;
let isHP_69_39 = false;

const {SpawnMarker, SpawnItem, SpawnVector, SpawnCircle, SpawnSemicircle, SpawnObject, applyDistance} = require("../lib");



function skilld_event(skillid, handlers, event, ent, dispatch) {	

if ([351].includes(skillid)) {   // //破盾
if (notices) {
clearTimeout(timer1);
clearTimeout(timer2);
notices = false;
setTimeout(() => notices = true, 5000);	
timer1 = setTimeout(()=>{	 
handlers['text']({
"sub_type": "message",
"message": isHP_69_39 ? "!" : "After 5s SHIELD!!!!",
"message_TW": isHP_69_39 ? "!" : "5秒后准备破盾!!!"
});	
  }, 85000);  
timer2 = setTimeout(()=>{	 
handlers['text']({
"sub_type": "message",
"message": isHP_69_39 ? "!" : "After 15s SHIELD!!!!",
"message_TW": isHP_69_39 ? "!" : "15秒后准备破盾!!!"
});	
  }, 75000);  
 }  
 } 
if ([69,39].includes(skillid)) {	
if (printHP) {
clearTimeout(timer1);	
clearTimeout(timer2);
printHP = false;
isHP_69_39 = true;
setTimeout(() => printHP = true, 15000);		 
  } 
 }  
if ([90,60,30].includes(skillid)) {
if (print) {
print = false;
isHP_69_39 = false;
setTimeout(() => print = true, 15000);		
handlers['text']({
"sub_type": "message",
"message": skillid,
"message_TW": "准备破盾"
});	  
  } 
 } 
}

	
module.exports = {
	load(dispatch) {
		({ player, entity, library, effect } = dispatch.require.library);
	},
	
	
	// 90 60 30 都固定出盾 90-99 69-60 39-30 这3个期间段不会出盾 其余期间 盾CD是1分半
	// boss位置 ，角度， 持续时间,类型， 偏角       ，偏距，       ，最小半径   ，角度范围 ，间距      ，半径         
	//(distance, angle, duration, type, offsetAngle, offsetDistance, minRadius, maxRadius, rotateAngle, rotateRadius) 
	

"h-3027-1000-89": [{"type": "func","func": skilld_event.bind(null, 90)}],	
"h-3027-1000-59": [{"type": "func","func": skilld_event.bind(null, 60)}],	
"h-3027-1000-29": [{"type": "func","func": skilld_event.bind(null, 30)}],	
"h-3027-1000-74": [{"type": "func","func": skilld_event.bind(null, 69)}],	
"h-3027-1000-39": [{"type": "func","func": skilld_event.bind(null, 39)}],	
	
	
	
	
	"s-3027-1001-255-0": [{"type": "func","func": SpawnVector.bind(null,553,0,0,0,3000,0,5000)}], //0
	"s-3027-1002-256-0": [{"type": "func","func": SpawnVector.bind(null,553,0,0,0,3000,0,5000)}], //60
	"s-3027-1003-257-0": [{"type": "func","func": SpawnVector.bind(null,553,0,0,0,3000,0,5000)}], //0
	"s-3027-1004-258-0": [{"type": "func","func": SpawnVector.bind(null,553,0,0,0,3000,0,5000)}], //60
	
"s-3027-1000-108-0": [{"type": "text","class_position":"tank","sub_type": "message","message": "Strike(slow)","message_TW": "一刀(慢)"}],




"s-3027-1000-112-0": [{"type": "text","sub_type": "message","message": "Back | Strike","message_TW": "后跳 | 一刀"}],     //连招
//"s-3027-1000-130-0": [{"type": "text","sub_type": "message","message": "random aggro","message_TW": "点名"}],

"s-3027-1000-134-0": [{"type": "text","sub_type": "message","message": "turn around","message_TW": "前戳(转身)"}],    //连招
"s-3027-1000-134-1": [{"type": "text","sub_type": "message","message": "back","message_TW": "后方"}],   
"s-3027-1000-147-0": [{"type": "text","sub_type": "message","message": "back","message_TW": "后砸"}],

//"s-3027-1000-355-0": [{"type": "text","sub_type": "message","message": "Eviscerate","message_TW": "下巴粉碎"}],  //连招  右侧上
"s-3027-1000-114-0": [{"type": "text","sub_type": "message","message": "Split strike","message_TW": "劈擊"}],

"s-3027-1000-350-0": [{"type": "text","sub_type": "message","message": "Donuts","message_TW": "吸 | 炸圈"},
 		{"type": "func","func": SpawnMarker.bind(null,false,180,100,3800,1000,false,["中心","进"])},  
 		{"type": "func","func": SpawnMarker.bind(null,false,0,100,3800,1000,false,["中心","进"])},  		
 		{"type": "func","func": SpawnMarker.bind(null,false,90,100,3800,1000,false,["中心","进"])},  		
 		{"type": "func","func": SpawnMarker.bind(null,false,270,100,3800,1000,false,["中心","进"])},  
 		{"type": "func","func": SpawnMarker.bind(null,false,0,0,3800,1000,true,["中心","进"])},  		
		{"type": "func","func": SpawnCircle.bind(null,false,445,0,0,12,240,0,5000)},
		{"type": "func","func": SpawnCircle.bind(null,false,445,0,0,8,480,0,5000)},
		{"type": "func","func": SpawnCircle.bind(null,false,445,0,0,3,950,0,5000)},
		{"type": "func","func": skilld_event.bind(null, 350)}],


"s-3027-1000-357-0": [{"type": "text","sub_type": "message","message": "get out","message_TW": "吸 | 远离"},
		{"type": "func","func": SpawnCircle.bind(null,false,553,0,0,20,500,2000,5000)},
		{"type": "func","func": skilld_event.bind(null, 357)}],    //连招

	
"s-3027-1000-135-0": [{"type": "text","sub_type": "message","message": "Overhand Strike","message_TW": "一刀(慢)"}],	   //连招		
	
	
"s-3027-1000-111-0": [{"type": "text","sub_type": "message","message": "stun | Strike","message_TW": "眩晕 | 一刀"}],	   //连招  左侧		

	
"s-3027-1000-136-0": [{"type": "text","sub_type": "message","message": "2x360°","message_TW": "2圈 | 一刀"}],	   //连招
"s-3027-1000-144-0": [{"type": "text","sub_type": "message","message": "Sword","message_TW": "挥刀"}],		
	
	
"s-3027-1000-356-0": [{"type": "text","sub_type": "message","message": "Teleport","message_TW": "瞬移(点名)"}], ////连招	点名					  
	
	
"s-3027-1000-117-0": [{"type": "text","sub_type": "message","message": "Teleport","message_TW": "瞬移(点名)"}],//连招	 随机


"s-3027-1000-145-0": [{"type": "text","sub_type": "message","message": "3x360°","message_TW": "3圈 | 斩击"}], //连招  3连挥刀 
"s-3027-1000-139-0": [{"type": "text","sub_type": "message","message": "！","message_TW": "！"},{"type": "func","func": SpawnCircle.bind(null,true,413,0,180,8,660,1000,2000)}],
"s-3027-1000-140-0": [{"type": "text","sub_type": "message","message": "Jump","message_TW": "大跳砸"},{"type": "func","func": SpawnCircle.bind(null,true,912,0,180,8,460,0,3000)}],	

"s-3027-1000-151-0": [{"type": "text","sub_type": "message","message": "Three chop","message_TW": "三斩 | 一刀"}],  //连招  2次点
//"s-3027-1000-149-0": [{"type": "text","sub_type": "message","message": "random aggro","message_TW": "点名"}],
"s-3027-1000-149-1": [{"type": "text","sub_type": "message","message": "back Teleport","message_TW": "后方瞬移"}],
//"s-3027-1000-148-0": [{"type": "text","sub_type": "message","message": "random aggro","message_TW": "点名"}],
"s-3027-1000-148-1": [{"type": "text","sub_type": "message","message": "Teleport","message_TW": "瞬移"}],

"s-3027-1000-141-0": [{"type": "text","sub_type": "message","message": "round | Strike ","message_TW": "回旋 | 一刀"}], //连招  3连挥刀 
"s-3027-1000-146-0": [{"type": "text","sub_type": "message","message": "Eviscerate | Strike","message_TW": "下巴 | 一刀"}],
				  
"s-3027-1000-142-0": [{"type": "text","sub_type": "message","message": "Eviscerate | Strike","message_TW": "下巴 | 一刀"}], //连招  3连挥刀 
"s-3027-1000-143-0": [{"type": "text","sub_type": "message","message": "Overhand Strike","message_TW": "一刀"}],					  
					  
"s-3027-1000-116-0": [{"type": "text","sub_type": "message","message": "Jump","message_TW": "大跳"},{"type": "func","func": SpawnCircle.bind(null,true,413,0,180,8,560,0,1000)}],	
"s-3027-1000-116-1": [{"type": "func","func": SpawnCircle.bind(null,true,912,0,180,8,460,0,3000)}],

"s-3027-1000-402-0": [{"type": "text","sub_type": "message","message": "Jump","message_TW": "大跳| 插地"},{"type": "func","func": SpawnMarker.bind(null,true,0,0,0,5000,true,["中心","warning"])}],
"s-3027-1000-109-0": [{"type": "text","sub_type": "message","message": "Forward Jump","message_TW": "前跳 | 一刀"}],
					  
"s-3027-1000-351-0": [{"type": "text","sub_type": "message","message": "SHIELD!","message_TW": "破盾"},{"type": "func","func": skilld_event.bind(null, 351)}],

"s-3027-1000-401-0": [{"type": "text","sub_type": "message","message": "AOE","message_TW": "全屏攻击"}]				
	 
};