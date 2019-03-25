"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var babel_preset_react_app_1 = __importDefault(require("babel-preset-react-app"));
var preset_typescript_1 = __importDefault(require("@babel/preset-typescript"));
var plugin_transform_typescript_1 = __importDefault(require("@babel/plugin-transform-typescript"));
var removeFlowPreset = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    // Pass along arguments to babel-preset-react-app and generate its preset.
    var preset = babel_preset_react_app_1.default.apply(void 0, args);
    // Remove the Flow preset.
    preset.presets = preset.presets.filter(function (p) { return !babelPluginTransformFlowDetectionHack(p); });
    // Add the TypeScript preset if we have a compatible Babel beta version, see
    // the docs for "doesBabelSupportOverridesFeature".
    var overridesSupported = doesBabelSupportOverridesFeature(args[0].version);
    if (overridesSupported) {
        preset.presets.push(preset_typescript_1.default);
    }
    else {
        preset.presets.push({
            plugins: [plugin_transform_typescript_1.default]
        });
    }
    return preset;
};
exports.default = removeFlowPreset;
/**
 * Babel 7 beta versions 48 and above make use of an "overrides" field to
 * provide Webpack like selective loading of plugins and options. This allows
 * later versions to do things like disable the Flow transform automatically,
 * etc.
 *
 * If we attempt to pass this new field to an older Babel version, we get an
 * error because that field is unexpected.
 *
 * This should be removed when Babel 7 stable is released.
 *
 * @see https://github.com/babel/babel/commit/43aa61d6bedfe0025ceb2f5f3512b3c66bc6c604#diff-a31d321b4911bbbc31e1d19a726637c6
 */
var doesBabelSupportOverridesFeature = function (babelVersion) {
    // "v7.0.0-beta.48" -> "48"
    var babelBetaVersionMatch = /^v?7\.0\.0-beta\.(\d+)/.exec(babelVersion);
    if (babelBetaVersionMatch === null)
        return true;
    // "48" -> 48
    var babelBetaVersion;
    try {
        babelBetaVersion = parseInt(babelBetaVersionMatch[1], 10);
    }
    catch (_a) {
        return true;
    }
    return babelBetaVersion > 47;
};
/**
 * Different versions of Babel 7 behave differently when it comes to supplying
 * presets. Later versions wrap imported presets in a function that performs
 * a Babel version check. As a result, we can not do a string comparison to
 * determine if the supplied preset is the Flow plugin using the function name.
 *
 * Later versions of babel-preset-react-app have an option to disable the Flow
 * plugin. To remain compatible with older react-scripts 2 beta versions, we do
 * not use that feature. When react-scripts 2 is officially released, this hack
 * should be removed.
 *
 * @see https://github.com/facebook/create-react-app/tree/next/packages/babel-preset-react-app#usage-with-typescript
 * @see https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-flow-strip-types
 */
var babelPluginTransformFlowDetectionHack = function (preset) {
    /* tslint:disable-next-line:no-var-requires */
    var babel = require("@babel/core");
    try {
        var transformedCode = babel.transform("function foo(one: any, two: number, three?): string {}", {
            presets: [preset]
        });
        return !transformedCode.code.includes("string");
    }
    catch (_a) {
        return false;
    }
};
