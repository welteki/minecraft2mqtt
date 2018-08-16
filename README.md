# Minecraft2mqtt

[![mqtt-smarthome](https://img.shields.io/badge/mqtt-smarthome-blue.svg)](https://github.com/mqtt-smarthome/mqtt-smarthome)
[![License][mit-badge]][mit-url]

Connect your minecraft server to MQTT through the [spigot-OH-plugin](https://github.com/ibaton/bukkit-openhab-plugin)

## Getting started

**Prerequisites**

You need to have a running minecraft server with the [bukkit-OH-plugin](https://github.com/ibaton/bukkit-openhab-plugin) installed.

**Installation**

```
npm install -g minecraft2mqtt
```

**Usage**

```
minecraft2mqtt --help
```

## Topics and Payloads

**Receive**

```
bukkit/status/<sign-name>
```

Payload is `true` or `false`

## License

MIT © [Han Verstraete](https://github.com/welteki)

[mit-badge]: https://img.shields.io/badge/License-MIT-blue.svg?style=flat
[mit-url]: LICENSE
