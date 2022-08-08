import {Input} from 'native-base';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useInput} from '../customHooks/uiHooks';

export default function PasswordInput(password: ReturnType<typeof useInput>) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Input
      type={showPassword ? 'text' : 'password'}
      placeholder="Password"
      {...password}
      InputRightElement={
        <Icon
          name={showPassword ? 'visibility' : 'visibility-off'}
          size={20}
          color="muted.400"
          onPress={() => setShowPassword(v => !v)}
          style={{marginEnd: 10}}
        />
      }
    />
  );
}
