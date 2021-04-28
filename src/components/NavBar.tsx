import {
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
} from '@ionic/react';
import { happy, square, rocket, logOut } from 'ionicons/icons';

const NavBar= () => {
  var selectedStock = localStorage.getItem('selectedStock')
  
  if(selectedStock === null){
    selectedStock = "DBSDF/DBS%20Group%20Holdings%20Ltd"
    localStorage.setItem("selectedStock","DBSDF/DBS%20Group%20Holdings%20Ltd")
  }

  return (  
    <IonTabBar slot="bottom">
      <IonTabButton tab="Welcome" href="/welcome">
        <IonIcon icon={happy} />
        <IonLabel>Welcome</IonLabel>
      </IonTabButton>
      <IonTabButton tab="Dashboard" href="/dashboard">
        <IonIcon icon={square} />
        <IonLabel>Dashboard</IonLabel>
      </IonTabButton>
      <IonTabButton tab="Stock" href={`/asset/${selectedStock}`}>
        <IonIcon icon={rocket} />
        <IonLabel>Stock</IonLabel>
      </IonTabButton>
      <IonTabButton tab="Logout" href="/login">
        <IonIcon icon={logOut} />
        <IonLabel>Log out</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default NavBar;
