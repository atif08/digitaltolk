/**
 * Created by Atif on 7/30/2019.
 */
import React from 'react';
import {StyleSheet, Image, TouchableOpacity, Text, ScrollView} from 'react-native';
import {Card, CardItem, Container, Content, Icon, Left, Right} from 'native-base';
import {base,margin} from '../../../constants';
import ParagraphText from '../headings/ParagraphText';
import GlobalStyle from '../../../constants/GlobalStyle';
import barbq from '../../../../assets/barbq.png';
import SubHeadingText from '../headings/SubHeadingText';
import Shimmer from '../../../components/ui/loader/Shimmer';
import {responsiveScreenHeight, responsiveScreenWidth} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import person from '../../../../assets/barbq.png';
import placeholder from '../../../../assets/event-news-placeholder.jpg';
const TopImagecard = props => {
    const {navigation,item} = props;
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Detail', item)}>
        <Card pointerEvents="none" style={[styles.mainCardRadius, GlobalStyle.globalBoxShadow]}>
            <CardItem style={styles.cardTopLeftRightRadius} cardBody>
                    <Image source={(item.photo !=null)?{uri:item.photo}:placeholder} defaultSource={placeholder} style={styles.cardImage}/>
            </CardItem>
            <CardItem cardBody style={styles.cardItem}>
                <Left style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                    <ParagraphText second align="left">TODAY AT 18:00 UTC+05</ParagraphText>
                     <SubHeadingText>{(item.name.length > 50)?item.name.substr(0,200)+'...':item.name}</SubHeadingText>
                    <ParagraphText>{(item.description.length > 200)?item.description.substr(0,200)+'...':item.description}</ParagraphText>
                </Left>
            </CardItem>
        </Card>
    </TouchableOpacity>)
};
const styles = StyleSheet.create({
    cardTopLeftRightRadius:{
        borderTopRightRadius: base.radius,
        borderTopLeftRadius: base.radius,
        backgroundColor:'#f2f2f2'

    },
    mainCardRadius: {
        borderRadius:base.radius,
        marginBottom:margin.small,
    },
    cardItem: {
        borderRadius:base.radius,
        margin: margin.small
    },
    cardImage:{
        flex:1,
        borderTopLeftRadius:base.radius,
        borderTopRightRadius:base.radius,
        height: responsiveScreenHeight(20),
        resizeMode:'cover'
    },

});

export default TopImagecard;
