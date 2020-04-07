const DispatchWrapper = require('./dispatch');
const fs = require('fs');
const path = require('path');
const dbg = require('./dbg');
let voice = null;
try { voice = require('./voice/voice') }
catch(e) { voice = null; }
// Tank class ids(brawler + lancer)
const TANK_CLASS_IDS = [1, 10];
// Dps class ids(not counting warrior)
const DPS_CLASS_IDS = [2, 3, 4, 5, 8, 9, 11, 12];
const MapID_TW = require('./StrSheet_TW_Dungeon.json').String;
const MapID = require('./StrSheet_Dungeon.json').String;
// Healer class ids
const HEALER_CLASS_IDS = [6, 7];
// Warrior Defence stance abnormality ids
const WARRIOR_TANK_IDS = [100200, 100201];
const cr = '</font><font color="#ff0000">';//RED 红色
const co = '</font><font color="#ff7700">';//ORANGE 橘色
const cy = '</font><font color="#ffff00">';//YELLOW 黄色
const cg = '</font><font color="#00ff00">';//GREEN 绿色
const cdb = '</font><font color="#2727ff">';//DARK BLUE 深蓝
const cb = '</font><font color="#0077ff">';//BLUE  蓝色
const cv = '</font><font color="#7700ff">';//VIOLET 紫色
const cp = '</font><font color="#ff00ff">';//PINK   粉红
const clp = '</font><font color="#ff77ff">';//LIGHT PINK 浅粉色
const clb = '</font><font color="#00ffff">';//LIGHT BLUE 浅蓝色
const cbl = '</font><font color="#000000">';//BLACK 黑色
const cgr = '</font><font color="#777777">';//GRAY 灰色
const cw = '</font><font color="#ffffff">';//WHITE 白色	
const rate1 = 1;
const rate2 = 2;
const rate3 = 3;
const rate4 = 4;
const rate5 = 5;
const rate6 = 6;
const rate7 = 7;
const rate8 = 8;
const rate9 = 9;
const rate10 = 10;

class TeraGuide{
    constructor(dispatch) {
        const fake_dispatch = new DispatchWrapper(dispatch);
        const { player, entity, library, effect } = dispatch.require.library;
        const command = dispatch.command;

        // An object of types and their corresponding function handlers
        const function_event_handlers = {
            "spawn": spawn_handler,
            "despawn": despawn_handler,
            "text": text_handler,
            "sound": sound_handler,
            "stop_timer": stop_timer_handler,
            "func": func_handler,
            "lib": require('./lib')
        };	
	if (dispatch.proxyAuthor !== 'caali') {
		const options = require('./module').options;
		if (options) {
			const settingsVersion = options.settingsVersion;
			if (settingsVersion) {
				dispatch.settings = require('./' + (options.settingsMigrator || 'settings_migrator.js'))(dispatch.settings._version, settingsVersion, dispatch.settings);
				dispatch.settings._version = settingsVersion;
			}
		}
	}		

        // export functionality for 3rd party modules
        this.handlers = function_event_handlers;

        // A boolean for if the module is enabled or not

        // A boolean for the debugging settings
        let debug = dbg['debug'];

        // A boolean indicating if a guide was found
        let guide_found = false;
        let spguide = false;
        let esguide = false;
		//let cc = cg;
        // The guide settings for the current zone
        let active_guide = {};
        // All of the timers, where the key is the id
        let random_timer_id = 0xFFFFFFFA; // Used if no id is specified
        let timers = {};	
		let StrSheet_Dungeon_String = [];
		let StrSheet_TW_Dungeon_String = [];		
        /** HELPER FUNCTIONS **/

        // Write generic debug message used when creating guides
        function debug_message(d, ...args) {
            if(d) {
                console.log(`[${Date.now() % 100000}][Guide]`, ...args);

                if(debug.chat) command.message(args.toString());
            }
        }

        // Makes sure the event passes the class position check
        function class_position_check(class_position) {
            // if it's not defined we assume that it's for everyone
            if(!class_position) return true;
            // If it's an array
            if(Array.isArray(class_position)) {
                // If one of the class_positions pass, we can accept it
                for(let ent of class_position) if(class_position_check(ent)) return true;

                // All class_positions failed, so we return false
                return false;
            }

            switch(class_position) {
                case "tank": {
                    // if it's a warrior with dstance abnormality
                    if(player.job === 0) {
                        // Loop thru tank abnormalities
                        for(let id of WARRIOR_TANK_IDS) {
                            // if we have the tank abnormality return true
                            if(effect.hasAbnormality(id)) return true;
                        }
                    }

                    // if it's a tank return true
                    if(TANK_CLASS_IDS.includes(player.job)) return true;
                    break;
                }
                case "dps": {
                    // If it's a warrior with dstance abnormality
                    if(player.job === 0) {
                        // Loop thru tank abnormalities
                        for(let id of WARRIOR_TANK_IDS) {
                            // if we have the tank abnormality return false
                            if(effect.hasAbnormality(id)) return false;
                        }
                        // warrior didn't have tank abnormality
                        return true;
                    }

                    // if it's a dps return true
                    if(DPS_CLASS_IDS.includes(player.job)) return true;
                    break;
                }
                case "heal": {
                    // if it's a healer return true
                    if(HEALER_CLASS_IDS.includes(player.job)) return true;
                    break;
                }
                default: {
                    debug_message(true, "Failed to find class_position value:", class_position);
                }
            }
            return false;
        }

        // Handle events such as boss skill and abnormalities triggered
        function handle_event(ent, id, called_from_identifier, prefix_identifier, d, speed=1.0, stage=false) {
            const unique_id = `${prefix_identifier}-${ent['huntingZoneId']}-${ent['templateId']}`;
            const key = `${unique_id}-${id}`;
            const stage_string = (stage===false ? '' : `-${stage}`);

            debug_message(d, `${called_from_identifier}: ${id} | Started by: ${unique_id} | key: ${key + stage_string}`);

            if(stage !== false) {
                const entry = active_guide[key + stage_string];
                if(entry) start_events(entry, ent, speed);
            }

            const entry = active_guide[key];
            if(entry) start_events(entry, ent, speed);
        }

        // This is where all the magic happens
        function start_events(events=[], ent, speed=1.0) {
            // Loop over the events
            for(let event of events) {
                const func = function_event_handlers[event['type']];
                // The function couldn't be found, so it's an invalid type
                if(!func) debug_message(true, "An event has invalid type:", event['type']);
                // If the function is found and it passes the class position check, we start the event
                else if(class_position_check(event['class_position'])) func(event, ent, speed=1.0);
            }
        }

        /** S_ACTION_STAGE **/

        // Boss skill action
        function s_action_stage(e) {
			let skillid = e.skill.id % 1000;
			let eskillid;
			if (e.skill.id > 3000){ eskillid = e.skill.id}else{eskillid = e.skill.id % 1000}		
            // If the guide module is active and a guide for the current dungeon is found
            if(dispatch.settings.enabled && guide_found) {
				
                const ent = entity['mobs'][e.gameId.toString()];
                // Due to a bug for some bizare reason(probably proxy fucking itself) we do this ugly hack
                e.loc.w = e.w;
                // We've confirmed it's a mob, so it's plausible we want to act on this
		  if ( spguide ) {
               if(ent) return handle_event(Object.assign({}, ent, e), e.skill.id, 'Skill', 's', debug.debug || debug.skill || (ent['templateId'] % 1 === 0 ? debug.boss : false), e.speed, e.stage);
            }
			else if ( esguide ) {
                if(ent) return handle_event(Object.assign({}, ent, e), eskillid, 'Skill', 's', debug.debug || debug.skill || (ent['templateId'] % 1 === 0 ? debug.boss : false), e.speed, e.stage);
            }
			else{
                if(ent) return handle_event(Object.assign({}, ent, e), skillid, 'Skill', 's', debug.debug || debug.skill || (ent['templateId'] % 1 === 0 ? debug.boss : false), e.speed, e.stage);
            }
            }
        }
        dispatch.hook('S_ACTION_STAGE', 9, {order: 15}, s_action_stage);
		
        /** ABNORMALITY **/

        // Boss abnormality triggered
        function abnormality_triggered(e) {
            // If the guide module is active and a guide for the current dungeon is found
            if(dispatch.settings.enabled && guide_found) {
                // avoid errors ResidentSleeper (neede for abnormality refresh)
                if(!e.source) e.source = 0n;

                // If the boss/mob get's a abnormality applied to it
                const target_ent = entity['mobs'][e.target.toString()];

                // If the boss/mob is the cause for the abnormality
                const source_ent = entity['mobs'][e.source.toString()];

                // If the mob/boss applies an abnormality to me, it's plausible we want to act on this
                if(source_ent && player.isMe(e.target)) handle_event(source_ent, e.id, 'Abnormality', 'am', debug.debug || debug.abnormal);

                // If "nothing"/server applies an abnormality to me, it's plausible we want to act on this. (spam rip)
                if(player.isMe(e.target) && 0 == (e.source || 0)) handle_event({
                    huntingZoneId: 0,
                    templateId: 0
                }, e.id, 'Abnormality', 'ae', debug.debug || debug.abnormal);

                // If it's a mob/boss getting an abnormality applied to itself, it's plausible we want to act on it
                if(target_ent) handle_event(target_ent, e.id, 'Abnormality', 'ab', debug.debug || debug.abnormal);
            }
        }
        dispatch.hook('S_ABNORMALITY_BEGIN', 4, {order: 15}, abnormality_triggered);
        dispatch.hook('S_ABNORMALITY_REFRESH', 2, {order: 15}, abnormality_triggered);

        /** HEALTH **/

        // Boss health bar triggered
        dispatch.hook('S_BOSS_GAGE_INFO', 3, e=> {
             // If the guide module is active and a guide for the current dungeon is found
             if(dispatch.settings.enabled && guide_found) {
                const ent = entity['mobs'][e.id.toString()];
                // We've confirmed it's a mob, so it's plausible we want to act on this
                if(ent) return handle_event(ent, Math.floor(Number(e.curHp) / Number(e.maxHp) * 100), 'Health', 'h', debug.debug || debug.hp);
            }
        });

        /** S_DUNGEON_EVENT_MESSAGE **/

        dispatch.hook('S_DUNGEON_EVENT_MESSAGE', 2, e=> {
            if (dispatch.settings.enabled && guide_found) {
                const result = /@dungeon:(\d+)/g.exec(e.message);
                if (result) {
                    handle_event({
                        huntingZoneId: 0,
                        templateId: 0
                    }, parseInt(result[1]), 'Dungeon Message', 'dm', debug.debug || debug.dm);
                }
            }
        });

        /** S_QUEST_BALLOON **/

        dispatch.hook('S_QUEST_BALLOON', 1, e=> {
            if (dispatch.settings.enabled && guide_found) {
                const source_ent = entity['mobs'][e.source.toString()];
                const result = /@monsterBehavior:(\d+)/g.exec(e.message);
                if (result && source_ent) {
                    handle_event(source_ent, parseInt(result[1]), 'Quest Balloon', 'qb', debug.debug || debug.qb);
                }
            }
        });

        /** MISC **/

        // Load guide and clear out timers
        dispatch.hook('S_LOAD_TOPO', 3, e=> {
            // Clear out the timers
            for(let key in timers) clearTimeout(timers[key]);
            timers = {};

            // Clear out previous hooks, that our previous guide module hooked
            fake_dispatch._remove_all_hooks();

            // Send debug message
            debug_message(debug.debug, 'Entered zone:', e.zone);

            // Remove potential cached guide from require cache, so that we don't need to relog to refresh guide
            try {
                delete require.cache[require.resolve('./guides/' + e.zone)];
            }catch(e) {}
            
            // Try loading a guide
            try {
                active_guide = require('./guides/' + e.zone);
 
            if ([3126,3026,9750,9066,9050,9054,9754,9916,9781,3017,9044,9070,9920,9970,9981].includes(e.zone)) { 
			spguide = true;   //skill  1000-3000 
			esguide = false;
            }else if([9000,3023,9759].includes(e.zone)) { 
			spguide = false; //skill  100-200-3000 
			esguide = true;
            }else{
            spguide = false; //skill  100-200 
			esguide = false;				
			}
            guide_found = true;
		StrSheet_Dungeon_String = MapID.find(obj => obj.id === e.zone);
		StrSheet_TW_Dungeon_String = MapID_TW.find(obj => obj.id === e.zone);		
		if (StrSheet_TW_Dungeon_String) {
        if( spguide ) {
				 text_handler({"sub_type": "alert","delay": 8000,"message_TW": '进入SP副本： ' +  cr +  StrSheet_TW_Dungeon_String.string, "message": ' Enter SP  Dungeon： ' +  cr + StrSheet_Dungeon_String.string});  
                		speak_voice('：', 8000)	;
            }else if( esguide ) {
				 text_handler({"sub_type": "alert","delay": 8000,"message_TW": '进入ES副本： ' +  cr + StrSheet_TW_Dungeon_String.string, "message": ' Enter ES  Dungeon： ' + cr +  StrSheet_Dungeon_String.string}); 
                		speak_voice('：', 8000)	;		 
            }else{				 text_handler({"sub_type": "alert","delay": 8000,"message_TW": '进入副本： ' +  cr + StrSheet_TW_Dungeon_String.string, "message": ' Enter   Dungeon： ' +  cr + StrSheet_Dungeon_String.string}); 
                		speak_voice('：', 8000)	;
			}
		} 
            }catch(e) {
                active_guide = {};
                guide_found = false;
                debug_message(debug.debug, e);
            }

            // Try calling the "load" function
            try {
                active_guide.load(fake_dispatch);
            }catch(e) { debug_message(debug.debug, e); }
        });

        // Guide command
        command.add(['guide','補助','辅助'], {
            // Toggle debug settings
            debug(arg1) {
                if(!arg1 || debug[arg1] === undefined) return command.message(`Invalid sub command for debug mode. ${arg1}`);
                debug[arg1] = !debug[arg1];
                command.message(`Guide module debug(${arg1}) mode has been ${debug[arg1]?"enabled":"disabled"}.`);
            },
            // Testing events
            event(arg1, arg2) {
                // If we didn't get a second argument or the argument value isn't an event type, we return
                if(arg1 === "trigger" ? (!active_guide[arg2]) : (!arg1 || !function_event_handlers[arg1] || !arg2)) return command.message(`Invalid values for sub command "event" ${arg1} | ${arg2}`);

                // if arg2 is "trigger". It means we want to trigger a event
                if(arg1 === "trigger")
                    start_events(active_guide[arg2], player);
                else
                    // Call a function handler with the event we got from arg2 with yourself as the entity
                    function_event_handlers[arg1](JSON.parse(arg2), player);
            },
           voice() {
         if(!voice){
      	command.message(`need voice Dependencies`);
			 return;		
			}
            	dispatch.settings.speaks = !dispatch.settings.speaks;
				text_handler({"sub_type": "PRMSG","message_TW": `语音通知 ${dispatch.settings.speaks?"开启":"关闭"}.`, "message": `text-to-speech ${dispatch.settings.speaks?"on":"off"}.` }); 				
            },			
            stream() {
            	dispatch.settings.stream = !dispatch.settings.stream;
				text_handler({"sub_type": "PRMSG","message_TW": `主播模式 ${dispatch.settings.stream?"开启":"关闭"}.`, "message": `stream ${dispatch.settings.stream?"on":"off"}.` }); 				
            },
            spawnObject() {
            	dispatch.settings.spawnObject = !dispatch.settings.spawnObject;
				text_handler({"sub_type": "PRMSG","message_TW": `仅文本提示 ${dispatch.settings.spawnObject?"关闭":"开启"}.`, "message": `spawn object ${dispatch.settings.spawnObject?"on":"off"}.` });  				
            },				
            alert() {
            	dispatch.settings.notice = !dispatch.settings.notice;
				text_handler({"sub_type": "PRMSG","message_TW": `虚拟队长通知已 ${dispatch.settings.notice?"开启":"关闭"}.`, "message": `Virtual captain has been ${dispatch.settings.notice?"on":"off"}.` });  				
            },		
            systemNotice() {
            	dispatch.settings.systemNotice = !dispatch.settings.systemNotice;
            	command.message(`system Notice ${dispatch.settings.systemNotice?"on":"off"}.`);
				text_handler({"sub_type": "PRMSG","message_TW": `组队通知已 ${dispatch.settings.systemNotice?"开启":"关闭"}.`, "message": `system Notice ${dispatch.settings.systemNotice?"on":"off"}.` });  				
            },
            1() {          	
			   text_handler({"sub_type": "PRMSG","message_TW": `语音速度1`, "message": `Voice speed 1` });  				
	           dispatch.settings.rate.splice(0,1, rate1);			
            },			
            2() {       
			   text_handler({"sub_type": "PRMSG","message_TW": `语音速度2`, "message": `Voice speed 2` });  			
	           dispatch.settings.rate.splice(0,1, rate2);			
            },
            3() {
			   text_handler({"sub_type": "PRMSG","message_TW": `语音速度3`, "message": `Voice speed 3` });  			
	           dispatch.settings.rate.splice(0,1, rate3);					
            },	
            4() {
			   text_handler({"sub_type": "PRMSG","message_TW": `语音速度4`, "message": `Voice speed 4` });  			
	           dispatch.settings.rate.splice(0,1, rate4);					
            },				
            5() {
			   text_handler({"sub_type": "PRMSG","message_TW": `语音速度5`, "message": `Voice speed 5` });  				
	           dispatch.settings.rate.splice(0,1, rate5);					
            },
            6() {
			   text_handler({"sub_type": "PRMSG","message_TW": `语音速度6`, "message": `Voice speed 6` });  			
	           dispatch.settings.rate.splice(0,1, rate6);					
            },	
            7() {
			   text_handler({"sub_type": "PRMSG","message_TW": `语音速度7`, "message": `Voice speed 7` });  				
	           dispatch.settings.rate.splice(0,1, rate7);					
            },				
            8() {
			   text_handler({"sub_type": "PRMSG","message_TW": `语音速度8`, "message": `Voice speed 8` });  			
	           dispatch.settings.rate.splice(0,1, rate8);					
            },	
	        9() {
			   text_handler({"sub_type": "PRMSG","message_TW": `语音速度9`, "message": `Voice speed 9` });  				
	           dispatch.settings.rate.splice(0,1, rate9);					
            },			
            10() {
			   text_handler({"sub_type": "PRMSG","message_TW": `语音速度10`, "message": `Voice speed 10` });  			
	           dispatch.settings.rate.splice(0,1, rate10);					
            },
            cr() {
				text_handler({"sub_type": "CRMSG","message_TW": `系统消息通知颜色红色`, "message": `system message notification color is red` }); 		   
	           dispatch.settings.cc.splice(0,1, cr );		   
            },
            cc() {
				text_handler({"sub_type": "PRMSG","message_TW": `查看系统消息通知颜色`, "message": `View the current system message notification color` }); 							   
            },			
            co() {
				text_handler({"sub_type": "COMSG","message_TW": `系统消息通知颜色橘色`, "message": `system message notification color is  ORANGE` }); 			
	           dispatch.settings.cc.splice(0,1, co);					
            },
            cy() {
				text_handler({"sub_type": "CYMSG","message_TW": `系统消息通知颜色黄色`, "message": `system message notification color is YELLOW` }); 			
	           dispatch.settings.cc.splice(0,1, cy);					
            },
            cg() {
				text_handler({"sub_type": "CGMSG","message_TW": `系统消息通知颜色绿色`, "message": `system message notification color is GREEN` }); 			
	           dispatch.settings.cc.splice(0,1, cg);					
            },
            cdb() {
				text_handler({"sub_type": "CDBMSG","message_TW": `系统消息通知颜色深蓝色`, "message": `system message notification color is DARK BLUE` }); 			
	           dispatch.settings.cc.splice(0,1, cr);					
            },
            cb() {
				text_handler({"sub_type": "CBMSG","message_TW": `系统消息通知颜色蓝色`, "message": `system message notification color is BLUE` }); 			
	           dispatch.settings.cc.splice(0,1, cb);				
            },
            cv() {
				text_handler({"sub_type": "CVMSG","message_TW": `系统消息通知颜色紫色`, "message": `system message notification color is VIOLET` }); 			
	           dispatch.settings.cc.splice(0,1, cv);				
            },
            cp() {
				text_handler({"sub_type": "CPMSG","message_TW": `系统消息通知颜色粉色`, "message": `system message notification color is PINK` }); 			
	           dispatch.settings.cc.splice(0,1, cp);				
            },
            clp() {
				text_handler({"sub_type": "CLPMSG","message_TW": `系统消息通知颜色浅粉色`, "message": `system message notification color is LIGHT PINK` }); 			
	           dispatch.settings.cc.splice(0,1, clp);				
            },
            clb() {
				text_handler({"sub_type": "CLBMSG","message_TW": `系统消息通知颜色浅蓝色`, "message": `system message notification color is LIGHT BLUE` }); 			
	           dispatch.settings.cc.splice(0,1, clb);				
            },
            cbl() {
				text_handler({"sub_type": "CBLMSG","message_TW": `系统消息通知颜色黑色`, "message": `system message notification color is  BLACK` }); 			
	           dispatch.settings.cc.splice(0,1, cbl);				
            },
            cgr() {
				text_handler({"sub_type": "CGRMSG","message_TW": `系统消息通知颜色灰色`, "message": `system message notification color is  BLACK` }); 			
	           dispatch.settings.cc.splice(0,1, cgr);				
            },	
            cw() {
				text_handler({"sub_type": "CWMSG","message_TW": `系统消息通知颜色白色`, "message": `system message notification color is  BLACK` }); 			
	           dispatch.settings.cc.splice(0,1, cw);				
            },			
            help() {
			   text_handler({"sub_type": "PRMSG","message_TW": 'guide ，副本補助开/关 ，默认系统通知，通知颜色为黄色', "message": 'guide,  on/off, default system notification, notification color yellow ' });  					
			   text_handler({"sub_type": "PRMSG","message_TW": 'guide voice，副本補助语音开/关', "message": 'guide  voice，text-to-speech on/off' });  
			   text_handler({"sub_type": "PRMSG","message_TW": 'guide systemNotice， 组队通知开/关', "message": 'guide systemNotice，system Notice on/off' });  	
			   text_handler({"sub_type": "PRMSG","message_TW": 'guide alert ，组队长通知开/关', "message": 'guide alert， Virtual captain  notifie on/off' });  	
			   text_handler({"sub_type": "PRMSG","message_TW": 'guide 1~10，调节语音速度10为最快语速，默认为1正常速度', "message": 'guide 1~10，to settings Voice speed' });  
			   text_handler({"sub_type": "PRMSG","message_TW": 'guide spawnObject，地面提示开/关', "message": 'guide spawnObject，spawn Object on/off' }); 
			   text_handler({"sub_type": "PRMSG","message_TW": 'guide stream，主播模式开关', "message": 'guide stream，(stream)on/off' }); 	
			   text_handler({"sub_type": "PRMSG","message_TW": 'guide cc，查看当前系统消息通知颜色', "message": 'guide cc，View the current system message notification color' }); 	
			   text_handler({"sub_type": "CRMSG","message_TW": 'guide cr，消息通知颜色为红色', "message": 'guide cr，message color is red' }); 				   
			   text_handler({"sub_type": "COMSG","message_TW": 'guide co，消息通知颜色为橙色', "message": 'guide co，message color is ORANGE' }); 	
			   text_handler({"sub_type": "CYMSG","message_TW": 'guide cy，消息通知颜色为黄色', "message": 'guide cy，message color is YELLOW' }); 	
			   text_handler({"sub_type": "CGMSG","message_TW": 'guide cg，消息通知颜色为绿色', "message": 'guide cg，message color is GREEN' }); 	
			   text_handler({"sub_type": "CDBMSG","message_TW": 'guide cdb，消息通知颜色为青色', "message": 'guide cdb，message color is DARK BLUE' }); 	
			   text_handler({"sub_type": "CBMSG","message_TW": 'guide cb，消息通知颜色为蓝色', "message": 'guide cb，message color is BLUE' }); 	
			   text_handler({"sub_type": "CVMSG","message_TW": 'guide cv，消息通知颜色为紫色', "message": 'guide cv，message color is VIOLET' }); 	
			   text_handler({"sub_type": "CPMSG","message_TW": 'guide cp，消息通知颜色为粉红色', "message": 'guide cp，message color is PINK' }); 	
			   text_handler({"sub_type": "CLPMSG","message_TW": 'guide clp，消息通知颜色为浅粉色', "message": 'guide clp，message color is LIGHT PINK' }); 	
			   text_handler({"sub_type": "CLBMSG","message_TW": 'guide clb，消息通知颜色为浅蓝色', "message": 'guide clb，message color is LIGHT BLUE' }); 	
			   text_handler({"sub_type": "CBLMSG","message_TW": 'guide cbl，消息通知颜色为黑色', "message": 'guide cbl，message color is BLACK' }); 	
			   text_handler({"sub_type": "CGRMSG","message_TW": 'guide cgr，消息通知颜色为灰色', "message": 'guide cgr，message color is GRAY' }); 				   
			   text_handler({"sub_type": "CWMSG","message_TW": 'guide cw，消息通知颜色为白色', "message": 'guide cw，message color is WHITE' }); 				   
            },
            $default() {
              dispatch.settings.enabled = !dispatch.settings.enabled;
				text_handler({"sub_type": "PRMSG","message_TW": `副本補助已 ${dispatch.settings.enabled?"on":"off"}.`, "message": `guide ${dispatch.settings.enabled?"on":"off"}.` });  				
            }
        });
		
        /** Function/event handlers for types **/

        // Spawn handler
        function spawn_handler(event, ent, speed=1.0) {
            if(dispatch.settings.stream) return;
            if(!dispatch.settings.spawnObject) return;			
            // Make sure id is defined
            if(!event['id']) return debug_message(true, "Spawn handler needs a id");
            // Make sure sub_delay is defined
            if(!event['sub_delay']) return debug_message(true, "Spawn handler needs a sub_delay");
            // Make sure distance is defined
            //if(!event['distance']) return debug_message(true, "Spawn handler needs a distance");
            // Ignore if dispatch.settings.streamer mode is enabled


            // Set sub_type to be collection as default for backward compatibility
            const sub_type =  event['sub_type'] || 'collection';

            // The unique spawned id this item will be using.
            const item_unique_id = event['force_gameId'] || random_timer_id--;

            // The location of the item spawned
            let loc = ent['loc'].clone();

            // if pos is set, we use that
            if(event['pos']) loc = event['pos'];

            loc.w = (ent['loc'].w || 0) + (event['offset'] || 0);
            library.applyDistance(loc, event['distance'] || 0 ,event['degrees'] || 0);

            let sending_event = {
                gameId: item_unique_id,
                loc: loc,
                w: loc.w
            };

            const despawn_event = {
                gameId: item_unique_id,
                unk: 0, // used in S_DESPAWN_BUILD_OBJECT
                collected: false // used in S_DESPAWN_COLLECTION
            };

            // Create the sending event
            switch(sub_type) {
                // If it's type collection, it's S_SPAWN_COLLECTION
                case "collection": {
                    Object.assign(sending_event, {
                        id: event['id'],
                        amount: 1,
                        extractor: false,
                        extractorDisabled: false,
                        extractorDisabledTime: 0
                    });
                    break;
                }
                // If it's type item, it's S_SPAWN_DROPITEM
                case "item": {
                    Object.assign(sending_event, {
                        item: event['id'],
                        amount: 1,
                        expiry: 0,
                        explode: false,
                        masterwork: false,
                        enchant: 0,
                        debug: false,
                        owners: []
                    });
                    break;
                }
                // If it's type build_object, it's S_SPAWN_BUILD_OBJECT
                case "build_object": {
                    Object.assign(sending_event, {
                        itemId : event['id'],
                        unk : 0,
                        ownerName : event['ownerName'] || '',
                        message : event['message'] || ''
                    });
                    break;
                }
                // If we haven't implemented the sub_type the event asks for
                default: {
                    return debug_message(true, "Invalid sub_type for spawn handler:", event['sub_type']);
                }
            }

            // Create the timer for spawning the item
            timers[item_unique_id] = setTimeout(()=> {
                switch(sub_type) {
                    case "collection": return dispatch.toClient('S_SPAWN_COLLECTION', 4, sending_event);
                    case "item": return dispatch.toClient('S_SPAWN_DROPITEM', 8, sending_event);
                    case "build_object": return dispatch.toClient('S_SPAWN_BUILD_OBJECT', 2, sending_event);
                }
            }, event['delay'] || 0 / speed);

            // Create the timer for despawning the item
            timers[random_timer_id--] = setTimeout(()=> {
                switch(sub_type) {
                    case "collection": return dispatch.toClient('S_DESPAWN_COLLECTION', 2, despawn_event);
                    case "item": return dispatch.toClient('S_DESPAWN_DROPITEM', 4, despawn_event);
                    case "build_object": return dispatch.toClient('S_DESPAWN_BUILD_OBJECT', 2, despawn_event);
                }
            }, event['sub_delay'] / speed);
        }

         // Despawn handler
         function despawn_handler(event) {
            // Make sure id is defined
            if(!event['id']) return debug_message(true, "Spawn handler needs a id");
            // Ignore if dispatch.settings.streamer mode is enabled
            if(dispatch.settings.stream) return;
            if(!dispatch.settings.spawnObject) return;	
            // Set sub_type to be collection as default for backward compatibility
            const sub_type =  event['sub_type'] || 'collection';

            const despawn_event = {
                gameId: event['id'],
                unk: 0, // used in S_DESPAWN_BUILD_OBJECT
                collected: false // used in S_DESPAWN_COLLECTION
            };

            switch(sub_type) {
                case "collection": return dispatch.toClient('S_DESPAWN_COLLECTION', 2, despawn_event);
                case "item": return dispatch.toClient('S_DESPAWN_DROPITEM', 4, despawn_event);
                case "build_object": return dispatch.toClient('S_DESPAWN_BUILD_OBJECT', 2, despawn_event);
                default: return debug_message(true, "Invalid sub_type for despawn handler:", event['sub_type']);
            }
        }
        // Text handler
        function text_handler(event, ent, speed=1.0) {
            // Fetch the message(with region tag)
            const message = event[`message_${dispatch.region}`] || event[`message_${dispatch.region.toUpperCase()}`] || event['message'];
            // Make sure sub_type is defined
            if(!event['sub_type']) return debug_message(true, "Text handler needs a sub_type");
            // Make sure message is defined
            if(!message) return debug_message(true, "Text handler needs a message");

            let sending_event = {};
			let sending_events = {};
            // Create the sending event
            switch(event['sub_type']) {
                // If it's type message, it's S_DUNGEON_EVENT_MESSAGE with type 41
				//混合通知
                case "message": {
	     timers[event['id'] || random_timer_id--] = setTimeout(()=> {					
				    if(voice){
		            if(dispatch.settings.speaks){	
                   voice.speak(message,dispatch.settings.rate)
					};
					};		
           }, (event['delay'] || 0 ) - 600 /speed);					
	     timers[event['id'] || random_timer_id--] = setTimeout(()=> {	

		      sendMessage(message);		
           }, (event['delay'] || 0 )   /speed);
                    break;		
                }			
                case "msgcp": {
	     timers[event['id'] || random_timer_id--] = setTimeout(()=> {					
				    if(voice){
		            if(dispatch.settings.speaks){	
                   voice.speak(message,dispatch.settings.rate)
					};
					};		
           }, (event['delay'] || 0 ) - 600 /speed);					
	     timers[event['id'] || random_timer_id--] = setTimeout(()=> {	

		
		      sendspMessage(message,cp);		
           }, (event['delay'] || 0 )   /speed);
                    break;		
                }				
                case "msgcg": {
	     timers[event['id'] || random_timer_id--] = setTimeout(()=> {					
				    if(voice){
		            if(dispatch.settings.speaks){	
                   voice.speak(message,dispatch.settings.rate)
					};
					};		
           }, (event['delay'] || 0 ) - 600 /speed);					
	     timers[event['id'] || random_timer_id--] = setTimeout(()=> {	

		
		      sendspMessage(message,cg);		
           }, (event['delay'] || 0 )   /speed);
                    break;		
                }				

				//组队长通知
                case "alert": {
				  if(dispatch.settings.stream) return;
                    sending_event = {
					channel: 21,
					authorName: 'guide',
					message
                    };
                    break;
                }
                case "MSG": {
                 if(dispatch.settings.stream) return;
	                        timers[event['id'] || random_timer_id--] = setTimeout(()=> {
              command.message( cr + message );
              console.log( cr + message );			  
                        }, (event['delay'] || 0 ) - 600 /speed);		  
		  
                    break;
                }
                case "COMSG": {
              command.message( co + message );	             
                    break;
                }				
                case "CYMSG": {
              command.message( cy + message );	             
                    break;
                }				
                case "CGMSG": {
              command.message( cg + message );	             
                    break;
                }				
                case "CDBMSG": {
              command.message( cdb + message );	             
                    break;
                }				
                case "CBMSG": {
              command.message( cb + message );	             
                    break;
                }				
                case "CVMSG": {
              command.message( cv + message );	             
                    break;
                }				
                case "CPMSG": {
              command.message( cp + message );	             
                    break;
                }				
                case "CLPMSG": {
              command.message( clp + message );	             
                    break;
                }				
                case "CLBMSG": {
              command.message( clb + message );	             
                    break;
                }				
                case "CBLMSG": {
              command.message( cbl + message );	             
                    break;
                }				
                case "CGRMSG": {
              command.message( cgr + message );	             
                    break;
                }				
                case "CWMSG": {
              command.message( cw + message );	             
                    break;
                }
                case "CRMSG": {
              command.message( cr + message );	             
                    break;
                }					
                case "PRMSG": {
				  if(dispatch.settings.stream) return;	
              command.message( dispatch.settings.cc + message );	             
                    break;
                }					
				//语音通知
                case "speech": {
		            if(voice){
		            if(dispatch.settings.speaks){	
	                        timers[event['id'] || random_timer_id--] = setTimeout(()=> {
                             voice.speak(message,dispatch.settings.rate)
                        }, (event['delay'] || 0 ) - 600 /speed);				
					};
					};
                    break;
                }	
                 //团队长通知				
                case "notification": {
					if(dispatch.settings.stream) return;
                    sending_event = {
					channel: 25,
					authorName: 'guide',
					message
                    };
                    break;				
                }
                default: {
                    return debug_message(true, "Invalid sub_type for text handler:", event['sub_type']);
                }
            }

            // Create the timer
            timers[event['id'] || random_timer_id--] = setTimeout(()=> {
         
	                switch(event['sub_type']) {
	                //    case "message": return dispatch.toClient('S_DUNGEON_EVENT_MESSAGE', 2, sending_events);	
	                    case "notification": return dispatch.toClient('S_CHAT', 3, sending_event);
	                    case "alert": return dispatch.toClient('S_CHAT', 3, sending_event);						
						
	                }
            	 
				/*
				else {
            		// If dispatch.settings.streamer mode is enabled, send message all messages to party chat instead
            	//	return dispatch.toClient('S_CHAT', 2, { channel: 1, authorName: config['chat-name'], message });
            	}
				*/
            }, (event['delay'] || 0 ) / speed);
        }
	 function sendMessage(message) {
	    if(dispatch.settings.stream){
		command.message( dispatch.settings.cc +  message );	
		return;	
		} 
        if (dispatch.settings.notice) {
            dispatch.toClient('S_CHAT', 3, {
                channel: 21, //21 = p-notice, 1 = party, 2 = guild
                message
            });
        } else if(dispatch.settings.systemNotice) {
            dispatch.toClient('S_CHAT', 3, {
                channel: 1, //21 = p-notice, 1 = party, 2 = guild
                message
            });				
        } else {
			
            dispatch.toClient('S_DUNGEON_EVENT_MESSAGE', 2, {
                type: 42,
                chat: 0,
                channel: 27,
                message: ( dispatch.settings.cc +  message  ) //----------------------------------------------------------------------
            });
        }
    }	
	 function sendspMessage(message,spcc) {
             if(dispatch.settings.stream) return;
            dispatch.toClient('S_DUNGEON_EVENT_MESSAGE', 2, {
                type: 42,
                chat: 0,
                channel: 27,
                message: ( spcc +  message  )   //----------------------------------------------------------------------
            });
        
    }	
        // Sound handler
        function sound_handler(event, ent, speed=1.0) {
            // Make sure id is defined
            if(!event['id']) return debug_message(true, "Sound handler needs a id");
            // Ignore if dispatch.settings.streamer mode is enabled
            if(dispatch.settings.stream) return;

            // Create the timer
            timers[event['id']] = setTimeout(()=> {
                // Send the sound
                dispatch.toClient('S_PLAY_SOUND', 1, {
                    SoundID: event['id']
                });
            });
        }

        // Stop timer handler
        function stop_timer_handler(event, ent, speed=1.0) {
            // Make sure id is defined
            if(!event['id']) return debug_message(true, "Stop timer handler needs a id");

            // Check if that entry exists, if it doesn't print out a debug message. This is because users can make mistakes
            if(!timers[event['id']]) return debug_message(true, `There isn't a timer with tie id: ${event['id']} active`);

            // clearout the timer
            clearTimeout(timers[event['id']]);
        }

        // Func handler
        function func_handler(event, ent, speed=1.0) {
            // Make sure func is defined
            if(!event['func']) return debug_message(true, "Func handler needs a func");

            // Start the timer for the function call
            timers[event['id'] || random_timer_id--] = setTimeout(event['func'], (event['delay'] || 0) / speed, function_event_handlers, event, ent, fake_dispatch);
        }
		function speak_voice ( alerts, delay) {
        setTimeout(()=> {
			if(voice){
          voice.speak(alerts,1)
         // command.message( cg + alerts + cr +'（输入"guide help"可获取更多使用信息）\n ：（Enter "guide help" for more information）');	 
         text_handler({"sub_type": "CRMSG","message_TW": '（输入"guide help"可获取更多使用信息）', "message": '（Enter "guide help" for more information）' });  		  
			} else {
         // command.message( cr + alerts + cr +'（输入"guide help"可获取更多使用信息）\n ：（Enter "guide help" for more information）' );
         text_handler({"sub_type": "PRMSG","message_TW": '（输入"guide help"可获取更多使用信息）', "message": '（Enter "guide help" for more information）' });  	  
			}			
          }, delay );				
        }			
	
    }
}

module.exports = TeraGuide;