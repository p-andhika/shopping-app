import { COLORS } from "@/utils/colors";
import { useCartStore } from "@/utils/store/cart";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const CartButton = () => {
  const { count } = useCartStore();

  return (
    <Link href="/cart" asChild>
      <TouchableOpacity>
        {count > 0 && (
          <View style={styles.container}>
            <Text style={styles.text}>{count}</Text>
          </View>
        )}

        <Ionicons name="cart" size={28} />
      </TouchableOpacity>
    </Link>
  );
};

export default CartButton;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: -10,
    bottom: -5,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  text: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
});
