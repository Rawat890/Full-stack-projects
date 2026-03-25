import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Screen from "../components/Screen";
import { useNoteList } from '../queries/notesQuery';
import COLORS from '../utils/colors';


type Note = {
  id: number;
  title: string;
  content: string;
  date: string;
};

export default function Notes() {
  const router = useRouter();
  const { data: notes, error, isPending } = useNoteList();

  if (isPending) {
    return (
      <Screen style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color={'#A9A9A9'} />
        <Text>Loading data....</Text>
      </Screen>
    )
  }
  const renderNote = ({ item }: { item: Note }) => {
    return (
      <View style={styles.noteView}>
        <View style={styles.noteInnerView}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text>{item.content}</Text>
          <Text style={{ fontSize: 12, color: 'gray' }}>{item.date}</Text>
        </View>
        <MaterialIcons name="delete-sweep" size={36} color={COLORS.danger} />
      </View>
    );
  };

  const navigateToAddNotes = () => {
    console.log("Button pressed")
    router.push('/screens/addNotes')
  }

  return (
    <Screen style={{ marginHorizontal: 10, }}>
      <View style={styles.header}>
        <Text style={styles.noteText}>Notes Screen</Text>
        <Pressable onPress={navigateToAddNotes}>
          <Image
            source={require('../../assets/appImages/plus.png')}
            style={styles.addButton}
          />
        </Pressable>
      </View>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderNote}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  noteView: {
    padding: scale(12),
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: scale(10),
    marginVertical: scale(5),
    height: scale(100),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  noteInnerView: {},
  itemTitle: {
    fontWeight: 'bold',
    fontSize: scale(16)
  },
  noteText: {
    fontWeight: 'bold',
    fontSize: scale(26),
  },
  addButton: {
    width: scale(35),
    height: scale(35),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: scale(15),
    marginHorizontal: scale(5)
  }
})