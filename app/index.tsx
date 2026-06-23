import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  webview: {
    flex: 1,
  },
});

export default function Index() {
  const VERCEL_URL = "https://web-app-3d-model-integration-demo.vercel.app/";

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <WebView
          source={{ uri: VERCEL_URL }}
          style={styles.webview}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
