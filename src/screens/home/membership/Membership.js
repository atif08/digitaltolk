import React, {Component} from 'react';
import {StyleSheet,FlatList,RefreshControl} from 'react-native';
import {base, margin} from '../../../constants';
import {Container} from 'native-base';
import GlobalStyle from '../../../constants/GlobalStyle';
import TopImagecard from '../../../components/ui/cards/TopImageCard';
import NewsFeedCard from '../../../components/ui/cards/NewsFeedCard';
import GradientList from '../../../components/ui/lists/GradientList';
import axios from '../../../helper/axios';
import {connect} from 'react-redux';
import * as qs from 'qs';
import Loader from '../../../components/ui/loader/Loader';
import SubTitleText from '../../../components/ui/headings/SubTitleText';
import SubHeadingText from '../../../components/ui/headings/SubHeadingText';
import AxiosErrorHandler from '../../../hoc/AxiosErrorHandler';
import EmptyList from '../../../components/ui/lists/EmptyList';
import { useIsFocused } from '@react-navigation/native';
// const isFocused = useIsFocused();
class Membership extends Component {
    state = {
        list: [],
        isLoader: true,
    }
    componentDidMount() {
        this.onRefresh();
        this.willFocusSubscription = this.props.navigation.addListener(
            'focus',
            () => {
                this.onRefresh();
            }
        );
    }
    onRefresh() {
        axios.defaults.headers.common.Authorization = 'Bearer ' + this.props.user.token;
        axios.post('match-fee-transactions/user/'+this.props.user.id, qs.stringify({pagination: {perpage: 10, page: 0},query:{user_id:this.props.user.id}}))
            .then(res => this.setState({list: res.data.data}))
            .catch(error=> console.warn(error))
            .finally(error=> this.setState({isLoader:false}))
    }
    isLoader() {
        this.setState({isLoader: !this.state.isLoader});
    }
    render() {
        const {navigation,isFocused} = this.props;
        return (
            <Container style={[GlobalStyle.containerStyle, {marginTop: margin.small}]}>
                {
                    (this.state.isLoader)
                        ?
                        <Loader type="user"/>
                        :
                        <FlatList
                            data={this.state.list}
                            keyExtractor={(item, index) => item.id.toString()}
                            ListEmptyComponent={()=><EmptyList text="NO MATCH FEE DUE"/>}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isLoader}
                                    onRefresh={this.onRefresh.bind(this)}
                                    colors={['gray', 'orange']}/>
                            }
                            renderItem={({item, index, separators}) => (
                                <GradientList style={{marginBottom:margin.small}}
                                              disabled={(item.status == 1)?true:false}
                                              main={(item.status == 1)?'rgba(0, 0, 0, 0.2)':'#FC9970'}
                                              second={(item.status == 1)?'rgba(0, 0, 0, 0.2)':'#FF5B7F'}
                                              pressEvent={() => navigation.navigate('MatchPayment',item)}
                                              amount={item.amount}
                                              team={item.team.name}
                                              text="Match Fee"
                                              icon="play-outline"/>
                            )}/>
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

export default connect(mapStateToProps)(AxiosErrorHandler(Membership,axios));
const styles = StyleSheet.create({});
