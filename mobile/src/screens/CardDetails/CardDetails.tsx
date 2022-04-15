import Barcode from '@kichiyaki/react-native-barcode-generator';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { FunctionComponent, useEffect, useState } from 'react';
import { extractUser, getToken } from '../../services/ContextService/ContextService';
import { getCardDetails } from '../../services/UserService/UserService';



interface CardDetailsProps {
    navigation: any;
}

const CardDetails: FunctionComponent<CardDetailsProps> = ({navigation}) => {
    const [card, setCard] = useState<string>(".");

    useEffect(() => {
        ( async () => {
            const token = await getToken();
            if(token) {
                const user = extractUser(token);
                await getCardDetails(user.cardNumber);
                setCard(user.cardNumber);
                
            }

        })()
    }, [])



  return (
    <View style={styles.root}>
    <Text style={styles.title}>REFLEX CARD</Text>
    <Barcode value={card} text={card} maxWidth={300} />
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