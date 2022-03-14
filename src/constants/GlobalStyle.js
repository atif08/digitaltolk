import { StyleSheet } from 'react-native';
import {base, margin} from './index';

export default StyleSheet.create({
    containerStyle: {
        paddingLeft: base.padding,
        paddingRight: base.padding,

    },
    inputMargin: {
        marginBottom: 20,
        borderBottomColor:base.secondColor,
        // backgroundColor:'red',
    },
    inputFieldStyle: {
        paddingLeft: 0
    },
    globalBoxShadow:{
        shadowRadius: 5,
        shadowColor: base.mainColor,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        elevation: 5,
        borderRadius:base.radius
    },
    HeaderBoxShadow:{
        shadowRadius: 5,
        shadowColor: 'red',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        elevation: 10,
    },

    tabStyle: {
        backgroundColor:'white',
        // borderRadius:base.radius
    },
    textStyle:{
        color:base.mainColor,
        fontFamily:'Poppins-Medium'
    },
    activeTextStyle:{
        color:base.secondColor,
        fontFamily:'Poppins-Medium'
    },
    activeTabStyle:{
        backgroundColor:'white',
    },
    cardRadius: {
        borderRadius:base.radius,
        marginBottom:margin.small,
        padding:margin.small
    },
});
