import React, {Component} from 'react';
import {View} from 'react-native';
import {Container, Header, Tab, Tabs, ScrollableTab, Content} from 'native-base';
import Event from '../event/Event';
import Feed from '../feed/Feed';
import {base} from '../../constants';
import {StatusBar, StyleSheet} from 'react-native';
import GlobalStyle from '../../constants/GlobalStyle';
import {useNavigation} from '@react-navigation/native';
import Dashboard from '../club/dashboard/Dashboard';
import Teams from '../club/teams/Teams';
import Availability from './availability/Availability';
import Membership from './membership/Membership';
import Fixtures from './fixtures/Fixtures';
export default class Home extends Component {
    state = {
        tabPage: 2

    }
    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
           this.setState({tabPage:(this.props.route.params)?this.props.route.params.tabPage:this.state.tabPage},()=>{ this.props.navigation.setParams({
                   tabPage:this.state.tabPage,
           })})
            this.props.navigation.setParams({tabPage: this.state.tabPage})
        });
    }

    componentWillUnmount() {
        // this.props.navigation.setParams({tabPage: this.state.tabPage})
    }

    render() {
        const {navigation} = this.props;
        return (
            <Container>
                <StatusBar backgroundColor={base.secondColor}/>
                <Tabs onChangeTab={({i,ref,from})=>{ this.setState({tabPage:i})}}
                    page={this.state.tabPage}
                    initialPage={2}
                    tabBarUnderlineStyle={{backgroundColor: base.secondColor}}
                    renderTabBar={() => <ScrollableTab/>}>
                    <Tab
                        activeTabStyle={GlobalStyle.activeTabStyle}
                        activeTextStyle={GlobalStyle.activeTextStyle}
                        textStyle={GlobalStyle.textStyle}
                        tabStyle={GlobalStyle.tabStyle}
                        heading="AVAILBILITY">
                        <Availability/>
                    </Tab>
                    <Tab
                        activeTabStyle={GlobalStyle.activeTabStyle}
                        activeTextStyle={GlobalStyle.activeTextStyle}
                        textStyle={GlobalStyle.textStyle}
                        tabStyle={GlobalStyle.tabStyle}
                        heading="FEEDS">
                        <Feed navigation={navigation}/>
                    </Tab>

                    <Tab
                        activeTabStyle={GlobalStyle.activeTabStyle}
                        activeTextStyle={GlobalStyle.activeTextStyle}
                        textStyle={GlobalStyle.textStyle}
                        tabStyle={GlobalStyle.tabStyle}
                        heading="FIXTURES">
                        <Fixtures/>
                    </Tab>
                    <Tab
                        activeTabStyle={GlobalStyle.activeTabStyle}
                        activeTextStyle={GlobalStyle.activeTextStyle}
                        textStyle={GlobalStyle.textStyle}
                        tabStyle={GlobalStyle.tabStyle} heading="EVENTS">
                        <Event navigation={navigation}/>
                    </Tab>

                    <Tab
                        activeTabStyle={GlobalStyle.activeTabStyle}
                        activeTextStyle={GlobalStyle.activeTextStyle}
                        textStyle={GlobalStyle.textStyle}
                        tabStyle={GlobalStyle.tabStyle} heading="MATCH FEE">
                        <Membership navigation={navigation}/>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    tabStyle: {
        backgroundColor: 'white',
    },
    textStyle: {
        color: base.secondColor,
    },
    activeTextStyle: {
        color: base.secondColor,
    },
    activeTabStyle: {
        backgroundColor: 'white',
    },
});
