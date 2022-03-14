/**
 * Created by Atif on 7/30/2019.
 */
import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import ParagraphText from '../headings/ParagraphText';

const AvailblityStatus = props => (

    (props.availability_status == 1) ?
        <>
            <Icon style={{color: 'green', fontSize: 15, marginTop: 2, marginRight: 3}} name='checkmark-circle'/>
            <ParagraphText style={{fontSize: 12}}>Availble</ParagraphText>
        </>
        :
        (props.availability_status == 0) ?
            <>
                <Icon style={{color: 'red', fontSize: 15, marginTop: 2, marginRight: 3}} name='ios-remove-circle'/>
                <ParagraphText style={{fontSize: 12}}>Not
                    Availble{props.reason ? '\n' : null}{props.reason}</ParagraphText>
            </>
            :
            <>
                <Icon style={{color: 'grey', fontSize: 15, marginTop: 2, marginRight: 3}} name='ios-remove-circle'/>
                <ParagraphText style={{fontSize: 12}}>Not Given</ParagraphText>
            </>

);
const styles = StyleSheet.create({});
export default AvailblityStatus;
