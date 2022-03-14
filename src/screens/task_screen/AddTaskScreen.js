import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { base, margin, dateFormate } from '../../constants';
import GlobalStyle from '../../constants/GlobalStyle';
import GradientButton from '../../components/ui/buttons/GradientButton.js';
import {
    Label,
    Container,
    Content,
    Item,
    Input, Card, Picker, Icon
} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ParagraphText from '../../components/ui/headings/ParagraphText';

import { connect } from 'react-redux';
import axios from '../../helper/axios';
import { uiStopLoading } from '../../store/actions/ui';
import { authLogout, authStoreToken, authSetToken } from '../../store/actions/auth';
import { useNavigation } from '@react-navigation/native';
import { RequestLoader } from '../../components/ui/loader/RequestLoader';
import AxiosErrorHandler from '../../hoc/AxiosErrorHandler';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import moment from 'moment';

class AddTaskScreen extends Component {
    constructor(props) {
        super(props);
        const item = this.props.route.params;
        this.state = {
            isLoader: false,
            isDateTimePickerVisible: false,
            id: item ? item.key : '',
            title: item ? item.title : '',
            description: item ? item.description : '',
            status: item ? item.status : 'inprogress',
            due_at: item ? item.due_at : moment(new Date()).format(dateFormate)
        }
    }

    /** datepicker handling here **/
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
    handleDatePicked = date => {
        this.setState({ due_at: moment(date).format(dateFormate) });
        this.hideDateTimePicker();
    };
    submitRequest(navigation, request) {
        if (request.title == '') {
            alert('Title required');
            return false;
        }
        if (request.description == '') {
            alert('Description required');
            return false;
        }
        this.isLoader();
        axios.defaults.headers.common.Authorization = 'Bearer ' + this.props.user.token;
           if (this.state.id == '') {
            axios.post('tasks', request)
                .then((response) => {
                    this.isLoader();
                    navigation.goBack();
                })
                .catch((err) => {
                    alert('Server Error ' + err);
                    this.isLoader();
                });
        } else {
            axios.put('tasks/' + this.state.id, request)
                .then((response) => {
                    this.isLoader();
                    navigation.goBack();
                })
                .catch((err) => {
                    alert('Server Error ' + err);
                    this.isLoader();
                });
        }

    }
    isLoader() {
        this.setState({ isLoader: !this.state.isLoader });
    }
    render() {
        const { navigation } = this.props;
        return (
            <Container>
                <RequestLoader visible={this.state.isLoader} />

                <Content style={[GlobalStyle.containerStyle]}>
                    <Card style={[GlobalStyle.cardRadius, GlobalStyle.globalBoxShadow, { marginTop: margin.small }]}>
                        <ParagraphText second bold align="center">Add Task</ParagraphText>
                        {/*second page inputs*/}
                        <Item success style={GlobalStyle.inputMargin} stackedLabel>
                            <Label style={{ color: base.secondColor }}>Title</Label>
                            <Input style={GlobalStyle.inputFieldStyle} onChangeText={(text) => {
                                this.setState({ title: text });
                            }} value={this.state.title} />
                        </Item>
                        <Item success style={GlobalStyle.inputMargin} stackedLabel>
                            <Label style={{ color: base.secondColor }}>Description</Label>
                            <Input style={GlobalStyle.inputFieldStyle} onChangeText={(text) => {
                                this.setState({ description: text });
                            }} value={this.state.description}
                                placeholder="Type here..." />
                        </Item>

                        <Item style={GlobalStyle.inputMargin} stackedLabel picker>
                            <Label style={{ color: base.secondColor }}>Status</Label>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="chevron-down" style={{ color: base.secondColor }} />}
                                style={{ width: responsiveScreenWidth(95) }}
                                selectedValue={this.state.status}
                                onValueChange={(text) => this.setState({ status: text })}>
                                <Picker.Item label="Inprogress" value="inprogress" />
                                <Picker.Item label="Incomplete" value="incomplete" />
                                <Picker.Item label="Complete" value="completed" />
                            </Picker>
                        </Item>
                        <View style={[{ flexDirection: 'row', borderBottomColor: base.secondColor, borderBottomWidth: 1 }, GlobalStyle.inputMargin]}>
                            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                                <Label style={{ color: base.secondColor }}>Due At</Label>
                                <View>
                                    <ParagraphText style={{ paddingTop: 10, paddingBottom: 10 }}>{this.state.due_at}</ParagraphText>
                                </View>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end', marginBottom: 10 }}>
                                <TouchableOpacity onPress={() => {
                                    this.setState({ isDateTimePickerVisible: true });
                                }}>
                                    <Icon style={{ color: '#B1B9C2', fontSize: 25 }} name='calendar' />
                                </TouchableOpacity>
                            </View>
                            <DateTimePicker
                                timePickerModeAndroid="spinner"
                                mode='date'
                                // maximumDate={new Date(2022, 0, 1)}
                                date={new Date()}
                                is24Hour={false}
                                isVisible={this.state.isDateTimePickerVisible}
                                onConfirm={this.handleDatePicked}
                                onCancel={this.hideDateTimePicker} />

                        </View>
                        <GradientButton style={{ marginTop: 30 }}
                            pressEvent={() => this.submitRequest(navigation, this.state)} text="Submit" />
                    </Card>

                </Content>
            </Container>
        );
    }

}

const mapStateToProps = state => {
    return {
        user: state.auth,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onUpdateUser: (data) => dispatch(authSetToken(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AxiosErrorHandler(AddTaskScreen, axios));
const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: base.secondColor,
        height: 200,
        paddingTop: 0,
        paddingLeft: 0,
        paddingBottom: 0,
        paddingRight: 0,
    },

});
