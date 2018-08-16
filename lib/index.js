"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OH = require("bukkit-openhab-client");
const MQTT = require("mqtt");
const log = require("loglevel");
const config_1 = require("./config");
log.setLevel(config_1.config.verbosity);
let ohConnected = false;
log.info(`connecting to bukkit server: ${config_1.config.bukkitHost}`);
const oh = OH.connect(config_1.config.bukkitHost, { port: config_1.config.bukkitPort });
let mqttConnected = false;
log.info(`connecting to mqtt broker: ${config_1.config.url}`);
const mqtt = MQTT.connect(config_1.config.url, {
    will: {
        topic: `${config_1.config.name}/connected`,
        payload: '0',
        qos: 1,
        retain: true
    }
});
mqtt.on('connect', () => {
    mqttConnected = true;
    log.info('mqtt connected');
    mqtt.publish(`${config_1.config.name}/connected`, ohConnected ? '2' : '1', {
        qos: 0,
        retain: true
    });
});
mqtt.on('close', () => {
    if (mqttConnected) {
        mqttConnected = false;
        log.info('mqtt closed');
    }
});
mqtt.on('error', err => {
    log.error(err.message);
});
oh.on('connect', () => {
    ohConnected = true;
    log.info(`bukkit connected`);
    mqtt.publish(`${config_1.config.name}/connected`, '2', { qos: 0, retain: true });
});
oh.on('close', () => {
    if (ohConnected) {
        ohConnected = false;
        log.info('bukkit connection closed');
        mqtt.publish(`${config_1.config.name}/connected`, '1', { qos: 0, retain: true });
    }
});
oh.on('sign', signs => {
    log.debug(`Sign message: ${JSON.stringify(signs)}`);
    signs.forEach(sign => {
        mqtt.publish(`${config_1.config.name}/status/${sign.name}`, sign.state.toString(), {
            qos: 2,
            retain: true
        });
    });
});
