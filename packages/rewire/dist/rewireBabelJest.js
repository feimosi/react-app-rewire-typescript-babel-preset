"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Jest technically supports both Babel 6 and Babel 7. When requiring babel-jest
 * in a monorepo environment, Babel 6 can sometimes be resolved rather than the
 * desired Babel 7. The TypeScript transform requires Babel 7.
 */
var fs_1 = __importDefault(require("fs"));
var moduleContents = fs_1.default.readFileSync(require.resolve("babel-jest"), "utf8");
moduleContents = moduleContents.replace(/require\('babel-core'\)/g, "require('@babel/core')");
/* tslint:disable-next-line:no-eval */
eval(moduleContents);
