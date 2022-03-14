/**
 * Created by Atif on 7/30/2019.
 */
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Text, TouchableOpacity, StyleSheet, View, ActivityIndicator, Dimensions, Image} from 'react-native';
import {Content, Icon} from 'native-base';
import {base,margin} from '../../../constants';
import ParagraphText from '../headings/ParagraphText';
import GradientIconButton from '../buttons/GradientIconButton';
import noDataFound from '../../../../assets/no_data.png';
import {responsiveScreenHeight, responsiveScreenWidth} from 'react-native-responsive-dimensions';
import SubTitleText from '../headings/SubTitleText';
import SubHeadingText from '../headings/SubHeadingText';
const windowHeight = Dimensions.get('window').height;

const EmptyList = props => (
    <View style={{justifyContent:'center',alignItems:'center',marginTop:50}}>
    <Image style={styles.image}  source={noDataFound}/>
    <SubHeadingText>{(props.text)?props.text:'No data found'}</SubHeadingText>
    </View>
);
const styles = StyleSheet.create({
    image: {
        width: responsiveScreenWidth(30),
        height: responsiveScreenHeight(20),
        resizeMode: 'contain',
    },
});
export default EmptyList;
