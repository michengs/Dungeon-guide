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
		"</font><font color=\"#ffff00\">"
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
		if (to_ver < 1.15 ) {	
		remove(["dbg.json", "lib.js", "dispatch.js", "voice/voice.js", "voice"]);		
			
		}
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