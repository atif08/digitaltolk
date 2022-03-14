import SubHeadingText from '../components/ui/headings/SubHeadingText';
import {base} from '../constants';
import {TransitionPresets} from '@react-navigation/stack';
import React from 'react';

export function headerOptions(props = {},options={}) {
    return ({
        title: <SubHeadingText>{props.name}</SubHeadingText>,
        headerBackTitleVisible: false,//hide title with back button only IOS
        headerTintColor: base.mainColor,//for android status bar color only
        ...TransitionPresets.SlideFromRightIOS,//nex screen animation for android only
        options,//from calling place
        // headerTransparent: true
    });
}
