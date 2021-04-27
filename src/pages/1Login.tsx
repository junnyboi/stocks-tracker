import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

import {
  IonContent, IonHeader, IonFooter,
  IonPage, IonTitle, IonToolbar,
  IonInput, IonItem, IonLabel,
  IonList,
  IonItemDivider
} from '@ionic/react';

import RoundButton from '../components/RoundButton'
import ErrorBar from '../components/ErrorBar'

import firebase from "firebase/app";
import { environment } from "../environment/environment"
import "firebase/analytics";
import "firebase/auth";

// Initialize Firebase
declare const window: any;
firebase.initializeApp(environment.firebaseConfig);
firebase.auth().languageCode = 'en';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [pageTitle, setPageTitle] = useState("Login")
  const [isRegistration, setIsRegistration] = useState<boolean>(false)
  const [phoneNumber, setPhoneNumber] = useState<string>()
  const [isPhoneNumberConfirmed, setIsPhoneNumberConfirmed] = useState<boolean>(false)
  const [smsCode, setSmsCode] = useState<string>()
  const [error, setError] = useState("")

  function ResetAll() {
    setPageTitle('Login')
    setIsRegistration(false)
    setIsPhoneNumberConfirmed(false)
    setSmsCode('')
    setError('')
  }

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log("Sign out successful")
    }).catch((error) => {
      // An error happened.
      console.log("Sign out unsuccessful")
    });
  }, [])

  function phoneSignIn() {
    function getPhoneNumberFromUserInput() {
      // TODO validate input
      if (!phoneNumber) {
        setError("Please enter a mobile number!")
        return
      }
      setError("")
      return phoneNumber;
    }

    // [START auth_phone_signin]
    const number = getPhoneNumberFromUserInput();
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(number!, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("Successfully sent sms code to", number)
        // prompt user to enter code
        setIsPhoneNumberConfirmed(true);
      }).catch((error) => {
        // console.log("Error signing in with mobile no:", error.message)
        setError(error.message)
        // TODO reset reCAPTCHA so user can try again
      });
    // [END auth_phone_signin]
  }

  function verifyCode() {
    // [START auth_phone_verify_code]
    if (smsCode?.toString().length === 6) {
      window.confirmationResult.confirm(smsCode.toString())
        .then((result: any) => {
          // User signed in successfully.
          const user = result.user;
          console.log("User signed in successfully!", user);

          // Redirect user to welcome page
          history.push('/welcome');
          ResetAll();

        }).catch((error: any) => {
          // console.log("Error: user couldn't sign in", error.message)
          setError(error.message)
        });
      // [END auth_phone_verify_code]
    }
    else {
      // console.log("SMS code requires 6 digits")
      setError("SMS code requires 6 digits")
    }
  }

  return (
    <IonPage>

      <IonHeader className="header-container">
        <IonToolbar>
          <IonTitle className="header-title">{pageTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>

        <IonItemDivider className="divider" />

        <IonList>
          {!isPhoneNumberConfirmed &&
            <IonItem>
              <IonLabel position="fixed">Mobile No</IonLabel>
              <IonInput
                type="tel" value={phoneNumber} placeholder="Enter mobile number"
                onIonChange={e => setPhoneNumber(e.detail.value!)}
                clearInput autocomplete="tel-country-code"></IonInput>
            </IonItem>}
          {isPhoneNumberConfirmed &&
            <IonItem>
              <IonLabel position="fixed">Code</IonLabel>
              <IonInput
                type="text" value={smsCode} placeholder="Enter the code sent to your number"
                onIonChange={e => setSmsCode(e.detail.value!)}
                clearInput></IonInput>
            </IonItem>}
          {error && <ErrorBar name={`ERROR: ${error}`} />}
        </IonList>
        <IonItemDivider className="divider" />
        <div className="center-align">
          {!isPhoneNumberConfirmed && !isRegistration &&
            <RoundButton
              handleOnClick={phoneSignIn}
              text="Sign-in" id="sign-in-button" color="secondary"
            />}
          {!isPhoneNumberConfirmed && isRegistration &&
            <RoundButton
              handleOnClick={phoneSignIn}
              text="Sign up!" id="sign-in-button" color="secondary"
            />}
          {isPhoneNumberConfirmed &&
            <RoundButton
              handleOnClick={verifyCode}
              text="Verify code" id="verify-code-button" color="secondary"
            />}
          {!isPhoneNumberConfirmed && <div id="recaptcha-container"></div>}

          {!isPhoneNumberConfirmed && !isRegistration &&
            <RoundButton
              handleOnClick={() => {
                setIsRegistration(true)
                setPageTitle("Register new user")
              }}
              text="New user?" id="new-user-button" color="primary"
            />
          }
        </div>
      </IonContent>
    
      <IonFooter className="header-container">
        <IonToolbar>
          <IonTitle className="header-title">Stocklist by Jun</IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default LoginPage;
