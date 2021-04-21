import { useState } from 'react'
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
  IonItem, IonIcon, IonLabel, IonButton
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
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{pageTitle.toUpperCase}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Searchbar />

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Start by adding stocks</IonCardTitle>
            <IonCardSubtitle>to your watchlist to follow and trade!</IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
          
        <IonCard>
          <IonItem>
              <IonCardContent>APPLE (AAPL)</IonCardContent>
              <IonCardContent>Loading...</IonCardContent>
          </IonItem>
        </IonCard>

        <IonCard>
          <IonItem>
              <IonCardContent>GAMESTOP (GSTP)</IonCardContent>
              <IonCardContent>Loading...</IonCardContent>
          </IonItem>
        </IonCard>

        <IonCard>
          <IonItem>
              <IonCardContent>DISNEY (DSNY)</IonCardContent>
              <IonCardContent>Loading...</IonCardContent>
          </IonItem>
        </IonCard>

        <IonCard>
          <IonItem>
              <IonCardContent>TESLA (TSLA)</IonCardContent>
              <IonCardContent>Loading...</IonCardContent>
          </IonItem>
        </IonCard>
                
      </IonContent>
      <NavBar />
    </IonPage>
  );
};

export default WelcomePage;
