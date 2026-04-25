const { withAppDelegate } = require('@expo/config-plugins');

/**
 * Config Plugin for @googlemaps/react-native-navigation-sdk (iOS)
 *
 * Injects GMSServices.provideAPIKey() into AppDelegate.swift
 * so that the Google Navigation SDK is properly initialized on iOS.
 */
const withApiKeyIos = (config, { apiKey } = {}) => {
  const key = apiKey ?? config?.ios?.config?.googleMapsApiKey;

  if (!key) {
    throw new Error(
      '[withApiKeyIos] Google Maps API key is not set. ' +
      'Pass it as a plugin option or set ios.config.googleMapsApiKey in app.config.ts.'
    );
  }

  return withAppDelegate(config, (c) => {
    let contents = c.modResults.contents;

    // Already patched
    if (contents.includes('GMSServices.provideAPIKey')) {
      return c;
    }

    // Add import if not present
    if (!contents.includes('import GoogleMaps')) {
      contents = contents.replace(
        /^import Expo/m,
        'import Expo\nimport GoogleMaps'
      );
    }

    // Inject provideAPIKey call right after the opening of application(_:didFinishLaunchingWithOptions:)
    contents = contents.replace(
      /(public override func application\(\s*_ application: UIApplication,\s*didFinishLaunchingWithOptions[^{]*\{)/,
      `$1\n    GMSServices.provideAPIKey("${key}")`
    );

    c.modResults.contents = contents;
    return c;
  });
};

module.exports = withApiKeyIos;
