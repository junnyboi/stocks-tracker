import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
  IonItem, IonIcon, IonLabel, IonButton
} from '@ionic/react';

import NavBar from '../components/NavBar'
import Searchbar from '../components/Searchbar';

const pageTitle = 'Dashboard'

const DashboardPage: React.FC = () => {
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
            <IonCardTitle>Gainers and Losers</IonCardTitle>
            <IonCardSubtitle>{`see all -->`}</IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
          
        <IonCard>
          <IonItem>
              <IonCardContent>Loading...</IonCardContent>
          </IonItem>
        </IonCard>

        <IonCard>
          <IonItem>
              <IonCardContent>Loading...</IonCardContent>
          </IonItem>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Your watchlist</IonCardTitle>
            <IonCardSubtitle>{`see all -->`}</IonCardSubtitle>
          </IonCardHeader>
        </IonCard>

        <IonCard>
          <IonItem>
              <IonCardContent>Loading...</IonCardContent>
          </IonItem>
        </IonCard>

        <IonCard>
          <IonItem>
              <IonCardContent>Loading...</IonCardContent>
          </IonItem>
        </IonCard>
                
      </IonContent>
      <NavBar />
    </IonPage>
  );
};

export default DashboardPage;
