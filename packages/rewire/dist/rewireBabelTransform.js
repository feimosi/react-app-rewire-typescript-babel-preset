"use strict";
/**
 * This module replaces the one in react-scripts/config/jest/babelTransform.js.
 * It is a Babel transform for Jest which will use the Babel preset from this
 * package to add support for TypeScript.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
// @ts-ignore
var rewireBabelJest_1 = __importDefault(require("./rewireBabelJest"));
var transformer = rewireBabelJest_1.default.createTransformer({
    presets: [path_1.default.resolve(__dirname, "rewirePreset")],
    babelrc: true
});
// Not using a default export here on purpose to match the export structure
// of react-script's babelTransform.js.
module.exports = transformer;
