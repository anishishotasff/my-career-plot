import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
// TODO: Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDbFiDmJo78O9hp66p0YXVI3G_pjFkc1Xw",
  authDomain: "mycareerplot-df6a2.firebaseapp.com",
  projectId: "mycareerplot-df6a2",
  storageBucket: "mycareerplot-df6a2.firebasestorage.app",
  messagingSenderId: "227504401171",
  appId: "1:227504401171:web:975fbeb61c8400beadc8e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Google provider
export const googleProvider = new GoogleAuthProvider();

export default app;
