import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    RefreshControl,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import {base, currency, margin} from '../../../constants';
import {Container, Content, Header, Body, Left, Right, Button, Icon, Title, Segment, Item, Picker} from 'native-base';
import GlobalStyle from '../../../constants/GlobalStyle';
import FixturesCard from '../../../components/ui/cards/FixturesCard';
import GradientList from '../../../components/ui/lists/GradientList';
import axios from '../../../helper/axios';
import {connect} from 'react-redux';
import * as qs from 'qs';
import Loader from '../../../components/ui/loader/Loader';
import EmptyList from '../../../components/ui/lists/EmptyList';
import {View} from 'react-native-animatable';
import SubTitleText from '../../../components/ui/headings/SubTitleText';
import AxiosErrorHandler from '../../../hoc/AxiosErrorHandler';
import ActivityIndicatorViewNativeComponent
    from 'react-native/Libraries/Components/ActivityIndicator/ActivityIndicatorViewNativeComponent';

class Fixtures extends Component {
    state = {
        fixtures: [],
        teams: [],
        results: [],
        isLoader: true,
        bottomLoader: false,
        activePage: 1,
        page: 1,
        resultPage: 1,
        month: '',
        team_id: '',
    };

    componentDidMount() {
        this.onRefresh();
        this.getTeamsList();
        this.getFixturesResult();
    }

    getTeamsList() {
        axios.defaults.headers.common.Authorization = 'Bearer ' + this.props.user.token;
        axios.post('teams', qs.stringify({pagination: {perpage: 10, page: 0}, sort: {field: 'id', sort: 'desc'}}))
            .then(response => this.setState({teams: response.data.data}))
            .catch(err => err).finally(error => this.setState({isLoader: false}));
    }

    onRefresh(prevFixture = [],page=1) {
        axios.defaults.headers.common.Authorization = 'Bearer ' + this.props.user.token;
        axios.post('fixtures', qs.stringify({
            pagination: {perpage: 10, page: page},
            sort: {field: 'date', sort: 'asc'},
            query: {team_id: this.state.team_id, month: this.state.month},
        })).then(response => {
            // let listData = this.state.fixtures;
            let data = prevFixture.concat(response.data.data);
            this.setState({fixtures: data, bottomLoader:response.data.data.length == 0 ?false:true});
        }).catch(err => err).finally(error => this.setState({isLoader: false}));
    }

    getFixturesResult(prevResult = [],page = 1) {
        axios.defaults.headers.common.Authorization = 'Bearer ' + this.props.user.token;
        axios.post('fixtures/results', qs.stringify({
            pagination: {perpage: 10, page: page},
            sort: {field: 'date', sort: 'asc'},
            query: {team_id: this.state.team_id, month: this.state.month},
        }))
            .then(response => {
                // let listData = this.state.results;
                let data = prevResult.concat(response.data.data);
                this.setState({results: data,bottomLoader:response.data.data.length == 0 ?false:true});
            })
            .catch(err => err).finally(error => this.setState({isLoader: false}));
    }

    onChangeFilter(value) {
        this.setState({...this.state, ...value, fixtures: [], results: [], page: 1}, () => {
            this.getFixturesResult(), this.onRefresh();
        });
    }

    onEndReached() {
        this.setState({
            page: this.state.page + 1,
        }, () => {
            this.onRefresh(this.state.fixtures, this.state.page);
        });
    }

    onEndReachedResult() {
        this.setState({
            resultPage: this.state.resultPage + 1,
        }, () => {
            this.getFixturesResult(this.state.results,this.state.resultPage);
        });
    }

    selectComponent = (activePage) => () => this.setState({activePage});
    _renderComponent = ({navigation}) => {
        if (this.state.activePage === 1) {
            return (
                <FlatList
                    style={{paddingTop: margin.small}}
                    data={this.state.fixtures}
                    keyExtractor={(item, index) => item.id.toString()}
                    ListEmptyComponent={() => <EmptyList text="No data found"/>}
                    ListFooterComponent={ <ActivityIndicator size="large" animating={this.state.bottomLoader} color={base.secondColor}/>}
                    ListHeaderComponent={this._flatListHeader}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoader}
                            onRefresh={this.onRefresh.bind(this)}/>
                    }
                    onEndReachedThreshold={0.1}
                    onEndReached={this.onEndReached.bind(this)}
                    renderItem={({item, index, separators}) => (
                        <FixturesCard noButton navigation={navigation} keyExtractor={item.id}
                                      isLoader={this.state.isLoader} item={item}/>
                    )}/>
            );
        } else {
            return (
                <FlatList
                    style={{paddingTop: margin.small}}
                    data={this.state.results}
                    keyExtractor={(item, index) => item.id.toString()+'result'}
                    ListFooterComponent={ <ActivityIndicator size="large" animating={this.state.bottomLoader} color={base.secondColor}/>}
                    ListHeaderComponent={this._flatListHeader}
                    onEndReachedThreshold={0.1}
                    onEndReached={this.onEndReachedResult.bind(this)}
                    ListEmptyComponent={() => <EmptyList text="No data found"/>}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoader}
                            onRefresh={this.getFixturesResult.bind(this)}/>
                    }
                    renderItem={({item, index, separators}) => (
                        <FixturesCard noButton navigation={navigation} keyExtractor={item.id}
                                      isLoader={this.state.isLoader}
                                      item={item}/>
                    )}/>);
        }
    };
    _flatListHeader = () => {
        return (
            <>
                <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                    <Segment style={[{
                        width: 250,
                        backgroundColor: 'white',
                    }, GlobalStyle.globalBoxShadow]}>
                        <Button
                            style={{
                                backgroundColor: this.state.activePage === 1 ? 'white' : undefined,
                                borderColor: 'white',
                                marginRight: margin.small,
                            }}
                            active={this.state.activePage === 1 ? true : false}
                            onPress={() => this.setState({activePage: 1})}>
                            <SubTitleText textTransform='uppercase'
                                          style={{color: this.state.activePage === 1 ? base.secondColor : base.mainColor}}>Up-comming</SubTitleText>
                        </Button>
                        <Button
                            style={{
                                backgroundColor: this.state.activePage === 2 ? 'white' : undefined,
                                borderColor: 'white',
                            }}
                            active={this.state.activePage === 2 ? true : false}
                            onPress={() => this.setState({activePage: 2})}>
                            <SubTitleText textTransform='uppercase'
                                          style={{color: this.state.activePage === 2 ? base.secondColor : base.mainColor}}>Result</SubTitleText>
                        </Button>
                    </Segment>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1, marginRight: 10}}>
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon style={{color: base.secondColor}} name="arrow-down"/>}
                                style={{justifyContent: 'flex-start'}}
                                placeholder="All Teams"
                                placeholderStyle={{color: base.mainColor, paddingLeft: 0, paddingRight: 0}}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.team_id}
                                onValueChange={(text) => {
                                    {
                                        this.onChangeFilter({team_id: text});
                                    }
                                }}>
                                <Picker.Item label='All Teams' value=''/>
                                {this.state.teams.map(item => {
                                    return (<Picker.Item key={(item, index) => item.id.toString()} label={item.name} value={item.id}/>);
                                })}

                            </Picker>
                        </Item>
                    </View>

                    <View style={{flex: 1, marginRight: 10}}>
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon style={{color: base.secondColor}} name="arrow-down"/>}
                                style={{justifyContent: 'flex-start'}}
                                placeholder="All Month"
                                placeholderStyle={{color: base.mainColor, paddingLeft: 0, paddingRight: 0}}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.month}
                                onValueChange={(text) => {
                                    this.onChangeFilter({month: text});
                                }}>
                                <Picker.Item label='All Months' value=''/>
                                <Picker.Item label='January' value={1}/>
                                <Picker.Item label='Feb' value={2}/>
                                <Picker.Item label='March' value={3}/>
                                <Picker.Item label='April' value={4}/>
                                <Picker.Item label='May' value={5}/>
                                <Picker.Item label='June' value={6}/>
                                <Picker.Item label='July' value={7}/>
                                <Picker.Item label='August' value={8}/>
                                <Picker.Item label='September' value={9}/>
                                <Picker.Item label='October' value={10}/>
                                <Picker.Item label='November' value={11}/>
                                <Picker.Item label='December' value={12}/>
                            </Picker>
                        </Item>
                    </View>
                </View></>);
    };

    render() {
        const {navigation} = this.props;
        return (
            <Container style={GlobalStyle.containerStyle}>
                {
                    (this.state.isLoader)
                        ?
                        <Loader type="fixture"/>
                        :
                        <>

                            {this._renderComponent({navigation})}

                        </>

                }
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth,
    };
};

export default connect(mapStateToProps)(AxiosErrorHandler(Fixtures, axios));
const styles = StyleSheet.create({});
