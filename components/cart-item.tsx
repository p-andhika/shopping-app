import { Product } from "@/utils/api";
import { COLORS } from "@/utils/colors";
import { useCartStore } from "@/utils/store/cart";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  item: Product & { quantity: number };
};

const CartItem = ({ item }: Props) => {
  const { addProduct, reduceProduct } = useCartStore();

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      addProduct(item);
    } else {
      reduceProduct(item);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.itemContainer}>
        <Text style={styles.textTitle}>{item.title}</Text>
        <Text>Price: ${item.price.toFixed(2)}</Text>
      </View>

      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => handleQuantityChange("decrement")}>
          <Ionicons name="remove" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.textQuantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => handleQuantityChange("increment")}>
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 10,
    padding: 12,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  itemContainer: {
    flex: 1,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  quantityContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  quantityBtn: {
    padding: 10,
  },
  textQuantity: {
    fontSize: 16,
    color: "#fff",
    padding: 10,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
});
