import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAz3ibYFIWDtL4Jll2A0LOnn6ChHzw6GnI',
  authDomain: 'eps-images-storage.firebaseapp.com',
  projectId: 'eps-images-storage',
  storageBucket: 'eps-images-storage.appspot.com',
  messagingSenderId: '741232466791',
  appId: '1:741232466791:web:7b0c493452c8561485adc2',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage();
