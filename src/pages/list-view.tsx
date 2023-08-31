import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { fetchInitialData } from "../utils/fetch-data";
import { PropsWithChildren, useEffect, useState } from "react";
import ListComponent from "../components/list-component";

type ListViewProps = PropsWithChildren<{
  navigation: any;
}>;
export default function ListView({ navigation }: ListViewProps) {
  let [listData, setListData] = useState([]);
  let [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchInitialData(search);
      setListData(data);
    };

    fetchData().catch(console.error);
  }, [search]);

  const onChangeSearch = (text: string) => {
    setSearch(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeSearch}
          value={search}
          placeholder="Search bar"
          keyboardType="default"
        />
        <FlatList
          data={listData}
          renderItem={(value: any) => (
            <ListComponent
              key={value?.item.key}
              data={value?.item}
              navigation={navigation}
            ></ListComponent>
          )}
          keyExtractor={(item: any) => item.key}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    display: "flex",
  },
});
