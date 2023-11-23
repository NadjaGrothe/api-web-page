import { useEffect, useState } from 'react';

import { TGetRecipesPayload } from '../types/apiPayload';
import axios from 'axios';
import useSessionStorage from './useSessionStorage';

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
  const [displayResults, setDisplayResults] = useState({ from: 0, to: 0 });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState<string | undefined>();
  const [prevPagesUrls, setPrevPagesUrls] = useState<string[]>([]);
  const [query, setQuery] = useState(window.sessionStorage.getItem('query') || '');
  const [recipes, setRecipes] = useState<TGetRecipesPayload['hits'] | undefined>();
  const [totalResults, setTotalResults] = useState(0);

  useSessionStorage<{ from: number; to: number }>('displayResults', setDisplayResults);
  useSessionStorage<TGetRecipesPayload['hits'] | undefined>('recipes', setRecipes);
  useSessionStorage<number>('totalResults', setTotalResults);

  const getRecipes = async (url: string) => {
    setLoading(true);
    setError(false);
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [recipes]);

  const handleSearch = (value: string) => {
    setQuery(value);
    window.sessionStorage.setItem('query', value);

    setNextPageUrl(undefined);
    setPrevPagesUrls([]);
    getRecipes(`${INITIAL_URL}&q=${value}`);
  };

  const handleNextPage = () => {
    if (!nextPageUrl) return;
    // * The API does not return values for previous pages, so we need to store the urls manually. This is not ideal, but it works.

    if (prevPagesUrls.length === 0) {
      // If the previous pages array is empty, it means we are on the first page, so we need to store the initial url and the next page url
      setPrevPagesUrls([`${INITIAL_URL}&q=${query}`, nextPageUrl]);
    } else {
      // If the previous pages array is not empty, it means we are on a page after the first one, so we need to store only the next page url
      setPrevPagesUrls([...prevPagesUrls, nextPageUrl]);
    }
    getRecipes(nextPageUrl);
  };

  const handlePrevPage = () => {
    if (!prevPagesUrls) return;
    // The last url in the array is the current page, so we need to get the previous one (i.e. length -2)
    getRecipes(prevPagesUrls[prevPagesUrls.length - 2]);
    // Remove the last url from the array
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
