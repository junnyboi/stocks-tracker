import { useState } from 'react'
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonItem, IonIcon, IonLabel,
  IonButton, IonItemDivider
} from '@ionic/react';

import NavBar from '../components/NavBar'
import Searchbar from '../components/Searchbar';

import firebase from "firebase/app";
import { useHistory } from 'react-router-dom';



const WelcomePage: React.FC = () => {
  const history = useHistory();
  const [phoneNumber, setPhoneNumber] = useState('')
  const [pageTitle, setPageTitle] = useState(`Welcome!`)

  // Set observer to get current user details
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      console.log("User currently logged in with:", user.phoneNumber)
      var user = firebase.auth().currentUser;

      if (user != null) {
        setPhoneNumber(user.phoneNumber!)
        setPageTitle(`Welcome ${user.phoneNumber!}!`)
      }
    } else {
      // No user is signed in, force logout
      history.push('/');
    }
  })

  return (
    <IonPage>

      <IonHeader className="header-container">
        <IonToolbar>
          <IonTitle className="header-title">{pageTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="center-align">

        <IonCard >
          <IonCardHeader>
            <h4>Start by adding stocks to your watchlist and build a portfolio!</h4>
            <p>Select from the suggestions below or use our search engine to discover new ones.</p>
          </IonCardHeader>
        </IonCard>

        <Searchbar />

        <IonCard href={`/asset/AAPL/Apple%20Inc`} className="welcome-card">
          <img src="https://i.pinimg.com/564x/8d/f5/e7/8df5e76136dcba44841002494e01e050.jpg" alt='' />
          <IonItem lines="none">
            <IonCardContent>Apple Inc. (AAPL)</IonCardContent>
          </IonItem>
        </IonCard>

        <IonCard href={`/asset/TSLA/Tesla%20Inc`} className="welcome-card">
          <img src="https://i.pinimg.com/564x/ff/c0/f3/ffc0f3182c18ec063380a32c89a95c3e.jpg" alt='' />
          <IonItem lines="none">
            <IonCardContent>Tesla, Inc. (TSLA)</IonCardContent>
          </IonItem>
        </IonCard>

        <IonCard href={`/asset/GME/GameStop%20Corp`} className="welcome-card">
          <img src="https://i.pinimg.com/564x/ab/39/84/ab398459738820549d7c60a5000311ff.jpg" alt='' />
          <IonItemDivider className="divider" />
          <IonItem lines="none">
            <IonCardContent>GameStop Corp. (GME)</IonCardContent>
          </IonItem>
        </IonCard>

        <IonCard href={`/asset/DIS/The%20Walt%20Disney%20Company`} className="welcome-card">
          <img src="https://i.pinimg.com/564x/dc/5f/ee/dc5fee0189b193c8ebf8e19076ad56f0.jpg" alt='' />
          <IonItem lines="none">
            <IonCardContent>The Walt Disney Company (DSNY)</IonCardContent>
          </IonItem>
        </IonCard>

      </IonContent>
      <NavBar />
    </IonPage>
  );
};

export default WelcomePage;
