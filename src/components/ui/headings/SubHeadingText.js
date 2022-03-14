/**
 * Created by Atif on 7/31/2019.
 */
import React from "react";
import { Text, StyleSheet } from "react-native";
import {responsiveFontSize,responsiveScreenHeight} from "react-native-responsive-dimensions";
import {fonts,base} from '../../../constants/index.js'
import PropTypes from "prop-types";
import ParagraphText from './ParagraphText';
import * as Animatable from 'react-native-animatable';

const SubHeadingText = props => {
    const {textTransform, animation,align, grey, second, style, bold, children, medium, semiBold} = props;
    return(<Animatable.Text
        animation={animation}
        style={[
            styles.textHeading,
            (grey) ? {color: '#B1B9C2'} : {},
            (second) ? {color: base.secondColor} : {},
            (bold) ? {fontFamily: 'Poppins-Bold'} : {},
            (medium) ? {fontFamily: 'Poppins-Medium'} : {},
            (semiBold) ? {fontFamily: 'Poppins-SemiBold'} : {},
            {textTransform: textTransform, textAlign: align},
            style
        ]}>
        {props.children}
    </Animatable.Text>)
};
ParagraphText.defaultProps = {
    align: 'left',
    textTransform: 'none',
    grey: false,
    bold: false,
    second: false,
    medium: false,
    semiBold: false,
    animation: '',
};

const styles = StyleSheet.create({
    textHeading: {
        fontSize: responsiveFontSize(fonts.subHeading),
        color:base.mainColor,
        fontFamily:'Poppins-Bold'
    }
});


ParagraphText.propTypes = {
    textTransform: PropTypes.string,
    align: PropTypes.string,
    animation: PropTypes.string,
    grey: PropTypes.any,
    bold: PropTypes.any,
    second: PropTypes.any,
    medium: PropTypes.any,
    semiBold: PropTypes.any,
    children: PropTypes.any,
    style: PropTypes.any,
};
export default SubHeadingText;
