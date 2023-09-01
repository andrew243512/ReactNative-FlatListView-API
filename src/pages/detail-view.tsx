import {
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  ScrollView,
  Animated,
  Easing,
  PanResponder,
  Dimensions,
} from "react-native";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { fetchDetailData } from "../utils/fetch-data";

type DetailViewProps = PropsWithChildren<{
  route: any;
  navigation: any;
}>;
export default function DetailView({ route, navigation }: DetailViewProps) {
  const { key } = route.params;
  let [item, setItem] = useState<any>({});
  let [itemMediaLength, setItemMediaLength] = useState<number>(2);
  let [indexCarrousel, setIndexCarrousel] = useState<number>(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  let valuePosX = useRef(new Animated.Value(0)).current;
  let sign = useRef<number>(0).current;

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDetailData(key);
      setItem(data);
      setItemMediaLength(data.media.length ?? 0);
      fadeIn();
    };
    fetchData().catch(console.error);
  }, []);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const scrollCarrousel = (flexDirection: number = 1) => {
    Animated.timing(valuePosX, {
      toValue: flexDirection * 100,
      duration: 1000,
      easing: Easing.cubic,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        scrollCarrousel(flexDirection * -1);
      }
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        sign = Math.sign(gestureState.dx);
        Animated.spring(valuePosX, {
          toValue: gestureState.dx,
          speed: 1300,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished) {
          }
        });
      },
      onPanResponderRelease: (evt, gestureState) => {
        const width = Dimensions.get("window").width; // --->440
        if (Math.abs(gestureState.dx) > width * 0.2) {
          setIndexCarrousel(
            sign === 1
              ? indexCarrousel < itemMediaLength // Calculate item.media length
                ? ++indexCarrousel
                : indexCarrousel
              : indexCarrousel > 0
              ? --indexCarrousel
              : 0
          );
        }
        valuePosX.setValue(0);
      },
    })
  ).current;

  return (
    <ScrollView style={styles.containerCard}>
      {item.media && item.media[indexCarrousel] && (
        <Animated.Image
          source={{ uri: item?.media[indexCarrousel] }}
          style={[
            {
              opacity: fadeAnim,
              transform: [
                {
                  translateX: valuePosX,
                },
              ],
            },
            styles.img,
          ]}
          {...panResponder.panHandlers}
        ></Animated.Image>
      )}
      {item.title && <Text style={styles.title}>{item?.title}</Text>}
      <View style={styles.grid}>
        <Text>Price $: {item?.price}</Text>
        <Text>Cause: {item?.cause?.name}</Text>
      </View>
      <Text style={styles.description}>{item?.description}</Text>
      <View style={styles.gridAvatar}>
        <Image source={{ uri:item?.user?.avatar}} style={styles.imgAvatar}></Image>
        <Text>{item?.user?.name}</Text>
      </View>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#ffdd00",
    display: "flex",
    minHeight: "auto",
    borderColor: "black",
    padding: 10,
    borderWidth: 1,
    flex: 1,
    paddingBottom: 10,
  },
  description: {
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
  gridAvatar: {
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingBottom: 10,
    paddingTop: 10,
    alignItems: "center",
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
    borderRadius: 50,
  },
});
