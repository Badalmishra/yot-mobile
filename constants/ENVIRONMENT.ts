type CONFIG_TYPE = {
  server_url?:String;
  ECHO_VERSION?:String;
}
const CONFIG_DEV:CONFIG_TYPE = {
  server_url: "https://ea9cf96498e0.ngrok.io",
};
const CONFIG_PROD:CONFIG_TYPE = {
  server_url: "https://ea9cf96498e0.ngrok.io",
};
let FINAL_CONFIG:CONFIG_TYPE = {};
if (__DEV__) {
  FINAL_CONFIG = CONFIG_DEV;
} else {
  FINAL_CONFIG = CONFIG_PROD;
}
FINAL_CONFIG = { ...FINAL_CONFIG, ECHO_VERSION: "1.0.0" };
console.log("Final config", FINAL_CONFIG);
export default FINAL_CONFIG;
