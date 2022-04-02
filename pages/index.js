import { getContentfulClient } from '../utils/helpers';
import RecipeCard from '../components/RecipeCard';
import Head from '../components/Head';

export default function Recipes({ recipes }) {
  // console.log(recipes);
  return (
    <div className="recipe-list">
      <Head title="Home" />
      {recipes.map(recipe => (
        <RecipeCard key={recipe.sys.id} recipe={recipe} />
      ))}

      <style jsx>{`
        .recipe-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px 60px;
        }
      `}</style>
    </div>
  );
}

export const getStaticProps = async () => {
  const client = getContentfulClient();
  const res = await client.getEntries({ content_type: 'recipe' });

  return {
    props: { recipes: res.items },
    revalidate: 10
  };
};
