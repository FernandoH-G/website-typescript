import { useCallback, useState } from "react"

// Internal
import Navigation from './Component/Navigation';
import Videos from "./Videos"
import About from "./About"
import Home from "./Home"
import './App.css';
// import Test from "./Endpoint/Test"

// External Imports
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Routes, Route, Navigate } from "react-router-dom/";
import { setContext } from '@apollo/client/link/context';
import { HashRouter } from 'react-router-dom';

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = process.env.REACT_APP_GH_API_KEY;
  // Return the headers to the context so httpLink can read them.
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

// Augment the palette to include an ochre color
declare module '@mui/material/styles' {
  interface Palette {
    flair: Palette['primary'];
  }

  interface PaletteOptions {
    flair?: PaletteOptions['primary'];
  }
}

// Update the component's color options to include a flair option.
declare module '@mui/material/ToggleButtonGroup' {
  interface ToggleButtonGroupPropsColorOverrides {
    flair: true;
  }
}

const theme = createTheme({
  palette: {
    flair: {
      main: '#00eeff',
      // light: '#',
      // dark: '#',
      // contrastText: '#',
    },
  },
});


function App() {
  const [headerMessage, setHeaderMessage] = useState({
    title: "",
    subtitle: ""
  })

  const handleSettingHeaderMessage = useCallback((
    title: string,
    subtitle: string
  ) => {
    setHeaderMessage({ title: title, subtitle: subtitle })
  }, [])

  return (
    <HashRouter>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Navigation
            headerMessage={headerMessage}
          />
          <Routes>
            <Route
              path="/home"
              element={
                <Home
                  handleSettingHeaderMessage={handleSettingHeaderMessage}
                />
              }
            />
            <Route
              path="about"
              element={
                <About
                  handleSettingHeaderMessage={handleSettingHeaderMessage}
                />
              }
            />
            <Route
              path="videos"
              element={
                <Videos
                  handleSettingHeaderMessage={handleSettingHeaderMessage}
                />
              }
            />
            <Route
              path="*"
              element={<Navigate to="/home" replace />}
            />
          </Routes>
        </ThemeProvider >
      </ApolloProvider>
    </HashRouter>
  )
}

export default App;
