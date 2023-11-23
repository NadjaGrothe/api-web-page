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
  // images: TImages;
  ingredientLines: string[];
  label: string;
  mealType: string[];
  totalTime: number;
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

// TODO: remove once confirmed not needed
// type TImageSize<S extends number> = {
//   height: S;
//   url: string;
//   width: S;
// };

// type TImageSizes = 'THUMBNAIL' | 'SMALL' | 'REGULAR' | 'LARGE';

// type TImages = {
//   [K in TImageSizes]?: K extends 'LARGE'
//     ? TImageSize<600>
//     : K extends 'REGULAR'
//     ? TImageSize<300>
//     : K extends 'SMALL'
//     ? TImageSize<200>
//     : TImageSize<100>;
// };
