import { IonButton } from '@ionic/react';

interface ButtonProps {
    text: string;
    handleOnClick: any;
    id: string;
    color: string;
}

const RoundButton: React.FC<ButtonProps> = ({ text, handleOnClick, id, color }) =>{
    return(        
        <IonButton 
            shape="round" color={color}
            onClick = {handleOnClick}
            id = {id}
        >
            {text}
        </IonButton>
    )
}

export default RoundButton;