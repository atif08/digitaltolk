/**
 * Created by Atif on 7/31/2019.
 */
import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {fonts, base} from '../../../constants/index.js';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';
import Shimmer from '../loader/Shimmer';

const SubTitleText = props => {
    const {textTransform, animation,align, grey, second, style, bold, children, medium, semiBold} = props;
    return (<Animatable.Text
            animation={animation}
            style={[
                styles.textHeading,
                (grey) ? {color: '#B1B9C2'} : {},
                (second) ? {color: base.secondColor} : {},
                (bold) ? {fontFamily: 'Poppins-Bold'} : {},
                (medium) ? {fontFamily: 'Poppins-Medium'} : {},
                (semiBold) ? {fontFamily: 'Poppins-SemiBold'} : {},
                {textTransform: textTransform,textAlign: align},
                style,
            ]}>
            {props.children}
        </Animatable.Text>
    );
};
SubTitleText.defaultProps = {
    align:'left',
    textTransform: 'none',
    grey: false,
    bold: false,
    second: false,
    medium: false,
    semiBold: false,
    animation:''
};

const styles = StyleSheet.create({
    textHeading: {
        fontSize: responsiveFontSize(fonts.subTitle),
        color: base.mainColor,
        fontFamily: 'Poppins-Regular',
    },
});

SubTitleText.propTypes = {
    textTransform: PropTypes.string,
    align: PropTypes.string,
    grey: PropTypes.any,
    bold: PropTypes.any,
    second: PropTypes.any,
    animation:PropTypes.string,
    medium: PropTypes.any,
    semiBold: PropTypes.any,
    children: PropTypes.any,
    style: PropTypes.any,
};
export default SubTitleText;

