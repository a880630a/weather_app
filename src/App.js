import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Weather from "./page/weather";
import { WeatherProvider } from "./context/WeatherContext";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <WeatherProvider>
                <Weather />
            </WeatherProvider>
        </QueryClientProvider>
    );
}

export default App;
