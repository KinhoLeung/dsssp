'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const React = require('react');
const jsxRuntime = require('react/jsx-runtime');

const GraphGainGrid = () => {
  const {
    height,
    width,
    padding,
    scale: {
      minGain,
      maxGain,
      displayMinGain,
      displayMaxGain,
      dbSteps,
      dbLabels,
      dbLabelSteps,
      showDbUnitLabel
    },
    theme: {
      background: {
        grid: { dotted, lineColor, lineWidth },
        label: { color: labelColor, fontSize, fontFamily }
      }
    }
  } = useGraph();
  if (!dbSteps) return null;
  const steps = dbSteps || maxGain;
  const labelEvery = dbLabelSteps && dbLabelSteps > 0 ? Math.max(1, Math.round(dbLabelSteps / steps)) : 1;
  const gainMinForDisplay = typeof displayMinGain === "number" ? displayMinGain : minGain;
  const gainMaxForDisplay = typeof displayMaxGain === "number" ? displayMaxGain : maxGain;
  const dBs = Array.from(
    { length: (maxGain - minGain) / steps + 1 },
    (_, i) => {
      return maxGain - i * steps;
    }
  );
  const centerY = getCenterLine(gainMinForDisplay, gainMaxForDisplay, height);
  const strokeDasharray = "1,2";
  const gainLabelX = 4 - padding.left;
  const unitLabelY = -padding.top / 2;
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    dBs.map((tick, index) => {
      const tickY = scaleMagnitude(
        tick,
        gainMinForDisplay,
        gainMaxForDisplay,
        height
      );
      const tickLabel = tick > 0 ? `+${tick}` : tick;
      const showLabel = dbLabels && index % labelEvery === 0;
      return /* @__PURE__ */ jsxRuntime.jsxs(React.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "line",
          {
            x1: "0",
            x2: width,
            y1: tickY,
            y2: tickY,
            stroke: lineColor,
            strokeWidth: lineWidth.minor,
            ...dotted ? { strokeDasharray } : {}
          }
        ),
        showLabel && /* @__PURE__ */ jsxRuntime.jsx(
          "text",
          {
            x: gainLabelX,
            y: tickY,
            fill: labelColor,
            fontSize,
            fontFamily,
            textAnchor: "start",
            dominantBaseline: "middle",
            children: tickLabel
          }
        )
      ] }, tick);
    }),
    /* @__PURE__ */ jsxRuntime.jsx(
      "line",
      {
        id: "centerLine",
        x1: "0",
        x2: width,
        y1: centerY,
        y2: centerY,
        stroke: lineColor,
        strokeWidth: lineWidth.center,
        ...dotted ? { strokeDasharray } : {}
      }
    ),
    showDbUnitLabel !== false && dbLabels && /* @__PURE__ */ jsxRuntime.jsx(
      "text",
      {
        y: unitLabelY,
        x: gainLabelX,
        fill: labelColor,
        fontSize,
        fontFamily,
        dominantBaseline: "middle",
        children: "dB"
      }
    )
  ] });
};

const GraphFrequencyGrid = () => {
  const {
    height,
    logScale,
    padding,
    scale: { octaveLabels, octaveTicks, majorTicks, frequencyTicks },
    theme: {
      background: {
        grid: { dotted, lineColor, lineWidth },
        label: { color: labelColor, fontSize, fontFamily }
      }
    }
  } = useGraph();
  const autoTicks = octaveTicks ? logScale.ticks(octaveTicks) : [];
  const ticks = frequencyTicks?.length ? frequencyTicks : autoTicks;
  const strokeDasharray = "1,2";
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    (frequencyTicks?.length ? ticks : ticks.slice(1, -1)).map((tick) => {
      const tickX = logScale.x(tick);
      const width = majorTicks.includes(tick) ? lineWidth.major : lineWidth.minor;
      return /* @__PURE__ */ jsxRuntime.jsx(
        "line",
        {
          x1: tickX,
          x2: tickX,
          y1: "0",
          y2: height,
          stroke: lineColor,
          strokeWidth: width,
          ...dotted ? { strokeDasharray } : {}
        },
        tick
      );
    }),
    octaveLabels.map((octave) => {
      const octaveX = logScale.x(octave);
      return /* @__PURE__ */ jsxRuntime.jsx(
        "text",
        {
          y: height + padding.bottom - 4,
          x: octaveX,
          textAnchor: "middle",
          fill: labelColor,
          fontSize,
          fontFamily,
          children: (octave < 1e3 ? octave : `${octave / 1e3}k`) + "Hz"
        },
        octave
      );
    })
  ] });
};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var cjs;
var hasRequiredCjs;

function requireCjs () {
	if (hasRequiredCjs) return cjs;
	hasRequiredCjs = 1;

	var isMergeableObject = function isMergeableObject(value) {
		return isNonNullObject(value)
			&& !isSpecial(value)
	};

	function isNonNullObject(value) {
		return !!value && typeof value === 'object'
	}

	function isSpecial(value) {
		var stringValue = Object.prototype.toString.call(value);

		return stringValue === '[object RegExp]'
			|| stringValue === '[object Date]'
			|| isReactElement(value)
	}

	// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
	var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
	var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

	function isReactElement(value) {
		return value.$$typeof === REACT_ELEMENT_TYPE
	}

	function emptyTarget(val) {
		return Array.isArray(val) ? [] : {}
	}

	function cloneUnlessOtherwiseSpecified(value, options) {
		return (options.clone !== false && options.isMergeableObject(value))
			? deepmerge(emptyTarget(value), value, options)
			: value
	}

	function defaultArrayMerge(target, source, options) {
		return target.concat(source).map(function(element) {
			return cloneUnlessOtherwiseSpecified(element, options)
		})
	}

	function getMergeFunction(key, options) {
		if (!options.customMerge) {
			return deepmerge
		}
		var customMerge = options.customMerge(key);
		return typeof customMerge === 'function' ? customMerge : deepmerge
	}

	function getEnumerableOwnPropertySymbols(target) {
		return Object.getOwnPropertySymbols
			? Object.getOwnPropertySymbols(target).filter(function(symbol) {
				return Object.propertyIsEnumerable.call(target, symbol)
			})
			: []
	}

	function getKeys(target) {
		return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
	}

	function propertyIsOnObject(object, property) {
		try {
			return property in object
		} catch(_) {
			return false
		}
	}

	// Protects from prototype poisoning and unexpected merging up the prototype chain.
	function propertyIsUnsafe(target, key) {
		return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
			&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
				&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
	}

	function mergeObject(target, source, options) {
		var destination = {};
		if (options.isMergeableObject(target)) {
			getKeys(target).forEach(function(key) {
				destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
			});
		}
		getKeys(source).forEach(function(key) {
			if (propertyIsUnsafe(target, key)) {
				return
			}

			if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
				destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
			} else {
				destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
			}
		});
		return destination
	}

	function deepmerge(target, source, options) {
		options = options || {};
		options.arrayMerge = options.arrayMerge || defaultArrayMerge;
		options.isMergeableObject = options.isMergeableObject || isMergeableObject;
		// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
		// implementations can use it. The caller may not replace it.
		options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

		var sourceIsArray = Array.isArray(source);
		var targetIsArray = Array.isArray(target);
		var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

		if (!sourceAndTargetTypesMatch) {
			return cloneUnlessOtherwiseSpecified(source, options)
		} else if (sourceIsArray) {
			return options.arrayMerge(target, source, options)
		} else {
			return mergeObject(target, source, options)
		}
	}

	deepmerge.all = function deepmergeAll(array, options) {
		if (!Array.isArray(array)) {
			throw new Error('first argument should be an array')
		}

		return array.reduce(function(prev, next) {
			return deepmerge(prev, next, options)
		}, {})
	};

	var deepmerge_1 = deepmerge;

	cjs = deepmerge_1;
	return cjs;
}

var cjsExports = requireCjs();
const merge = /*@__PURE__*/getDefaultExportFromCjs(cjsExports);

const defaultScale = {
  minFreq: 20,
  maxFreq: 2e4,
  displayMinFreq: 16,
  displayMaxFreq: 25e3,
  sampleRate: 96e3,
  // 48000 / 96000 / 192000
  minGain: -18,
  maxGain: 12,
  gainPrecision: 1,
  qPrecision: 1,
  minQ: 0.1,
  maxQ: 25,
  displayMinGain: -20,
  displayMaxGain: 13,
  dbSteps: 3,
  // 0 to disable
  dbLabelSteps: 6,
  dbLabels: true,
  octaveTicks: 10,
  // ticks per octave (0 to disable)
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
  octaveLabels: [20, 50, 100, 200, 500, 1e3, 2e3, 5e3, 1e4, 2e4],
  majorTicks: [20, 50, 100, 200, 500, 1e3, 2e3, 5e3, 1e4, 2e4]
  // ticks with the major line width, same as zero gain
};

const defaultTheme = {
  background: {
    padding: { top: 12, right: 12, bottom: 20, left: 36 },
    // background grid lines
    grid: {
      dotted: false,
      lineColor: "#3D4C5F",
      lineWidth: { minor: 0.25, major: 0.5, center: 1, border: 0.25 }
    },
    // background gradient
    gradient: {
      start: "#1E2530",
      stop: "#000000",
      direction: "VERTICAL"
    },
    // frequency and gain labels
    label: {
      fontSize: 10,
      fontFamily: "sans-serif",
      color: "#626F84"
    },
    // mouse tracker
    tracker: {
      lineWidth: 0.5,
      lineColor: "#7B899D",
      labelColor: "#626F84",
      backgroundColor: "#070C18"
    }
  },
  // basic frequency response and composite curves
  curve: {
    width: 1.5,
    opacity: 1,
    color: "#FFFFFF"
  },
  filters: {
    // filter curves
    curve: {
      width: { normal: 1, active: 1 },
      opacity: { normal: 0.5, active: 0.7 }
    },
    // filter points
    point: {
      radius: 16,
      lineWidth: 2,
      backgroundOpacity: {
        normal: 0.2,
        active: 0.6,
        drag: 0.8
      },
      // label inside the point
      // size and color applicable to filter icons as well
      label: {
        fontSize: 24,
        fontFamily: "monospace",
        color: "inherit"
      }
    },
    // styles of the empty / zero gain filters
    zeroPoint: {
      color: "#626F84",
      background: "#97A3B4"
    },
    gradientOpacity: 0.7,
    fill: false,
    // default color for filters, points, and curves
    defaultColor: "#66FF66",
    // empty placeholder of filter colors
    colors: []
  }
};

const FrequencyResponseGraph = React.forwardRef((props, forwardedRef) => {
  const ref = React.useRef(null);
  React.useImperativeHandle(forwardedRef, () => ref.current);
  const {
    width,
    height,
    scale = {},
    theme = {},
    style = {},
    className = "",
    children
  } = props;
  const mergedTheme = merge(defaultTheme, theme);
  const mergedScale = merge(defaultScale, scale, {
    arrayMerge: (_, source) => source
    // overwrite arrays
  });
  const {
    background: { padding }
  } = mergedTheme;
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
  const graphId = `frequency-response-graph-${String(Math.random()).slice(2, 9)}`;
  const clipPathId = `${graphId}-clip`;
  const resetStyles = `
  #${graphId} * {
    pointer-events: none;
  }`;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "svg",
    {
      ref,
      id: graphId,
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
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs("defs", { children: [
          /* @__PURE__ */ jsxRuntime.jsx("style", { children: resetStyles }),
          /* @__PURE__ */ jsxRuntime.jsx("clipPath", { id: clipPathId, children: /* @__PURE__ */ jsxRuntime.jsx(
            "rect",
            {
              x: "0",
              y: "0",
              width: graphWidth,
              height: graphHeight
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(
          GraphProvider,
          {
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
            children: /* @__PURE__ */ jsxRuntime.jsxs("g", { transform: graphTransform, children: [
              /* @__PURE__ */ jsxRuntime.jsx(GraphGradient, {}),
              /* @__PURE__ */ jsxRuntime.jsx(GraphGainGrid, {}),
              /* @__PURE__ */ jsxRuntime.jsx(GraphFrequencyGrid, {}),
              children
            ] })
          }
        )
      ]
    }
  );
});

const GraphContext = React.createContext(
  undefined
);
const GraphProvider = ({
  children,
  svgRef,
  scale,
  logScale,
  height,
  width,
  outerHeight,
  outerWidth,
  theme,
  padding,
  clipPathId
}) => {
  const memoizedTheme = React.useMemo(() => theme, [JSON.stringify(theme)]);
  const memoizedScale = React.useMemo(() => scale, [JSON.stringify(scale)]);
  const contextValue = React.useMemo(
    () => ({
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
    }),
    [
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
    ]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(GraphContext.Provider, { value: contextValue, children });
};

const useGraph = () => {
  const context = React.useContext(GraphContext);
  if (context === undefined) {
    throw new Error(
      "useGraph must be used within an FrequencyResponseGraphProvider"
    );
  }
  return context;
};

const directions = {
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
const GraphGradient = () => {
  const {
    width,
    height,
    outerWidth,
    outerHeight,
    padding,
    theme: {
      background: {
        gradient: { start, stop, direction },
        grid: {
          lineColor,
          lineWidth: { border: borderWidth }
        }
      }
    }
  } = useGraph();
  const id = `gBg${Math.random().toString().substring(2, 9)}`;
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(
      "linearGradient",
      {
        id,
        ...directions[direction],
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "stop",
            {
              offset: "0%",
              stopColor: start
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            "stop",
            {
              offset: "100%",
              stopColor: stop
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      "rect",
      {
        x: -padding.left,
        y: -padding.top,
        width: outerWidth,
        height: outerHeight,
        fill: `url(#${id})`
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      "rect",
      {
        x: "0",
        y: "0",
        width,
        height,
        fill: `url(#${id})`
      }
    ),
    Boolean(borderWidth) && /* @__PURE__ */ jsxRuntime.jsx(
      "rect",
      {
        x: borderWidth / 2,
        y: borderWidth / 2,
        width: Math.max(width - borderWidth, 0),
        height: Math.max(height - borderWidth, 0),
        fill: "none",
        stroke: lineColor,
        strokeWidth: borderWidth
      }
    )
  ] });
};

const filterTypes = {
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
  // ONEPOLE_HP: 0x0d,
  // ONEPOLE_LP: 0x0e
  // COEFFICIENTS: 0x10
};
const filterTypeKeys = Object.keys(filterTypes);

const fastFloor = (x) => x >> 0;
const fastRound = (x) => x + (x > 0 ? 0.5 : -0.5) >> 0;
const stripTail = (x, decimals = 2) => {
  const power = 10 ** decimals;
  return fastRound(x * power) / power;
};
const getLogScaleFn = (minFreq, maxFreq, width) => {
  const logMinFreq = Math.log10(minFreq);
  const logMaxFreq = Math.log10(maxFreq);
  const logRange = logMaxFreq - logMinFreq;
  const x = (freq) => {
    const logFreq = Math.log10(freq);
    const x2 = (logFreq - logMinFreq) / logRange * width;
    return x2;
  };
  const ticks = (number) => {
    const ticks2 = [];
    const decades = fastFloor(logMaxFreq - logMinFreq);
    for (let i = 0; i <= decades; i++) {
      const decadeStart = 10 ** (fastFloor(Math.log10(minFreq)) + i);
      if (decadeStart >= minFreq) ticks2.push(decadeStart);
      for (let j = 2; j <= number - 1; j++) {
        const tick = fastFloor(decadeStart * j);
        if (tick <= maxFreq) {
          ticks2.push(tick);
        }
      }
    }
    return ticks2;
  };
  return { x, ticks };
};
function calcBiQuadCoefficients(type, frequency, peakGain, Q = 0.707, sampleRate = 44100) {
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
      if (peakGain >= 0) {
        norm = 1 / (1 + Math.SQRT2 * K + K * K);
        A0 = (1 + Math.sqrt(2 * V) * K + V * K * K) * norm;
        A1 = 2 * (V * K * K - 1) * norm;
        A2 = (1 - Math.sqrt(2 * V) * K + V * K * K) * norm;
        B1 = 2 * (K * K - 1) * norm;
        B2 = (1 - Math.SQRT2 * K + K * K) * norm;
      } else {
        norm = 1 / (1 + Math.sqrt(2 * V) * K + V * K * K);
        A0 = (1 + Math.SQRT2 * K + K * K) * norm;
        A1 = 2 * (K * K - 1) * norm;
        A2 = (1 - Math.SQRT2 * K + K * K) * norm;
        B1 = 2 * (V * K * K - 1) * norm;
        B2 = (1 - Math.sqrt(2 * V) * K + V * K * K) * norm;
      }
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
      if (peakGain >= 0) {
        norm = 1 / (1 + Math.SQRT2 * K + K * K);
        A0 = (V + Math.sqrt(2 * V) * K + K * K) * norm;
        A1 = 2 * (K * K - V) * norm;
        A2 = (V - Math.sqrt(2 * V) * K + K * K) * norm;
        B1 = 2 * (K * K - 1) * norm;
        B2 = (1 - Math.SQRT2 * K + K * K) * norm;
      } else {
        norm = 1 / (V + Math.sqrt(2 * V) * K + K * K);
        A0 = (1 + Math.SQRT2 * K + K * K) * norm;
        A1 = 2 * (K * K - 1) * norm;
        A2 = (1 - Math.SQRT2 * K + K * K) * norm;
        B1 = 2 * (K * K - V) * norm;
        B2 = (V - Math.sqrt(2 * V) * K + K * K) * norm;
      }
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
      const gain = 10 ** (peakGain / 20);
      A0 = gain;
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
    // case 'ONEPOLE_LP':
    //   B1 = Math.exp(-2.0 * Math.PI * (frequency / sampleRate))
    //   A0 = 1.0 - B1
    //   B1 = -B1
    //   A1 = A2 = B2 = 0
    //   break
    // case 'ONEPOLE_HP':
    //   B1 = -Math.exp(-2.0 * Math.PI * (0.5 - frequency / sampleRate))
    //   A0 = 1.0 + B1
    //   B1 = -B1
    //   A1 = A2 = B2 = 0
    //   break
    default:
      console.error("calcBiQuadCoefficients: unknown filter type");
  }
  return { A0, A1, A2, B1, B2 };
}
function calcMagnitudeForFrequency(vars, width, sampleRate = 44100) {
  const { A0, A1, A2, B1, B2 } = vars;
  const phi = Math.sin(2 * Math.PI * width / sampleRate / 2) ** 2;
  let y = Math.log(
    (A0 + A1 + A2) ** 2 - 4 * (A0 * A1 + 4 * A0 * A2 + A1 * A2) * phi + 16 * A0 * A2 * phi * phi
  ) - Math.log(
    (1 + B1 + B2) ** 2 - 4 * (1 * B1 + 4 * 1 * B2 + B1 * B2) * phi + 16 * 1 * B2 * phi * phi
  );
  y = y * 10 / Math.LN10;
  if (y === Number.NEGATIVE_INFINITY || isNaN(y)) y = -200;
  return y;
}
function calcAmplitudeForFrequency(gain) {
  const amplitude = 10 ** (gain / 20);
  return amplitude;
}
function calcStandardDeviation(values) {
  const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
  const squaredDiffs = values.map((val) => (val - mean) ** 2);
  const variance = squaredDiffs.reduce((acc, val) => acc + val, 0) / values.length;
  const standardDeviation = Math.sqrt(variance);
  return standardDeviation;
}
const calcFrequency = (index, length, minFreq, maxFreq) => {
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
      /*, amplitude, deviation */
    });
  }
  return magPlot;
}
const reducePoints = (points) => {
  const uniquePoints = points.slice(0, -1).reduce((acc, point, idx) => {
    if (fastRound(point.y * 4) !== fastRound((points[idx - 1]?.y || 0) * 4)) {
      acc.push(point);
    }
    return acc;
  }, []);
  return [...uniquePoints, points.slice(-1)[0]];
};
const getCenterLine = (minGain, maxGain, height) => {
  const dbRange = maxGain - minGain;
  return maxGain / dbRange * height;
};
const scaleMagnitude = (magnitude, minGain, maxGain, height) => {
  const dbScale = height / (maxGain - minGain);
  const dbCenterLine = getCenterLine(minGain, maxGain, height);
  return dbCenterLine - magnitude * dbScale;
};
const calcMagnitude = (y, minGain, maxGain, height) => {
  const dbScale = height / (maxGain - minGain);
  const dbCenterLine = getCenterLine(minGain, maxGain, height);
  return (dbCenterLine - y) / dbScale;
};
const scaleMagnitudes = (magnitudes, scale, width, height) => {
  const { minGain, maxGain, displayMinGain, displayMaxGain } = scale;
  const gainMinForDisplay = typeof displayMinGain === "number" ? displayMinGain : minGain;
  const gainMaxForDisplay = typeof displayMaxGain === "number" ? displayMaxGain : maxGain;
  const length = magnitudes.length - 1;
  return magnitudes.map((mag, i) => {
    return {
      x: fastRound(width / length * i),
      y: stripTail(
        scaleMagnitude(
          mag.magnitude,
          gainMinForDisplay,
          gainMaxForDisplay,
          height
        )
      )
    };
  });
};
const plotCurve = (points, scale, width, height) => {
  const { minGain, maxGain, displayMinGain, displayMaxGain } = scale;
  const gainMinForDisplay = typeof displayMinGain === "number" ? displayMinGain : minGain;
  const gainMaxForDisplay = typeof displayMaxGain === "number" ? displayMaxGain : maxGain;
  const centerY = getCenterLine(gainMinForDisplay, gainMaxForDisplay, height);
  let path = `M -200 ${centerY}`;
  points.map((point) => {
    path += ` L ${point.x} ${point.y > height + 2 ? height + 2 : point.y}`;
  });
  path += ` L ${width + 200} ${centerY}`;
  return path;
};
const calcFilterCoefficients = (filter, sampleRate = 44100) => {
  const { type, freq, gain, q } = filter;
  return calcBiQuadCoefficients(type, freq, gain, q, sampleRate);
};
const calcFilterMagnitudes = (vars, scale, width, precisionDivider = 2) => {
  const { minFreq, maxFreq, displayMinFreq, displayMaxFreq, sampleRate } = scale;
  const domainMinFreq = displayMinFreq && displayMinFreq > 0 ? displayMinFreq : minFreq;
  const domainMaxFreq = displayMaxFreq && displayMaxFreq > domainMinFreq ? displayMaxFreq : maxFreq;
  const steps = width / precisionDivider;
  const magnitudes = calcMagnitudes(
    vars,
    steps,
    domainMinFreq,
    domainMaxFreq,
    sampleRate
  );
  return magnitudes;
};
const calcCompositeMagnitudes = (magnitudes) => {
  const compositeMags = [];
  if (!magnitudes?.length) return [];
  if (!magnitudes?.[0]?.length) return [];
  for (let i = 0; i < magnitudes[0].length; i++) {
    const totalGain = magnitudes.reduce((sum, arr) => {
      const { magnitude } = arr[i] || {};
      if (!magnitude) return sum;
      const filterGain = 10 ** (magnitude / 20);
      return sum + 20 * Math.log10(filterGain);
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
const limitRange = (value, min, max) => Math.min(Math.max(value, min), max);

const getPointerPosition = (e) => {
  const CTM = e.target.getScreenCTM();
  const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
  const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
  if (!CTM) {
    return { x: clientX, y: clientY };
  }
  return {
    x: (clientX - CTM.e) / CTM.a,
    y: (clientY - CTM.f) / CTM.d
  };
};
const getZeroFreq = (type) => ["BYPASS", "GAIN"].includes(type) || !type;
const getZeroGain = (type) => [
  "LOWPASS1",
  "LOWPASS2",
  "HIGHPASS1",
  "HIGHPASS2",
  "BANDPASS",
  "BYPASS",
  "NOTCH"
].includes(type) || !type;
const getZeroQ = (type) => [
  "LOWSHELF1",
  "LOWSHELF2",
  "HIGHSHELF1",
  "HIGHSHELF2",
  "HIGHPASS1",
  "LOWPASS1",
  "BYPASS",
  "GAIN"
].includes(type) || !type;
const getIconStyles = (type, gain = 0) => String(type).includes("SHELF") && gain > 0 || type === "PEAK" && gain < 0 || type === "GAIN" && gain < 0 ? {
  transform: "scale(1, -1)",
  transformBox: "fill-box",
  // not a CSS style, but we forced return type
  transformOrigin: "center"
} : {};
const getIconSymbol = (type) => {
  switch (type) {
    case "PEAK":
      return "&#xE908;";
    case "HIGHSHELF1":
    case "HIGHSHELF2":
      return "&#xE903;";
    case "LOWSHELF1":
    case "LOWSHELF2":
      return "&#xE905;";
    case "HIGHPASS1":
    case "HIGHPASS2":
      return "&#xE906;";
    case "LOWPASS1":
    case "LOWPASS2":
      return "&#xE904;";
    case "BANDPASS":
      return "&#xE900;";
    case "NOTCH":
      return "&#xE907;";
    case "GAIN":
      return "&#xE902;";
    case "BYPASS":
    // EMPTY / VOID / NULL / UNDEFINED
    default:
      return "&#xE901;";
  }
};

const getFilterKey = (filter, cacheVersion) => `${filter.type}_${filter.freq}_${filter.q}_${filter.gain}_${cacheVersion}`;
const CompositeCurve = ({
  filters,
  resolutionFactor = 2,
  color,
  dotted,
  opacity,
  lineWidth,
  gradientId,
  style,
  easing,
  animate,
  duration,
  // ms
  className
}) => {
  const { scale, width } = useGraph();
  const { minFreq, maxFreq, displayMinFreq, displayMaxFreq, sampleRate } = scale;
  const domainMinFreq = displayMinFreq && displayMinFreq > 0 ? displayMinFreq : minFreq;
  const domainMaxFreq = displayMaxFreq && displayMaxFreq > domainMinFreq ? displayMaxFreq : maxFreq;
  const cacheVersion = React.useMemo(
    () => [domainMinFreq, domainMaxFreq, width, resolutionFactor, sampleRate].join(
      "_"
    ),
    [domainMinFreq, domainMaxFreq, width, resolutionFactor, sampleRate]
  );
  const [magnitudesCache, setMagnitudesCache] = React.useState({});
  const memoizedGetFilterKey = React.useCallback(
    (filter) => {
      return getFilterKey(filter, cacheVersion);
    },
    [cacheVersion]
  );
  const updateCache = React.useCallback(() => {
    const steps = Math.max(
      2,
      Math.round(Math.max(width, 0) / Math.max(resolutionFactor, 1e-4))
    );
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
        nextCache[key] = calcMagnitudes(
          vars,
          steps,
          domainMinFreq,
          domainMaxFreq,
          sampleRate
        ) || [];
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
  React.useEffect(() => {
    updateCache();
  }, [updateCache]);
  const compositeMagnitudes = React.useMemo(() => {
    const allMags = Object.values(magnitudesCache).filter((m) => m.length);
    return calcCompositeMagnitudes(allMags);
  }, [magnitudesCache]);
  if (!compositeMagnitudes.length) return null;
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx("use", { href: "#centerLine" }),
    /* @__PURE__ */ jsxRuntime.jsx(
      FrequencyResponseCurve,
      {
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
      }
    )
  ] });
};

const easingSplines = {
  // Standard CSS easing values translated to SVG keySplines format
  linear: "0 0 1 1",
  easeIn: "0.42 0 1 1",
  easeOut: "0 0 0.58 1",
  easeInOut: "0.42 0 0.58 1"
};

const FilterCurve = ({
  filter,
  index = -1,
  resolutionFactor = 2,
  color,
  dotted,
  opacity,
  lineWidth,
  gradientId,
  showPin = false,
  showBypass = false,
  active = false,
  activeColor,
  activeOpacity,
  activeLineWidth,
  style,
  easing,
  animate,
  duration,
  // ms
  className,
  onChange
}) => {
  const {
    scale,
    width,
    theme: {
      filters: { zeroPoint, curve, defaultColor, colors }
    }
  } = useGraph();
  const prevFilterHashRef = React.useRef("");
  const vars = calcFilterCoefficients(filter, scale.sampleRate);
  const magnitudes = calcFilterMagnitudes(vars, scale, width, resolutionFactor);
  React.useEffect(() => {
    const filterHash = JSON.stringify(filter);
    if (vars && prevFilterHashRef.current !== filterHash) {
      onChange?.(index, vars);
      prevFilterHashRef.current = filterHash;
    }
  }, [filter, vars, onChange]);
  if (!vars || !magnitudes?.length) return null;
  const zeroValue = filter.type === "BYPASS";
  if (zeroValue && !showBypass) return null;
  const normalColor = color || colors?.[index]?.curve || defaultColor;
  const curveColor = zeroValue ? zeroPoint.color : active ? activeColor || colors?.[index]?.active || normalColor : normalColor;
  const curveOpacity = active ? activeOpacity || curve.opacity.active : opacity || curve.opacity.normal;
  const curveWidth = active ? activeLineWidth || curve.width.active : lineWidth || curve.width.normal;
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    showPin && /* @__PURE__ */ jsxRuntime.jsx(
      FilterPin,
      {
        vars,
        filter,
        color: curveColor,
        opacity: curveOpacity,
        lineWidth: curveWidth
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      FrequencyResponseCurve,
      {
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
      }
    )
  ] });
};

const FilterPin = ({
  filter,
  vars,
  opacity,
  lineWidth,
  color
}) => {
  const { scale, height, logScale } = useGraph();
  const { minGain, maxGain, displayMinGain, displayMaxGain, sampleRate } = scale;
  const { freq, type } = filter;
  let { gain, q } = filter;
  const zeroGain = getZeroGain(type);
  const {
    theme: {
      filters: { point }
    }
  } = useGraph();
  if (!["LOW", "HIGH", "NOTCH"].some((item) => type.includes(item))) return null;
  const pass1FilterType = type.includes("PASS1") || type === "NOTCH";
  const pass2FilterType = type.includes("PASS2");
  if (pass1FilterType || pass2FilterType) gain = 0;
  if (pass1FilterType) q = 0.7;
  let pointRadius = gain >= 0 || zeroGain ? point.radius : -point.radius;
  let pass2UpFlag = false;
  if (pass2FilterType && q > 1.1) {
    pointRadius = -point.radius;
    pass2UpFlag = true;
  }
  const gainMinForDisplay = typeof displayMinGain === "number" ? displayMinGain : minGain;
  const gainMaxForDisplay = typeof displayMaxGain === "number" ? displayMaxGain : maxGain;
  let pointY = pointRadius || 0;
  if (pass1FilterType || pass2FilterType) {
    pointY += getCenterLine(gainMinForDisplay, gainMaxForDisplay, height);
  } else {
    pointY += scaleMagnitude(gain, gainMinForDisplay, gainMaxForDisplay, height);
  }
  const centerMagnitude = calcMagnitudeForFrequency(vars, freq, sampleRate);
  const magnitudeY = scaleMagnitude(
    centerMagnitude,
    gainMinForDisplay,
    gainMaxForDisplay,
    height
  );
  const deltaX = pointY > magnitudeY;
  const x = logScale.x(freq);
  if (gain < 0 && deltaX || gain >= 0 && !deltaX || pass2UpFlag) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "line",
      {
        x1: x,
        x2: x,
        y1: pointY,
        y2: magnitudeY,
        stroke: color,
        strokeWidth: lineWidth,
        strokeOpacity: opacity
      }
    );
  }
  return null;
};

const FilterGradient = ({
  id,
  filter,
  index = 0,
  opacity,
  color,
  fill = false,
  className,
  style
}) => {
  const {
    theme: { filters }
  } = useGraph();
  const stopColor = color || filters.colors?.[index]?.gradient || filters.defaultColor;
  const stopOpacity = opacity || filters.gradientOpacity;
  let gradientDirection;
  const filterGain = filter?.gain || 1;
  const filterType = filter?.type || "GAIN";
  const zeroGain = React.useMemo(() => getZeroGain(filterType), [filterType]);
  const startColor = fill || filters.fill ? stopColor : false;
  if (zeroGain) {
    gradientDirection = { y1: "140%", y2: "0%" };
  } else if (filterGain <= 0) {
    gradientDirection = { y1: "100%", y2: "0%" };
  } else {
    gradientDirection = { y1: "0%", y2: "100%" };
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "linearGradient",
    {
      id,
      x1: "0%",
      x2: "0%",
      ...gradientDirection,
      className,
      style,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "stop",
          {
            offset: "0%",
            stopColor,
            stopOpacity
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          "stop",
          {
            offset: "100%",
            stopColor: startColor || "transparent",
            stopOpacity: startColor ? stopOpacity : 0
          }
        )
      ]
    }
  );
};

const FilterIcon = ({
  color = "#FFFFFF",
  size = 24,
  gain,
  type,
  filter,
  className = "",
  ...style
}) => {
  const pxSize = `${size}px`;
  const iconGain = gain || filter?.gain || 0;
  const iconType = type || filter?.type || "BYPASS";
  const iconStyles = getIconStyles(iconType, iconGain);
  const iconSymbol = getIconSymbol(iconType);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
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
    }
  );
};
const BypassIcon = (props) => /* @__PURE__ */ jsxRuntime.jsx(
  FilterIcon,
  {
    ...props,
    type: "BYPASS"
  }
);
const LowPassIcon = (props) => /* @__PURE__ */ jsxRuntime.jsx(
  FilterIcon,
  {
    ...props,
    type: "LOWPASS2"
  }
);
const HighPassIcon = (props) => /* @__PURE__ */ jsxRuntime.jsx(
  FilterIcon,
  {
    ...props,
    type: "HIGHPASS2"
  }
);
const LowShelfIcon = (props) => /* @__PURE__ */ jsxRuntime.jsx(
  FilterIcon,
  {
    ...props,
    type: "LOWSHELF2"
  }
);
const HighShelfIcon = (props) => /* @__PURE__ */ jsxRuntime.jsx(
  FilterIcon,
  {
    ...props,
    type: "HIGHSHELF2"
  }
);
const BandPassIcon = (props) => /* @__PURE__ */ jsxRuntime.jsx(
  FilterIcon,
  {
    ...props,
    type: "BANDPASS"
  }
);
const NotchIcon = (props) => /* @__PURE__ */ jsxRuntime.jsx(
  FilterIcon,
  {
    ...props,
    type: "NOTCH"
  }
);
const PeakIcon = (props) => /* @__PURE__ */ jsxRuntime.jsx(
  FilterIcon,
  {
    ...props,
    type: "PEAK"
  }
);
const GainIcon = (props) => /* @__PURE__ */ jsxRuntime.jsx(
  FilterIcon,
  {
    ...props,
    type: "GAIN"
  }
);

const FilterPoint = ({
  filter,
  index = -1,
  dragX = true,
  dragY = true,
  wheelQ = true,
  minQ,
  maxQ,
  gainPrecision,
  qPrecision,
  active = false,
  // manual `hovered` state
  showIcon = false,
  label = "",
  labelFontSize,
  labelFontFamily,
  labelColor,
  radius,
  lineWidth,
  color,
  zeroColor,
  dragColor,
  activeColor,
  background,
  zeroBackground,
  dragBackground,
  activeBackground,
  backgroundOpacity,
  dragBackgroundOpacity,
  activeBackgroundOpacity,
  className,
  style,
  onChange,
  onEnter,
  onLeave,
  onDrag
}) => {
  const {
    svgRef,
    scale,
    logScale,
    height,
    width,
    padding,
    theme: {
      filters: { zeroPoint, colors, defaultColor, point }
    }
  } = useGraph();
  const {
    minGain,
    maxGain,
    gainPrecision: scaleGainPrecision,
    minQ: scaleMinQ,
    maxQ: scaleMaxQ,
    qPrecision: scaleQPrecision,
    displayMinGain,
    displayMaxGain,
    minFreq,
    maxFreq,
    displayMinFreq,
    displayMaxFreq
  } = scale;
  const gainMinForDisplay = typeof displayMinGain === "number" ? displayMinGain : minGain;
  const gainMaxForDisplay = typeof displayMaxGain === "number" ? displayMaxGain : maxGain;
  const domainMinFreq = displayMinFreq && displayMinFreq > 0 ? displayMinFreq : minFreq;
  const domainMaxFreq = displayMaxFreq && displayMaxFreq > domainMinFreq ? displayMaxFreq : maxFreq;
  const minX = Math.max(0, Math.min(logScale.x(minFreq), width));
  const maxX = Math.max(0, Math.min(logScale.x(maxFreq), width));
  const maxGainY = scaleMagnitude(
    maxGain,
    gainMinForDisplay,
    gainMaxForDisplay,
    height
  );
  const minGainY = scaleMagnitude(
    minGain,
    gainMinForDisplay,
    gainMaxForDisplay,
    height
  );
  const minY = Math.min(maxGainY, minGainY);
  const maxY = Math.max(maxGainY, minGainY);
  const { freq: filterFreq, gain: filterGain, q: filterQ, type } = filter;
  const gainDecimals = gainPrecision ?? scaleGainPrecision ?? 1;
  const qDecimals = qPrecision ?? scaleQPrecision ?? 1;
  const circleRef = React.useRef(null);
  const labelRef = React.useRef(null);
  const [hovered, setHovered] = React.useState(false);
  const [dragging, setDragging] = React.useState(false);
  const [zeroGain, passFilter] = React.useMemo(
    () => [getZeroGain(type), type.includes("PASS") || type === "NOTCH"],
    [type]
  );
  const x = limitRange(logScale.x(filterFreq), minX, maxX);
  const centerY = getCenterLine(gainMinForDisplay, gainMaxForDisplay, height);
  const y = !passFilter ? scaleMagnitude(filterGain, gainMinForDisplay, gainMaxForDisplay, height) : centerY;
  let offset = { x: 0, y: 0 };
  let cx;
  let cy;
  const moveFreq = React.useRef(filterFreq);
  const moveGain = React.useRef(filterGain);
  const getGraphPointer = (e) => {
    const svg = svgRef.current;
    const CTM = svg?.getScreenCTM();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    if (!CTM) return { x: clientX, y: clientY };
    return {
      x: (clientX - CTM.e) / CTM.a - padding.left,
      y: (clientY - CTM.f) / CTM.d - padding.top
    };
  };
  const dragMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!circleRef.current) return;
    const { x: x2, y: y2 } = getGraphPointer(e);
    if (dragX) {
      cx = limitRange(x2 - offset.x, minX, maxX);
      circleRef.current.setAttributeNS(null, "cx", String(cx));
      labelRef.current?.setAttributeNS(null, "x", String(cx));
      moveFreq.current = stripTail(
        limitRange(
          calcFrequency(cx, width, domainMinFreq, domainMaxFreq),
          minFreq,
          maxFreq
        )
      );
    }
    if (dragY) {
      if (zeroGain) {
        cy = centerY;
      } else {
        cy = limitRange(y2 - offset.y, minY, maxY);
      }
      circleRef.current.setAttributeNS(null, "cy", String(cy));
      labelRef.current?.setAttributeNS(null, "y", String(cy));
      const gain = calcMagnitude(
        cy,
        gainMinForDisplay,
        gainMaxForDisplay,
        height
      );
      const limitedGain = limitRange(gain, minGain, maxGain);
      moveGain.current = limitedGain < 0.05 && limitedGain > -0.05 ? 0 : stripTail(limitedGain, gainDecimals);
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
    circleEl.setAttribute(
      "fill-opacity",
      String(
        touchEvent ? backgroundOpacity ?? point.backgroundOpacity.normal : activeBackgroundOpacity ?? point.backgroundOpacity.active
      )
    );
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
    const svg = svgRef.current;
    const circleEl = circleRef.current;
    if (!svg || !circleEl) return;
    setDragging(true);
    const { x: x2, y: y2 } = getGraphPointer(e);
    offset = {
      x: x2 - parseFloat(circleEl.getAttributeNS(null, "cx") || "0"),
      y: y2 - parseFloat(circleEl.getAttributeNS(null, "cy") || "0")
    };
    circleEl.setAttribute(
      "fill-opacity",
      String(dragBackgroundOpacity || point.backgroundOpacity.drag)
    );
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
    onEnter?.({ ...filter, index });
  };
  const handleMouseLeave = () => {
    setHovered(false);
    onLeave?.({ ...filter, index });
  };
  React.useEffect(() => {
    const circle = circleRef.current;
    if (!wheelQ || !circle) return;
    const handleWheel = (e) => {
      e.preventDefault();
      let newQ = filterQ;
      newQ += e.deltaY > 0 ? 0.1 : -0.1;
      const minAllowedQ = Math.max(1e-4, minQ ?? scaleMinQ ?? 0.1);
      const maxAllowedQ = maxQ ?? scaleMaxQ ?? 25;
      newQ = stripTail(limitRange(newQ, minAllowedQ, maxAllowedQ), qDecimals);
      onChange?.({ index, ...filter, q: newQ, ended: true });
    };
    circle.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      circle.removeEventListener("wheel", handleWheel);
    };
  }, [
    wheelQ,
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
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "circle",
      {
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
        onTouchStart: (e) => dragStart(e),
        style: { cursor: "pointer", pointerEvents: "auto", ...style },
        className
      }
    ),
    Boolean(label) && /* @__PURE__ */ jsxRuntime.jsx(
      "text",
      {
        ref: labelRef,
        x,
        y,
        textAnchor: "middle",
        dominantBaseline: "central",
        fill: labelColor,
        fontSize: labelFontSize,
        fontFamily: labelFontFamily,
        style: { ...labelStyle },
        dangerouslySetInnerHTML: { __html: label }
      }
    )
  ] });
};

const FrequencyResponseCurve = ({
  magnitudes,
  dotted = false,
  color,
  opacity,
  lineWidth,
  gradientId,
  className,
  style,
  animate = false,
  easing = "easeInOut",
  duration = 300
  // ms
}) => {
  const {
    scale,
    width,
    height,
    theme: { curve },
    clipPathId
  } = useGraph();
  const curveColor = color || curve.color;
  const curveWidth = lineWidth || curve.width;
  const curveOpacity = opacity || curve.opacity;
  const { currentPath, initialPath } = React.useMemo(() => {
    const points = scaleMagnitudes(magnitudes, scale, width, height);
    const flatPoints = points.map((p) => ({ x: p.x, y: height / 2 }));
    const currentPath2 = plotCurve(points, scale, width, height);
    const initialPath2 = plotCurve(flatPoints, scale, width, height);
    return { currentPath: currentPath2, initialPath: initialPath2 };
  }, [magnitudes, scale, width, height]);
  const animateRef = React.useRef(null);
  const [fromPath, setFromPath] = React.useState(initialPath);
  const [toPath, setToPath] = React.useState(initialPath);
  React.useLayoutEffect(() => {
    if (animate) {
      setFromPath(toPath);
      animateRef.current?.beginElement();
      requestAnimationFrame(() => {
        setToPath(currentPath);
      });
    }
  }, [currentPath, animate]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "path",
    {
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
      children: animate && /* @__PURE__ */ jsxRuntime.jsx(
        "animate",
        {
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
        }
      )
    }
  );
};

const PointerTracker = ({
  lineWidth,
  lineColor,
  labelColor,
  backgroundColor,
  gainPrecision
}) => {
  const {
    svgRef,
    width,
    height,
    padding,
    scale,
    theme: {
      background: {
        tracker,
        label: { fontSize, fontFamily }
      }
    }
  } = useGraph();
  const {
    minGain,
    maxGain,
    displayMinGain,
    displayMaxGain,
    minFreq,
    maxFreq,
    displayMinFreq,
    displayMaxFreq
  } = scale;
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
  const [freqWidth, setFreqWidth] = React.useState(0);
  const [gainWidth, setGainWidth] = React.useState(0);
  const [freqLabel, setFreqLabel] = React.useState(0);
  const [gainLabel, setGainLabel] = React.useState(0);
  const [trackMouse, setTrackMouse] = React.useState(false);
  const [mouse, setMouse] = React.useState({ x: -50, y: -50 });
  const freqLabelRef = React.useRef(null);
  const gainLabelRef = React.useRef(null);
  const mouseMove = (e) => {
    e.preventDefault();
    const { x, y } = getPointerPosition(e);
    const plotX = Math.min(Math.max(x - padding.left, 0), width);
    const plotY = Math.min(Math.max(y - padding.top, 0), height);
    setMouse({ x: plotX, y: plotY });
    const newGain = calcMagnitude(
      plotY,
      gainMinForDisplay,
      gainMaxForDisplay,
      height
    ).toFixed(gainDigits);
    if (newGain !== String(gainLabel)) {
      setGainLabel(Number(newGain));
    }
    const newFreq = fastFloor(
      calcFrequency(plotX, width, domainMinFreq, domainMaxFreq)
    );
    if (newFreq !== freqLabel) {
      setFreqLabel(newFreq);
    }
  };
  React.useEffect(() => {
    if (!freqLabelRef.current) return;
    const w = fastFloor(freqLabelRef.current.getBBox().width);
    if (w !== freqWidth) {
      setFreqWidth(w);
    }
  }, [freqLabel]);
  React.useEffect(() => {
    if (!gainLabelRef.current) return;
    const w = fastFloor(gainLabelRef.current.getBBox().width);
    if (w !== gainWidth) {
      setGainWidth(w);
    }
  }, [gainLabel]);
  const handleMouseEnter = () => setTrackMouse(true);
  const handleMouseLeave = () => setTrackMouse(false);
  const handleTouchStart = () => setTrackMouse(true);
  const handleTouchEnd = () => setTrackMouse(false);
  const handleTouchCancel = () => setTrackMouse(false);
  React.useEffect(() => {
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
  React.useEffect(() => {
    setTrackMouse(true);
  }, []);
  if (!trackMouse) return null;
  return /* @__PURE__ */ jsxRuntime.jsxs(React.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "rect",
      {
        width: freqWidth + 6,
        height: fontSizePadding,
        fill: fillColor,
        stroke: strokeColor,
        x: mouse.x - freqWidth / 2 - 3,
        y: height - fontSizePadding - 1
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      "text",
      {
        ref: freqLabelRef,
        x: mouse.x - freqWidth / 2,
        y: height - 4,
        fill: color,
        fontSize,
        fontFamily,
        children: freqLabel
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      "rect",
      {
        width: gainWidth + 6,
        height: fontSizePadding,
        fill: fillColor,
        stroke: strokeColor,
        x: 0.5,
        y: mouse.y - 7
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      "text",
      {
        ref: gainLabelRef,
        x: 3,
        y: mouse.y + 3,
        fill: color,
        fontSize,
        fontFamily,
        children: gainLabel > 0 ? `+${gainLabel}` : gainLabel
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      "line",
      {
        x1: gainWidth + 7,
        x2: width,
        y1: mouse.y,
        y2: mouse.y,
        stroke: strokeColor,
        strokeWidth,
        strokeDasharray,
        strokeLinecap: "round"
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      "line",
      {
        x1: mouse.x,
        x2: mouse.x,
        y1: 0,
        y2: height - 14,
        stroke: strokeColor,
        strokeWidth,
        strokeDasharray,
        strokeLinecap: "round"
      }
    )
  ] });
};

exports.BandPassIcon = BandPassIcon;
exports.BypassIcon = BypassIcon;
exports.CompositeCurve = CompositeCurve;
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
