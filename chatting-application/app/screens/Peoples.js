import { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import ActiveUser from '../components/ActiveUser';
import { AuthContext } from '../context/AuthContext';

export default function Peoples() {
  const [users, setUsers] = useState([]);
  const { userId } = useContext(AuthContext);
  
  console.log("id - ", userId)
  useEffect(() => {
    fecthUsers();
  }, [])

  const fecthUsers = async () => {
    try {
      const response = await fetch(`http://10.206.64.208:6000/users/${userId}`);
      const data = await response.json();
      setUsers(data);
      console.log("Fetched Users - ", data)
    } catch { }
  }

  const renderUser = ({ item }) => {
    console.log("render")
    return (
      <ActiveUser item={item} />
    )
  }

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.headingText}>People using Chatting app</Text>
      </View>
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headingText: {
    textAlign: 'center',
    fontSize: scale(16)
  }
})