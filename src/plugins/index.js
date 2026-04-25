const withNavigationSdkAndroid = require('./withApiKeyAndroid');
const withNavigationSdkIos = require('./withApiKeyIos');
const withCoreLibraryDesugaring = require('./withCoreLibraryDesugaring');
const withJetifier = require('./withJetifier');

/**
 * Expo Config Plugin for @googlemaps/react-native-navigation-sdk
 *
 * Automatically configures both Android and iOS native projects
 * with the required Google Maps API key for the Navigation SDK.
 *
 * Usage in app.config.ts:
 *
 *   plugins: [
 *     [
 *       '@googlemaps/react-native-navigation-sdk',
 *       { apiKey: 'YOUR_GOOGLE_MAPS_API_KEY' }
 *     ]
 *   ]
 *
 * Alternatively, set the API key via:
 *   - android.config.googleMaps.apiKey  (Android)
 *   - ios.config.googleMapsApiKey       (iOS)
 */
const withNavigationSdk = (config, options = {}) => {
  config = withNavigationSdkAndroid(config, options);
  config = withNavigationSdkIos(config, options);
  config = withCoreLibraryDesugaring(config);
  config = withJetifier(config);
  return config;
};

module.exports = withNavigationSdk;
