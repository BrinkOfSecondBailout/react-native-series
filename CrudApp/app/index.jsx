import { Text, View , Appearance, Platform, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {data} from '@/data/todos';

export default function Index() {
  const colorScheme = Appearance.getColorScheme();

  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const styles = createStyles(theme, colorScheme);

  const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView;

  const separatorComp = <View style={styles.separator} />

  const footerComp = <Text style={{ color: theme.text }}>End of Menu</Text>

  return (
    <Container>
      <FlatList 
      data={data}
      keyExtractors={(todo) => todo.id.toString()}
      showsVerticalScrollIndicator={true}
      contentContainerStyle={}
      ItemSeparatorComponent={}
      ListFooterComponent={}
      ListFooterComponentStyle={}
      ListEmptyComponent={}
      renderItem={({ item }) => (

      )
      }
      />
    </Container>
  );
}
