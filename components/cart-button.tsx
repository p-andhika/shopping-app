import { useCartStore } from "@/utils/store/cart";
import { View, Text } from "react-native";

const CartButton = () => {
  const { count } = useCartStore();

  return (
    <View>
      <Text>{count}</Text>
    </View>
  );
};

export default CartButton;
