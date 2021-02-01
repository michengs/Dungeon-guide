"use strict";

const DefaultSettings = {
	"enabled": true,
	"stream": false,
	"lNotice": false,
	"gNotice": false,
	"spawnObject": true,
	"speech": {
		"enabled": true,
		"rate": 2,
		"volume": 100,
		"gender": "female"
	},
	"cc": [
		"</font><font color=\"#bfff00\">"
	],
	"language": "auto",
	"dungeons": {},
	"debug": {
		"chat": true,
		"all": false,
		"s": false,
		"am": false,
		"ae": false,
		"ab": false,
		"ar": false,
		"ad": false,
		"h": false,
		"ns": false,
		"nd": false,
		"rb": false,
		"re": false,		
		"dm": false,
		"qb": false
	}
};

module.exports = function MigrateSettings(from_ver, to_ver, settings) {

	if (from_ver === undefined) return Object.assign(Object.assign({}, DefaultSettings), settings);
	else if (from_ver === null) return DefaultSettings;
	else {
		from_ver = Number(from_ver);
		to_ver = Number(to_ver);

		if (from_ver + 0.01 < to_ver) {
			settings = MigrateSettings(from_ver, from_ver + 0.01, settings);
			return MigrateSettings(from_ver + 0.01, to_ver, settings);
		}

		const oldsettings = settings;
		settings = Object.assign(DefaultSettings, {});

		to_ver = Math.round(to_ver * 100) / 100;
		switch (to_ver) {

			case 1.15:
				for (const option in oldsettings) {
					if (option == "speaks") {
						settings["speech"]["enabled"] = oldsettings["speaks"];
					} else if (option == "rate") {
						settings["speech"]["rate"] = parseInt(oldsettings["rate"]);
					} else {
						settings[option] = oldsettings[option];
					}
				}
				return settings;
			case 1.17:
				remove([
					"guides/3027.js",
					"guides/3034.js",
					"guides/3036.js",
					"guides/3201.js",
					"guides/3202.js",
					"guides/3203.js",
					"guides/9053.js",
					"guides/9056.js",
					"guides/9735.js",
					"guides/9739.js",
					"guides/9781.js",
					"guides/9920.js",
					"guides/9982.js",
					"guides_DE/3020.js",					
					"guides_DE/3023.js",					
					"guides_DE/3026.js",							
					"guides_DE/3027.js",							
					"guides_DE/3034.js",							
					"guides_DE/3036.js",	
					"guides_DE/3102.js",		
					"guides_DE/3103.js",		
					"guides_DE/3126.js",		
					"guides_DE/3201.js",		
					"guides_DE/3202.js",		
					"guides_DE/3203.js",		
					"guides_DE/7011.js",		
					"guides_DE/7015.js",		
					"guides_DE/9044.js",		
					"guides_DE/9053.js",		
					"guides_DE/9735.js",		
					"guides_DE/9739.js",							
					"guides_DE/9781.js",	
					"guides_DE/9920.js",		
					"guides_DE/9982.js",
					"guides_DE",
					"guides_RU/3020.js",					
					"guides_RU/3023.js",					
					"guides_RU/3026.js",							
					"guides_RU/3027.js",							
					"guides_RU/3034.js",							
					"guides_RU/3036.js",	
					"guides_RU/3102.js",		
					"guides_RU/3103.js",		
					"guides_RU/3126.js",		
					"guides_RU/3201.js",		
					"guides_RU/3202.js",		
					"guides_RU/3203.js",		
					"guides_RU/7011.js",		
					"guides_RU/7015.js",		
					"guides_RU/9044.js",		
					"guides_RU/9053.js",	
					"guides_RU/9056.js",					
					"guides_RU/9735.js",		
					"guides_RU/9739.js",							
					"guides_RU/9781.js",	
					"guides_RU/9920.js",		
					"guides_RU/9982.js",					
					"guides_RU",
					"guides_FR/3020.js",					
					"guides_FR/3023.js",					
					"guides_FR/3026.js",							
					"guides_FR/3027.js",							
					"guides_FR/3034.js",							
					"guides_FR/3036.js",	
					"guides_FR/3102.js",		
					"guides_FR/3103.js",		
					"guides_FR/3126.js",		
					"guides_FR/3201.js",		
					"guides_FR/3202.js",		
					"guides_FR/3203.js",		
					"guides_FR/7011.js",		
					"guides_FR/7015.js",		
					"guides_FR/9044.js",		
					"guides_FR/9053.js",					
					"guides_FR/9735.js",		
					"guides_FR/9739.js",							
					"guides_FR/9781.js",	
					"guides_FR/9920.js",		
					"guides_FR/9982.js",
					"guides_FR",
					"guides_JP/3020.js",					
					"guides_JP/3023.js",					
					"guides_JP/3026.js",							
					"guides_JP/3027.js",							
					"guides_JP/3034.js",							
					"guides_JP/3036.js",	
					"guides_JP/3102.js",		
					"guides_JP/3103.js",		
					"guides_JP/3126.js",		
					"guides_JP/3201.js",		
					"guides_JP/3202.js",		
					"guides_JP/3203.js",		
					"guides_JP/7011.js",		
					"guides_JP/7015.js",		
					"guides_JP/9044.js",		
					"guides_JP/9053.js",					
					"guides_JP/9735.js",		
					"guides_JP/9739.js",							
					"guides_JP/9781.js",	
					"guides_JP/9920.js",		
					"guides_JP/9982.js",
					"guides_JP",
					"guides_KR/3020.js",					
					"guides_KR/3023.js",					
					"guides_KR/3026.js",							
					"guides_KR/3027.js",							
					"guides_KR/3034.js",							
					"guides_KR/3036.js",	
					"guides_KR/3102.js",		
					"guides_KR/3103.js",		
					"guides_KR/3126.js",		
					"guides_KR/3201.js",		
					"guides_KR/3202.js",		
					"guides_KR/3203.js",		
					"guides_KR/7011.js",		
					"guides_KR/7015.js",		
					"guides_KR/9044.js",		
					"guides_KR/9053.js",					
					"guides_KR/9735.js",		
					"guides_KR/9739.js",							
					"guides_KR/9781.js",	
					"guides_KR/9920.js",		
					"guides_KR/9982.js",
					"guides_KR"
				]);
				break;				
		}

		for (const option in oldsettings) {
			if (settings[option])
				settings[option] = oldsettings[option];
		}

		return settings;
	}

	function remove(files) {
		const fs = require("fs"), path = require("path");
		try {
			for (let file of files) {
				let filePath = path.join(__dirname, file);
				if (fs.existsSync(filePath)) {
					if (fs.lstatSync(filePath).isDirectory())
						fs.rmdirSync(filePath);
					else
						fs.unlinkSync(filePath);
				}
			}
		} catch (e) {}
	}
};