const { withAndroidManifest } = require('@expo/config-plugins');

/**
 * Config Plugin for @googlemaps/react-native-navigation-sdk (Android)
 *
 * Injects the Google Maps API key into AndroidManifest.xml as a <meta-data> entry
 * so that the Google Navigation SDK is properly initialized on Android.
 */
const withApiKeyAndroid = (config, { apiKey } = {}) => {
  const key = apiKey ?? config?.android?.config?.googleMaps?.apiKey;

  if (!key) {
    throw new Error(
      '[withApiKeyAndroid] Google Maps API key is not set. ' +
      'Pass it as a plugin option or set android.config.googleMaps.apiKey in app.config.ts.'
    );
  }

  return withAndroidManifest(config, (c) => {
    const mainApp = c.modResults.manifest.application?.[0];
    if (mainApp) {
      mainApp['meta-data'] = mainApp['meta-data'] ?? [];
      const existing = mainApp['meta-data'].find(
        (m) => m.$?.['android:name'] === 'com.google.android.geo.API_KEY'
      );
      if (existing) {
        existing.$['android:value'] = key;
      } else {
        mainApp['meta-data'].push({
          $: { 'android:name': 'com.google.android.geo.API_KEY', 'android:value': key },
        });
      }
    }
    return c;
  });
};

module.exports = withApiKeyAndroid;
