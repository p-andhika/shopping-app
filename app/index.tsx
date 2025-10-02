import { StyleSheet, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getCategories, getProducts, Product } from "@/utils/api";
import { FlashList } from "@shopify/flash-list";
import { useCallback } from "react";
import ProductCard from "@/components/product-card";

export default function Index() {
  const {
    data: products,
    refetch: refetchProduct,
    isRefetching,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const allCategories = ["all", ...categories];

  const renderProducts = useCallback(({ item }: { item: Product }) => {
    return <ProductCard product={item} />;
  }, []);

  return (
    <View style={styles.container}>
      <FlashList
        data={products}
        renderItem={renderProducts}
        contentContainerStyle={{ padding: 8 }}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={refetchProduct}
        refreshing={isRefetching}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
