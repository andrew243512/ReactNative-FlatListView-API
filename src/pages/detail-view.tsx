import { View, StyleSheet, Text, Button, Image } from "react-native";
import { PropsWithChildren, useEffect, useState } from "react";
import { fetchDetailData } from "../utils/fetch-data";

type DetailViewProps = PropsWithChildren<{
  route: any;
  navigation: any;
}>;
export default function DetailView({ route, navigation }: DetailViewProps) {
  const { key } = route.params;
  let [item, setItem] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDetailData(key);
      setItem(data);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <View style={styles.containerCard}>
      {item.media && item.media[0] && <Image source={item?.media[0]} style={styles.img}></Image>}
      <Text style={styles.title}>{item?.title}</Text>
      <View style={styles.grid}>
        <Text>Price $: {item?.price}</Text>
        <Text>Cause: {item?.cause?.name}</Text>
      </View>
      <Text style={styles.description}>{item?.description}</Text>
      <View style={styles.gridAvatar}>
        <Image source={item?.user?.avatar} style={styles.imgAvatar}></Image>
        <Text>{item?.user?.name}</Text>
      </View>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  description:{
    fontSize: 15,
    textAlign: "justify",
    fontWeight: "normal",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    paddingBottom: 10,
    paddingTop: 10,
  },
  gridAvatar:{
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingBottom: 10,
    paddingTop: 10,
    alignItems: "center"
  },
  containerCard: {
    display: "flex",
    minHeight: "auto",
    borderColor: "black",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 10,
    margin: 5,
  },
  img: {
    width: "100%",
    height: 150,
  },
  imgAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
});
