import { useEffect, useState } from 'react';

import { TGetRecipesPayload } from '../types/apiPayload';
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
const INITIAL_URL = `https://api.edamam.com/api/recipes/v2?type=any&app_id=${APP_ID}&app_key=${APP_KEY}&field=${FIELDS.join(
  '&field=',
)}`;

const useRecipes = () => {
  const [displayResults, setDisplayResults] = useState({ from: 0, to: 0 });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState<string | undefined>();
  const [prevPagesUrls, setPrevPagesUrls] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState<TGetRecipesPayload['hits'] | undefined>();
  const [totalResults, setTotalResults] = useState(0);

  const getRecipes = async (url: string) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setRecipes(response.data.hits);
      setNextPageUrl(response.data._links?.next.href);
      setTotalResults(response.data.count);
      setDisplayResults({ from: response.data.from, to: response.data.to });
      setLoading(false);
    } catch (error) {
      // TODO: improve error handling
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!query) return;
    setNextPageUrl(undefined);
    setPrevPagesUrls([]);
    getRecipes(`${INITIAL_URL}&q=${query}`);
  }, [query]);

  const handleSearch = (value: string) => {
    setQuery(value);
  };

  const handleNextPage = () => {
    // TODO: implement scroll to top
    if (!nextPageUrl) return;
    if (prevPagesUrls.length === 0) {
      setPrevPagesUrls([`${INITIAL_URL}&q=${query}`, nextPageUrl]);
    } else {
      setPrevPagesUrls([...prevPagesUrls, nextPageUrl]);
    }
    getRecipes(nextPageUrl);
  };

  const handlePrevPage = () => {
    // TODO: implement scroll to top
    if (!prevPagesUrls) return;
    getRecipes(prevPagesUrls[prevPagesUrls.length - 2]);
    setPrevPagesUrls(prevPagesUrls.slice(0, prevPagesUrls.length - 1));
  };

  return {
    displayResults,
    error,
    handleNextPage,
    handlePrevPage,
    handleSearch,
    loading,
    nextPageUrl,
    prevPagesUrls,
    recipes,
    totalResults,
  };
};

export default useRecipes;
