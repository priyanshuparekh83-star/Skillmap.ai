// Firebase core
import { initializeApp, getApps, getApp } from "firebase/app";

// Firebase services
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// ✅ Firebase configuration (Vite requires import.meta.env)
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// ✅ Prevent re-initialization (Singleton pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ Firebase Auth
export const auth = getAuth(app);

// ✅ Firebase Analytics (browser only)
export let analytics;
if (typeof window !== "undefined") {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export default app;
