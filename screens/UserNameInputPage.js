import { View, TextInput, Button} from 'react-native'
import React, { useState } from 'react'
import {db} from '../firebaseConfig'
import {useNavigation} from '@react-navigation/native'

const UserNameInputPage = ({route}) => {
    const [username, setUsername] = useState('')
    const navigation = useNavigation()

    const saveUsername = () => {
        const { mobileNumber } = route.params

        db.firestore.collection('usernames').doc(mobileNumber).set({
            username: username,
            mobileNumber: mobileNumber,
        })
        .then(() => {
            //navigate to home page
        })
        .catch(error => {
        })
    }

return (
    <View>
        <TextInput
        placeholder="please enter your username"
        value={username}
        onChangeText={text => setUsername(text)}
        />
        <Button title='save username and continue' onPress={saveUsername}/>
    </View>
)
}



export default UserNameInputPage