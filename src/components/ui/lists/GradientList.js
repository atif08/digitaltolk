/**
 * Created by Atif on 7/30/2019.
 */
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Text, TouchableOpacity, StyleSheet, View, ActivityIndicator, Dimensions} from 'react-native';
import {Content, Icon,Label} from 'native-base';
import {base, margin} from '../../../constants';
import ParagraphText from '../headings/ParagraphText';
import GradientIconButton from '../buttons/GradientIconButton';
import PropTypes from 'prop-types';
import LogoCard from '../cards/LogoCard';
import SubTitleText from '../headings/SubTitleText';
import {currency} from '../../../constants/index';

const GradientList = props => {
    const {main,second,disabled,text,team, style,amount,pressEvent} = props;
    return (
        <LinearGradient start={{x: 1, y: 0}} end={{x: 0, y: 0}}
                            colors={[main, second]}
                            style={[styles.linearGradient, style]}>
            <TouchableOpacity disabled={disabled} onPress={pressEvent} style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                <View style={{flex: 3, alignItems: 'flex-start',justifyContent: 'center'}}>
                    <ParagraphText semiBold  style={{color: 'white'}}>{text}</ParagraphText>
                </View>
                <View style={{flex: 2, alignItems: 'center',justifyContent: 'center'}}>
                    <ParagraphText align='center' style={{color: 'white'}}>
                        {team}
                        {(disabled)?' (Paid)':' (Unpaid)'}
                    </ParagraphText>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <View style={styles.payCircle}>
                        <ParagraphText semiBold second style={{fontSize: 15}}>
                            {currency}{amount}
                        </ParagraphText>
                    </View>
                    {/*<Icon style={{color: 'white'}} name={props.icon}/>*/}
                </View>
            </TouchableOpacity>
        </LinearGradient>
    )
}
GradientList.defaultProps = {
    text: '',
    team: '',
    main: base.secondColor,
    second: base.mainColor,
    disabled: false,
    amount: 0,
    style: {},
};

GradientList.propTypes = {
    text: PropTypes.string,
    team: PropTypes.string,
    main: PropTypes.string,
    second: PropTypes.string,
    disabled: PropTypes.any,
    amount: PropTypes.any,
    style: PropTypes.any,
    pressEvent: PropTypes.any,
};
const styles = StyleSheet.create({
    payCircle:{
        width: 40,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    linearGradient: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: base.radius,
    },
});

export default GradientList;
