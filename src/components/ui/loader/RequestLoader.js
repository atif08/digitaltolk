import React from 'react';
import {
    View,
    Modal,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import SubHeadingText from '../headings/SubHeadingText';
import {base} from '../../../constants';
import ParagraphText from '../headings/ParagraphText';
import HeadingText from '../headings/HeadingText';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const RequestLoader = (props) => {
    return (
        <Modal transparent={true} animationType={'none'} onRequestClose={() => null} visible={props.visible}>
            <View style={[{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.5)',
                alignItems: 'center',
                justifyContent: 'center',
            }]}>
                <View style={{borderRadius: 5,  backgroundColor: 'white', padding: 20,width:windowWidth-40}}>
                    <View>
                        <SubHeadingText style={{}}>Adding...</SubHeadingText>
                    </View>
                    <View style={{flexDirection:'row',marginTop:20}}>
                        <View style={{marginRight: 20}}>
                            <ActivityIndicator size="large" color={base.secondColor}/>
                        </View>
                        <View style={{marginTop:5}}>
                            <ParagraphText style={{}}>Please wait a moment</ParagraphText>
                        </View>
                    </View>
                </View>
            </View>

        </Modal>
    );
};
RequestLoader.propTypes = {
    visible: PropTypes.bool,
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.2)',
    }, starImage: {
        resizeMode: 'contain',
        width: '4%',
        height: 20,
        marginRight: 10,
    },
});
