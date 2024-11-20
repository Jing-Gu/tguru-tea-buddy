import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tguru.teabuddy',
  appName: 'tguru-tea-buddy',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 1000,
      launchAutoHide: true,
      androidScaleType: 'CENTER_CROP',
      splashImmersive: true,
      backgroundColor: '#BBE1CD'
    },
    CapacitorSQLite: {
      iosDatabaseLocation: 'Library/CapacitorDatabase',
      androidDatabaseLocation: 'default'
    }
  }
};

export default config;
