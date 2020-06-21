"use strict"
const DefaultSettings = {
	"enabled": true,
	"lNotice": false,
	"gNotice": false,	
	"stream": false,
	"spawnObject": true,
	"dungeons": [
		{"id": 3017, "name": "Antaroth's Abyss (7man)","name_TW": "空洞的安塔洛斯深渊7人(7人深渊上)", "verbose": true, "spawnObject": true},	
		{"id": 3018, "name": "Dark Reach Citadel(7man)","name_TW": "泰内布利斯城堡7人(7人城堡)", "verbose": true, "spawnObject": true},
		{"id": 3019, "name": "Grotto of Lost Souls (7man)","name_TW": "里安的地下殿堂7人(7人殿上)", "name_RU": "Заброшенная мастерская Леандра", "verbose": true, "spawnObject": true},		
		{"id": 3020, "name": "Sea of Honor","name_TW": "金鳞号(航海p4)",  "name_RU": "Золотая чешуя", "verbose": true, "spawnObject": true},
		{"id": 3023, "name": "Akalath Quarantine","name_TW": "贝尔亚克城堡",  "name_RU": "Секретное подземелье крепости Берарк", "verbose": true, "spawnObject": true},
		{"id": 3026, "name": "Corrupted Skynest","name_TW": "凯尔赛克隐藏地",  "name_RU": "Логово Келсаика", "verbose": true, "spawnObject": true},
		{"id": 3027, "name": "Forbidden Arena","name_TW": "狂气竞技场",  "name_RU": "Арена безумия", "verbose": true, "spawnObject": true},
		{"id": 3101, "name": "Gossamer Vault","name_TW": "費爾奎娜巢穴(蝴蝶下)",  "name_RU": "Гнездо Паркин", "verbose": true, "spawnObject": true},
		{"id": 3102, "name": "Draakon Arena","name_TW": "司令官修練場",  "name_RU": "Командный центр", "verbose": true, "spawnObject": true},			
		{"id": 3126, "name": "Corrupted Skynest (Hard)","name_TW": "不灭凯尔塞克隐藏地(凯尔上)",  "name_RU": "Логово Бессмертного Келсаика", "verbose": true, "spawnObject": true},
		{"id": 3201, "name": "Gossamer Vault (Hard)","name_TW": "費爾奎娜巢穴上(蝴蝶上)",  "name_RU": "Гнездо сверкающей Паркин", "verbose": true, "spawnObject": true},		
		{"id": 3202, "name": "Draakon Arena (Hard)","name_TW": "憤怒的司令官修練場",  "name_RU": "Командный центр (сложно)", "verbose": true, "spawnObject": true},			
		{"id": 9044, "name": "Bahaar's Sanctum","name_TW": "巴哈勒神殿(火神)",  "name_RU": "Святилище Бахаара", "verbose": true, "spawnObject": true},
		{"id": 9050, "name": "Rift's Edge (Hard)","name_TW": "貪婪的卡舒帕露峽谷上 ", "verbose": true, "spawnObject": true},	
		{"id": 9054, "name": "Bathysmal rise guide","name_TW": "奧露卡神殿上 ", "verbose": true, "spawnObject": true},	
		{"id": 9059, "name": "Forsaken Island","name_TW": "伯恩斯坦惡靈島 ", "verbose": true, "spawnObject": true},	
		{"id": 9066, "name": "Demon’s Wheel","name_TW": "岱魔鲁斯的轮盘 ", "verbose": true, "spawnObject": true},			
		{"id": 9067, "name": "Demokron Factory (Hard)","name_TW": "殘暴費勒諾的實驗室",  "name_RU": "Лаборатория Берна (сложно)", "verbose": true, "spawnObject": true},
		{"id": 9070, "name": "Manglemire guide","name_TW": "吹牛王塔勒斯基的遊樂場  ", "verbose": true, "spawnObject": true},			
		{"id": 9720, "name": "Antaroth's Abyss","name_TW": "安塔洛斯深渊(深渊下)",  "name_RU": "Омут Антароса", "verbose": true, "spawnObject": true},
		{"id": 9735, "name": "RK-9 Kennel","name_TW": "RK9-机库",  "name_RU": "Ангар RK-9", "verbose": true, "spawnObject": true},
		{"id": 9750, "name": "Rift's Edge(10-Person)","name_TW": "卡舒帕露峽谷 ", "verbose": true, "spawnObject": true},	
		{"id": 9754, "name": "Bathysmal rise guide","name_TW": "奧露卡神殿下 ", "verbose": true, "spawnObject": true},	
		{"id": 9759, "name": "Forsaken Island","name_TW": "伯恩斯坦惡靈島高阶 ", "verbose": true, "spawnObject": true},			
		{"id": 9781, "name": "Velik's Sanctuary","name_TW": "贝里克神殿",  "name_RU": "Святилище Велики", "verbose": true, "spawnObject": true},
		{"id": 9782, "name": "Grotto of Lost Souls","name_TW": "里安的地下殿堂下",  "name_RU": "Мастерская Леандра", "verbose": true, "spawnObject": true},
		{"id": 9783, "name": "Dark Reach Citadel","name_TW": "泰内布利斯城堡", "verbose": true, "spawnObject": true},
		{"id": 9916, "name": "sky cruiser guide","name_TW": "暴風的艾爾凱拉斯號", "verbose": true, "spawnObject": true},		
		{"id": 9920, "name": "Antaroth's Abyss (Hard)","name_TW": "空洞的安塔洛斯深渊(深渊上)",  "name_RU": "Омут Бездушного Антароса", "verbose": true, "spawnObject": true},
		{"id": 9935, "name": "RK-9 Kennel (Hard)","name_TW": "困难RK9-机库",  "name_RU": "Ангар совершенного RK-9", "verbose": true, "spawnObject": true},
		{"id": 9939, "name": "Red Refuge (Hard)","name_TW": "森嚴的革命團總部", "verbose": true, "spawnObject": true},		
		{"id": 9970, "name": "Ruinous Manor (Hard)","name_TW": "超越的拉坎里斯的廢墟",  "name_RU": "Руины Кошмарной Абнукты", "verbose": true, "spawnObject": true},
		{"id": 9981, "name": "Velik's Sanctuary (Hard)","name_TW": "坍塌的贝里克神殿",  "name_RU": "Разрушенное Святилище Велики", "verbose": true, "spawnObject": true},
		{"id": 9982, "name": "Grotto of Lost Souls (Hard)","name_TW": "里安的地下殿堂上",  "name_RU": "Заброшенная мастерская Леандра", "verbose": true, "spawnObject": true},
		{"id": 9983, "name": "Dark Reach Citadel(Hard)","name_TW": "漆黑的泰內布利斯城堡", "verbose": true, "spawnObject": true}		
	],
	"cc": [
		"</font><font color=\"#ffff00\">"
	],
	"rate": [
		1
	],	
	 "speaks": true,	
	"chat-name": "Guide"
};

module.exports = function MigrateSettings(from_ver, to_ver, settings) {
	if (from_ver === undefined) {
		// Migrate legacy config file
		return Object.assign(Object.assign({}, DefaultSettings), settings);
	} else if (from_ver === null) {
		// No config file exists, use default settings
		return DefaultSettings;
	} else {
		// Migrate from older version (using the new system) to latest one
		if (from_ver + 1 < to_ver) {
			// Recursively upgrade in one-version steps
			settings = MigrateSettings(from_ver, from_ver + 1, settings);

			setTimeout(function(){ 
					return MigrateSettings(from_ver + 1, to_ver, settings); 
			}, 0);
		}
		// If we reach this point it's guaranteed that from_ver === to_ver - 1, so we can implement
		// a switch for each version step that upgrades to the next version. This enables us to
		// upgrade from any version to the latest version without additional effort!
		switch (to_ver) {
			default:
				let oldsettings = settings;
				settings = Object.assign(DefaultSettings, {});
				for (let option in settings) {
					if (option == "dungeons") {
						let optionobj = [];
						for (let i of settings[option]) {
							if (i.id == undefined) continue;
							if (oldsettings[option]) {
								for (const oldi of oldsettings[option]) {
									if (oldi.id == i.id) {
										i = oldi;
										break;
									}
								}
							}
							optionobj.push(i);
						}
						settings[option] = optionobj;
					}
				}
				for (let option in oldsettings) {
					if (option == "dungeons") continue;
					if (settings[option]) {
						settings[option] = oldsettings[option];
					}
				}
				break;
		}
		return settings;
	}
}