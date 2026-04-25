const { withAppBuildGradle } = require('@expo/config-plugins');

const TAG = 'withCoreLibraryDesugaring';

const block = `
// @generated begin ${TAG}
android {
    compileOptions {
        coreLibraryDesugaringEnabled true
    }
}

dependencies {
    coreLibraryDesugaring 'com.android.tools:desugar_jdk_libs_nio:2.0.4'
}
// @generated end ${TAG}
`;

const withCoreLibraryDesugaring = (config) => {
  return withAppBuildGradle(config, (config) => {
    if (config.modResults.language !== 'groovy') {
      throw new Error('Only Groovy build.gradle is supported.');
    }

    const contents = config.modResults.contents;

    if (!contents.includes(`// @generated begin ${TAG}`)) {
      config.modResults.contents = `${contents.trimEnd()}\n\n${block}`;
    }

    return config;
  });
};

module.exports = withCoreLibraryDesugaring;
