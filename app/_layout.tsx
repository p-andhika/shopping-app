import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // cache for 1 min
    },
  },
});

export default function RootLayout() {
  useReactQueryDevTools(queryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Galactic Products",
            headerShadowVisible: false,
            headerSearchBarOptions: {
              placeholder: "Search product...",
              hideWhenScrolling: false,
              hideNavigationBar: false,
            },
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
