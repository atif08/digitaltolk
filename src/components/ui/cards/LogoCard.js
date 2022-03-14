/**
 * Created by Atif on 7/30/2019.
 */
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Body, Card, CardItem, Content, Icon, Left, Right, Thumbnail} from 'native-base';
import {base, margin} from '../../../constants';
import ParagraphText from '../headings/ParagraphText';
import GlobalStyle from '../../../constants/GlobalStyle';
import barbq from '../../../../assets/barbq.png';
import SubHeadingText from '../headings/SubHeadingText';
import {responsiveScreenHeight, responsiveScreenWidth} from 'react-native-responsive-dimensions';
import PropTypes from 'prop-types';

const  colors = ['red','blue','green','gray','pink','orange','#664441','#17abb0','#99b017','#7d1087'];
const LogoCard = props => (
    (props.photo ==null || props.photo =="")?
    <View style={[{
        width: props.small?50:props.size,
        height: props.small?50:props.size,
        backgroundColor: props.color?props.color:colors[Math.floor(Math.random() * 10)],
        borderRadius: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },props.style]}>
        <Text style={{fontFamily: 'Poppins-Medium', color: 'white', fontSize: props.small?20:props.size-props.size/2}}>
            {props.title.charAt(0).toUpperCase()}
            {(/\s/.test(props.title))?props.title.substr(props.title.indexOf(' ') + 1).charAt(0).toUpperCase():''}
        </Text>
    </View>:
    <Thumbnail small  style={{width: props.small?50:props.size, height: props.small?50:props.size,borderRadius: 80}}  source={{uri:props.photo}}/>
);

LogoCard.defaultProps = {
    size: 150
};

const styles = StyleSheet.create({


});

LogoCard.propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
    title: PropTypes.string,
    photo: PropTypes.string,
    small: PropTypes.bool,
    style: PropTypes.any,
    children: PropTypes.any,
};

export default LogoCard;
