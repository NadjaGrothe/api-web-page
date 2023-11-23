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
  ];

  return (
    <div style={{ width: 300 }}>
      {/* //TODO: remove badge if no dietLabels exist */}
      <Badge.Ribbon text={recipe.dietLabels.join(' & ')}>
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
