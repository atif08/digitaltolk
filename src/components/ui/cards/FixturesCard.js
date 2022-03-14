/**
 * Created by Atif on 7/30/2019.
 */
import React from 'react';
import {StyleSheet, Image,View} from 'react-native';
import {Card, CardItem, Icon, Left, Right, Body} from 'native-base';
import {base, dateFormate2} from '../../../constants';
import ParagraphText from '../headings/ParagraphText';
import GlobalStyle from '../../../constants/GlobalStyle';
import placeholder from '../../../../assets/fixture-placeholder.jpg';
import SubHeadingText from '../headings/SubHeadingText';
import {responsiveScreenHeight, responsiveScreenWidth} from 'react-native-responsive-dimensions';
import SubTitleText from '../headings/SubTitleText';
import HeadingText from '../headings/HeadingText';
import GradientButton from '../buttons/GradientButton';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';

const FixturesCard = props => {
    const firstTeam = props.item.first_team;
    const secondTeam = props.item.second_team;
    return (
        <Animatable.View>
            <Card style={[GlobalStyle.cardRadius, GlobalStyle.globalBoxShadow, {padding: 20}]}>
                <View style={{justifyContent: 'flex-start',alignItems: 'flex-start',flexDirection: 'row'}}>
                    <View style={styles.imageSectionLeft}>
                        <Image source={(firstTeam.photo != null) ? {uri: firstTeam.photo} : placeholder}
                               defaultSource={placeholder} style={styles.cardImageRight}/>
                        <SubTitleText semiBold align="center">{firstTeam.name}</SubTitleText>
                        <ParagraphText  align="center">{props.item.home_club.name}</ParagraphText>
                    </View>
                    <Body style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 0}}>
                        <HeadingText second>VS</HeadingText>
                        <ParagraphText align="center">
                            {moment(props.item.date + ' ' + props.item.start_time).format(dateFormate2)}
                            {/*{moment(props.item.date).format(dateFormate2)}*/}
                        </ParagraphText>
                    </Body>
                    <View style={styles.imageSectionRight}>
                        <Image source={(secondTeam.photo != null) ? {uri: secondTeam.photo} : placeholder}
                               defaultSource={placeholder} style={styles.cardImageRight}/>
                        <SubTitleText semiBold align="center">{secondTeam.name}</SubTitleText>
                        <ParagraphText  align="center">{props.item.away_club.name}</ParagraphText>
                    </View>
                </View>
                {(props.item.match_result) ? <SubTitleText style={{color: 'green'}} align='center'>{props.item.match_result.result_description}</SubTitleText>:null}
                {(props.noButton) ?
                    null
                    : <GradientButton style={{flex: 1, marginTop: 30, height: 45}}
                                      pressEvent={() => props.navigation.navigate('TeamSelection', {
                                          id: props.item.id,
                                          name: firstTeam.name,
                                          photo: firstTeam.photo,
                                          ...props.item,
                                      })} text="Team Selection"/>
                }
            </Card>
        </Animatable.View>
    );
};
const styles = StyleSheet.create({
    imageSectionLeft: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    imageSectionRight: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardImageRight: {
        // flex: 2,
        // alignItems: 'flex-start',
        // borderRadius: base.radius,
        width: responsiveScreenWidth(20),
        height: responsiveScreenHeight(10),
        resizeMode: 'contain',
    },

});

export default FixturesCard;
