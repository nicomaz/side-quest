import { View, Text } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../userContext";
import {auth} from "../firebaseConfig.js"

const Header = (props) => {
  const user = auth.currentUser;
  return (
    <View>
      <Text>{props.name}</Text>
      <Text>Hello {user.displayName}</Text>
    </View>
  );
};

export default Header;
