import * as OH from 'bukkit-openhab-client';
import * as MQTT from 'mqtt';
import * as log from 'loglevel';
import { config } from './config';

log.setLevel(config.verbosity);

let ohConnected: boolean = false;
log.info(`connecting to bukkit server: ${config.bukkitHost}`);
const oh = OH.connect(
  config.bukkitHost,
  { port: config.bukkitPort }
);

let mqttConnected: boolean = false;
log.info(`connecting to mqtt broker: ${config.url}`);
const mqtt = MQTT.connect(
  config.url,
  {
    will: {
      topic: `${config.name}/connected`,
      payload: '0',
      qos: 1,
      retain: true
    }
  }
);

mqtt.on('connect', () => {
  mqttConnected = true;
  log.info('mqtt connected');
  mqtt.publish(`${config.name}/connected`, ohConnected ? '2' : '1', {
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
  mqtt.publish(`${config.name}/connected`, '2', { qos: 0, retain: true });
});

oh.on('close', () => {
  if (ohConnected) {
    ohConnected = false;
    log.info('bukkit connection closed');
    mqtt.publish(`${config.name}/connected`, '1', { qos: 0, retain: true });
  }
});

oh.on('sign', signs => {
  log.debug(`Sign message: ${JSON.stringify(signs)}`);
  signs.forEach(sign => {
    mqtt.publish(`${config.name}/status/${sign.name}`, sign.state.toString(), {
      qos: 2,
      retain: true
    });
  });
});
