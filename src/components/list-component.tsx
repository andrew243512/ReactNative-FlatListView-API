import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useState, type PropsWithChildren } from "react";

type ListProps = PropsWithChildren<{
  data: any;
  navigation: any
}>;

export default function ListComponent({ data, navigation }: ListProps) {
  let [item, setItem] = useState(data);
  return (
    <View style={styles.containerCard}>
      <TouchableOpacity onPress={() => navigation.push('Details', {key: item?.key})}>
        <Image source={{uri: item?.media[0]}} style={styles.img}></Image>
        <Text style={styles.title}>{item?.title}</Text>
        <View style={styles?.grid}>
          <Text>Price $: {item?.price}</Text>
          <Text>Cause: {item?.cause?.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title:{
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  grid:{
    flexDirection: 'row',
    flexWrap: 'nowrap',
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingTop: 10,
  },
  containerCard: {
    display: 'flex',
    minHeight: 'auto',
    borderColor: "black",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#fff",
    paddingBottom: 10,
    margin: 5,
  },
  img: {
    width: "100%",
    height: 150,
  },
});
