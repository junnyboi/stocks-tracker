import { useState, useEffect } from 'react'
import { RouteComponentProps, useParams } from "react-router-dom";

import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
  IonItem, IonIcon, IonLabel, IonButton
} from '@ionic/react';
import { wifi, wine, warning, walk } from 'ionicons/icons';

import axios from 'axios';
import { environment } from '../environment/environment'
// import { TimeSeriesIntraDay, TimeSeriesDaily, TimeSeriesMonthly, GlobalQuote } from '../utils/MockData'

import RoundButton from '../components/RoundButton'
import NavBar from '../components/NavBar'

const DynamicAssetPage: React.FC = () => {
  const [pageTitle, setPageTitle] = useState("Dynamic Asset Page")
  const params: { symbol: string, name: string } = useParams()
  const symbol = params.symbol;
  const name = params.name;

  const [quoteData, setQuoteData] = useState(null);
  const [timeSeriesData, setTimeSeriesData] = useState({});

  useEffect(() => {
    setPageTitle(`Stock Focus: ${symbol}`)
    const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${environment.alphaVantageApiKey}`;
    axios.get(apiUrl).then((response) => {
      const data = response.data;
      setQuoteData(data);
      console.log("Quote Data:", data)
    });
  }, [symbol])


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

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{symbol}</IonCardTitle>
            <IonCardSubtitle>{name}</IonCardSubtitle>
          </IonCardHeader>
          
          {!quoteData && <IonItem>
              <IonCardContent>Loading...</IonCardContent>
            </IonItem>}
          {quoteData && <IonItem>
            <IonCardContent>
              {`Open: ${quoteData!["Global Quote"]["02. open"]}`}
            </IonCardContent>
            <IonCardContent>
              {`High: ${quoteData!["Global Quote"]["03. high"]}`}
            </IonCardContent>
            <IonCardContent>
              {`Low: ${quoteData!["Global Quote"]["04. low"]}`}
            </IonCardContent>
          </IonItem>}

          {quoteData && <IonItem>
            <IonCardContent>
              {`Price: ${quoteData!["Global Quote"]["05. price"]}`}
            </IonCardContent>
            <IonCardContent>
              {`Volume: ${quoteData!["Global Quote"]["06. volume"]}`}
            </IonCardContent>
          </IonItem>}

          {quoteData && <IonItem>
            <IonCardContent>
              {`Latest trading day: ${quoteData!["Global Quote"]["07. latest trading day"]}`}
            </IonCardContent>
          </IonItem>}

          {quoteData && <IonItem>
            <IonCardContent>
              {`Previous close: ${quoteData!["Global Quote"]["08. previous close"]}`}
            </IonCardContent>
            <IonCardContent>
              {`Change: ${quoteData!["Global Quote"]["09. change"]}`}
            </IonCardContent>
            <IonCardContent>
              {`Change percent: ${quoteData!["Global Quote"]["10. change percent"]}`}
            </IonCardContent>
          </IonItem>}
        </IonCard>

        <div className="center-align">
          <RoundButton 
            text="Add to Watchlist"
            handleOnClick={()=>{
              console.log(`Added ${symbol} to watchlist`)
            }}
            color="secondary"
            id="watchlist-button"
          />
        </div>
        
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Historical Price Data</IonCardTitle>
          </IonCardHeader>      
          <IonCardContent>
            Compute and display chart here for daily trading
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Related News</IonCardTitle>
          </IonCardHeader>    

          <IonItem href="#" className="ion-activated">
            <IonIcon icon={wifi} slot="start" />
            <IonLabel>something juicy</IonLabel>
          </IonItem>

          <IonItem href="#">
            <IonIcon icon={wine} slot="start" />
            <IonLabel>corporate actions</IonLabel>
          </IonItem>

          <IonItem className="ion-activated">
            <IonIcon icon={warning} slot="start" />
            <IonLabel>I'm so sleepy</IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon icon={walk} slot="start" />
            <IonLabel>sigh pies</IonLabel>
          </IonItem>
        </IonCard>
        
      </IonContent>
      <NavBar />
    </IonPage>
  );
};

export default DynamicAssetPage;
