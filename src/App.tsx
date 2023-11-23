import { useEffect, useState } from 'react';

import { ConfigProvider } from 'antd';
import RecipeGrid from './components/RecipeGrid';
import SearchBar from './components/SearchBar';
import { TGetRecipesPayload } from './types/apiPayload';
import axios from 'axios';

const APP_ID = import.meta.env.VITE_EDAMAM_APP_ID;
const APP_KEY = import.meta.env.VITE_EDAMAM_API_KEY;
const FIELDS = [
  'calories',
  'cuisineType',
  'dietLabels',
  'image',
  'ingredientLines',
  'label',
  'totalTime',
  'yield',
];

function App() {
  const [query, setQuery] = useState('chicken');
  const [data, setData] = useState<TGetRecipesPayload | undefined>();

  useEffect(() => {
    if (!query) return;
    axios
      .get(
        `https://api.edamam.com/api/recipes/v2?type=any&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&field=${FIELDS.join(
          '&field=',
        )}`,
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
      {/* //TODO: add no results warning */}
      {data?.hits && <RecipeGrid recipes={data?.hits} />}
    </ConfigProvider>
  );
}

export default App;
