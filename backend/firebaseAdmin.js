import admin from 'firebase-admin';
import dotenv from 'dotenv';

// Load Firebase Admin SDK configuration (ensure you have a Firebase service account JSON file)
dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
