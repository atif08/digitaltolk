import React, {useState, useEffect, useContext} from 'react';
import {
    View,
    Modal,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    Dimensions, Text,
} from 'react-native';
import {base, margin} from '../../../constants';
import {ListItem, CheckBox, Radio, Body, Left, Right, CardItem, Card, Item, Input, Label, Form} from 'native-base';
import SubHeadingText from '../../../components/ui/headings/SubHeadingText';
import ParagraphText from '../../../components/ui/headings/ParagraphText';
import SubTitleText from '../../../components/ui/headings/SubTitleText';
import HeadingText from '../../../components/ui/headings/HeadingText';
import axios from '../../../helper/axios';
import * as qs from 'qs';
import {RequestLoader} from '../../../components/ui/loader/RequestLoader';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const AvailabilityModal = (props) => {

    let [loader, setLoder] = useState(false);
    let [checkboxYes, setCheckboxYes] = useState(false);
    let [status, setStatus] = useState(1);
    let [checkboxNo, setCheckboxNo] = useState(false);
    let [reason, setReason] = useState('');

    useEffect(() => {
        if (props.activeAvailability.availability_status == 1) {
            updateYes();

        } else if(props.activeAvailability.availability_status == 0) {
            updateNo();

        }
    }, []);

    function updateYes() {
        setCheckboxYes(true);
        setCheckboxNo(false);
        setStatus(1);
    }

    function updateNo() {
        setCheckboxNo(true);
        setCheckboxYes(false);
        setStatus(0);
    }

    function onAddAvailability() {
        setLoder(!loader);
        let data = qs.stringify({
            player_id: props.user.id,
            date: props.activeAvailability.date,
            availability_status: status,
            reason: reason,
        });
        axios.defaults.headers.common.Authorization = 'Bearer ' + props.user.token;
        axios.post('fixtures-availability', data)
            .then(res => {
                props.refreshList(), props.isModal();
            })
            .catch(error => {props.refreshList(), props.isModal()})
            .finally(error => setLoder(!loader));
    }

    return (


        <>
            <RequestLoader visible={loader}/>
            <Modal style={{}} transparent={true} animationType={'none'} onRequestClose={() => null}
                   visible={props.visible}>
                <View style={[{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    alignItems: 'center',
                    justifyContent: 'center',
                }]}>
                    <Card style={{
                        flexDirection: 'column',
                        borderRadius: 15,
                        backgroundColor: 'white',
                        padding: 20,
                        width: windowWidth - 100,
                    }}>
                        <Form>
                            <View style={{marginBottom: margin.medium}}>
                                <HeadingText align="center">Availability</HeadingText>
                            </View>
                            <CardItem>
                                <Left style={{flex: 1, justifyContent: 'flex-start'}}>
                                    <CheckBox onPress={() => updateYes()} style={{marginRight: 20, height: 20}}
                                              color={base.secondColor} checked={checkboxYes}/>
                                    <SubTitleText>Yes</SubTitleText>
                                </Left>
                                <Body style={{flex: 1, alignItems: 'center'}}>
                                </Body>
                                <Right style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                                    <CheckBox onPress={() => updateNo()} style={{marginRight: 20}}
                                              color={base.secondColor}
                                              checked={checkboxNo}/>
                                    <SubTitleText>No</SubTitleText>
                                </Right>
                            </CardItem>
                            {
                                (checkboxNo)
                                    ? <CardItem>
                                        <Item style={{flex: 1}} stackedLabel>
                                            <Input onChangeText={(text) => {
                                                setReason(text);
                                            }} value={props.activeAvailability.reason} placeholder='Please give reason'/>
                                        </Item>
                                    </CardItem>
                                    : null
                            }
                            <CardItem style={{marginTop: margin.medium}}>
                                <Left style={{flex: 1, justifyContent: 'flex-start'}}>
                                    <TouchableOpacity onPress={() => props.isModal()}
                                                      style={{justifyContent: 'flex-start'}}>
                                        <SubTitleText>Cancel</SubTitleText>
                                    </TouchableOpacity>
                                </Left>
                                <Body style={{flex: 1, alignItems: 'center'}}>
                                    <SubTitleText>|</SubTitleText>
                                </Body>
                                <Right style={{flex: 1, justifyContent: 'flex-end'}}>
                                    <TouchableOpacity onPress={() => {
                                        onAddAvailability();
                                    }} style={{justifyContent: 'flex-start'}}>
                                        <SubTitleText second>Send</SubTitleText>
                                    </TouchableOpacity>
                                </Right>
                            </CardItem>
                        </Form>
                    </Card>
                </View>
            </Modal>
        </>
    );
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
