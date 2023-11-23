import { useEffect, useState } from 'react';

import axios from 'axios';

const APP_ID = import.meta.env.VITE_EDAMAM_APP_ID;
const APP_KEY = import.meta.env.VITE_EDAMAM_API_KEY;

function App() {
  // TODO: set up search bar
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [query, setQuery] = useState('chicken');
  const [data, setData] = useState(); // TODO type

  useEffect(() => {
    axios
      .get(
        `https://api.edamam.com/api/recipes/v2?type=any&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`,
      )
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        // TODO add error handling
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, [query]);

  // TODO remove
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log({ data });
  }, [data]);

  return <h1>Hello World!</h1>;
}

export default App;
