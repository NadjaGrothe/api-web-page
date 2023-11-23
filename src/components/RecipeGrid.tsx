import { List } from 'antd';
import RecipeCard from './RecipeCard';
import { TGetRecipesPayload } from '../types/apiPayload';

const RecipeGrid = ({ recipes }: { recipes: TGetRecipesPayload['hits'] }) => {
  return (
    <List
      grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 4 }}
      dataSource={recipes}
      renderItem={RecipeCard}
      style={{ margin: '20px 8px' }}
    />
  );
};

export default RecipeGrid;
