import { ExpoConfig, ConfigContext } from '@expo/config';
import * as dotenv from 'dotenv';

// initialize dotenv
dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
   ...config,
   "name": "konbini",
   "slug": "konbini",
   "version": "0.0.1",
   "orientation": "portrait",
   "icon": "./assets/images/icon.png",
   "scheme": "myapp",
   "userInterfaceStyle": "automatic",
   "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
   },
   ios: {
      supportsTablet: true,
      config: {
         googleMapsApiKey: process.env.GOOGLE_CLOUD_API_KEY,
      },
   },
   android: {
      "adaptiveIcon": {
         "foregroundImage": "./assets/images/adaptive-icon.png",
         "backgroundColor": "#ffffff"
      },
      config: {
         googleMaps: {
            apiKey: process.env.GOOGLE_CLOUD_API_KEY,
         },
      },
      package: "dev.trew.konbini"
   },
   "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
   },
   "plugins": [
      "expo-router",
      [
         "expo-location",
         {
            locationWhenInUsePermission: "Allow $(PRODUCT_NAME) to use your location. Necessary for app to function.",
            isAndroidForegroundServiceEnabled: true,
         }
      ]
   ],
   "experiments": {
      "typedRoutes": true
   },
   "extra": {
      "router": {
         "origin": false
      },
      "eas": {
         "projectId": "c0c0afda-bfa1-4874-a9d6-a9f5b1af3f6b"
      }
   },
   "owner": "saminxe"
});