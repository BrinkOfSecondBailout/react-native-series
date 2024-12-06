import { Text, View , Appearance, Platform, FlatList, ScrollView, StyleSheet , TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Inter_500Medium, useFonts } from '@expo-google-fonts/inter';
import Octicons from '@expo/vector-icons/Octicons'
import { useState, useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext"
import {data} from '@/data/todos';

export default function Index() {
  const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));
  const [text, setText] = useState('');
  const {colorScheme, setColorScheme, theme} = useContext(ThemeContext);

  const [loaded, error] = useFonts({
    Inter_500Medium,
  })

  if (!loaded && !error) {
    return null;
  }

  const styles = createStyles(theme, colorScheme);

  const addTodo = () => {
    if (text.trim()) {
      const newId =  todos.length > 0 ? todos[1].id + 1 : 1
      setTodos([{ id: newId, title: text, completed: false}, ...todos])
      setText('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? {...todo, completed: !todo.completed}
      : todo
    ))
  }

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => 
      todo.id !== id))
  }

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text 
        style={[styles.todoText, item.completed && styles.completedText]} 
        onPress={() => toggleTodo(item.id)}
      >
          {item.title}
      </Text>
      <Pressable onPress={() => removeTodo(item.id)}>
        <MaterialCommunityIcons name="delete-circle" size={36} color="red" selectable={undefined} />
      </Pressable>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input}
          placeholder="Add a new todo"
          placeholderTextColor="gray"
          value={text}
          onChangeText={setText}
        />
        <Pressable
          onPress={addTodo} style={styles.addButton}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
        <Pressable
          onPress={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
          style={{ marginLeft: 10}}>
            {colorScheme === 'dark'
              ? <Octicons name="moon" size={36} color={theme.text} selectable={undefined} style={{width: 36}} />
              : <Octicons name="sun" size={36} color={theme.text} selectable={undefined} style={{width: 36}} />
            }
        </Pressable>
      </View>

      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={todo => todo.id}
        contentContainerStyle={{ flexGrow: 1}}
      />

    </SafeAreaView>
  )
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      padding: 10,
      width: '100%',
      maxWidth: 1024,
      marginHorizontal: 'auto',
      pointerEvents: 'auto',
    },
    input: {
      flex: 1,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      fontSize: 18,
      fontFamily: 'Inter_500Medium',
      minWidth: 0,
      color: theme.text,
    },
    addButton: {
      backgroundColor: theme.button,
      borderRadius: 5,
      padding: 10,
    },
    addButtonText: {
      fontSize: 18,
      color: colorScheme === 'dark' ? 'black' : 'white',
    },
    todoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 4,
      padding: 10,
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      width: '100%',
      maxWidth: 1024,
      marginHorizontal: 'auto',
      pointerEvents: 'auto',
    },
    todoText: {
      flex: 1,
      fontSize: 18,
      fontFamily: 'Inter_500Medium',
      color: theme.text,
    },
    completedText: {
      textDecorationLine: 'line-through',
      color: 'gray',
    }
  })
}




  // const colorScheme = Appearance.getColorScheme();

  // const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  // const styles = createStyles(theme, colorScheme);

  // const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView;

  // const separatorComp = <View style={styles.separator} />

  // const footerComp = <Text style={{ color: theme.text }}>End of Menu</Text>

  // return (
  //   <Container>
  //     <FlatList 
  //     data={todos}
  //     keyExtractors={(todo) => todo.id.toString()}
  //     showsVerticalScrollIndicator={true}
  //     contentContainerStyle={styles.contentContainer}
  //     ItemSeparatorComponent={separatorComp}
  //     ListFooterComponent={footerComp}
  //     ListFooterComponentStyle={styles.footerComp}
  //     ListEmptyComponent={<Text>No todo items available</Text>}
  //     renderItem={({ item }) => (
  //       <View style={styles.row}>
  //         <View style={styles.todoTextRow}>
  //           <Text style={[styles.todoItemTitle, styles.todoItemText]}>{item.title}</Text>
  //           <Text style={styles.todoItemText}>{item.completed}</Text>
  //         </View>
  //       </View>
  //     )
  //     }
  //     />
  //   </Container>
  // );

