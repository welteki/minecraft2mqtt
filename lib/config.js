"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["TRACE"] = 0] = "TRACE";
    LogLevel[LogLevel["DEBUG"] = 1] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["WARN"] = 3] = "WARN";
    LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
    LogLevel[LogLevel["SILENT"] = 5] = "SILENT";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
exports.config = yargs
    .usage('Usage: $0 [options]')
    .describe('v', 'possible values: "error", "warn", "info", "debug"')
    .describe('n', 'instance name. used as mqtt client id and as prefix for connected topics')
    .describe('u', 'mqtt broker url. See https://github.com/mqttjs/MQTT.js#connect-using-a-url')
    .describe('b', 'bukkit host')
    .describe('p', 'bukkit-OH-plugin port')
    .describe('h', 'show help')
    .alias({
    h: 'help',
    n: 'name',
    u: 'url',
    v: 'verbosity',
    b: 'bukkit-host',
    p: 'bukkit-port'
})
    .default({
    u: 'mqtt://127.0.0.1',
    n: 'bukkit',
    v: 'info',
    b: 'localhost'
})
    .version()
    .help('help')
    .argv;
