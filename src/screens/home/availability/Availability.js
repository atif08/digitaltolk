import React, {useState, Component} from 'react';
import {
    Switch,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity, Image, FlatList, Animated, RefreshControl, ActivityIndicator,
} from 'react-native';
import {Container, Icon, Left, Body, Right, Content, Separator, CardItem, Card, Item, Label} from 'native-base';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import GlobalStyle from '../../../constants/GlobalStyle';
import ParagraphText from '../../../components/ui/headings/ParagraphText';
import GradientButton from '../../../components/ui/buttons/GradientButton';
import SubTitleText from '../../../components/ui/headings/SubTitleText';
import SubHeadingText from '../../../components/ui/headings/SubHeadingText';
import HeadingText from '../../../components/ui/headings/HeadingText';
import moment from 'moment';
import {dateFormat3, margin} from '../../../constants';
import axios from '../../../helper/axios';
import * as qs from 'qs';
import {connect} from 'react-redux';
import {AvailabilityModal} from './AvailabilityModal';
import Loader from '../../../components/ui/loader/Loader';
import EmptyList from '../../../components/ui/lists/EmptyList';
import TopImagecard from '../../../components/ui/cards/TopImageCard';
import AvailblityStatus from '../../../components/ui/lists/AvailblityStatus';
import AxiosErrorHandler from '../../../hoc/AxiosErrorHandler';

class Availability extends Component {
    state = {
        activeSections: [],
        fixture_availability: [],
        activeAvailability: [],
        isLoader: true,
        isModal: false,
        activityLoader: true,
        page: 1,
    };

    componentDidMount() {
        this.onRefresh();
    }
    onRefresh = (fixture_availability = []) => {
        let data = qs.stringify({pagination: {perpage: 20, page: this.state.page},sort: {field: 'date', sort: 'asc'},});
        axios.defaults.headers.common.Authorization = 'Bearer ' + this.props.user.token;
        axios.post('/fixtures-availability/get', data).then(response =>
        {
            let data = fixture_availability.concat(response.data.data);
            this.setState({fixture_availability: data,activityLoader:(response.data.data.length > 0 )?true:false});
        }
        ).catch(err => err)
            .finally(error => this.setState({isLoader: false}));
    };


    isLoader = () => {
        this.setState({isLoader: !this.state.isLoader});
    };
    isModal = () => {
        this.setState({isModal: !this.state.isModal});
    };
    setSections = sections => {
        this.setState({
            activeSections: sections.includes(undefined) ? [] : sections,
            activeAvailability: this.state.fixture_availability[sections],
        });
    };

    renderHeader = (section, _, isActive) => {
        return (
            <Animatable.View
                style={{flexDirection: 'row', padding: 10}}
                duration={400}
                transition="backgroundColor">
                <Left style={{flex: 1, flexDirection: 'row'}}>
                    <AvailblityStatus availability_status={section.availability_status}/>
                </Left>
                <Body style={{flex: 2}}>
                    <SubTitleText semiBold={true}>{
                        moment(section.date).format(dateFormat3)
                    }</SubTitleText>
                </Body>
                <Right>
                    {isActive
                        ? <Icon style={{fontSize: 18}} name="ios-arrow-up"/>
                        : <Icon style={{fontSize: 18}} name="ios-arrow-down-outline"/>
                    }
                </Right>
            </Animatable.View>
        );
    };
    renderContent = (section, _, isActive) => {
        return (
            <>
                <Animatable.View duration={300} easing="ease-out" animation={isActive ? 'zoomIn' : undefined}>
                    {section.fixtures.map(item => {

                        return (<CardItem key={item.fixture_id + '-child'} bordered style={{marginBottom: 10}}>
                            <Left style={{flex: 1, justifyContent: 'flex-end'}}>
                                <ParagraphText align="center"><Label style={{
                                    fontWeight: 'bold',
                                    fontSize: 12,
                                }}>{item.home_club + '\n'}</Label>{item.first_team}</ParagraphText>
                            </Left>
                            <Body style={{flex: 1, alignItems: 'center'}}>
                                <SubHeadingText second>VS</SubHeadingText>
                            </Body>
                            <Right style={{flex: 1, alignItems: 'flex-start'}}>
                                <ParagraphText align="center"></ParagraphText>
                                <ParagraphText><Label style={{
                                    fontWeight: 'bold',
                                    fontSize: 12,
                                }}>{item.away_club + '\n'}</Label>{item.second_team}</ParagraphText>
                            </Right>
                        </CardItem>);
                    })}
                    <GradientButton pressEvent={() => {
                        this.isModal();
                    }} style={{height: 50, marginLeft: 20, marginRight: 20}}
                                    text={(section.availability_status != null) ? 'Availablity Submitted' : 'Give Availablity'}/>
                </Animatable.View>
            </>
        );
    };

    // onEndReached() {
    //     this.setState({
    //         page: this.state.page + 1,
    //     }, () => {
    //         this.onRefresh(this.state.fixture_availability);
    //     });
    // }

    render() {
        // const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        //     if (layoutMeasurement.height + contentOffset.y >= contentSize.height-50) {
        //         this.onEndReached();
        //     }
        // }
        const {activeSections} = this.state;
        return (
            <Container>
                {
                    (this.state.isModal)
                        ? <AvailabilityModal refreshList={this.onRefresh}
                                             activeAvailability={this.state.activeAvailability} {...this.props}
                                             isModal={this.isModal} visible={this.state.isModal}/>
                        : null
                }

                <ScrollView
                //     onScroll={({nativeEvent}) => {
                //     isCloseToBottom(nativeEvent);
                // }}
                    refreshControl={<RefreshControl refreshing={this.state.isLoader}
                                                   onRefresh={this.onRefresh.bind(this)}/>}>
                    {
                        (this.state.isLoader)
                            ?
                            <View style={{margin: margin.small}}>
                                <Loader type="availability"/>
                            </View>
                            :
                            (this.state.fixture_availability.length > 0)
                                ? <Accordion
                                    containerStyle={[{margin: margin.small}]}
                                    sectionContainerStyle={[GlobalStyle.globalBoxShadow, {
                                        backgroundColor: 'white',
                                        marginBottom: 30,
                                        padding: 10,
                                    }]}
                                    activeSections={activeSections}
                                    sections={this.state.fixture_availability}
                                    touchableProps={this.state}
                                    touchableComponent={TouchableOpacity}
                                    renderHeader={this.renderHeader}
                                    renderContent={this.renderContent}
                                    duration={400}
                                    onChange={this.setSections}
                                />
                                : <EmptyList text="NO Availbility found"/>

                    }
                    {/*<ActivityIndicator animating={this.state.activityLoader}/>*/}
                </ScrollView>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth,
    };
};
export default connect(mapStateToProps)(AxiosErrorHandler(Availability, axios));
const styles = StyleSheet.create({});
