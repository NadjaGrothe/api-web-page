import { Button, Empty, Space, Typography } from 'antd';

import RecipeGrid from './RecipeGrid';
import { TGetRecipesPayload } from '../types/apiPayload';

const { Title } = Typography;

type RecipeResultsContainerProps = {
  recipes: TGetRecipesPayload['hits'] | undefined;
  totalResults: number;
  displayResults: {
    from: number;
    to: number;
  };
  prevPageButtonDisabled: boolean;
  nextPageButtonDisabled: boolean;
  handleNextPage: () => void;
  handlePrevPage: () => void;
};

const RecipeResultsContainer = ({
  recipes,
  totalResults,
  displayResults,
  prevPageButtonDisabled,
  nextPageButtonDisabled,
  handleNextPage,
  handlePrevPage,
}: RecipeResultsContainerProps) => {
  return recipes ? (
    <>
      <Title level={4}>
        {totalResults} results found ({displayResults.from}-{displayResults.to})
      </Title>
      <RecipeGrid recipes={recipes} />
      <Space>
        <Button type="primary" disabled={prevPageButtonDisabled} onClick={handlePrevPage}>
          Previous Page
        </Button>
        <Button type="primary" disabled={nextPageButtonDisabled} onClick={handleNextPage}>
          Next Page
        </Button>
      </Space>
    </>
  ) : (
    <Empty description="No results found" />
  );
};

export default RecipeResultsContainer;
