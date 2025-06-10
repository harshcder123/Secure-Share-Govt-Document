// src/firebase/config.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB0GO15lErnTXLJS-42ZccXAiuRVKXH9Y0",
  authDomain: "govt-doc-app.firebaseapp.com",
  projectId: "govt-doc-app",
  storageBucket: "govt-doc-app.appspot.com",
  messagingSenderId: "876675403999",
  appId: "1:876675403999:web:37281961f2b678b449996a"
};

const app = initializeApp(firebaseConfig);

// ✅ Don't use `export default app` – it's not needed here
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
