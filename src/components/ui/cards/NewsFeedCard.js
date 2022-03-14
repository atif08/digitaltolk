/**
 * Created by Atif on 7/30/2019.
 */
import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Card, CardItem, Content, Icon, Left, Right} from 'native-base';
import {base, margin} from '../../../constants';
import ParagraphText from '../headings/ParagraphText';
import GlobalStyle from '../../../constants/GlobalStyle';
import barbq from '../../../../assets/barbq.png';
import SubHeadingText from '../headings/SubHeadingText';
import {responsiveScreenHeight, responsiveScreenWidth} from 'react-native-responsive-dimensions';
import GradientButton from '../buttons/GradientButton';

const NewsFeedCard = props => {
        const {navigation,item} = props;
        return (<Card style={[GlobalStyle.cardRadius, GlobalStyle.globalBoxShadow]}>
            <CardItem cardBody>
                <Left style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                    <SubHeadingText>{(item.name.length > 40) ? item.name.substr(0, 40) + '...' : item.name}</SubHeadingText>
                    <ParagraphText
                        grey>{(item.description.length > 100) ? item.description.substr(0, 100) + '...' : item.description}
                    </ParagraphText>
                    <TouchableOpacity onPress={() => navigation.navigate('Detail', item)} >
                    <ParagraphText second>
                        Read Full artical
                        <Icon style={{fontSize: 20, color: base.secondColor}} name="arrow-forward"/>
                    </ParagraphText>
                    </TouchableOpacity>
                </Left>
                {(item.photo != null) ?
                    <Right style={{alignItems: 'flex-start'}}>
                        <Image source={{uri: item.photo}} style={styles.cardImageRight}/>
                    </Right> : null
                }
            </CardItem>
        </Card>);
    }
;
const styles = StyleSheet.create({
    cardImageRight: {
        flex: 1,
        borderRadius: base.radius,
        width: responsiveScreenWidth(36),
        height: responsiveScreenHeight(25),
        resizeMode: 'cover',
    },
});

export default NewsFeedCard;
