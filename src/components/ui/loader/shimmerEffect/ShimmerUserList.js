/**
 * Created by Atif on 7/30/2019.
 */
import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, CardItem, Left, Right, Body, ListItem} from 'native-base';
import {base,shimmerColors} from '../../../../constants';
import GlobalStyle from '../../../../constants/GlobalStyle';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LogoCard from '../../cards/LogoCard';
import SubTitleText from '../../headings/SubTitleText';
import ParagraphText from '../../headings/ParagraphText';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
const ShimmerUserList = props => {
    return (<ListItem  avatar style={{marginLeft: 0}}>
        <Left>
            <ShimmerPlaceHolder
                duration={1}
                location={[0.3, 0.5, 0.7]}
                shimmerColors={shimmerColors}
                height={100}
                visible={!props.isLoader}
                LinearGradient={LinearGradient} style={{width: 50, height: 50, borderRadius: 80}}/>
        </Left>
        <Body>
            <ShimmerPlaceHolder shimmerColors={shimmerColors}  style={{marginBottom: 10}} height={10} autoRun visible={!props.isLoader} LinearGradient={LinearGradient}/>
            <ShimmerPlaceHolder shimmerColors={shimmerColors}  width={100} height={10} autoRun visible={!props.isLoader}/>
        </Body>
    </ListItem>);
};
const styles = StyleSheet.create({
    imageSextion: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardImageShimmer: {
        borderRadius: base.radius,
        width: responsiveScreenWidth(20),
        resizeMode: 'contain',
        marginBottom: 20,
    },
});

export default ShimmerUserList;
