import { initializeApp,} from 'firebase/app';
import { initializeAuth, getReactNativePersistence, sendPasswordResetEmail, getAuth, onAuthStateChanged } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyD0SlGvu7uvHCE7BZ4Me7GxHo-u8q9YcwM",
  authDomain: "support-space-app.firebaseapp.com",
  projectId: "support-space-app",
  storageBucket: "support-space-app.firebasestorage.app",
  messagingSenderId: "390176412912",
  appId: "1:390176412912:web:a8394f9ac4da1576dc9e35",
  measurementId: "G-4PGS86B83V"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth };