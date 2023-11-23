import { Alert, Button, ConfigProvider, Empty, Space, Spin, Typography } from 'antd';

import RecipeGrid from './components/RecipeGrid';
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
      {/* //TODO: add no results warning */}
      {recipes ? (
        <>
          <Typography.Title level={4}>
            {totalResults} results found ({displayResults.from}-{displayResults.to})
          </Typography.Title>
          <RecipeGrid recipes={recipes} />
          <Space>
            <Button type="primary" disabled={prevPagesUrls.length <= 1} onClick={handlePrevPage}>
              Previous Page
            </Button>
            <Button type="primary" disabled={!nextPageUrl} onClick={handleNextPage}>
              Next Page
            </Button>
          </Space>
        </>
      ) : (
        <Empty description="No results found" />
      )}
    </ConfigProvider>
  );
}

export default App;
