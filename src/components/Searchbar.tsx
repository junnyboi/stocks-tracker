import React, { useState, useEffect } from 'react';
import { IonSearchbar, IonList, IonItem, IonLabel } from '@ionic/react';

import axios from 'axios';
import { environment } from '../environment/environment'

const Searchbar: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [bestMatches, setBestMatches] = useState([])

  useEffect(() => {
    const apiUrl = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchText}&apikey=${environment.alphaVantageApiKey}`;
    axios.get(apiUrl).then((response) => {
      const data = response.data.bestMatches;
      setBestMatches(data)
      console.log("Fuzzy search:", data)
    });
  }, [searchText]);

  return (
    <div>
      <IonSearchbar
        className="searchbar"
        value={searchText}
        onIonChange={
          e => setSearchText(e.detail.value!)
        }
        placeholder="Search stock name or ticker code">
      </IonSearchbar>
      <IonList>
        {bestMatches && bestMatches.map(item => {
          const symbol = item["1. symbol"];
          const name = item["2. name"];

          return (
            <IonItem
              href={`/asset/${symbol}/${name}`}
              onClick={() => {
                localStorage.setItem('selectedStock', `${symbol}/${name}`)
              }
              }>
              <IonLabel >
                {`${symbol}`}
              </IonLabel>
              <IonLabel>
                {`${name}`}
              </IonLabel>
            </IonItem>
          )
        }
        )}
      </IonList>
    </div>
  );
};

export default Searchbar;
