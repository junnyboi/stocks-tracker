import { useState, useEffect } from 'react'
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
  IonItem, IonLabel, IonItemDivider, IonList
} from '@ionic/react';

import firebase from "firebase/app";
import "firebase/firestore";

import NavBar from '../components/NavBar'
import Searchbar from '../components/Searchbar';

import axios from 'axios';
import { environment } from '../environment/environment'
import { randomInt } from 'crypto';

// Initialize Firebase database connection
const db = firebase.firestore();
const pageTitle = 'Dashboard'

const DashboardPage: React.FC = () => {
  const [user_mobile, setUser_mobile] = useState("Debug Mode")
  const [watchlist, setWatchlist] = useState([])

  const fetchWatchlist = async () => {
    console.log("Retrieving watchlist for", user_mobile)
    const docRef = db.collection('watchlists').doc(user_mobile)

    docRef.get().then((doc) => {      if (doc.exists) {
        const stocks = doc.data()!.stocks;
        console.log("Retrieved watchlist", stocks)
        setWatchlist(stocks)
      }
      else {
        console.log("Watchlist does not exist for", user_mobile)
      }
    });
  }

  const fetchPriceChange = async (symbol: string) => {    
    const quoteApiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${environment.alphaVantageApiKey}`;
    axios.get(quoteApiUrl).then((response) => {
      const data = response.data;
      if (data) {
        console.log("fetchPriceChange Data:", data)
        return data;
      }
    });

  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        setUser_mobile(user.phoneNumber!);
      }
      else {
        setUser_mobile("Debug Mode")
      }
    })
    fetchWatchlist();
  }, [])

  return (
    <IonPage>
      <IonHeader className="header-container">
        <IonToolbar>
          <IonTitle className="header-title">{pageTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="center-align">

        <Searchbar />

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Your Watchlist</IonCardTitle>
            {/* <a href="#">{`see all -->`}</a> */}
          </IonCardHeader>
        </IonCard>

        <IonList>
          {watchlist && watchlist.map((item, i) => {
            const symbol = item['symbol'];
            const name = item['name'];

            return (
              <IonItem
                href={`/asset/${symbol}/${name}`}
                onClick={() => {
                  localStorage.setItem('selectedStock', `${symbol}/${name}`)
                }
                }>
                <IonLabel >
                  {`+${(Math.random()*5).toFixed(2)}%`}
                </IonLabel>
                <IonLabel> {name} </IonLabel>
                <IonLabel > {symbol} </IonLabel>
              </IonItem>
            )
          })}
        </IonList>

      </IonContent>
      <NavBar />
    </IonPage>
  );
};

export default DashboardPage;
