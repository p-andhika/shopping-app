import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet, View } from "react-native";

const Placeholder = createShimmerPlaceholder(LinearGradient);

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.43;

const ProductShimmer = () => {
  return (
    <View style={styles.card}>
      <Placeholder
        style={styles.image}
        shimmerColors={["#ebebeb", "#c5c5c5", "#ebebeb"]}
      />

      <View style={styles.contentContainer}>
        <Placeholder
          style={styles.title}
          shimmerColors={["#ebebeb", "#ddd", "#ebebeb"]}
        />
      </View>

      <View style={styles.ratingContainer}>
        <Placeholder
          style={styles.rating}
          shimmerColors={["#ebebeb", "#ddd", "#ebebeb"]}
        />
      </View>
    </View>
  );
};

export const ProductGridShimmer = () => {
  return (
    <View style={styles.container}>
      {[...Array(6)].map((_, key) => {
        return <ProductShimmer key={key} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 8,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: "100%",
    height: CARD_WIDTH,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  contentContainer: {
    padding: 12,
    gap: 8,
  },
  title: {
    height: 20,
    width: "85%",
    borderRadius: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    height: 16,
    width: "30%",
    borderRadius: 4,
  },
});
