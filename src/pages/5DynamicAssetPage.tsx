import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
  IonItem, IonIcon, IonLabel, IonButton, IonItemDivider
} from '@ionic/react';

import axios from 'axios';
import { environment } from '../environment/environment'

import RoundButton from '../components/RoundButton'
import NavBar from '../components/NavBar'

const DynamicAssetPage: React.FC = () => {
  const [pageTitle, setPageTitle] = useState("Dynamic Asset Page")
  const params: { symbol: string, name: string } = useParams()
  const symbol = params.symbol;
  const name = params.name;

  const [quoteData, setQuoteData] = useState<any>(null);
  const [NewsData, setNewsData] = useState<any>(null)
  const [timeSeriesData, setTimeSeriesData] = useState<any[]>([]);

  useEffect(() => {
    setPageTitle(`Stock Focus: ${symbol}`)

    const quoteApiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${environment.alphaVantageApiKey}`;
    axios.get(quoteApiUrl).then((response) => {
      const data = response.data;
      if(data){
        setQuoteData(data);
        console.log("Quote Data:", data)
      }
    });

    const timeSeriesApiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=compact&apikey=${environment.alphaVantageApiKey}`;
    axios.get(timeSeriesApiUrl).then((response) => {
      const data = response.data["Time Series (Daily)"];

      if(data){
        // Format time series data for chart
        let formattedData: any[] = []
        Object.keys(data).reverse().forEach((key) => {
          formattedData.push({
            "date": key,
            "closing": data[key]["5. adjusted close"],
          })
        })
  
        console.log("Time Series Data:", formattedData)
        setTimeSeriesData(formattedData);
      }
    });

    const newsApiUrl = `https://newsapi.org/v2/everything?q=${name}&from=2021-04-01&sortBy=popularity&apiKey=${environment.newsApiKey}`;
    axios.get(newsApiUrl).then((response) => {
      const data = response.data;
      if(data){
        setNewsData(data);
        console.log("News Data:", data)
      }
    });
  }, [name, symbol])

  return (
    <IonPage>
      <IonHeader className="header-container">
        <IonToolbar>
          <IonTitle className="header-title">{pageTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        {/* MAIN QUOTATION FOR CURRENT PRICES */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{symbol}</IonCardTitle>
            <IonCardSubtitle>{name}</IonCardSubtitle>
          </IonCardHeader>

          {!quoteData && <IonItem>
            <IonCardContent>Loading...</IonCardContent>
          </IonItem>}
          {quoteData && quoteData["Global Quote"] && <IonItem>
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

          {quoteData && quoteData!["Global Quote"] && <IonItem>
            <IonCardContent>
              {`Price: ${quoteData!["Global Quote"]["05. price"]}`}
            </IonCardContent>
            <IonCardContent>
              {`Volume: ${quoteData!["Global Quote"]["06. volume"]}`}
            </IonCardContent>
          </IonItem>}

          {quoteData && quoteData!["Global Quote"] && <IonItem>
            <IonCardContent>
              {`Latest trading day: ${quoteData!["Global Quote"]["07. latest trading day"]}`}
            </IonCardContent>
          </IonItem>}

          {quoteData && quoteData!["Global Quote"] && <IonItem>
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

        {/* WATCHLIST BUTTON */}
        <div className="center-align">
          <RoundButton
            text="Add to Watchlist"
            handleOnClick={() => {
              console.log(`Added ${symbol} to watchlist`)
            }}
            color="secondary"
            id="watchlist-button"
          />
        </div>

        {/* HISTORICAL PRICES */}
        <IonCard className="news-card" >
          <IonCardHeader>
            <IonCardTitle>Historical Price Data</IonCardTitle>
          </IonCardHeader>
          <ResponsiveContainer width='100%' aspect={4.0/3.0}>
            <LineChart
              width={350}
              height={300}
              data={timeSeriesData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="closing" stroke="#8884d8" activeDot={{ r: 8 }} dot={false}/>
            </LineChart>
          </ResponsiveContainer>
        </IonCard>

        {/* RELATED NEWS */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Related News</IonCardTitle>
          </IonCardHeader>

          {NewsData && NewsData.articles.map((item: { [x: string]: any; }) => (
            <IonCard href={item.url} >
              <IonItem className="news-card" lines="none">
                <IonCardContent> {item.title} </IonCardContent>
              </IonItem>
              <img src={item.urlToImage} alt='' />
            </IonCard>
          ))}
        </IonCard>

      </IonContent>
      <NavBar />
    </IonPage>
  );
};

export default DynamicAssetPage;
