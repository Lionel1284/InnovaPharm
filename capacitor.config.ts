import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.consultorio.raul',
  appName: 'consultorio-app',
  webDir: 'www',
  plugins: {
    FirebaseAnalytics: {
      enabled: true,
      screenName: true,
      debug: true
    }
  }
};

export default config;
