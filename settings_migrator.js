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
			case 1.16:
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
					"guides/9982.js"
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