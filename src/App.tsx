import './App.css';

import { useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom/";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Navigation from './Component/Navigation';
// import About from "./Endpoint/About"
// import Videos from "./Endpoint/Videos"
import Home from "./Home"
// import Test from "./Endpoint/Test"


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
            path="*"
            element={<Navigate to="/home" replace />}
          />
          {/* <Route
						path="about"
						element={<About setHeaderMessage={setHeaderMessage} />}
					/>
					<Route
						path="videos"
						element={<Videos setHeaderMessage={setHeaderMessage} />}
					/> */}
          {/* <Route path="/test" element={<Test>} /> */}
        </Routes>
      </>
    </ApolloProvider>
  )
}

export default App;
