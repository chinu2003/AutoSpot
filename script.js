import mqtt from "mqtt";
const client = mqtt.connect("ws://test.mosquitto.org:8080/mqtt");
client.on("connect", () => {
  client.subscribe("iot/topic");
});
client.on("message", (topic, message) => {
  console.log(message.toString());
});
