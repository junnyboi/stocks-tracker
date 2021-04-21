import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import LoginPage from './pages/1Login';
import WelcomePage from './pages/3Welcome';
import DashboardPage from './pages/4Dashboard';
import DynamicAssetPage from './pages/5DynamicAssetPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/global-styles.css'

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>

        <IonRouterOutlet>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route path="/welcome">
            <WelcomePage />
          </Route>
          <Route exact path="/dashboard">
            <DashboardPage />
          </Route>
          <Route path="/asset/:symbol/:name">
            <DynamicAssetPage />
          </Route>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </IonRouterOutlet>
        
    </IonReactRouter>
  </IonApp>
);

export default App;
