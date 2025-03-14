const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Kombinasikan dengan konfigurasi NativeWind
module.exports = withNativeWind(config, { input: './global.css' });
