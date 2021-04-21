import React, { useState } from 'react';
import { IonItem, IonLabel } from '@ionic/react';


interface ContainerProps {
  name: string;
}

const ErrorBar: React.FC<ContainerProps> = ({ name }) => {
  return (  
    <IonItem color="tertiary">
      <IonLabel className="ion-text-wrap">
        {name}
      </IonLabel>
    </IonItem>
  );
};

export default ErrorBar;
