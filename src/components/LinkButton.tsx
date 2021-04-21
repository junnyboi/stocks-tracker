import { IonButton } from '@ionic/react';

interface ButtonProps {
    text: string;
    handleOnClick: any;
    href: string;
}

const LinkButton: React.FC<ButtonProps> = ({ text, handleOnClick = ()=>{}, href = "" }) =>{
    return(        
        <IonButton 
            shape="round" color="secondary"
            href={href}
        >
            {text}
        </IonButton>
    )
}

export default LinkButton;