var miniExcludeMids = {
	'dGrowl/LICENSE.md': 1,
	'dGrowl/README.md': 1,
	'dGrowl/package': 1
};

var profile = {
	resourceTags: {
		test: function (filename) {
			return /\/test\//.test(filename);
		},

		miniExclude: function (filename, mid) {
			return /\/test\//.test(filename) || mid in miniExcludeMids;
		},

		amd: function (filename) {
			return (/\.js$/).test(filename);
		}
	}
};