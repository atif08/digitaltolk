/**
 * Created by Atif on 7/30/2019.
 */
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Card, CardItem, Left, Right, Body, Label} from 'native-base';
import {base, margin, shimmerColors} from '../../../../constants';
import GlobalStyle from '../../../../constants/GlobalStyle';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import placeholder from '../../../../../assets/fixture-placeholder.jpg';
import ParagraphText from '../../headings/ParagraphText';
import SubHeadingText from '../../headings/SubHeadingText';
import {ucFirst} from '../../../../helper/helperFunctions';
import SubTitleText from '../../headings/SubTitleText';
import LogoCard from '../../cards/LogoCard';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
const ShimmerChat = props => {
    return (
            // <Card pointerEvents="none" style={[GlobalStyle.globalBoxShadow,styles.cardItem]}>
            //     <CardItem style={{flexDirection:'column'}} cardBody>
            //         <ShimmerPlaceHolder style={{borderRadius:4,marginBottom: 5}} height={20} width={150} autoRun visible={!props.isLoader}  LinearGradient={LinearGradient}/>
            //     </CardItem>
            //     <CardItem style={{flexDirection:'column'}} cardBody>
            //         <ShimmerPlaceHolder style={{borderRadius:4,marginBottom: 5}} height={20} width={100} autoRun visible={!props.isLoader}  LinearGradient={LinearGradient}/>
            //     </CardItem>
            // </Card>
        <View style={{marginLeft: 10,marginRight: 10,marginTop:10}}>
            <View style={{flexDirection:'row'}}>
                <ShimmerPlaceHolder    shimmerColors={shimmerColors} style={styles.bubble} height={60} width={200}  visible={!props.isLoader}  LinearGradient={LinearGradient}/>
                <ShimmerPlaceHolder    shimmerColors={shimmerColors} style={styles.chatLeft} height={100} width={200}  visible={!props.isLoader}  LinearGradient={LinearGradient}/>
            </View>
            <View style={{flexDirection:'row'}}>
                <ShimmerPlaceHolder    shimmerColors={shimmerColors} style={styles.bubble} height={60} width={200}  visible={!props.isLoader}  LinearGradient={LinearGradient}/>
                <ShimmerPlaceHolder    shimmerColors={shimmerColors} style={styles.chatLeft} height={40} width={300}  visible={!props.isLoader}  LinearGradient={LinearGradient}/>
            </View>
            <View style={{flexDirection:'row'}}>
                <ShimmerPlaceHolder    shimmerColors={shimmerColors} style={styles.bubble} height={60} width={200}  visible={!props.isLoader}  LinearGradient={LinearGradient}/>
                <ShimmerPlaceHolder    shimmerColors={shimmerColors} style={styles.chatLeft} height={50} width={150}  visible={!props.isLoader}  LinearGradient={LinearGradient}/>
            </View>



            <View style={[styles.chatRight,{flexDirection:'row'}]}>
                <ShimmerPlaceHolder     shimmerColors={shimmerColors} style={styles.chatRight}  height={170} width={250}  visible={!props.isLoader}  LinearGradient={LinearGradient}/>
                <ShimmerPlaceHolder     shimmerColors={shimmerColors} style={styles.bubble}  visible={!props.isLoader}  LinearGradient={LinearGradient}/>
            </View>
            <View style={[{flexDirection:'row'},styles.chatRight]}>
                <ShimmerPlaceHolder     shimmerColors={shimmerColors} height={45} width={300} style={styles.chatRight} visible={!props.isLoader}  LinearGradient={LinearGradient}/>
                <ShimmerPlaceHolder     shimmerColors={shimmerColors} style={[styles.bubble]}  visible={!props.isLoader}  LinearGradient={LinearGradient}/>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
bubble:{
    width: 40,
    height:40,
    backgroundColor: 'red',
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10
},

    chatRight: {
        // borderTopLeftRadius: 20,
        // borderBottomRightRadius: 20,
        // borderBottomLeftRadius: 20,
        alignSelf: 'flex-end',
        margin: 8,


    },
    chatLeft: {
        // backgroundColor: 'none',
        // borderTopRightRadius: 20,
        // borderBottomRightRadius: 20,
        // borderBottomLeftRadius: 20,
        // alignSelf: 'flex-start',
        margin: 8,
    },

});

export default ShimmerChat;
