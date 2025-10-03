import { Stack, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import { getProduct } from "@/utils/api";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "@/utils/colors";
import { useCartStore } from "@/utils/store/cart";

const Page = () => {
  const { id } = useLocalSearchParams();
  const { bottom } = useSafeAreaInsets();
  const { addProduct } = useCartStore();

  const { data: product, isFetching } = useQuery({
    queryFn: () => getProduct(Number(id)),
    queryKey: ["product", id],
  });

  const handleAddToCart = () => {
    addProduct(product!);
  };

  if (isFetching) {
    return (
      <View
        style={StyleSheet.flatten([
          styles.container,
          { alignItems: "center", justifyContent: "center", gap: 8 },
        ])}
      >
        <ActivityIndicator />
        <Text>Getting detail product...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: product.title,
        }}
      />
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: product.image }}
            contentFit="contain"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>$ {product.price}</Text>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rate}>⭐ {product.rating.rate}</Text>
            <Text style={styles.count}>{product.rating.count}</Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={StyleSheet.flatten([
          styles.addToCartBtn,
          { paddingBottom: Platform.OS === "ios" ? bottom : 0 },
        ])}
        onPress={handleAddToCart}
      >
        <Ionicons name="cart" size={20} color="white" />
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    backgroundColor: "#f9f9f9",
    paddingVertical: 16,
  },
  image: {
    width: "100%",
    height: 300,
  },
  content: {
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: "#007aff",
  },
  category: {
    fontSize: 16,
    color: "#666",
    textTransform: "capitalize",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rate: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffb800",
  },
  count: {
    fontSize: 14,
    color: "#666",
  },
  addToCartBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    gap: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
