import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

console.log("configurando firebase")
console.log("key",process.env.NEXT_PUBLIC_FIREBASE_API_KEY)

// Configuración de Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};


export default firebaseConfig;


// Declaración de variables para la aplicación Firebase, el servicio de autenticación
let app: FirebaseApp;
let auth: Auth;

// Inicializamos la aplicación Firebase
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
}


// Exportamos las instancias para ser utilizadas en otros módulos
export { auth };

