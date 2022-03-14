/**
 * Created by Atif on 7/31/2019.
 */
import React from "react";
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {responsiveFontSize} from "react-native-responsive-dimensions";
import {Button, Content, Icon} from 'native-base';
import SubTitleText from '../../components/ui/headings/SubTitleText';
import {margin} from '../../constants';

const ProfileItemLink = props => (
    <TouchableOpacity style={styles.listItem} onPress={props.pressEvent}>
        <View style={{flex: 0.3}}>
            <Button style={{height: 60}} rounded bordered dark>
                <Icon name={props.icon}/>
            </Button>
        </View>
        <View style={{flex: 1, paddingTop: 15}}>
            <SubTitleText bold align="left">{props.name}</SubTitleText>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    listItem: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        marginBottom: margin.large
    },
});

export default ProfileItemLink;
