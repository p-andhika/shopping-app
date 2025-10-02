import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getCategories, getProducts, Product } from "@/utils/api";
import { FlashList } from "@shopify/flash-list";
import { useCallback, useMemo, useState } from "react";
import ProductCard from "@/components/product-card";
import { COLORS } from "@/utils/colors";
import { Stack } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import { ProductGridShimmer } from "@/components/product-list-shimmer";

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const headerHeight = useHeaderHeight();

  const {
    data: products,
    refetch: refetchProduct,
    isRefetching,
    isFetching,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const allCategories = ["all", ...categories];
  const filteredProduct = useMemo(() => {
    return products?.filter((product) => {
      if (selectedCategory !== "all") {
        return product.category === selectedCategory;
      }

      return product.title
        .toLocaleLowerCase()
        .includes(searchQuery.toLocaleLowerCase());
    });
  }, [products, searchQuery, selectedCategory]);

  const renderProducts = useCallback(({ item }: { item: Product }) => {
    return <ProductCard product={item} />;
  }, []);

  return (
    <View
      style={StyleSheet.flatten([
        styles.container,
        { marginTop: Platform.select({ ios: headerHeight, android: 0 }) },
      ])}
    >
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            onChangeText: (e) => setSearchQuery(e.nativeEvent.text),
          },
        }}
      />

      <View style={styles.categoryContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScrollView}
        >
          {allCategories.map((category, index) => (
            <Pressable
              key={category}
              style={StyleSheet.flatten([
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory,
              ])}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={StyleSheet.flatten([
                  styles.categoryButtonText,
                  selectedCategory === category && styles.selectedCategoryText,
                ])}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <ProductGridShimmer />

      {/* {isFetching ? ( */}
      {/*   <ProductGridShimmer /> */}
      {/* ) : ( */}
      {/*   <FlashList */}
      {/*     data={filteredProduct} */}
      {/*     renderItem={renderProducts} */}
      {/*     contentContainerStyle={{ padding: 8 }} */}
      {/*     numColumns={2} */}
      {/*     keyExtractor={(item) => item.id.toString()} */}
      {/*     onRefresh={refetchProduct} */}
      {/*     refreshing={isRefetching} */}
      {/*   /> */}
      {/* )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  categoryContainer: {
    height: 60,
    zIndex: 1,
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
  },
  categoryScrollView: {
    paddingHorizontal: 10,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 4,
    alignSelf: "center",
  },
  categoryButtonText: {
    fontSize: 14,
    color: "#666",
  },
  selectedCategory: {
    backgroundColor: COLORS.primary,
  },
  selectedCategoryText: {
    color: "#fff",
  },
});
