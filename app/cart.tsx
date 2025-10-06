import CartItem from "@/components/cart-item";
import { COLORS } from "@/utils/colors";
import { useCartStore } from "@/utils/store/cart";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import {
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Cart = () => {
  const { products, total, clearCart } = useCartStore();
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();

  const handleCheckout = () => {
    if (products.length === 0) {
      Alert.alert("Add some products to your cart first!");
      return 0;
    }
    Alert.alert("Checkout successfull");
    clearCart();
    router.dismiss();
  };

  return (
    <View style={styles.container}>
      {products.length === 0 && (
        <Text style={styles.emptyCart}>No products in cart</Text>
      )}

      <FlatList
        data={products}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
        )}
      />

      <TouchableOpacity
        style={StyleSheet.flatten([
          styles.checkoutBtn,
          { paddingBottom: Platform.OS === "ios" ? bottom : 0 },
        ])}
        onPress={handleCheckout}
      >
        <Ionicons name="checkmark" size={20} color="white" />
        <Text style={styles.checkoutText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyCart: {
    padding: 10,
    textAlign: "center",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  checkoutBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    gap: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
