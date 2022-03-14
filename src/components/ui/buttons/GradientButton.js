/**
 * Created by Atif on 7/30/2019.
 */
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Text, TouchableOpacity, StyleSheet, View, ActivityIndicator, Dimensions} from 'react-native';
import {Content, Spinner} from 'native-base';
import {base, fonts} from '../../../constants';
import * as Animatable from 'react-native-animatable';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import SubTitleText from '../headings/SubTitleText';
import PropTypes from 'prop-types';
const GradientButton = props => {
    const {isLoader, pressEvent, animation, text, style, children,textstyle} = props;
    return (
        <Animatable.View animation={animation}>
            <TouchableOpacity disabled={isLoader} onPress={pressEvent}>
                <LinearGradient start={{x: 1, y: 0}} end={{x: 0, y: 0}} colors={[base.secondColor, base.gradientEnd]}
                                style={[styles.linearGradient, style]}>
                    {(props.isLoader) ?
                        // <Spinner style={[styles.buttonText, props.textstyle]} size="small" color='white' />
                        <ActivityIndicator animating={true} size="small" color="white"/>
                        :
                        <Text  {...props} style={[styles.buttonText, textstyle]}>{text}</Text>
                    }
                    {props.children}
                </LinearGradient>
            </TouchableOpacity>
        </Animatable.View>
    );
};
const styles = StyleSheet.create({
    linearGradient: {
        height: 60,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
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
});
GradientButton.defaultProps = {
    isLoader: false,
    pressEvent: ()=>alert('No event pass'),
    animation:'',
    text:'Submit'
};
GradientButton.propTypes = {
    isLoader: PropTypes.bool,
    text: PropTypes.string,
    pressEvent: PropTypes.func,
    children: PropTypes.any,
    textstyle: PropTypes.any,
    style: PropTypes.any,
};

export default GradientButton;
