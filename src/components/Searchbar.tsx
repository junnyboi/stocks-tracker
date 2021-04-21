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
        {bestMatches && bestMatches.map(item => (
          <IonItem 
            href={`/asset/${item["1. symbol"]}/${item["2. name"]}`}
            onClick={()=>{ 
              localStorage.setItem('selectedStock', `${item["1. symbol"]}/${item["2. name"]}`)
            }
          }>
            <IonLabel >
              {`${item["1. symbol"]}`}
            </IonLabel>
            <IonLabel>
              {`${item["2. name"]}`}
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
    </div>
  );
};

export default Searchbar;
