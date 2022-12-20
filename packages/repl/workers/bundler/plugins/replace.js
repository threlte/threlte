function escape(str) {
	return str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
}

function ensureFunction(functionOrValue) {
	if (typeof functionOrValue === 'function') {
		return functionOrValue;
	}
	return function () {
		return functionOrValue;
	};
}

function longest(a, b) {
	return b.length - a.length;
}

function mapToFunctions(object) {
	return Object.keys(object).reduce(function (functions, key) {
		functions[key] = ensureFunction(object[key]);
		return functions;
	}, {});
}

function replace(options) {
	const functionValues = mapToFunctions(options);
	const keys = Object.keys(functionValues).sort(longest).map(escape);

	const pattern = new RegExp('\\b(' + keys.join('|') + ')\\b', 'g');

	return {
		name: 'replace',

		transform: function transform(code, id) {
			let hasReplacements = false;
			let match;
			let start;
			let end;
			let replacement;

			code = code.replace(pattern, (_, key) => {
				hasReplacements = true;
				return String(functionValues[key](id));
			});

			if (!hasReplacements) {
				return null;
			}

			return {
				code,
				map: null
			};
		}
	};
}

export default replace;
