const { withGradleProperties } = require('@expo/config-plugins');

/**
 * Config Plugin for @googlemaps/react-native-navigation-sdk
 *
 * Enables Jetifier in android/gradle.properties to ensure compatibility
 * with AndroidX when using the Google Navigation SDK.
 */
const withJetifier = (config) => {
  return withGradleProperties(config, (c) => {
    const props = c.modResults;

    const existing = props.find(
      (p) => p.type === 'property' && p.key === 'android.enableJetifier'
    );

    if (existing) {
      existing.value = 'true';
    } else {
      props.push({
        type: 'property',
        key: 'android.enableJetifier',
        value: 'true',
      });
    }

    return c;
  });
};

module.exports = withJetifier;
