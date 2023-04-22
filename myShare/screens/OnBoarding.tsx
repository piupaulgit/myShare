import React from 'react';
import {Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {card, conversation, conversation_onboard, friendship_onboard, memories, memories_onboard} from '../assets/images';

const OnBoarding = (props:any) => {
  return (
    <Onboarding
      onSkip={() => props.navigation.replace("Login")}
      onDone={() => props.navigation.navigate("SignUp")}
      pages={[
        {
          backgroundColor: '#fdfdfd',
          image: <Image source={friendship_onboard} style={{width: 200, height: 200, marginBottom: 30}}/>,
          title: 'The easiest way to split expenses with friends',
          subtitle: '',
        },
        {
          backgroundColor: '#fdfdfd',
          image: <Image source={conversation_onboard} style={{width: 200, height: 200, marginBottom: 30}}/>,
          title: 'Say goodbye to awkward money conversations',
          subtitle: '',
        },
        {
          backgroundColor: '#fdfdfd',
          image: <Image source={memories_onboard} style={{width: 200, height: 200, marginBottom: 30}}/>,
          title: 'Share expenses, share memories',
          subtitle: "",
        },
      ]}
    />
  );
};

export default OnBoarding;
