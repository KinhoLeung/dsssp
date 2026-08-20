Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
let react = require("react");
react = __toESM(react, 1);
let react_jsx_runtime = require("react/jsx-runtime");
//#region src/components/FrequencyResponseGraph/GraphProvider.tsx
var GraphContext = (0, react.createContext)(void 0);
var GraphProvider = ({ children, svgRef, scale, logScale, height, width, outerHeight, outerWidth, theme, padding, clipPathId }) => {
	const memoizedTheme = (0, react.useMemo)(() => theme, [JSON.stringify(theme)]);
	const memoizedScale = (0, react.useMemo)(() => scale, [JSON.stringify(scale)]);
	const contextValue = (0, react.useMemo)(() => ({
		svgRef,
		theme: memoizedTheme,
		scale: memoizedScale,
		logScale,
		height,
		width,
		outerHeight,
		outerWidth,
		padding,
		clipPathId
	}), [
		svgRef,
		memoizedTheme,
		memoizedScale,
		logScale,
		height,
		width,
		outerHeight,
		outerWidth,
		padding,
		clipPathId
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(GraphContext.Provider, {
		value: contextValue,
		children
	});
};
//#endregion
//#region src/components/FrequencyResponseGraph/useGraph.ts
var useGraph = () => {
	const context = (0, react.useContext)(GraphContext);
	if (context === void 0) throw new Error("useGraph must be used within an FrequencyResponseGraphProvider");
	return context;
};
//#endregion
//#region src/components/FrequencyResponseGraph/GraphGradient.tsx
var directions = {
	VERTICAL: {
		x1: "0",
		y1: "0",
		x2: "0",
		y2: "1"
	},
	HORIZONTAL: {
		x1: "0",
		y1: "0",
		x2: "1",
		y2: "0"
	},
	DIAGONAL_TL_BR: {
		x1: "0",
		y1: "0",
		x2: "1",
		y2: "1"
	},
	DIAGONAL_BL_TR: {
		x1: "0",
		y1: "1",
		x2: "1",
		y2: "0"
	}
};
var GraphGradient = () => {
	const { width, height, outerWidth, outerHeight, padding, theme: { background: { gradient: { start, stop, direction }, grid: { lineColor, lineWidth: { border: borderWidth } } } } } = useGraph();
	const id = `gBg${Math.random().toString().substring(2, 9)}`;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
			id,
			...directions[direction],
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
				offset: "0%",
				stopColor: start
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
				offset: "100%",
				stopColor: stop
			})]
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
			x: -padding.left,
			y: -padding.top,
			width: outerWidth,
			height: outerHeight,
			fill: `url(#${id})`
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
			x: "0",
			y: "0",
			width,
			height,
			fill: `url(#${id})`
		}),
		Boolean(borderWidth) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
			x: borderWidth / 2,
			y: borderWidth / 2,
			width: Math.max(width - borderWidth, 0),
			height: Math.max(height - borderWidth, 0),
			fill: "none",
			stroke: lineColor,
			strokeWidth: borderWidth
		})
	] });
};
//#endregion
//#region src/types.ts
var filterTypes = {
	BYPASS: 0,
	PEAK: 6,
	HIGHSHELF1: 1,
	HIGHSHELF2: 2,
	LOWSHELF1: 3,
	LOWSHELF2: 4,
	HIGHPASS1: 7,
	HIGHPASS2: 8,
	LOWPASS1: 9,
	LOWPASS2: 10,
	BANDPASS: 11,
	NOTCH: 5,
	GAIN: 12
};
var filterTypeKeys = Object.keys(filterTypes);
//#endregion
//#region src/math.ts
var fastFloor = (x) => x >> 0;
var fastRound = (x) => x + (x > 0 ? .5 : -.5) >> 0;
var stripTail = (x, decimals = 2) => {
	const power = 10 ** decimals;
	return fastRound(x * power) / power;
};
var getLogScaleFn = (minFreq, maxFreq, width) => {
	const logMinFreq = Math.log10(minFreq);
	const logMaxFreq = Math.log10(maxFreq);
	const logRange = logMaxFreq - logMinFreq;
	const x = (freq) => {
		return (Math.log10(freq) - logMinFreq) / logRange * width;
	};
	const ticks = (number) => {
		const ticks = [];
		const decades = fastFloor(logMaxFreq - logMinFreq);
		for (let i = 0; i <= decades; i++) {
			const decadeStart = 10 ** (fastFloor(Math.log10(minFreq)) + i);
			if (decadeStart >= minFreq) ticks.push(decadeStart);
			for (let j = 2; j <= number - 1; j++) {
				const tick = fastFloor(decadeStart * j);
				if (tick <= maxFreq) ticks.push(tick);
			}
		}
		return ticks;
	};
	return {
		x,
		ticks
	};
};
var getLinearScaleFn = (min, max, width) => {
	const range = max - min;
	const x = (value) => {
		if (!range) return width / 2;
		return (value - min) / range * width;
	};
	const ticks = (count) => {
		const safeCount = Math.max(2, fastRound(count || 2));
		if (!range) return [min];
		const step = range / (safeCount - 1);
		return Array.from({ length: safeCount }, (_, index) => min + step * index);
	};
	return {
		x,
		ticks
	};
};
function calcBiQuadCoefficients(type, frequency, peakGain, Q = .707, sampleRate = 44100) {
	let A0 = 0;
	let A1 = 0;
	let A2 = 0;
	let B1 = 0;
	let B2 = 0;
	let norm;
	sampleRate = Math.max(1, sampleRate);
	frequency = Math.max(0, Math.min(frequency, sampleRate / 2));
	Q = Math.max(1e-4, Q);
	peakGain = Math.max(-120, Math.min(peakGain, 120));
	const V = 10 ** (Math.abs(peakGain) / 20);
	const shelfA = 10 ** (peakGain / 40);
	const omega = 2 * Math.PI * frequency / sampleRate;
	const sinOmega = Math.sin(omega);
	const cosOmega = Math.cos(omega);
	const shelfAlpha = sinOmega / (2 * Q);
	const K = Math.tan(Math.PI * frequency / sampleRate);
	switch (type) {
		case "NOTCH":
			norm = 1 / (1 + K / Q + K * K);
			A0 = (1 + K * K) * norm;
			A1 = 2 * (K * K - 1) * norm;
			A2 = A0;
			B1 = A1;
			B2 = (1 - K / Q + K * K) * norm;
			break;
		case "PEAK":
			if (peakGain >= 0) {
				norm = 1 / (1 + 1 / Q * K + K * K);
				A0 = (1 + V / Q * K + K * K) * norm;
				A1 = 2 * (K * K - 1) * norm;
				A2 = (1 - V / Q * K + K * K) * norm;
				B1 = A1;
				B2 = (1 - 1 / Q * K + K * K) * norm;
			} else {
				norm = 1 / (1 + V / Q * K + K * K);
				A0 = (1 + 1 / Q * K + K * K) * norm;
				A1 = 2 * (K * K - 1) * norm;
				A2 = (1 - 1 / Q * K + K * K) * norm;
				B1 = A1;
				B2 = (1 - V / Q * K + K * K) * norm;
			}
			break;
		case "LOWSHELF1":
			if (peakGain >= 0) {
				norm = 1 / (K + 1);
				A0 = (K * V + 1) * norm;
				A1 = (K * V - 1) * norm;
				A2 = 0;
				B1 = (K - 1) * norm;
				B2 = 0;
			} else {
				norm = 1 / (K * V + 1);
				A0 = (K + 1) * norm;
				A1 = (K - 1) * norm;
				A2 = 0;
				B1 = (K * V - 1) * norm;
				B2 = 0;
			}
			break;
		case "LOWSHELF2":
			norm = 1 / (shelfA + 1 + (shelfA - 1) * cosOmega + 2 * Math.sqrt(shelfA) * shelfAlpha);
			A0 = shelfA * (shelfA + 1 - (shelfA - 1) * cosOmega + 2 * Math.sqrt(shelfA) * shelfAlpha) * norm;
			A1 = 2 * shelfA * (shelfA - 1 - (shelfA + 1) * cosOmega) * norm;
			A2 = shelfA * (shelfA + 1 - (shelfA - 1) * cosOmega - 2 * Math.sqrt(shelfA) * shelfAlpha) * norm;
			B1 = -2 * (shelfA - 1 + (shelfA + 1) * cosOmega) * norm;
			B2 = (shelfA + 1 + (shelfA - 1) * cosOmega - 2 * Math.sqrt(shelfA) * shelfAlpha) * norm;
			break;
		case "HIGHSHELF1":
			if (peakGain >= 0) {
				norm = 1 / (K + 1);
				A0 = (K + V) * norm;
				A1 = (K - V) * norm;
				A2 = 0;
				B1 = (K - 1) * norm;
				B2 = 0;
			} else {
				norm = 1 / (K + V);
				A0 = (K + 1) * norm;
				A1 = (K - 1) * norm;
				A2 = 0;
				B1 = (K - V) * norm;
				B2 = 0;
			}
			break;
		case "HIGHSHELF2":
			norm = 1 / (shelfA + 1 - (shelfA - 1) * cosOmega + 2 * Math.sqrt(shelfA) * shelfAlpha);
			A0 = shelfA * (shelfA + 1 + (shelfA - 1) * cosOmega + 2 * Math.sqrt(shelfA) * shelfAlpha) * norm;
			A1 = -2 * shelfA * (shelfA - 1 + (shelfA + 1) * cosOmega) * norm;
			A2 = shelfA * (shelfA + 1 + (shelfA - 1) * cosOmega - 2 * Math.sqrt(shelfA) * shelfAlpha) * norm;
			B1 = 2 * (shelfA - 1 - (shelfA + 1) * cosOmega) * norm;
			B2 = (shelfA + 1 - (shelfA - 1) * cosOmega - 2 * Math.sqrt(shelfA) * shelfAlpha) * norm;
			break;
		case "LOWPASS1":
			norm = 1 / (1 / K + 1);
			A0 = A1 = norm;
			B1 = (1 - 1 / K) * norm;
			A2 = B2 = 0;
			break;
		case "LOWPASS2":
			norm = 1 / (1 + K / Q + K * K);
			A0 = K * K * norm;
			A1 = 2 * A0;
			A2 = A0;
			B1 = 2 * (K * K - 1) * norm;
			B2 = (1 - K / Q + K * K) * norm;
			break;
		case "HIGHPASS1":
			norm = 1 / (K + 1);
			A0 = norm;
			A1 = -norm;
			B1 = (K - 1) * norm;
			A2 = B2 = 0;
			break;
		case "HIGHPASS2":
			norm = 1 / (1 + K / Q + K * K);
			A0 = 1 * norm;
			A1 = -2 * A0;
			A2 = A0;
			B1 = 2 * (K * K - 1) * norm;
			B2 = (1 - K / Q + K * K) * norm;
			break;
		case "BANDPASS":
			norm = 1 / (1 + K / Q + K * K);
			A0 = K / Q * norm;
			A1 = 0;
			A2 = -A0;
			B1 = 2 * (K * K - 1) * norm;
			B2 = (1 - K / Q + K * K) * norm;
			break;
		case "GAIN":
			A0 = 10 ** (peakGain / 20);
			A1 = 0;
			A2 = 0;
			B1 = 0;
			B2 = 0;
			break;
		case "BYPASS":
			A0 = 1;
			A1 = 0;
			A2 = 0;
			B1 = 0;
			B2 = 0;
			break;
		default: throw new Error(`calcBiQuadCoefficients: unknown filter type "${type}"`);
	}
	return {
		A0,
		A1,
		A2,
		B1,
		B2
	};
}
function calcMagnitudeForFrequency(vars, width, sampleRate = 44100) {
	const { A0, A1, A2, B1, B2 } = vars;
	const phi = Math.sin(2 * Math.PI * width / sampleRate / 2) ** 2;
	let y = Math.log((A0 + A1 + A2) ** 2 - 4 * (A0 * A1 + 4 * A0 * A2 + A1 * A2) * phi + 16 * A0 * A2 * phi * phi) - Math.log((1 + B1 + B2) ** 2 - 4 * (1 * B1 + 4 * B2 + B1 * B2) * phi + 16 * B2 * phi * phi);
	y = y * 10 / Math.LN10;
	if (y === Number.NEGATIVE_INFINITY || isNaN(y)) y = -200;
	return y;
}
function calcAmplitudeForFrequency(gain) {
	return 10 ** (gain / 20);
}
function calcStandardDeviation(values) {
	const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
	const variance = values.map((val) => (val - mean) ** 2).reduce((acc, val) => acc + val, 0) / values.length;
	return Math.sqrt(variance);
}
var calcFrequency = (index, length, minFreq, maxFreq) => {
	return 10 ** ((Math.log10(maxFreq) - Math.log10(minFreq)) * index / (length - 1) + Math.log10(minFreq));
};
function calcMagnitudes(vars, steps, minFreq, maxFreq, sampleRate = 44100) {
	const magPlot = [];
	for (let index = 0; index < steps; index++) {
		const frequency = calcFrequency(index, steps, minFreq, maxFreq);
		const magnitude = calcMagnitudeForFrequency(vars, frequency, sampleRate);
		magPlot.push({
			frequency,
			magnitude
		});
	}
	return magPlot;
}
var calcDrcOutput = (input, threshold, ratio, knee = 0) => {
	const safeRatio = ratio > 0 ? ratio : 1;
	const kneeWidth = Math.max(0, knee);
	const halfKnee = kneeWidth / 2;
	if (kneeWidth > 0) {
		if (input <= threshold - halfKnee) return input;
		if (input >= threshold + halfKnee) return threshold + (input - threshold) / safeRatio;
		const delta = input - threshold + halfKnee;
		return input + (1 / safeRatio - 1) * delta * delta / (2 * kneeWidth);
	}
	if (input <= threshold) return input;
	return threshold + (input - threshold) / safeRatio;
};
var calcDrcMagnitudes = ({ threshold, ratio, knee = 0, makeup = 0, inputMin, inputMax, steps }) => {
	const min = Math.min(inputMin, inputMax);
	const max = Math.max(inputMin, inputMax);
	const safeSteps = Math.max(2, fastRound(steps || 2));
	const range = max - min || 1;
	const mags = [];
	for (let index = 0; index < safeSteps; index++) {
		const input = min + range * index / (safeSteps - 1);
		const output = calcDrcOutput(input, threshold, ratio, knee) + makeup;
		mags.push({
			frequency: input,
			magnitude: output
		});
	}
	return mags;
};
var reducePoints = (points) => {
	return [...points.slice(0, -1).reduce((acc, point, idx) => {
		if (fastRound(point.y * 4) !== fastRound((points[idx - 1]?.y || 0) * 4)) acc.push(point);
		return acc;
	}, []), points.slice(-1)[0]];
};
var getCenterLine = (minGain, maxGain, height) => {
	return maxGain / (maxGain - minGain) * height;
};
var scaleMagnitude = (magnitude, minGain, maxGain, height) => {
	const dbScale = height / (maxGain - minGain);
	return getCenterLine(minGain, maxGain, height) - magnitude * dbScale;
};
var calcMagnitude = (y, minGain, maxGain, height) => {
	const dbScale = height / (maxGain - minGain);
	return (getCenterLine(minGain, maxGain, height) - y) / dbScale;
};
var scaleMagnitudes = (magnitudes, scale, width, height) => {
	const { minGain, maxGain, displayMinGain, displayMaxGain } = scale;
	const gainMinForDisplay = typeof displayMinGain === "number" ? displayMinGain : minGain;
	const gainMaxForDisplay = typeof displayMaxGain === "number" ? displayMaxGain : maxGain;
	const length = magnitudes.length - 1;
	return magnitudes.map((mag, i) => {
		return {
			x: fastRound(width / length * i),
			y: stripTail(scaleMagnitude(mag.magnitude, gainMinForDisplay, gainMaxForDisplay, height))
		};
	});
};
var plotCurve = (points, scale, width, height) => {
	const { minGain, maxGain, displayMinGain, displayMaxGain } = scale;
	const centerY = getCenterLine(typeof displayMinGain === "number" ? displayMinGain : minGain, typeof displayMaxGain === "number" ? displayMaxGain : maxGain, height);
	let path = `M -200 ${centerY}`;
	points.map((point) => {
		path += ` L ${point.x} ${point.y > height + 2 ? height + 2 : point.y}`;
	});
	path += ` L ${width + 200} ${centerY}`;
	return path;
};
var calcFilterCoefficients = (filter, sampleRate = 44100) => {
	const { type, freq, gain, q } = filter;
	return calcBiQuadCoefficients(type, freq, gain, q, sampleRate);
};
var calcFilterMagnitudes = (vars, scale, width, precisionDivider = 2) => {
	const { minFreq, maxFreq, displayMinFreq, displayMaxFreq, sampleRate } = scale;
	const domainMinFreq = displayMinFreq && displayMinFreq > 0 ? displayMinFreq : minFreq;
	const domainMaxFreq = displayMaxFreq && displayMaxFreq > domainMinFreq ? displayMaxFreq : maxFreq;
	return calcMagnitudes(vars, width / precisionDivider, domainMinFreq, domainMaxFreq, sampleRate);
};
var calcCompositeMagnitudes = (magnitudes) => {
	const compositeMags = [];
	if (!magnitudes?.length) return [];
	if (!magnitudes?.[0]?.length) return [];
	for (let i = 0; i < magnitudes[0].length; i++) {
		const totalGain = magnitudes.reduce((sum, arr) => {
			const { magnitude } = arr[i] || {};
			if (!magnitude) return sum;
			return sum + magnitude;
		}, 0);
		const { frequency } = magnitudes[0][i] || {};
		if (!frequency) continue;
		compositeMags.push({
			frequency,
			magnitude: totalGain
		});
	}
	return compositeMags;
};
var limitRange = (value, min, max) => Math.min(Math.max(value, min), max);
//#endregion
//#region src/scale.ts
var defaultScale = {
	minFreq: 20,
	maxFreq: 2e4,
	displayMinFreq: 16,
	displayMaxFreq: 25e3,
	sampleRate: 96e3,
	minGain: -18,
	maxGain: 12,
	gainPrecision: 1,
	qPrecision: 1,
	minQ: .1,
	maxQ: 25,
	displayMinGain: -20,
	displayMaxGain: 13,
	dbSteps: 3,
	dbLabelSteps: 6,
	dbLabels: true,
	octaveTicks: 10,
	showDbUnitLabel: false,
	frequencyTicks: [
		20,
		30,
		40,
		50,
		60,
		70,
		80,
		90,
		100,
		200,
		300,
		400,
		500,
		600,
		700,
		800,
		900,
		1e3,
		2e3,
		3e3,
		4e3,
		5e3,
		6e3,
		7e3,
		8e3,
		9e3,
		1e4,
		2e4
	],
	octaveLabels: [
		20,
		50,
		100,
		200,
		500,
		1e3,
		2e3,
		5e3,
		1e4,
		2e4
	],
	majorTicks: [
		20,
		50,
		100,
		200,
		500,
		1e3,
		2e3,
		5e3,
		1e4,
		2e4
	]
};
//#endregion
//#region src/theme.ts
var defaultTheme = {
	background: {
		padding: {
			top: 12,
			right: 12,
			bottom: 20,
			left: 36
		},
		grid: {
			dotted: false,
			lineColor: "#3D4C5F",
			lineWidth: {
				minor: .25,
				major: .5,
				center: 1,
				border: .25
			}
		},
		gradient: {
			start: "#1E2530",
			stop: "#000000",
			direction: "VERTICAL"
		},
		label: {
			fontSize: 10,
			fontFamily: "sans-serif",
			color: "#626F84"
		},
		tracker: {
			lineWidth: .5,
			lineColor: "#7B899D",
			labelColor: "#626F84",
			backgroundColor: "#070C18"
		}
	},
	curve: {
		width: 1.5,
		opacity: 1,
		color: "#FFFFFF"
	},
	filters: {
		curve: {
			width: {
				normal: 1,
				active: 1
			},
			opacity: {
				normal: .5,
				active: .7
			}
		},
		point: {
			radius: 16,
			lineWidth: 2,
			backgroundOpacity: {
				normal: .2,
				active: .6,
				drag: .8
			},
			label: {
				fontSize: 24,
				fontFamily: "monospace",
				color: "inherit"
			}
		},
		zeroPoint: {
			color: "#626F84",
			background: "#97A3B4"
		},
		gradientOpacity: .7,
		fill: false,
		defaultColor: "#66FF66",
		colors: []
	}
};
//#endregion
//#region src/utils.ts
var getPointerPosition = (e) => {
	const eventTarget = e.currentTarget || e.target;
	const CTM = (eventTarget?.ownerSVGElement || eventTarget || null)?.getScreenCTM();
	const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
	const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
	if (!CTM) return {
		x: clientX,
		y: clientY
	};
	return {
		x: (clientX - CTM.e) / CTM.a,
		y: (clientY - CTM.f) / CTM.d
	};
};
var getZeroFreq = (type) => ["BYPASS", "GAIN"].includes(type) || !type;
var getZeroGain = (type) => [
	"LOWPASS1",
	"LOWPASS2",
	"HIGHPASS1",
	"HIGHPASS2",
	"BANDPASS",
	"BYPASS",
	"NOTCH"
].includes(type) || !type;
var getZeroQ = (type) => [
	"LOWSHELF1",
	"HIGHSHELF1",
	"HIGHPASS1",
	"LOWPASS1",
	"BYPASS",
	"GAIN"
].includes(type) || !type;
var getIconStyles = (type, gain = 0) => String(type).includes("SHELF") && gain > 0 || type === "PEAK" && gain < 0 || type === "GAIN" && gain < 0 ? {
	transform: "scale(1, -1)",
	transformBox: "fill-box",
	transformOrigin: "center"
} : {};
var getIconSymbol = (type) => {
	switch (type) {
		case "PEAK": return "&#xE908;";
		case "HIGHSHELF1":
		case "HIGHSHELF2": return "&#xE903;";
		case "LOWSHELF1":
		case "LOWSHELF2": return "&#xE905;";
		case "HIGHPASS1":
		case "HIGHPASS2": return "&#xE906;";
		case "LOWPASS1":
		case "LOWPASS2": return "&#xE904;";
		case "BANDPASS": return "&#xE900;";
		case "NOTCH": return "&#xE907;";
		case "GAIN": return "&#xE902;";
		default: return "&#xE901;";
	}
};
//#endregion
//#region src/components/CompositeCurve/CompositeCurve.tsx
var getFilterKey = (filter, cacheVersion) => `${filter.type}_${filter.freq}_${filter.q}_${filter.gain}_${cacheVersion}`;
/**
* Renders a composite frequency response curve by combining multiple filter responses.
* Uses magnitude caching to optimize performance when filters change.
*
* Supports custom styling through color, opacity and line width props.
* For better performance with many filters, adjust resolutionFactor.
*/
var CompositeCurve = ({ filters, resolutionFactor = 2, color, dotted, opacity, lineWidth, gradientId, style, easing, animate, duration, className }) => {
	const { scale, width } = useGraph();
	const { minFreq, maxFreq, displayMinFreq, displayMaxFreq, sampleRate } = scale;
	const domainMinFreq = displayMinFreq && displayMinFreq > 0 ? displayMinFreq : minFreq;
	const domainMaxFreq = displayMaxFreq && displayMaxFreq > domainMinFreq ? displayMaxFreq : maxFreq;
	const cacheVersion = (0, react.useMemo)(() => [
		domainMinFreq,
		domainMaxFreq,
		width,
		resolutionFactor,
		sampleRate
	].join("_"), [
		domainMinFreq,
		domainMaxFreq,
		width,
		resolutionFactor,
		sampleRate
	]);
	const [magnitudesCache, setMagnitudesCache] = (0, react.useState)({});
	const memoizedGetFilterKey = (0, react.useCallback)((filter) => {
		return getFilterKey(filter, cacheVersion);
	}, [cacheVersion]);
	const updateCache = (0, react.useCallback)(() => {
		const steps = Math.max(2, Math.round(Math.max(width, 0) / Math.max(resolutionFactor, 1e-4)));
		setMagnitudesCache((prevCache) => {
			const nextCache = {};
			filters.forEach((filter) => {
				const key = memoizedGetFilterKey(filter);
				const cachedMagnitudes = prevCache[key];
				if (cachedMagnitudes) {
					nextCache[key] = cachedMagnitudes;
					return;
				}
				const { type, freq, gain, q } = filter;
				const vars = calcBiQuadCoefficients(type, freq, gain, q, sampleRate);
				nextCache[key] = calcMagnitudes(vars, steps, domainMinFreq, domainMaxFreq, sampleRate) || [];
			});
			return nextCache;
		});
	}, [
		filters,
		memoizedGetFilterKey,
		width,
		resolutionFactor,
		domainMinFreq,
		domainMaxFreq,
		sampleRate
	]);
	(0, react.useEffect)(() => {
		updateCache();
	}, [updateCache]);
	const compositeMagnitudes = (0, react.useMemo)(() => {
		return calcCompositeMagnitudes(Object.values(magnitudesCache).filter((m) => m.length));
	}, [magnitudesCache]);
	if (!compositeMagnitudes.length) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("use", { href: "#centerLine" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FrequencyResponseCurve, {
		magnitudes: compositeMagnitudes,
		color,
		dotted,
		opacity,
		lineWidth,
		gradientId,
		style,
		easing,
		animate,
		duration,
		className
	})] });
};
//#endregion
//#region node_modules/deepmerge/dist/cjs.js
var require_cjs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isMergeableObject = function isMergeableObject(value) {
		return isNonNullObject(value) && !isSpecial(value);
	};
	function isNonNullObject(value) {
		return !!value && typeof value === "object";
	}
	function isSpecial(value) {
		var stringValue = Object.prototype.toString.call(value);
		return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
	}
	var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for ? Symbol.for("react.element") : 60103;
	function isReactElement(value) {
		return value.$$typeof === REACT_ELEMENT_TYPE;
	}
	function emptyTarget(val) {
		return Array.isArray(val) ? [] : {};
	}
	function cloneUnlessOtherwiseSpecified(value, options) {
		return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
	}
	function defaultArrayMerge(target, source, options) {
		return target.concat(source).map(function(element) {
			return cloneUnlessOtherwiseSpecified(element, options);
		});
	}
	function getMergeFunction(key, options) {
		if (!options.customMerge) return deepmerge;
		var customMerge = options.customMerge(key);
		return typeof customMerge === "function" ? customMerge : deepmerge;
	}
	function getEnumerableOwnPropertySymbols(target) {
		return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
			return Object.propertyIsEnumerable.call(target, symbol);
		}) : [];
	}
	function getKeys(target) {
		return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
	}
	function propertyIsOnObject(object, property) {
		try {
			return property in object;
		} catch (_) {
			return false;
		}
	}
	function propertyIsUnsafe(target, key) {
		return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
	}
	function mergeObject(target, source, options) {
		var destination = {};
		if (options.isMergeableObject(target)) getKeys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
		});
		getKeys(source).forEach(function(key) {
			if (propertyIsUnsafe(target, key)) return;
			if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
			else destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
		});
		return destination;
	}
	function deepmerge(target, source, options) {
		options = options || {};
		options.arrayMerge = options.arrayMerge || defaultArrayMerge;
		options.isMergeableObject = options.isMergeableObject || isMergeableObject;
		options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
		var sourceIsArray = Array.isArray(source);
		if (!(sourceIsArray === Array.isArray(target))) return cloneUnlessOtherwiseSpecified(source, options);
		else if (sourceIsArray) return options.arrayMerge(target, source, options);
		else return mergeObject(target, source, options);
	}
	deepmerge.all = function deepmergeAll(array, options) {
		if (!Array.isArray(array)) throw new Error("first argument should be an array");
		return array.reduce(function(prev, next) {
			return deepmerge(prev, next, options);
		}, {});
	};
	module.exports = deepmerge;
}));
//#endregion
//#region src/components/FrequencyResponseGraph/GraphGainGrid.tsx
var GraphGainGrid = () => {
	const { height, width, padding, scale: { minGain, maxGain, displayMinGain, displayMaxGain, dbSteps, dbLabels, dbLabelSteps, showDbUnitLabel }, theme: { background: { grid: { dotted, lineColor, lineWidth }, label: { color: labelColor, fontSize, fontFamily } } } } = useGraph();
	if (!dbSteps) return null;
	const steps = dbSteps || maxGain;
	const labelEvery = dbLabelSteps && dbLabelSteps > 0 ? Math.max(1, Math.round(dbLabelSteps / steps)) : 1;
	const gainMinForDisplay = typeof displayMinGain === "number" ? displayMinGain : minGain;
	const gainMaxForDisplay = typeof displayMaxGain === "number" ? displayMaxGain : maxGain;
	const dBs = Array.from({ length: (maxGain - minGain) / steps + 1 }, (_, i) => {
		return maxGain - i * steps;
	});
	const centerY = getCenterLine(gainMinForDisplay, gainMaxForDisplay, height);
	const strokeDasharray = "1,2";
	const gainLabelX = 4 - padding.left;
	const unitLabelY = -padding.top / 2;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("g", {
		"aria-hidden": "true",
		children: [
			dBs.map((tick, index) => {
				const tickY = scaleMagnitude(tick, gainMinForDisplay, gainMaxForDisplay, height);
				const tickLabel = tick > 0 ? `+${tick}` : tick;
				const showLabel = dbLabels && index % labelEvery === 0;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react.default.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("line", {
					x1: "0",
					x2: width,
					y1: tickY,
					y2: tickY,
					stroke: lineColor,
					strokeWidth: lineWidth.minor,
					...dotted ? { strokeDasharray } : {}
				}), showLabel && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("text", {
					x: gainLabelX,
					y: tickY,
					fill: labelColor,
					fontSize,
					fontFamily,
					textAnchor: "start",
					dominantBaseline: "middle",
					children: tickLabel
				})] }, tick);
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("line", {
				id: "centerLine",
				x1: "0",
				x2: width,
				y1: centerY,
				y2: centerY,
				stroke: lineColor,
				strokeWidth: lineWidth.center,
				...dotted ? { strokeDasharray } : {}
			}),
			showDbUnitLabel !== false && dbLabels && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("text", {
				y: unitLabelY,
				x: gainLabelX,
				fill: labelColor,
				fontSize,
				fontFamily,
				dominantBaseline: "middle",
				children: "dB"
			})
		]
	});
};
//#endregion
//#region src/components/FrequencyResponseGraph/GraphFrequencyGrid.tsx
var GraphFrequencyGrid = () => {
	const { height, logScale, padding, scale: { octaveLabels, octaveTicks, majorTicks, frequencyTicks }, theme: { background: { grid: { dotted, lineColor, lineWidth }, label: { color: labelColor, fontSize, fontFamily } } } } = useGraph();
	const autoTicks = octaveTicks ? logScale.ticks(octaveTicks) : [];
	const ticks = frequencyTicks?.length ? frequencyTicks : autoTicks;
	const strokeDasharray = "1,2";
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("g", {
		"aria-hidden": "true",
		children: [(frequencyTicks?.length ? ticks : ticks.slice(1, -1)).map((tick) => {
			const tickX = logScale.x(tick);
			const width = majorTicks.includes(tick) ? lineWidth.major : lineWidth.minor;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("line", {
				x1: tickX,
				x2: tickX,
				y1: "0",
				y2: height,
				stroke: lineColor,
				strokeWidth: width,
				...dotted ? { strokeDasharray } : {}
			}, tick);
		}), octaveLabels.map((octave) => {
			const octaveX = logScale.x(octave);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("text", {
				y: height + padding.bottom - 4,
				x: octaveX,
				textAnchor: "middle",
				fill: labelColor,
				fontSize,
				fontFamily,
				children: (octave < 1e3 ? octave : `${octave / 1e3}k`) + "Hz"
			}, octave);
		})]
	});
};
//#endregion
//#region src/components/FrequencyResponseGraph/FrequencyResponseGraph.tsx
var import_cjs = /* @__PURE__ */ __toESM(require_cjs(), 1);
/**
* This component renders a frequency response graph with customizable dimensions, scaling and theming.
* It provides the base SVG container and context for rendering filter curves, points and other graph elements.
*
* Uses deep merge to combine default theme/scale with provided overrides. Arrays are completely replaced rather than merged.
*/
var FrequencyResponseGraph = (0, react.forwardRef)((props, forwardedRef) => {
	const ref = (0, react.useRef)(null);
	(0, react.useImperativeHandle)(forwardedRef, () => ref.current);
	const { width, height, scale, theme, style = {}, className = "", ariaLabel = "Frequency response graph", children } = props;
	const mergedTheme = (0, react.useMemo)(() => (0, import_cjs.default)(defaultTheme, theme ?? {}), [theme]);
	const mergedScale = (0, react.useMemo)(() => (0, import_cjs.default)(defaultScale, scale ?? {}, { arrayMerge: (_, source) => source }), [scale]);
	const { background: { padding } } = mergedTheme;
	const { minFreq, maxFreq, displayMinFreq, displayMaxFreq } = mergedScale;
	const logMinFreq = displayMinFreq && displayMinFreq > 0 ? displayMinFreq : minFreq;
	const logMaxFreq = displayMaxFreq && displayMaxFreq > logMinFreq ? displayMaxFreq : maxFreq;
	const graphWidth = Math.max(width - padding.left - padding.right, 0);
	const graphHeight = Math.max(height - padding.top - padding.bottom, 0);
	const logScale = getLogScaleFn(logMinFreq, logMaxFreq, graphWidth);
	FrequencyResponseGraph.displayName = "FrequencyResponseGraph";
	const outerWidth = width;
	const outerHeight = height;
	const graphTransform = `translate(${padding.left}, ${padding.top})`;
	const graphId = `frequency-response-graph-${(0, react.useId)().replace(/:/g, "")}`;
	const clipPathId = `${graphId}-clip`;
	const resetStyles = `
  #${graphId} * {
    pointer-events: none;
  }`;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
		ref,
		id: graphId,
		role: "group",
		"aria-label": ariaLabel,
		className,
		viewBox: `0 0 ${outerWidth} ${outerHeight}`,
		style: {
			width: outerWidth,
			height: outerHeight,
			position: "relative",
			verticalAlign: "middle",
			userSelect: "none",
			...style
		},
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("style", { children: resetStyles }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("clipPath", {
			id: clipPathId,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
				x: "0",
				y: "0",
				width: graphWidth,
				height: graphHeight
			})
		})] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(GraphProvider, {
			svgRef: ref,
			width: graphWidth,
			height: graphHeight,
			outerWidth,
			outerHeight,
			padding,
			theme: mergedTheme,
			scale: mergedScale,
			logScale,
			clipPathId,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("g", {
				transform: graphTransform,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(GraphGradient, {}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(GraphGainGrid, {}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(GraphFrequencyGrid, {}),
					children
				]
			})
		})]
	});
});
//#endregion
//#region src/components/DRCGraph/GraphInputGrid.tsx
var GraphInputGrid = () => {
	const { height, padding, logScale, scale: { minGain, maxGain, displayMinGain, displayMaxGain, dbSteps, dbLabels, dbLabelSteps }, theme: { background: { grid: { dotted, lineColor, lineWidth }, label: { color: labelColor, fontSize, fontFamily } } } } = useGraph();
	if (!dbSteps) return null;
	const steps = dbSteps || maxGain;
	const labelEvery = dbLabelSteps && dbLabelSteps > 0 ? Math.max(1, Math.round(dbLabelSteps / steps)) : 1;
	const inputMin = typeof displayMinGain === "number" ? displayMinGain : minGain;
	const inputMax = typeof displayMaxGain === "number" ? displayMaxGain : maxGain;
	const dBs = Array.from({ length: (inputMax - inputMin) / steps + 1 }, (_, i) => inputMin + i * steps);
	const strokeDasharray = "1,2";
	const labelY = height + padding.bottom - 4;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("g", {
		"aria-hidden": "true",
		children: [dBs.map((tick, index) => {
			const tickX = logScale.x(tick);
			const tickLabel = tick > 0 ? `+${tick}` : tick;
			const showLabel = dbLabels && index % labelEvery === 0;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react.default.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("line", {
				x1: tickX,
				x2: tickX,
				y1: "0",
				y2: height,
				stroke: lineColor,
				strokeWidth: lineWidth.minor,
				...dotted ? { strokeDasharray } : {}
			}), showLabel && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("text", {
				x: tickX,
				y: labelY,
				textAnchor: "middle",
				fill: labelColor,
				fontSize,
				fontFamily,
				children: tickLabel
			})] }, tick);
		}), inputMin <= 0 && inputMax >= 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("line", {
			x1: logScale.x(0),
			x2: logScale.x(0),
			y1: "0",
			y2: height,
			stroke: lineColor,
			strokeWidth: lineWidth.center,
			...dotted ? { strokeDasharray } : {}
		})]
	});
};
//#endregion
//#region src/components/DRCGraph/DRCGraph.tsx
/**
* Renders a dynamic range (input/output) graph for DRC curves.
* Uses a linear scale on the X axis and the standard dB scale on Y.
*/
var DRCGraph = (0, react.forwardRef)((props, forwardedRef) => {
	const ref = (0, react.useRef)(null);
	(0, react.useImperativeHandle)(forwardedRef, () => ref.current);
	const { width, height, scale, theme, style = {}, className = "", ariaLabel = "Dynamic range compression graph", children } = props;
	const mergedTheme = (0, react.useMemo)(() => (0, import_cjs.default)(defaultTheme, theme ?? {}), [theme]);
	const mergedScale = (0, react.useMemo)(() => (0, import_cjs.default)(defaultScale, scale ?? {}, { arrayMerge: (_, source) => source }), [scale]);
	const { background: { padding } } = mergedTheme;
	const { minGain, maxGain, displayMinGain, displayMaxGain } = mergedScale;
	const inputMin = typeof displayMinGain === "number" ? displayMinGain : minGain;
	const inputMax = typeof displayMaxGain === "number" ? displayMaxGain : maxGain;
	const graphWidth = Math.max(width - padding.left - padding.right, 0);
	const graphHeight = Math.max(height - padding.top - padding.bottom, 0);
	const linearScale = getLinearScaleFn(inputMin, inputMax, graphWidth);
	DRCGraph.displayName = "DRCGraph";
	const outerWidth = width;
	const outerHeight = height;
	const graphTransform = `translate(${padding.left}, ${padding.top})`;
	const graphId = `drc-graph-${(0, react.useId)().replace(/:/g, "")}`;
	const clipPathId = `${graphId}-clip`;
	const resetStyles = `
  #${graphId} * {
    pointer-events: none;
  }`;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
		ref,
		id: graphId,
		role: "group",
		"aria-label": ariaLabel,
		className,
		viewBox: `0 0 ${outerWidth} ${outerHeight}`,
		style: {
			width: outerWidth,
			height: outerHeight,
			position: "relative",
			verticalAlign: "middle",
			userSelect: "none",
			...style
		},
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("style", { children: resetStyles }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("clipPath", {
			id: clipPathId,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
				x: "0",
				y: "0",
				width: graphWidth,
				height: graphHeight
			})
		})] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(GraphProvider, {
			svgRef: ref,
			width: graphWidth,
			height: graphHeight,
			outerWidth,
			outerHeight,
			padding,
			theme: mergedTheme,
			scale: mergedScale,
			logScale: linearScale,
			clipPathId,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("g", {
				transform: graphTransform,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(GraphGradient, {}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(GraphGainGrid, {}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(GraphInputGrid, {}),
					children
				]
			})
		})]
	});
});
//#endregion
//#region src/components/types.ts
var easingSplines = {
	linear: "0 0 1 1",
	easeIn: "0.42 0 1 1",
	easeOut: "0 0 0.58 1",
	easeInOut: "0.42 0 0.58 1"
};
//#endregion
//#region src/components/FrequencyResponseCurve/FrequencyResponseCurve.tsx
/**
* Renders a frequency response curve from an array of magnitude values.
* This is the basic curve component used internally by `CompositeCurve` and `FilterCurve`.
* Can also be used directly to render custom frequency response curves.
*
* Uses `theme.curve` values as defaults for styling, when color/opacity/width are not specified.
* Supports optional gradient fills and dotted line styles.
*/
var FrequencyResponseCurve = ({ magnitudes, dotted = false, color, opacity, lineWidth, gradientId, className, style, animate = false, easing = "easeInOut", duration = 300 }) => {
	const { scale, width, height, theme: { curve }, clipPathId } = useGraph();
	const curveColor = color || curve.color;
	const curveWidth = lineWidth || curve.width;
	const curveOpacity = opacity || curve.opacity;
	const { currentPath, initialPath } = (0, react.useMemo)(() => {
		const points = scaleMagnitudes(magnitudes, scale, width, height);
		const flatPoints = points.map((p) => ({
			x: p.x,
			y: height / 2
		}));
		return {
			currentPath: plotCurve(points, scale, width, height),
			initialPath: plotCurve(flatPoints, scale, width, height)
		};
	}, [
		magnitudes,
		scale,
		width,
		height
	]);
	const animateRef = (0, react.useRef)(null);
	const [fromPath, setFromPath] = (0, react.useState)(initialPath);
	const [toPath, setToPath] = (0, react.useState)(initialPath);
	(0, react.useLayoutEffect)(() => {
		if (animate) {
			setFromPath(toPath);
			animateRef.current?.beginElement();
			requestAnimationFrame(() => {
				setToPath(currentPath);
			});
		}
	}, [currentPath, animate]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
		"aria-hidden": "true",
		d: animate ? fromPath : currentPath,
		stroke: curveColor,
		strokeWidth: curveWidth,
		strokeOpacity: curveOpacity,
		strokeLinecap: "round",
		clipPath: `url(#${clipPathId})`,
		...dotted ? { strokeDasharray: "1,3" } : {},
		fill: gradientId ? `url(#${gradientId})` : "none",
		className,
		style,
		children: animate && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("animate", {
			ref: animateRef,
			from: fromPath,
			to: toPath,
			fill: "freeze",
			repeatCount: "1",
			attributeName: "d",
			dur: `${duration}ms`,
			calcMode: "spline",
			keyTimes: "0;1",
			keySplines: easingSplines[easing],
			additive: "replace",
			accumulate: "none"
		})
	});
};
//#endregion
//#region src/components/DRCGraph/DRCCurve.tsx
/**
* Renders a dynamic range compression/expansion curve from threshold/ratio settings.
*/
var DRCCurve = ({ threshold, ratio, knee = 0, makeup = 0, attack, release, inputMin, inputMax, resolutionFactor = 2, ...curveProps }) => {
	const { scale: { minGain, maxGain, displayMinGain, displayMaxGain }, width } = useGraph();
	const inputMinValue = typeof inputMin === "number" ? inputMin : typeof displayMinGain === "number" ? displayMinGain : minGain;
	const inputMaxValue = typeof inputMax === "number" ? inputMax : typeof displayMaxGain === "number" ? displayMaxGain : maxGain;
	const steps = Math.max(2, Math.round(width / Math.max(1, resolutionFactor || 1)));
	const magnitudes = (0, react.useMemo)(() => calcDrcMagnitudes({
		threshold,
		ratio,
		knee,
		makeup,
		inputMin: inputMinValue,
		inputMax: inputMaxValue,
		steps
	}), [
		threshold,
		ratio,
		knee,
		makeup,
		inputMinValue,
		inputMaxValue,
		steps
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FrequencyResponseCurve, {
		magnitudes,
		...curveProps
	});
};
//#endregion
//#region src/components/FilterCurve/FilterCurve.tsx
/**
* Renders a frequency response curve for a single filter.
* Visualizes filter's magnitude response and provides interactive controls
* when used with FilterPoint component.
*
* Features:
* - BiQuad coefficient calculation
* - Active state support
* - Optional vertical pin
* - Performance optimization
**/
var FilterCurve = ({ filter, index = -1, resolutionFactor = 2, color, dotted, opacity, lineWidth, gradientId, showPin = false, showBypass = false, active = false, activeColor, activeOpacity, activeLineWidth, style, easing, animate, duration, className, onChange }) => {
	const { scale, width, theme: { filters: { zeroPoint, curve, defaultColor, colors } } } = useGraph();
	const prevFilterHashRef = (0, react.useRef)("");
	const vars = calcFilterCoefficients(filter, scale.sampleRate);
	const magnitudes = calcFilterMagnitudes(vars, scale, width, resolutionFactor);
	(0, react.useEffect)(() => {
		const filterHash = JSON.stringify(filter);
		if (vars && prevFilterHashRef.current !== filterHash) {
			onChange?.(index, vars);
			prevFilterHashRef.current = filterHash;
		}
	}, [
		filter,
		vars,
		onChange
	]);
	if (!vars || !magnitudes?.length) return null;
	const zeroValue = filter.type === "BYPASS";
	if (zeroValue && !showBypass) return null;
	const normalColor = color || colors?.[index]?.curve || defaultColor;
	const curveColor = zeroValue ? zeroPoint.color : active ? activeColor || colors?.[index]?.active || normalColor : normalColor;
	const curveOpacity = active ? activeOpacity || curve.opacity.active : opacity || curve.opacity.normal;
	const curveWidth = active ? activeLineWidth || curve.width.active : lineWidth || curve.width.normal;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [showPin && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FilterPin, {
		vars,
		filter,
		color: curveColor,
		opacity: curveOpacity,
		lineWidth: curveWidth
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FrequencyResponseCurve, {
		magnitudes,
		dotted,
		color: curveColor,
		opacity: curveOpacity,
		lineWidth: curveWidth,
		gradientId,
		style,
		easing,
		animate,
		duration,
		className
	})] });
};
//#endregion
//#region src/components/FilterCurve/FilterPin.tsx
var FilterPin = ({ filter, vars, opacity, lineWidth, color }) => {
	const { scale, height, logScale } = useGraph();
	const { minGain, maxGain, displayMinGain, displayMaxGain, sampleRate } = scale;
	const { freq, type } = filter;
	let { gain, q } = filter;
	const zeroGain = getZeroGain(type);
	const { theme: { filters: { point } } } = useGraph();
	if (![
		"LOW",
		"HIGH",
		"NOTCH"
	].some((item) => type.includes(item))) return null;
	const pass1FilterType = type.includes("PASS1") || type === "NOTCH";
	const pass2FilterType = type.includes("PASS2");
	if (pass1FilterType || pass2FilterType) gain = 0;
	if (pass1FilterType) q = .7;
	let pointRadius = gain >= 0 || zeroGain ? point.radius : -point.radius;
	let pass2UpFlag = false;
	if (pass2FilterType && q > 1.1) {
		pointRadius = -point.radius;
		pass2UpFlag = true;
	}
	const gainMinForDisplay = typeof displayMinGain === "number" ? displayMinGain : minGain;
	const gainMaxForDisplay = typeof displayMaxGain === "number" ? displayMaxGain : maxGain;
	let pointY = pointRadius || 0;
	if (pass1FilterType || pass2FilterType) pointY += getCenterLine(gainMinForDisplay, gainMaxForDisplay, height);
	else pointY += scaleMagnitude(gain, gainMinForDisplay, gainMaxForDisplay, height);
	const magnitudeY = scaleMagnitude(calcMagnitudeForFrequency(vars, freq, sampleRate), gainMinForDisplay, gainMaxForDisplay, height);
	const deltaX = pointY > magnitudeY;
	const x = logScale.x(freq);
	if (gain < 0 && deltaX || gain >= 0 && !deltaX || pass2UpFlag) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("line", {
		x1: x,
		x2: x,
		y1: pointY,
		y2: magnitudeY,
		stroke: color,
		strokeWidth: lineWidth,
		strokeOpacity: opacity
	});
	return null;
};
//#endregion
//#region src/components/FilterGradient/FilterGradient.tsx
/**
* Creates a linear gradient for filter curve fills.
* Gradient direction automatically adjusts based on filter gain.
* Used in conjunction with FilterCurve component.
*/
var FilterGradient = ({ id, filter, index = 0, opacity, color, fill = false, className, style }) => {
	const { theme: { filters } } = useGraph();
	const stopColor = color || filters.colors?.[index]?.gradient || filters.defaultColor;
	const stopOpacity = opacity || filters.gradientOpacity;
	let gradientDirection;
	const filterGain = filter?.gain || 1;
	const filterType = filter?.type || "GAIN";
	const zeroGain = (0, react.useMemo)(() => getZeroGain(filterType), [filterType]);
	const startColor = fill || filters.fill ? stopColor : false;
	if (zeroGain) gradientDirection = {
		y1: "140%",
		y2: "0%"
	};
	else if (filterGain <= 0) gradientDirection = {
		y1: "100%",
		y2: "0%"
	};
	else gradientDirection = {
		y1: "0%",
		y2: "100%"
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("linearGradient", {
		id,
		x1: "0%",
		x2: "0%",
		...gradientDirection,
		className,
		style,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
			offset: "0%",
			stopColor,
			stopOpacity
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
			offset: "100%",
			stopColor: startColor || "transparent",
			stopOpacity: startColor ? stopOpacity : 0
		})]
	});
};
//#endregion
//#region src/components/FilterIcon/FilterIcon.tsx
/**
* Renders filter type icons using custom font symbols.
* Icons automatically adjust their appearance based on filter gain.
*/
var FilterIcon = ({ color = "#FFFFFF", size = 24, gain, type, filter, className = "", ...style }) => {
	const pxSize = `${size}px`;
	const iconGain = gain || filter?.gain || 0;
	const iconType = type || filter?.type || "BYPASS";
	const iconStyles = getIconStyles(iconType, iconGain);
	const iconSymbol = getIconSymbol(iconType);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className,
		style: {
			color,
			border: 0,
			margin: 0,
			padding: 0,
			width: pxSize,
			height: pxSize,
			lineHeight: 1,
			fontSize: pxSize,
			fontFamily: "dsssp",
			textAlign: "center",
			display: "inline-block",
			verticalAlign: "middle",
			...style,
			...iconStyles
		},
		dangerouslySetInnerHTML: { __html: iconSymbol }
	});
};
var BypassIcon = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FilterIcon, {
	...props,
	type: "BYPASS"
});
var LowPassIcon = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FilterIcon, {
	...props,
	type: "LOWPASS2"
});
var HighPassIcon = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FilterIcon, {
	...props,
	type: "HIGHPASS2"
});
var LowShelfIcon = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FilterIcon, {
	...props,
	type: "LOWSHELF2"
});
var HighShelfIcon = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FilterIcon, {
	...props,
	type: "HIGHSHELF2"
});
var BandPassIcon = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FilterIcon, {
	...props,
	type: "BANDPASS"
});
var NotchIcon = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FilterIcon, {
	...props,
	type: "NOTCH"
});
var PeakIcon = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FilterIcon, {
	...props,
	type: "PEAK"
});
var GainIcon = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FilterIcon, {
	...props,
	type: "GAIN"
});
//#endregion
//#region src/components/FilterPoint/FilterPoint.tsx
/**
* Interactive control point for filter parameters manipulation.
* Provides drag-and-drop frequency/gain control and Q-factor adjustment via mouse wheel.
*
* Features:
* - Horizontal/vertical dragging
* - Mouse wheel Q control
* - Multiple states (hover, drag, active)
* - Optional filter type icon or custom label
*
* Uses `defaultColor` from the theme as a fallback when filter colors are not specified.
*
*/
var FilterPoint = ({ filter, index = -1, dragX = true, dragY = true, wheelQ = true, minQ, maxQ, gainPrecision, qPrecision, active = false, showIcon = false, label = "", labelFontSize, labelFontFamily, labelColor, radius, lineWidth, color, zeroColor, dragColor, activeColor, background, zeroBackground, dragBackground, activeBackground, backgroundOpacity, dragBackgroundOpacity, activeBackgroundOpacity, className, style, onChange, onEnter, onLeave, onDoubleClick, onDrag }) => {
	const { svgRef, scale, logScale, height, width, padding, theme: { filters: { zeroPoint, colors, defaultColor, point } } } = useGraph();
	const { minGain, maxGain, gainPrecision: scaleGainPrecision, minQ: scaleMinQ, maxQ: scaleMaxQ, qPrecision: scaleQPrecision, displayMinGain, displayMaxGain, minFreq, maxFreq, displayMinFreq, displayMaxFreq } = scale;
	const gainMinForDisplay = typeof displayMinGain === "number" ? displayMinGain : minGain;
	const gainMaxForDisplay = typeof displayMaxGain === "number" ? displayMaxGain : maxGain;
	const domainMinFreq = displayMinFreq && displayMinFreq > 0 ? displayMinFreq : minFreq;
	const domainMaxFreq = displayMaxFreq && displayMaxFreq > domainMinFreq ? displayMaxFreq : maxFreq;
	const minX = Math.max(0, Math.min(logScale.x(minFreq), width));
	const maxX = Math.max(0, Math.min(logScale.x(maxFreq), width));
	const maxGainY = scaleMagnitude(maxGain, gainMinForDisplay, gainMaxForDisplay, height);
	const minGainY = scaleMagnitude(minGain, gainMinForDisplay, gainMaxForDisplay, height);
	const minY = Math.min(maxGainY, minGainY);
	const maxY = Math.max(maxGainY, minGainY);
	const { freq: filterFreq, gain: filterGain, q: filterQ, type } = filter;
	const gainDecimals = gainPrecision ?? scaleGainPrecision ?? 1;
	const qDecimals = qPrecision ?? scaleQPrecision ?? 1;
	const circleRef = (0, react.useRef)(null);
	const labelRef = (0, react.useRef)(null);
	const [hovered, setHovered] = (0, react.useState)(false);
	const [dragging, setDragging] = (0, react.useState)(false);
	const [zeroGain, passFilter, zeroQ] = (0, react.useMemo)(() => [
		getZeroGain(type),
		type.includes("PASS") || type === "NOTCH",
		getZeroQ(type)
	], [type]);
	const x = limitRange(logScale.x(filterFreq), minX, maxX);
	const centerY = getCenterLine(gainMinForDisplay, gainMaxForDisplay, height);
	const y = !passFilter ? scaleMagnitude(filterGain, gainMinForDisplay, gainMaxForDisplay, height) : centerY;
	let offset = {
		x: 0,
		y: 0
	};
	let cx;
	let cy;
	const moveFreq = (0, react.useRef)(filterFreq);
	const moveGain = (0, react.useRef)(filterGain);
	const qDragStartX = (0, react.useRef)(0);
	const qDragLastX = (0, react.useRef)(0);
	const qDragCurrent = (0, react.useRef)(filterQ);
	const qDragValue = (0, react.useRef)(filterQ);
	const qDragChanged = (0, react.useRef)(false);
	(0, react.useEffect)(() => {
		moveFreq.current = filterFreq;
		moveGain.current = filterGain;
		qDragCurrent.current = filterQ;
		qDragValue.current = filterQ;
	}, [
		filterFreq,
		filterGain,
		filterQ
	]);
	const getGraphPointer = (e) => {
		const CTM = svgRef.current?.getScreenCTM();
		const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
		const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
		if (!CTM) return {
			x: clientX,
			y: clientY
		};
		return {
			x: (clientX - CTM.e) / CTM.a - padding.left,
			y: (clientY - CTM.f) / CTM.d - padding.top
		};
	};
	const qDragMove = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (!svgRef.current) return;
		const { x } = getGraphPointer(e);
		const deltaX = x - qDragLastX.current;
		qDragLastX.current = x;
		const minAllowedQ = Math.max(1e-4, minQ ?? scaleMinQ ?? .1);
		const maxAllowedQ = maxQ ?? scaleMaxQ ?? 25;
		const deltaQ = (maxAllowedQ - minAllowedQ) * deltaX / Math.max(width, 1);
		qDragCurrent.current = limitRange(qDragCurrent.current + deltaQ, minAllowedQ, maxAllowedQ);
		const nextQ = stripTail(qDragCurrent.current, qDecimals);
		if (nextQ === qDragValue.current) return;
		qDragChanged.current = true;
		qDragValue.current = nextQ;
		onChange?.({
			index,
			...filter,
			q: nextQ
		});
	};
	const qDragEnd = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const svg = svgRef.current;
		if (!svg) return;
		svg.removeEventListener("mousemove", qDragMove);
		svg.removeEventListener("mouseup", qDragEnd);
		svg.removeEventListener("mouseleave", qDragEnd);
		if (!qDragChanged.current) return;
		onChange?.({
			index,
			...filter,
			q: qDragValue.current,
			ended: true
		});
	};
	const startQDrag = (e) => {
		const svg = svgRef.current;
		if (!svg) return;
		qDragChanged.current = false;
		qDragCurrent.current = filterQ;
		qDragValue.current = filterQ;
		const { x } = getGraphPointer(e);
		qDragStartX.current = x;
		qDragLastX.current = x;
		svg.addEventListener("mousemove", qDragMove);
		svg.addEventListener("mouseup", qDragEnd);
		svg.addEventListener("mouseleave", qDragEnd);
	};
	const dragMove = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (!circleRef.current) return;
		const { x, y } = getGraphPointer(e);
		if (dragX) {
			cx = limitRange(x - offset.x, minX, maxX);
			circleRef.current.setAttributeNS(null, "cx", String(cx));
			labelRef.current?.setAttributeNS(null, "x", String(cx));
			moveFreq.current = stripTail(limitRange(calcFrequency(cx, width, domainMinFreq, domainMaxFreq), minFreq, maxFreq));
		}
		if (dragY) {
			if (zeroGain) cy = centerY;
			else cy = limitRange(y - offset.y, minY, maxY);
			circleRef.current.setAttributeNS(null, "cy", String(cy));
			labelRef.current?.setAttributeNS(null, "y", String(cy));
			const limitedGain = limitRange(calcMagnitude(cy, gainMinForDisplay, gainMaxForDisplay, height), minGain, maxGain);
			moveGain.current = limitedGain < .05 && limitedGain > -.05 ? 0 : stripTail(limitedGain, gainDecimals);
		}
		onChange?.({
			index,
			...filter,
			freq: moveFreq.current,
			...!passFilter ? { gain: moveGain.current } : {}
		});
	};
	const dragEnd = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const svg = svgRef.current;
		const circleEl = circleRef.current;
		if (!svg || !circleEl) return;
		const touchEvent = "touches" in e;
		circleEl.setAttribute("fill-opacity", String(touchEvent ? backgroundOpacity ?? point.backgroundOpacity.normal : activeBackgroundOpacity ?? point.backgroundOpacity.active));
		svg.removeEventListener("mousemove", dragMove);
		svg.removeEventListener("mouseup", dragEnd);
		svg.removeEventListener("mouseleave", dragEnd);
		circleEl.removeEventListener("touchmove", dragMove);
		circleEl.removeEventListener("touchend", dragEnd);
		circleEl.removeEventListener("touchcancel", dragEnd);
		setDragging(false);
		onChange?.({
			index,
			...filter,
			freq: moveFreq.current,
			gain: moveGain.current,
			ended: true
		});
		onDrag?.(false);
	};
	const dragStart = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if ("button" in e && e.button === 2) {
			if (!zeroQ) startQDrag(e);
			return;
		}
		const svg = svgRef.current;
		const circleEl = circleRef.current;
		if (!svg || !circleEl) return;
		setDragging(true);
		const { x, y } = getGraphPointer(e);
		offset = {
			x: x - parseFloat(circleEl.getAttributeNS(null, "cx") || "0"),
			y: y - parseFloat(circleEl.getAttributeNS(null, "cy") || "0")
		};
		circleEl.setAttribute("fill-opacity", String(dragBackgroundOpacity || point.backgroundOpacity.drag));
		svg.addEventListener("mousemove", dragMove);
		svg.addEventListener("mouseup", dragEnd);
		svg.addEventListener("mouseleave", dragEnd);
		circleEl.addEventListener("touchmove", dragMove);
		circleEl.addEventListener("touchend", dragEnd);
		circleEl.addEventListener("touchcancel", dragEnd);
		onDrag?.(true);
	};
	const handleMouseEnter = () => {
		setHovered(true);
		onEnter?.({
			...filter,
			index
		});
	};
	const handleMouseLeave = () => {
		setHovered(false);
		onLeave?.({
			...filter,
			index
		});
	};
	const handleDoubleClick = (e) => {
		e.stopPropagation();
		onDoubleClick?.({
			...filter,
			index
		});
	};
	(0, react.useEffect)(() => {
		const circle = circleRef.current;
		if (!wheelQ || !circle || zeroQ) return;
		const handleWheel = (e) => {
			e.preventDefault();
			let newQ = filterQ;
			newQ += e.deltaY > 0 ? .1 : -.1;
			newQ = stripTail(limitRange(newQ, Math.max(1e-4, minQ ?? scaleMinQ ?? .1), maxQ ?? scaleMaxQ ?? 25), qDecimals);
			onChange?.({
				index,
				...filter,
				q: newQ,
				ended: true
			});
		};
		circle.addEventListener("wheel", handleWheel, { passive: false });
		return () => {
			circle.removeEventListener("wheel", handleWheel);
		};
	}, [
		wheelQ,
		zeroQ,
		filterQ,
		minQ,
		maxQ,
		scaleMinQ,
		scaleMaxQ,
		qDecimals,
		index,
		filter,
		onChange
	]);
	if (type === "BYPASS") return null;
	const strokeWidth = lineWidth || point.lineWidth;
	const pointColor = color || colors?.[index]?.point || defaultColor;
	const bgColor = background || colors?.[index]?.background || pointColor;
	const zeroValue = filterGain === 0 && !zeroGain;
	const strokeColor = zeroValue ? zeroColor || zeroPoint.color : dragging ? dragColor || colors?.[index]?.drag || pointColor : active || hovered ? activeColor || colors?.[index]?.active || pointColor : pointColor;
	const fillColor = zeroValue ? zeroBackground || zeroPoint.background : dragging ? dragBackground || colors?.[index]?.dragBackground || bgColor : active || hovered ? activeBackground || colors?.[index]?.activeBackground || bgColor : bgColor;
	const fillOpacity = active || hovered ? activeBackgroundOpacity ?? point.backgroundOpacity?.active : backgroundOpacity ?? point.backgroundOpacity?.normal;
	if (label || showIcon) {
		labelColor ||= point.label.color;
		labelFontSize ||= point.label.fontSize;
		labelFontFamily ||= point.label.fontFamily;
		if (labelColor === "inherit") labelColor = strokeColor;
	}
	let labelStyle = {};
	if (showIcon) {
		label = getIconSymbol(type);
		labelFontFamily = "dsssp";
		labelStyle = getIconStyles(type, filterGain);
	}
	const freqText = filterFreq >= 1e3 ? `${stripTail(filterFreq / 1e3)} kHz` : `${Math.round(filterFreq)} Hz`;
	const ariaLabel = passFilter ? `${type} filter, ${freqText}, Q ${filterQ}` : `${type} filter, ${freqText}, ${filterGain > 0 ? "+" : ""}${filterGain} dB, Q ${filterQ}`;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("g", {
		role: "img",
		"aria-label": ariaLabel,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
			ref: circleRef,
			cx: x,
			cy: y,
			r: radius || point.radius,
			fill: fillColor,
			fillOpacity,
			stroke: strokeColor,
			strokeWidth,
			onMouseEnter: handleMouseEnter,
			onMouseLeave: handleMouseLeave,
			onMouseDown: (e) => dragStart(e),
			onContextMenu: (e) => e.preventDefault(),
			onTouchStart: (e) => dragStart(e),
			onDoubleClick: handleDoubleClick,
			style: {
				cursor: "pointer",
				pointerEvents: "auto",
				...style
			},
			className
		}), Boolean(label) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("text", {
			ref: labelRef,
			"aria-hidden": "true",
			x,
			y,
			textAnchor: "middle",
			dominantBaseline: "central",
			fill: labelColor,
			fontSize: labelFontSize,
			fontFamily: labelFontFamily,
			style: { ...labelStyle },
			onDoubleClick: handleDoubleClick,
			...showIcon ? { dangerouslySetInnerHTML: { __html: label } } : { children: label }
		})]
	});
};
//#endregion
//#region src/components/PointerTracker/PointerTracker.tsx
/**
* Displays frequency and gain values at the current pointer position.
* Shows crosshair guides and value labels that follow the pointer.
**/
var PointerTracker = ({ lineWidth, lineColor, labelColor, backgroundColor, gainPrecision }) => {
	const { svgRef, width, height, padding, scale, theme: { background: { tracker, label: { fontSize, fontFamily } } } } = useGraph();
	const { minGain, maxGain, displayMinGain, displayMaxGain, minFreq, maxFreq, displayMinFreq, displayMaxFreq } = scale;
	const gainMinForDisplay = typeof displayMinGain === "number" ? displayMinGain : minGain;
	const gainMaxForDisplay = typeof displayMaxGain === "number" ? displayMaxGain : maxGain;
	const gainDigits = gainPrecision ?? scale.gainPrecision ?? 1;
	const domainMinFreq = displayMinFreq && displayMinFreq > 0 ? displayMinFreq : minFreq;
	const domainMaxFreq = displayMaxFreq && displayMaxFreq > domainMinFreq ? displayMaxFreq : maxFreq;
	const color = labelColor || tracker.labelColor;
	const fillColor = backgroundColor || tracker.backgroundColor;
	const strokeColor = lineColor || tracker.lineColor;
	const strokeWidth = lineWidth || tracker.lineWidth;
	const strokeDasharray = "1,2";
	const fontSizePadding = (fontSize || 0) + 3;
	const [freqWidth, setFreqWidth] = (0, react.useState)(0);
	const [gainWidth, setGainWidth] = (0, react.useState)(0);
	const [freqLabel, setFreqLabel] = (0, react.useState)(0);
	const [gainLabel, setGainLabel] = (0, react.useState)(0);
	const [trackMouse, setTrackMouse] = (0, react.useState)(false);
	const [mouse, setMouse] = (0, react.useState)({
		x: -50,
		y: -50
	});
	const freqLabelRef = (0, react.useRef)(null);
	const gainLabelRef = (0, react.useRef)(null);
	const mouseMove = (e) => {
		e.preventDefault();
		const { x, y } = getPointerPosition(e);
		const plotX = Math.min(Math.max(x - padding.left, 0), width);
		const plotY = Math.min(Math.max(y - padding.top, 0), height);
		setMouse({
			x: plotX,
			y: plotY
		});
		const newGain = calcMagnitude(plotY, gainMinForDisplay, gainMaxForDisplay, height).toFixed(gainDigits);
		if (newGain !== String(gainLabel)) setGainLabel(Number(newGain));
		const newFreq = fastFloor(calcFrequency(plotX, width, domainMinFreq, domainMaxFreq));
		if (newFreq !== freqLabel) setFreqLabel(newFreq);
	};
	(0, react.useEffect)(() => {
		if (!freqLabelRef.current) return;
		const w = fastFloor(freqLabelRef.current.getBBox().width);
		if (w !== freqWidth) setFreqWidth(w);
	}, [freqLabel]);
	(0, react.useEffect)(() => {
		if (!gainLabelRef.current) return;
		const w = fastFloor(gainLabelRef.current.getBBox().width);
		if (w !== gainWidth) setGainWidth(w);
	}, [gainLabel]);
	const handleMouseEnter = () => setTrackMouse(true);
	const handleMouseLeave = () => setTrackMouse(false);
	const handleTouchStart = () => setTrackMouse(true);
	const handleTouchEnd = () => setTrackMouse(false);
	const handleTouchCancel = () => setTrackMouse(false);
	(0, react.useEffect)(() => {
		const svg = svgRef.current;
		if (!svg) return;
		svg.addEventListener("mouseenter", handleMouseEnter);
		svg.addEventListener("mouseleave", handleMouseLeave);
		svg.addEventListener("mousemove", mouseMove);
		svg.addEventListener("touchstart", handleTouchStart);
		svg.addEventListener("touchmove", mouseMove);
		svg.addEventListener("touchend", handleTouchEnd);
		svg.addEventListener("touchcancel", handleTouchCancel);
		return () => {
			svg.removeEventListener("mouseenter", handleMouseEnter);
			svg.removeEventListener("mouseleave", handleMouseLeave);
			svg.removeEventListener("mousemove", mouseMove);
			svg.removeEventListener("touchstart", handleTouchStart);
			svg.removeEventListener("touchmove", mouseMove);
			svg.removeEventListener("touchend", handleTouchEnd);
			svg.removeEventListener("touchcancel", handleTouchCancel);
		};
	}, [svgRef.current]);
	(0, react.useEffect)(() => {
		setTrackMouse(true);
	}, []);
	if (!trackMouse) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("g", {
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
				width: freqWidth + 6,
				height: fontSizePadding,
				fill: fillColor,
				stroke: strokeColor,
				x: mouse.x - freqWidth / 2 - 3,
				y: height - fontSizePadding - 1
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("text", {
				ref: freqLabelRef,
				x: mouse.x - freqWidth / 2,
				y: height - 4,
				fill: color,
				fontSize,
				fontFamily,
				children: freqLabel
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
				width: gainWidth + 6,
				height: fontSizePadding,
				fill: fillColor,
				stroke: strokeColor,
				x: .5,
				y: mouse.y - 7
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("text", {
				ref: gainLabelRef,
				x: 3,
				y: mouse.y + 3,
				fill: color,
				fontSize,
				fontFamily,
				children: gainLabel > 0 ? `+${gainLabel}` : gainLabel
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("line", {
				x1: gainWidth + 7,
				x2: width,
				y1: mouse.y,
				y2: mouse.y,
				stroke: strokeColor,
				strokeWidth,
				strokeDasharray,
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("line", {
				x1: mouse.x,
				x2: mouse.x,
				y1: 0,
				y2: height - 14,
				stroke: strokeColor,
				strokeWidth,
				strokeDasharray,
				strokeLinecap: "round"
			})
		]
	});
};
//#endregion
exports.BandPassIcon = BandPassIcon;
exports.BypassIcon = BypassIcon;
exports.CompositeCurve = CompositeCurve;
exports.DRCCurve = DRCCurve;
exports.DRCGraph = DRCGraph;
exports.FilterCurve = FilterCurve;
exports.FilterGradient = FilterGradient;
exports.FilterIcon = FilterIcon;
exports.FilterPin = FilterPin;
exports.FilterPoint = FilterPoint;
exports.FrequencyResponseCurve = FrequencyResponseCurve;
exports.FrequencyResponseGraph = FrequencyResponseGraph;
exports.GainIcon = GainIcon;
exports.GraphContext = GraphContext;
exports.GraphFrequencyGrid = GraphFrequencyGrid;
exports.GraphGainGrid = GraphGainGrid;
exports.GraphGradient = GraphGradient;
exports.GraphInputGrid = GraphInputGrid;
exports.GraphProvider = GraphProvider;
exports.HighPassIcon = HighPassIcon;
exports.HighShelfIcon = HighShelfIcon;
exports.LowPassIcon = LowPassIcon;
exports.LowShelfIcon = LowShelfIcon;
exports.NotchIcon = NotchIcon;
exports.PeakIcon = PeakIcon;
exports.PointerTracker = PointerTracker;
exports.calcAmplitudeForFrequency = calcAmplitudeForFrequency;
exports.calcBiQuadCoefficients = calcBiQuadCoefficients;
exports.calcCompositeMagnitudes = calcCompositeMagnitudes;
exports.calcDrcMagnitudes = calcDrcMagnitudes;
exports.calcDrcOutput = calcDrcOutput;
exports.calcFilterCoefficients = calcFilterCoefficients;
exports.calcFilterMagnitudes = calcFilterMagnitudes;
exports.calcFrequency = calcFrequency;
exports.calcMagnitude = calcMagnitude;
exports.calcMagnitudeForFrequency = calcMagnitudeForFrequency;
exports.calcMagnitudes = calcMagnitudes;
exports.calcStandardDeviation = calcStandardDeviation;
exports.defaultScale = defaultScale;
exports.defaultTheme = defaultTheme;
exports.directions = directions;
exports.fastFloor = fastFloor;
exports.fastRound = fastRound;
exports.filterTypeKeys = filterTypeKeys;
exports.filterTypes = filterTypes;
exports.getCenterLine = getCenterLine;
exports.getIconStyles = getIconStyles;
exports.getIconSymbol = getIconSymbol;
exports.getLinearScaleFn = getLinearScaleFn;
exports.getLogScaleFn = getLogScaleFn;
exports.getPointerPosition = getPointerPosition;
exports.getZeroFreq = getZeroFreq;
exports.getZeroGain = getZeroGain;
exports.getZeroQ = getZeroQ;
exports.limitRange = limitRange;
exports.plotCurve = plotCurve;
exports.reducePoints = reducePoints;
exports.scaleMagnitude = scaleMagnitude;
exports.scaleMagnitudes = scaleMagnitudes;
exports.stripTail = stripTail;
exports.useGraph = useGraph;
