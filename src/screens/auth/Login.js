import React, {Component} from 'react';
import {Image, StyleSheet, View, Animated, StatusBar, TouchableOpacity} from 'react-native';
import FingerPrintImage from '../../../assets/login/fingerprint.png';
import {base, margin} from '../../constants';
import FaceImage from '../../../assets/login/blank-avatar.png';
import Logo from '../../../assets/login/logo.png';
import {connect} from 'react-redux';
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
import {useNavigation} from '@react-navigation/native';
import {tryAuth} from '../../store/actions/auth';
import {RequestLoader} from '../../components/ui/loader/RequestLoader';
import messaging from '@react-native-firebase/messaging';
import NotifService from '../../../NotifService';
import {handleFirstConnectivityChange, isConnectivity} from '../../helper/CheckConnectivity';
import AxiosErrorHandler from '../../hoc/AxiosErrorHandler';
import axios from '../../helper/axios';
import {validate, onSubmit} from '../../helper/validation/validation_wrapper';
import InputWrapper from '../../components/ui/input/InputWrapper';

class Login extends Component {
    state = {
        email: 'test@gmail.com',
        password: '12345678',
        fcm_token: null,
    };
    componentDidMount() {
        messaging()
            .getToken()
            .then(token => {
                this.setState({fcm_token: token});
            });
    }

    authHandler = () => {
        const errors = onSubmit(this.state);
        if (errors) {
            this.setState(errors);
        } else {
            const authData = {
                email: this.state.email,
                password: this.state.password,
                fcm_token: this.state.fcm_token,
            };
            this.props.onTryAuth(authData);
        }
    };

    render() {
        const {navigation} = this.props;
        return (
            <Container>
                <RequestLoader visible={this.props.isLoading}/>
                <StatusBar backgroundColor={base.secondColor}/>
                <Content style={GlobalStyle.containerStyle}>
                    <View style={GlobalStyle.inputMargin}>
                        <View style={styles.centerImage}>
                            <Image style={styles.logoStyle} source={Logo}/>
                        </View>


                        <InputWrapper lable='Email' value={this.state.email} error={this.state.emailError}>
                            <Input value={this.state.email}
                                   onBlur={() => {
                                       this.setState({
                                           emailError: validate("email", this.state.email)
                                       })
                                   }}
                                   onChangeText={(text) => this.setState({
                                       email: text
                                   })}
                            />
                        </InputWrapper>

                        <InputWrapper value={this.state.password}
                                      error={this.state.passwordError}
                                      lable='Password'>
                            <Input secureTextEntry={true}
                                   value={this.state.password}
                                   onBlur={() => {
                                       this.setState({
                                           passwordError: validate("password", this.state.password)
                                       })
                                   }}
                                   onChangeText={(text) => this.setState({
                                       password: text,
                                   })}
                            />
                        </InputWrapper>

                        <View style={{marginBottom: margin.small}}>
                            <ParagraphText style={{textAlign: 'right'}}> Forget Password?</ParagraphText>
                        </View>
                        <GradientButton pressEvent={() => this.authHandler()} text="Sign In"/>
                        <View style={[styles.centerImage, {marginTop: margin.xlarge, marginBottom: margin.small}]}>
                            <Image style={styles.fingerPrint} source={FingerPrintImage}/>
                        </View>
                        
                    </View>
                </Content>
                <View style={{alignItems: 'center', marginBottom: margin.medium}}>
                    <ParagraphText>By Creating an account you agree to our </ParagraphText>
                    <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
                        <ParagraphText second>Terms of Services
                            <Label style={{color: base.mainColor}}> and</Label> Privacy Policy
                        </ParagraphText>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onTryAuth: (authData) => dispatch(tryAuth(authData)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AxiosErrorHandler(Login, axios));
const styles = StyleSheet.create({
    centerImage: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    fingerPrint: {
        resizeMode: 'contain',
        height: 50,
        width: 50,
    },
    logoStyle: {
        resizeMode: 'contain',
        height: 200,
        width: 300,
    },
});
