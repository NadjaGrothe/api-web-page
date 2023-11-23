import { TGetRecipesPayload } from '../types/apiPayload';
import axios from 'axios';
import { useState } from 'react';

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

// ! urls are not being stored in session storage as they would expose api credentials

const useRecipes = () => {
  const [displayResults, setDisplayResults] = useState(() => {
    const displayResultsFromSessionStorage = window.sessionStorage.getItem('displayResults');
    if (displayResultsFromSessionStorage) {
      return JSON.parse(displayResultsFromSessionStorage);
    }
    return { from: 0, to: 0 };
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState<string | undefined>();
  const [prevPagesUrls, setPrevPagesUrls] = useState<string[]>([]);
  const [query, setQuery] = useState(window.sessionStorage.getItem('query') || '');
  const [recipes, setRecipes] = useState<TGetRecipesPayload['hits'] | undefined>(() => {
    const recipesFromSessionStorage = window.sessionStorage.getItem('recipes');
    if (recipesFromSessionStorage) {
      return JSON.parse(recipesFromSessionStorage);
    }
    return undefined;
  });
  const [totalResults, setTotalResults] = useState(() => {
    const totalResultsFromSessionStorage = window.sessionStorage.getItem('totalResults');
    if (totalResultsFromSessionStorage) {
      return JSON.parse(totalResultsFromSessionStorage);
    }
    return 0;
  });

  const getRecipes = async (url: string) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setRecipes(response.data.hits);
      window.sessionStorage.setItem('recipes', JSON.stringify(response.data.hits));
      setNextPageUrl(response.data._links?.next.href);
      setTotalResults(response.data.count);
      window.sessionStorage.setItem('totalResults', response.data.count.toString());
      setDisplayResults({ from: response.data.from, to: response.data.to });
      window.sessionStorage.setItem(
        'displayResults',
        JSON.stringify({ from: response.data.from, to: response.data.to }),
      );
      setLoading(false);
    } catch (error) {
      // TODO: improve error handling
      setError(true);
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    setNextPageUrl(undefined);
    setPrevPagesUrls([]);
    getRecipes(`${INITIAL_URL}&q=${value}`);
    window.sessionStorage.setItem('query', value);
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
    query,
  };
};

export default useRecipes;
