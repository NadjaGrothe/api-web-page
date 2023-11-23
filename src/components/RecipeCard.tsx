import { Badge, Card, Descriptions, DescriptionsProps, Divider } from 'antd';

import { TRecipe } from '../types/apiPayload';
import { capitalize } from '../utils/format';

const { Meta } = Card;

const RecipeCard = ({ recipe }: { recipe: TRecipe }) => {
  const descriptionItems: DescriptionsProps['items'] = [
    {
      key: 'calories',
      label: 'Calories',
      children: recipe.calories.toFixed(),
    },
    {
      key: 'totalTime',
      label: 'Total Time',
      children: `${recipe.totalTime} min`,
    },
    {
      key: 'yield',
      label: 'Yield',
      children: recipe.yield,
    },
    {
      key: 'cuisineType',
      label: 'Cuisine',
      children: recipe.cuisineType.map(cousine => capitalize(cousine)).join(', ') || 'N/A',
    },
    {
      key: 'dishType',
      label: 'Dish Type',
      children: recipe.dishType.map(dish => capitalize(dish)).join(', ') || 'N/A',
    },
    {
      key: 'mealType',
      label: 'Meal Type',
      children: recipe.mealType.map(meal => capitalize(meal)).join(', ') || 'N/A',
    },
  ];

  return (
    // TODO: control width via Grid component
    <div style={{ width: 300 }}>
      <Badge.Ribbon text={recipe.dietLabels}>
        <Card
          cover={
            <img
              alt={recipe.label}
              src={recipe.image}
              height={200}
              style={{ objectFit: 'cover' }}
            />
          }
        >
          <Meta title={recipe.label} />
          <Divider />
          <Descriptions
            items={descriptionItems}
            layout="horizontal"
            bordered
            column={1}
            size="small"
          />
        </Card>
      </Badge.Ribbon>
    </div>
  );
};

export default RecipeCard;
