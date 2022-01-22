/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react"
import Stack from "./src/routes/Stack"
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from "react-redux"
import { NavigationContainer } from "@react-navigation/native";
import Store from "./src/Redux/store"
import theme from "./src/Components/theme";
import { navigationRef } from "./src/Components/Navigation";

const paperTheme = {
  ...DefaultTheme,
  ...theme,
  colors: {
    ...DefaultTheme.colors,
    ...theme.colors
  }
}
function App() {
  return (
    <ReduxProvider store={Store}>
      <NavigationContainer ref={navigationRef}>
        <PaperProvider theme={paperTheme}>
          <Stack />
        </PaperProvider>
      </NavigationContainer>
    </ReduxProvider>
  )
}
export default App;
