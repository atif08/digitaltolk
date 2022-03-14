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
const ShimmerAvailability = props => {
    return (
            <Card pointerEvents="none" style={[GlobalStyle.globalBoxShadow,styles.cardItem]}>
                <CardItem style={{flexDirection:'column'}} cardBody>
                    <ShimmerPlaceHolder    shimmerColors={shimmerColors} style={{borderRadius:4,marginBottom: 5}} height={20} width={150} autoRun visible={!props.isLoader}  LinearGradient={LinearGradient}/>
                </CardItem>
                <CardItem style={{flexDirection:'column'}} cardBody>
                    <ShimmerPlaceHolder    shimmerColors={shimmerColors} style={{borderRadius:4,marginBottom: 5}} height={20} width={100} autoRun visible={!props.isLoader}  LinearGradient={LinearGradient}/>
                </CardItem>
            </Card>
    );
};
const styles = StyleSheet.create({

    cardItem: {
        justifyContent:'center',
        alignItems:'flex-start',
        marginBottom:margin.small,
        height:70,
        paddingLeft: 20
    },

});

export default ShimmerAvailability;
