import { Alert, ConfigProvider, Spin } from 'antd';

import RecipeResultsContainer from './components/RecipeResultsContainer';
import SearchBar from './components/SearchBar';
import useRecipes from './hooks/useRecipes';

function App() {
  const {
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
  } = useRecipes();

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
      <SearchBar onSearch={handleSearch} query={query} />
      {/* // TODO: create Loading Skeleton based on the cards */}
      {loading && <Spin />}
      {error && (
        <Alert
          message="Error"
          description="An error occurred. Please try again later"
          type="error"
        />
      )}
      <RecipeResultsContainer
        recipes={recipes}
        totalResults={totalResults}
        displayResults={displayResults}
        prevPageButtonDisabled={prevPagesUrls.length <= 1}
        nextPageButtonDisabled={!nextPageUrl}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
      />
    </ConfigProvider>
  );
}

export default App;
