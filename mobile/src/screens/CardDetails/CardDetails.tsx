import Barcode from '@kichiyaki/react-native-barcode-generator';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { FunctionComponent, useEffect, useState } from 'react';
import { extractUser, getToken } from '../../services/ContextService/ContextService';
import { getCardDetails } from '../../services/UserService/UserService';
import { getDateDDMMYYYY } from '../../utils/dateUtil';



interface CardDetailsProps {
    navigation: any;
}

const CardDetails: FunctionComponent<CardDetailsProps> = ({navigation}) => {
    const [card, setCard] = useState<string>("");
    const [isCardActive, setIsCardActive] = useState<boolean>(false);
    const [createdOn, setCreatedOn] = useState<string>("");
    const [expiresOn, setExpiresOn] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        ( async () => {
            setLoading(true);
            const token = await getToken();
            if(token) {
                const user = extractUser(token);
                setCard(user.cardNumber);
                const cardDetails = await getCardDetails(user.cardNumber);
                console.warn(JSON.stringify(cardDetails))
                setCreatedOn(cardDetails.createdOn);
                setIsCardActive(cardDetails.isActive)
                if(cardDetails.isActive) {
                    setExpiresOn(cardDetails.expiresOn);
                }
                
            }
            setLoading(false);
        })()
    }, [])

//expiresOn
if(loading) {
    return (
        <View style={styles.root}>
        <Text style={styles.title}>Loading...</Text>
        </View>
    )
}


  return (
    <View style={styles.root}>
    <Text style={styles.title}>REFLEX CARD</Text>
    {card ? <Barcode value={card} text={card} maxWidth={300} /> : <Text style={styles.title}>Error</Text>}
    <Text style={styles.title}>Created on: {getDateDDMMYYYY(new Date(createdOn))}</Text>
    {isCardActive && <Text style={styles.title}>Expires on: {getDateDDMMYYYY(new Date(expiresOn))}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
    root: {
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#051C60",
        margin: 10,
    }
})

export default CardDetails;