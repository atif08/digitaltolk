import React, {Component} from 'react';
import {Image, StyleSheet,ImageBackground} from 'react-native';
import {base, margin} from '../../constants';
import {Card, CardItem, Container, Content, Left,Header,Button,Icon,Body,Title,Right,Text} from 'native-base';
import GlobalStyle from '../../constants/GlobalStyle';
import barbq from '../../../assets/signup/triangle.png';
import ParagraphText from '../../components/ui/headings/ParagraphText';
import SubHeadingText from '../../components/ui/headings/SubHeadingText';
import {View} from 'react-native-animatable';

export default class Terms extends Component {
    render() {
        return (
            <Container>
                <View style={{flex:0.01}}>
                <ImageBackground style={{width:'100%',height:300,resizeMode:'contain'}} source={barbq}></ImageBackground>
                </View>
                    <Content>
                        <Card style={[styles.cardTopLeftRightRadius,GlobalStyle.globalBoxShadow,{padding:margin.large,marginBottom:0}]}>
                            <CardItem cardBody>
                                <Left style={{flexDirection:'column',alignItems:'flex-start'}}>
                                    <SubHeadingText style={{marginBottom:margin.medium}}>Terms & Service</SubHeadingText>
                                    <ParagraphText bold style={{marginBottom:margin.xsmall}}>Terms and Conditions </ParagraphText>
                                    <ParagraphText>Digicoms and our affiliates (“Digicoms”, “us”, “our” or “we”) are dedicated to protecting the rights of our users (“users” or “you”). Please read these Terms and Conditions (“Terms and Conditions”, “Terms”) carefully, before using the Crikclub app operated by Digicoms. Your access to and use of the app is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the app. By accessing or using our services, you agree to be bound by these Terms and Conditions. If you disagree with any part of the agreement, then you may not access the services offered by the app. You are not allowed to copy or modify the app, any part of the app, or our trademarks in any way. You are not allowed to attempt to extract the source code of the app, nor are you allowed to try to translate the app to other languages, or make derivative versions. The app itself, and all the trade marks, copyright, database rights and other intellectual property rights related to it, still belong to Digicoms. Digicoms is committed to ensuring that the app is as useful and efficient as possible. For that reason, we reserve the right to make changes to the app or to charge for its services, at any time and for any reason. We will not charge you for the app or its services without making it clear exactly what you are paying for. The Crikclub app stores and processes the personal data which you have provided, in order to make our services available to you. It is your responsibility to keep your phone, and access to the app secure. We would advise, however, to protect your device from malware/viruses/malicious programmes, which can compromise your device’s security features, and consequently affect the Crikclub app so that it does not work properly or at all. It must be pointed out that there are certain responsibilities which Digicoms is not liable for. Certain functions of the app will require the app to have an active internet connection. The connection can be Wi-Fi, or provided by your mobile network provider, but Digicoms cannot take responsibility for the app not working at full functionality if you do not have access to Wi-Fi, or if you do not have any of your data allowance left. If you are using the app in an area without Wi-Fi services, you should remember that your terms of agreement with your mobile network provider will still apply. As a result, you may be charged by your mobile provider for the cost of data for the duration of the connection while accessing the app, or other third party charges. In using the app, you are accepting responsibility for any such charges, including roaming data charges if you use the app outside of your home territory (i.e. region or country) without turning off data roaming. If you are not the bill payer for the device on which you are using the app, please be aware that we will assume that you have received permission from the bill payer for using the app. Along the same lines, Digicoms cannot always take responsibility for the way you use the app; i.e. you need to make sure that your device stays charged – if it runs out of battery and you cannot turn it on to avail our services, Digicoms will not accept responsibility. With respect to Digicoms’ responsibility for your use of the app, when you are using the app, it is important to bear in mind that, although we endeavour to ensure the app is updated and without error at all times, we do rely on third parties to provide information to us so that we can make it available to you. Digicoms accepts no liability for any loss, direct or indirect, you experience as a result of relying wholly on this functionality of the app.</ParagraphText>
                                </Left>
                            </CardItem>
                        </Card>
                    </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    cardTopLeftRightRadius:{
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,

    },
    mainCardRadius: {
        borderRadius:base.radius,

    },
});
