import { Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getCategories, getProducts } from "@/utils/api";

export default function Index() {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  console.log({ products, categories });

  const allCategories = ["all", ...categories];

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>TEXT.</Text>
    </View>
  );
}
