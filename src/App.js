import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Weather from "./page/weather";
const queryClient = new QueryClient();

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Weather />
    </QueryClientProvider>
  );
}
export default App;
