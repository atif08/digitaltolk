/**
 * Created by Atif on 7/30/2019.
 */
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Text, TouchableOpacity, StyleSheet, View, ActivityIndicator, Dimensions} from 'react-native';
import {Content} from 'native-base';
import {base} from '../../../constants';

const GradientIconButton = props => (
    <LinearGradient start={{x: 1, y: 0}} end={{x: 0, y: 0}} colors={[props.main, props.second]}
                    style={[styles.linearGradient, props.style]} {...props}>
        <TouchableOpacity disabled={(props.isLoader || props.disable) ? true : false} onPress={props.pressEvent}>
            {props.children}
        </TouchableOpacity>
    </LinearGradient>
);
const styles = StyleSheet.create({
    linearGradient: {
        borderRadius: 50,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default GradientIconButton;
