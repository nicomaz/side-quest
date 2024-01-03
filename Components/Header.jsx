import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { UserContext } from '../userContext'

const Header = (props) => {
  const { username } = useContext(UserContext);
  return (
    <View>
      <Text>{props.name}</Text>
      <Text>Hello {username}</Text>
    </View>
  )
}

export default Header