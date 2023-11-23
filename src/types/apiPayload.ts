export type TGetRecipesPayload = {
  count: number;
  from: number;
  hits: Array<{ recipe: TRecipe; _links: THitLinks }>;
  to: number;
  _links: TPayloadLinks | Record<string, never>;
};

// * Additional information about the recipe can be added by adding additional `fields` to the `getRecipes` query
export type TRecipe = {
  calories: number;
  cuisineType: string[];
  dietLabels: string[];
  dishType: string[];
  image: string;
  ingredientLines: string[];
  label: string;
  mealType: string[];
  totalTime: number;
  uri: string;
  yield: number;
};

type THitLinks = {
  self: {
    href: string;
    title: 'Self';
  };
};
type TPayloadLinks = {
  next: {
    href: string;
    title: 'Next Page';
  };
};
