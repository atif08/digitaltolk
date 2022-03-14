import React, { Component } from 'react';
import {Image, StyleSheet, View, Animated, StatusBar,Text} from 'react-native';
import FingerPrintImage from '../../../assets/login/fingerprint.png';
import {base} from '../../constants';
import FaceImage from '../../../assets/login/blank-avatar.png';
import Logo from '../../../assets/login/logo.png';
import GradientButton from '../../components/ui/buttons/GradientButton.js';
import {   Label,
    Container,
    Content,
    Icon,
    Item,
    Input,
    Left,
    Picker} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import GlobalStyle from '../../constants/GlobalStyle';
import * as Animatable from 'react-native-animatable';
import ParagraphText from '../../components/ui/headings/ParagraphText';
import HeadingText from '../../components/ui/headings/HeadingText';
import TriangleBackground from '../../../assets/signup/triangle.png';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(200),  //This is the initial position of the subview
        };
        Animated.spring(
            this.state.bounceValue,
            {
                useNativeDriver:true,
                toValue: -200,
                velocity: 3,
                tension: 2,
                friction: 8,
            }
        ).start();
    }
    render() {
        return (
            <Container>
                <StatusBar backgroundColor={base.secondColor}/>
                <Animated.View  style={{flex:0.5,alignItems: 'center', transform: [{translateX: this.state.bounceValue}]}}>
                    <Image source={TriangleBackground} style={{flex: 1, resizeMode: 'stretch', justifyContent: 'center'}}/>
                </Animated.View>
                <View style={[{
                    flex:1,
                    flexDirection:'column',
                    justifyContent:'flex-start',
                    alignItems: 'center'},
                    GlobalStyle.containerStyle]}>

                    <View style={GlobalStyle.inputMargin}>
                        <View style={{marginBottom:30}}>
                            <HeadingText align="center">Forget Password</HeadingText>
                        </View>
                        <View style={{marginBottom:50}}>
                            <ParagraphText align="center">Enter the email address you used to create your account and we will email you a link to reset your password</ParagraphText>
                        </View>
                        <Item success style={GlobalStyle.inputMargin}  floatingLabel>
                            <Label>Email</Label>
                            <Input placeholder='Email'/>
                            <Icon name='checkmark-circle' />
                        </Item>
                        <GradientButton pressEvent={()=>alert()} text="Next"/>
                    </View>
                </View>
            </Container>
        );
    }

}
const styles = StyleSheet.create({
    centerImage: {
        justifyContent: 'center',
        alignItems: 'center'
    },

})
