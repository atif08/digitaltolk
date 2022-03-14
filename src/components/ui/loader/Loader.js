/**
 * Created by Atif on 7/30/2019.
 */
import React from 'react';
import {StyleSheet, View, ActivityIndicator, Dimensions} from 'react-native';
import {Content} from 'native-base';
import {base} from '../../../constants';
import {Text} from 'react-native-animatable';
import TopImagecard from '../cards/TopImageCard';
import {Body, Left, ListItem} from 'native-base';
import LogoCard from '../cards/LogoCard';
import SubTitleText from '../headings/SubTitleText';
import ParagraphText from '../headings/ParagraphText';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import FixturesCard from '../cards/FixturesCard';
import ShimmerFixturesCard from './shimmerEffect/ShimmerFixtureCard';
import ShimmerUserList from './shimmerEffect/ShimmerUserList';
import ShimmerEvent from './shimmerEffect/ShimmerEvent';
import ShimmerAvailability from './shimmerEffect/ShimmerAvailability';
import ShimmerChat from './shimmerEffect/ShimmerChat';

const Loader = props => {
    var list = [];
    for (let i = 0; i < 11; i++) {
        if (props.type == 'card') {
            list.push(<ShimmerEvent key={i} isLoader={true}/>);
        } else if (props.type == 'user') {
            list.push(<ShimmerUserList key={i} isLoader={true}/>);
        } else if (props.type == 'fixture') {
            list.push(<ShimmerFixturesCard key={i} isLoader={true}/>,);
        }else if (props.type == 'availability') {
            list.push(<ShimmerAvailability key={i} isLoader={true}/>,);
        }else if (props.type == 'chat') {
            list.push(<ShimmerChat key={i} isLoader={true}/>,);
        } else {

        }
    }
    return (
        <Content>
            {list}
        </Content>
    );

};
const styles = StyleSheet.create({
    cardShimerImage: {
        borderTopLeftRadius: base.radius,
        borderTopRightRadius: base.radius,

    },
});

export default Loader;
