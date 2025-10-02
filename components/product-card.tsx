import { Product } from "@/utils/api";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { COLOR, COLORS } from "@/utils/colors";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const router = useRouter();

  return (
    <Pressable
      style={styles.productCard}
      onPress={() => router.push(`/product/${product.id}`)}
    >
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.productPrice}>${product.price}</Text>
      </View>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productCard: {
    flex: 1,
    margin: 8,
    padding: 12,
    gap: 8,
    borderRadius: 16,
    backgroundColor: "#fff",
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 12,
  },
  productInfo: {
    gap: 4,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primary,
  },
});
