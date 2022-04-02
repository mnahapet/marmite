import { getContentfulClient } from '../../utils/helpers';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const RecipeDetails = ({ recipe }) => {
  const { featuredImage, title, cookingTime, ingredients, method } = recipe.fields;
  return (
    <div className="banner">
      <Image
        src={`http:${featuredImage.fields.file.url}`}
        width={featuredImage.fields.file.details.image.width}
        height={featuredImage.fields.file.details.image.height}
      />
      <h2>{title}</h2>
      <div className="info">
        <p>Takes about {cookingTime} min</p>

        <h3>Ingredients: </h3>
        <ul>
          {ingredients.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
      </div>
      <div className="method">
        <h3>Method</h3>
        <div>{documentToReactComponents(method)}</div>
      </div>
      <style jsx>{`
        h2,
        h3 {
          text-transform: uppercase;
        }
        .banner h2 {
          margin: 0;
          background: #fff;
          display: inline-block;
          padding: 20px;
          position: relative;
          top: -60px;
          left: -10px;
          transform: rotateZ(-1deg);
          box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
        }
        .info p {
          margin: 0;
        }
        .info span::after {
          content: ', ';
        }
        .info span:last-child::after {
          content: '.';
        }
      `}</style>
    </div>
  );
};

export default RecipeDetails;

export const getStaticPaths = async () => {
  const client = getContentfulClient();
  const res = await client.getEntries({ content_type: 'recipe' });

  const paths = res.items.map(item => ({ params: { slug: item.fields.slug } }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async ({ params }) => {
  const client = getContentfulClient();

  const { items } = await client.getEntries({ content_type: 'recipe', 'fields.slug': params.slug });

  return {
    props: { recipe: items[0] },
    revalidate: 10
  };
};
