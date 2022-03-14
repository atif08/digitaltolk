/**
 * Created by Atif on 7/30/2019.
 */
import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, CardItem, Left, Right, Body} from 'native-base';
import {base, shimmerColors} from '../../../../constants';
import GlobalStyle from '../../../../constants/GlobalStyle';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
const ShimmerFixturesCard = props => {
    return (<Card style={[GlobalStyle.cardRadius, GlobalStyle.globalBoxShadow]}>
        <CardItem cardBody>
            <Left style={styles.imageSextion}>
                <ShimmerPlaceHolder     shimmerColors={shimmerColors} visible={!props.isLoader} height={responsiveScreenHeight(10)} style={styles.cardImageShimmer}/>
                <ShimmerPlaceHolder  shimmerColors={shimmerColors} visible={!props.isLoader} width={100} height={15}/>
            </Left>
            <Body style={{justifyContent: 'flex-end', alignItems: 'center', paddingLeft: 0}}>
                <ShimmerPlaceHolder     shimmerColors={shimmerColors} visible={!props.isLoader} width={40} height={15} style={{marginBottom: 20}}/>
                <ShimmerPlaceHolder    shimmerColors={shimmerColors} visible={!props.isLoader} width={70} height={15}/>
            </Body>
            <Right style={styles.imageSextion}>
                <ShimmerPlaceHolder     shimmerColors={shimmerColors} visible={!props.isLoader} height={responsiveScreenHeight(10)} style={styles.cardImageShimmer}/>
                <ShimmerPlaceHolder    shimmerColors={shimmerColors} visible={!props.isLoader} width={100} height={15}/>
            </Right>
        </CardItem>
    </Card>);
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

export default ShimmerFixturesCard;
