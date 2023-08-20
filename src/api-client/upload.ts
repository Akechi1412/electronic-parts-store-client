import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from 'firebaseConfig';

export const uploadFile = async (file: File, fileDirectory: string) => {
  try {
    const storageRef = ref(storage, fileDirectory);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    });

    await uploadTask;

    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    return downloadURL;
  } catch (error) {
    throw error;
  }
};
