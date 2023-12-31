import { useState } from "react"

// Internal
import './App.css';
import Navigation from './Component/Navigation';
import About from "./About"
import Home from "./Home"
import Videos from "./Videos"
// import Test from "./Endpoint/Test"

// External Imports
import { Routes, Route, Navigate } from "react-router-dom/";
import { setContext } from '@apollo/client/link/context';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';

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


function App() {
  const [headerMessage, setHeaderMessage] = useState({ title: "", subtitle: "" })

  function handleSettingHeaderMessage(title: string, subtitle: string) {
    setHeaderMessage({ title: title, subtitle: subtitle })
  }

  return (
    <ApolloProvider client={client}>
      <>
        <Navigation
          headerMessage={headerMessage}
        />
        <Routes>
          <Route
            path="/home"
            element={<Home handleSettingHeaderMessage={handleSettingHeaderMessage} />}
          />
          <Route
            path="about"
            element={<About handleSettingHeaderMessage={handleSettingHeaderMessage} />}
          />
          <Route
            path="videos"
            element={<Videos handleSettingHeaderMessage={handleSettingHeaderMessage} />}
          />
          <Route
            path="*"
            element={<Navigate to="/home" replace />}
          />
          {/* <Route path="/test" element={<Test>} /> */}
        </Routes>
      </>
    </ApolloProvider>
  )
}

export default App;
