import React, {Component} from 'react';
import {Image, StyleSheet, View, Animated, StatusBar, Text} from 'react-native';
import FingerPrintImage from '../../../assets/login/fingerprint.png';
import {base, margin} from '../../constants';
import FaceImage from '../../../assets/login/blank-avatar.png';
import Logo from '../../../assets/login/logo.png';
import GradientButton from '../../components/ui/buttons/GradientButton.js';
import {
    Label,
    Container,
    Content,
    Icon,
    Item,
    Input,
    Picker,
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import GlobalStyle from '../../constants/GlobalStyle';
import * as Animatable from 'react-native-animatable';
import ParagraphText from '../../components/ui/headings/ParagraphText';


const Splash = props => (
    <Container>
        <StatusBar backgroundColor={base.secondColor}/>
        <View style={[GlobalStyle.containerStyle,styles.centerImage]}>

                    <Image style={styles.logoStyle} source={Logo}/>
        </View>
    </Container>
);
const styles = StyleSheet.create({
    centerImage: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoStyle: {
        resizeMode: 'contain',
        height: 200,
        width: 300,
    },
});
export default Splash;
