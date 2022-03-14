/**
 * Created by Atif on 7/30/2019.
 */
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Text, TouchableOpacity, StyleSheet, View, ActivityIndicator, Dimensions, Image} from 'react-native';
import {Body, Container, Content, Icon, Label, Left, Right} from 'native-base';
import {base, margin} from '../../../constants';
import ParagraphText from '../headings/ParagraphText';
import GradientIconButton from '../buttons/GradientIconButton';
import PropTypes from 'prop-types';
import LogoCard from '../cards/LogoCard';
import SubTitleText from '../headings/SubTitleText';
import * as Animatable from 'react-native-animatable';
import GlobalStyle from '../../../constants/GlobalStyle';
import card from '../../../../assets/card.png';
import arrowFawrod from '../../../../assets/arrowFawrod.png';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';

const PaymentList = props => {
    const {disabled,text, image,style,pressEvent} = props;
    return (
        <TouchableOpacity disabled={disabled} onPress={pressEvent}>
            <Animatable.View
                style={[{
                    flexDirection: 'row',
                    paddingLeft: 10,
                    paddingRight: 10,
                    backgroundColor: 'white',
                    marginTop: margin.small,
                }, GlobalStyle.globalBoxShadow]}
                duration={400}
                transition="backgroundColor">
                <Left style={{flex: 1, flexDirection: 'row'}}>
                    <Image style={styles.favImage} source={image}/>
                </Left>
                <Body style={{flex: 2}}>
                    <SubTitleText semiBold={true}>{text}</SubTitleText>
                </Body>
                <Right>
                    {(disabled) ?
                        <ActivityIndicator animating={true} size="small" color="black"/> :
                        <Image style={styles.arrImage} source={arrowFawrod}/>
                    }
                </Right>
            </Animatable.View>
        </TouchableOpacity>
    )
}
PaymentList.defaultProps = {
    text: '',
    image: '',
    disabled: false,
    style: {},
};

PaymentList.propTypes = {
    text: PropTypes.string,
    image: PropTypes.any,
    disabled: PropTypes.any,
    style: PropTypes.any,
    pressEvent: PropTypes.any,
};
const styles = StyleSheet.create({
    headerTile: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',


        borderRadius: 10,
        elevation: 10,
        marginBottom: 10,
    },
    innerWrap: {
        flex: 4,
        backgroundColor: '#FFFFFF',
        elevation: 10,
        borderRadius: 10,
        // marginTop: 20,
        marginBottom: 10,

    },
    paymentList: {
        flexDirection: 'row',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
    },
    favImage: {
        resizeMode: 'contain',
        width: responsiveWidth(10),
        height: responsiveHeight(7),
    },
    arrImage: {
        resizeMode: 'contain',
        width: '15%',
    }, starImage: {
        resizeMode: 'contain',
        width: '50%',
        height: '50%',
    },
});

export default PaymentList;
