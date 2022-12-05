import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {

  apiKey: "AIzaSyD26iC6qRwH7Qh6lzL4uyNxhUDCnrQI0C4",
  authDomain: "contactspecial-c29b3.firebaseapp.com",
  databaseURL: "https://contactspecial-c29b3-default-rtdb.firebaseio.com",
  projectId: "contactspecial-c29b3",
  storageBucket: "contactspecial-c29b3.appspot.com",
  messagingSenderId: "85259767471",
  appId: "1:85259767471:web:6c2a479e002b765b914e5a"
  
  };
 
  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app)
  export default app;

 