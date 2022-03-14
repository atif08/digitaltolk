/**
 * Created by Atif on 7/30/2019.
 */
import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, CardItem, Left, Right, Body} from 'native-base';
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
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
const ShimmerEvent = props => {
    return (
            <Card pointerEvents="none" style={[GlobalStyle.globalBoxShadow,{marginBottom:margin.small}]}>
                <CardItem style={styles.cardTopLeftRightRadius} cardBody>
                    <ShimmerPlaceHolder     shimmerColors={shimmerColors} height={200}  autoRun visible={!props.isLoader}  LinearGradient={LinearGradient} style={styles.cardShimerImage}/>
                </CardItem>
                <CardItem cardBody style={styles.cardItem}>
                    <Left style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <ShimmerPlaceHolder    shimmerColors={shimmerColors} width={100} style={{marginBottom:10}} autoRun visible={!props.isLoader} LinearGradient={LinearGradient}/>
                        <ShimmerPlaceHolder    shimmerColors={shimmerColors} style={{marginBottom:10}} autoRun visible={!props.isLoader}  LinearGradient={LinearGradient}/>
                        <ShimmerPlaceHolder    shimmerColors={shimmerColors} width={270} autoRun visible={!props.isLoader}  LinearGradient={LinearGradient}/>
                    </Left>
                </CardItem>
            </Card>
    );
};
const styles = StyleSheet.create({
    imageSextion: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardItem: {
        borderRadius:base.radius,
        margin: margin.small
    },
    cardShimerImage:{
        flex:1,
        borderTopLeftRadius:base.radius,
        borderTopRightRadius:base.radius,
    },
});

export default ShimmerEvent;
