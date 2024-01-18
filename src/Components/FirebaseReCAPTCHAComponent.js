// FirebaseReCAPTCHAComponent.js
import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithCredential, signOut,
    PhoneAuthProvider } from 'firebase/auth'

import firebase from 'firebase/app'

const FirebaseReCAPTCHAComponent = ({ onVerify }) => {
    const auth=getAuth();
  const [verificationId, setVerificationId] = useState(null);
  console.log("hello");
  const handleWebViewMessage = async (event) => {
    console.log(event);
    const data = JSON.parse(event.nativeEvent.data);
    if (data && data.type === 'captcha' && data.token) {
      try {
        console.log("hello1");
        const phoneProvider = new PhoneAuthProvider(auth);
        console.log("hello2");
        const verificationId= await phoneProvider.verifyPhoneNumber(
            '+916379185147',
            data.token
        )
        console.log(verificationId);
        setVerificationId(verificationId);
        onVerify(verificationId);
      } catch (error) {
        console.error('Phone number verification error:', error);
      }
    }
  };

  const htmlContent = `
  <html>
  <head>
    <title>reCAPTCHA demo: Simple page</title>
     <script src="https://www.google.com/recaptcha/api.js" async defer></script>
     <script>
       function onSubmit(token) {
         document.getElementById("demo-form").submit();
       }
     </script>
  </head>
  <body>
    <form id="demo-form" action="?" method="POST">
      <button class="g-recaptcha" data-sitekey="6Lequ0opAAAAAACRmAbv0omwbIWVWRMcXTktK_vB" data-callback="onSubmit">Submit</button>
      <br/>
    </form>
  </body>
</html>
  `;

  return (
    <WebView
      source={{ html: htmlContent }}
      onMessage={handleWebViewMessage}n
    />
  );
};

export default FirebaseReCAPTCHAComponent;
