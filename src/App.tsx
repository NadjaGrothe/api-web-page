import { useEffect, useState } from 'react';

import { ConfigProvider } from 'antd';
import SearchBar from './components/SearchBar';
import axios from 'axios';

const APP_ID = import.meta.env.VITE_EDAMAM_APP_ID;
const APP_KEY = import.meta.env.VITE_EDAMAM_API_KEY;

function App() {
  const [query, setQuery] = useState('');
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

  const handleSearch = (value: string) => {
    setQuery(value);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#fa8c16',
          colorInfo: '#fa8c16',
          borderRadius: 5,
        },
      }}
    >
      <SearchBar onSearch={handleSearch} />
    </ConfigProvider>
  );
}

export default App;
