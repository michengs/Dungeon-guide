//made by michengs
let player, entity, library, effect; 



module.exports = {
	load(dispatch) {
		({ player, entity, library, effect } = dispatch.require.library);
	},

"s-3202-1000-101-0": [{"type": "text","sub_type": "MSG","message": "TEST","message_TW": "칼리가르_기본공격1_우좌베기_atk01[start][end01]_normal"}],        
"s-3202-1000-102-0": [{"type": "text","sub_type": "MSG","message": "TEST","message_TW": "칼리가르_기본공격1_X자_atk01[end02]_normal"}],        
"s-3202-1000-103-0": [{"type": "text","sub_type": "MSG","message": "TEST","message_TW": "칼리가르_기본공격1_우좌베기+X자_atk01[start][end02]_normal"}],        
"s-3202-1000-104-0": [{"type": "text","sub_type": "MSG","message": "TEST","message_TW": "칼리가르_기본공격2_올려치기_atk02[start][end01]_normal"}],             
"s-3202-1000-106-0": [{"type": "text","sub_type": "MSG","message": "TEST","message_TW": "칼리가르_기본공격3_어퍼컷 이후 내려찍기_atk03[end]_normal"}],          
"s-3202-1000-107-0": [{"type": "text","sub_type": "MSG","message": "TEST","message_TW": "칼리가르_원거리공격1_톤파던지기_LongAtk01_[start][loop][end]_normal"}],         
"s-3202-1000-108-0": [{"type": "text","sub_type": "MSG","message": "TEST","message_TW": "칼리가르_원거리공격1_톤파던지기_LongAtk01_발사체_normal"}],         
       
        
"s-3202-1000-111-0": [{"type": "text","sub_type": "MSG","message": "TEST","message_TW": "칼리가르_견제1_대상자지정 점프 추적 내려찍기_LongMove[start][end]_normal"}],         
      
"s-3202-1000-113-0": [{"type": "text","sub_type": "MSG","message": "TEST","message_TW": "칼리가르_기본공격4_우좌2연타베기_LongAtk02[start][loop]_normal"}],        
"s-3202-1000-114-0": [{"type": "text","sub_type": "MSG","message": "TEST","message_TW": "칼리가르_광역3_양손 제자리내려찍기_LongAtk02[end]_normal"}],         
"s-3202-1000-115-0": [{"type": "text","sub_type": "MSG","message": "TEST","message_TW": "칼리가르_광역4_연속 누킹_modealarm[start][loop][end]_normal"}],        
"s-3202-1000-116-0": [{"type": "text","sub_type": "MSG","message": "TEST","message_TW": "칼리가르_광역4_연속 누킹_modealarm[start][loop][end]_발사체_normal"}],         
"s-3202-1000-117-0": [{"type": "text","sub_type": "MSG","message": "TEST","message_TW": "칼리가르_광역4_연속 누킹_modealarm[start][loop][end]_큰 발사체_normal"}],         
"s-3202-1000-118-0": [{"type": "text","sub_type": "MSG","message": "TEST","message_TW": "칼리가르_기본공격2_올려치고 전방찌르기_atk02[start][end02]_normal"}],         
"s-3202-1000-119-0": [{"type": "text","sub_type": "MSG","message": "TEST","message_TW": "칼리가르_광역1 회전공격_UltraAtk01_[end]_normal"}],         
"s-3202-1000-120-0": [{"type": "text","sub_type": "MSG","message": "TEST","message_TW": "칼리가르_기본공격5_전방빠르게찌르기_Longatk02[Start][Loop]_normal"}],         
      
"s-3202-1000-122-0": [{"type": "text","sub_type": "MSG","message": "TEST","message_TW": "칼리가르_핵심액션2_앞 뒤 벽력장_좌_Heavyatk01[combo01]_normal"}],         
"s-3202-1000-123-0": [{"type": "text","sub_type": "MSG","message": "TEST","message_TW": "칼리가르_핵심액션3_후방타격_Heavyatk01[end01A]_DS_normal"}],           
      
"s-3202-1000-125-0": [{"type": "text","sub_type": "MSG","message": "TEST","message_TW": "칼리가르_핵심액션2_앞 뒤 벽력장_우_Heavyatk01[combo02]_normal"}],        
"s-3202-1000-126-0": [{"type": "text","sub_type": "MSG","message": "TEST","message_TW": "칼리가르_핵심액션3_후방타격_Heavyatk01[end02A]_DS_normal"}],        
"s-3202-1000-127-0": [{"type": "text","sub_type": "MSG","message": "TEST","message_TW": "칼리가르_핵심액션4_막타_근중원_UltraAtk02[End]_normal"}],          
"s-3202-1000-128-0": [{"type": "text","sub_type": "MSG","message": "TEST","message_TW": "칼리가르_핵심액션4_막타_원중근_UltraAtk02[End]_normal"}],         
"s-3202-1000-301-0": [{"type": "text","sub_type": "MSG","message": "TEST","message_TW": "칼리가르_핵심액션5_범위내 적없을 시 페널티"}],         
"s-3202-1000-302-0": [{"type": "text","sub_type": "MSG","message": "TEST","message_TW": "칼리가르_견제3_업화_modealarm[start][end]"}],          
"s-3202-1000-303-0": [{"type": "text","sub_type": "MSG","message": "TEST","message_TW": "칼리가르_견제3_업화_modealarm[start][end]_발사체"}],           
"s-3202-1000-304-0": [{"type": "text","sub_type": "MSG","message": "TEST","message_TW": "칼리가르_전멸기_축해대응 시작_LongAtk01[start][loop]"}],          
"s-3202-1000-305-0": [{"type": "text","sub_type": "MSG","message": "TEST","message_TW": "칼리가르_전멸기_축해대응 실패 전멸기 발동_UltraAtk02[end]"}],          
"s-3202-1000-306-0": [{"type": "text","sub_type": "MSG","message": "TEST","message_TW": "칼리가르_전멸기_축해대응 성공_리액션_Reaction[start][loop][end]"}],
"s-3202-1000-307-0": [{"type": "text","sub_type": "MSG","message": "TEST","message_TW": "칼리가르_인원체크_유저 사망시 자신 강화"}],




	"s-3202-1000-105-0": [{"type": "text","sub_type": "message","message": "Front Stun","message_TW": "前方眩晕","message_RU": "Передний стан"}],

	// Stomp + Spin
	"s-3202-1000-109-0": [{"type": "text","sub_type": "message","message": "Stomp + Spin","message_TW": "重击 + 旋转","message_RU": "Удар + Крутилка"}],

	// Donut - Wave
	"s-3202-1000-110-0": [{"type": "text","sub_type": "message","message": "Donut | Wave","message_TW": "炸圈 | 水波","message_RU": "Бублики | Волна"}],

	// Back Push
	"s-3202-1000-112-0": [{"type": "text","sub_type": "message","message": "Back Push","message_TW": "后推","message_RU": "Удар назад"}],

	// In > Out
	"s-3202-1000-121-0": [{"type": "text","sub_type": "message","message": "In > Out","message_TW": "进 > 出","message_RU": "К нему > От него"}],

	// Out > In
	"s-3202-1000-124-0": [{"type": "text","sub_type": "message","message": "Out > In","message_TW": "出 > 进","message_RU": "От него > К нему"}]


};

