import {gql} from '@apollo/client';

export const getProducts = (category) => { return gql`
  query {
    category(input: {title:"${category}"}){
        products{
          id,
          name,
          inStock,
          gallery,
          attributes{
              id,
              name,
              type,
              items{
                displayValue,
                value,
                id
              }
          },
          prices{
              currency{
                  label,
                  symbol
              },
              amount
          },
          brand
        }
    }
  }
`};

export const getProduct = (productId) => { return gql`
  {
    product(id:"${productId}"){
      id,
      name,
      inStock,
      gallery,
      description,
      category,
      attributes{
        id,
        name,
        type,
        items{
          displayValue,
          value,
          id
        }
      },
      prices{
        currency{
          symbol
        },
        amount
      },
      brand
    }
  }
`};

export const getCategories = gql`
  query {
    categories{
      name
    },
  }
`;

export const getCurrencies = gql`
  query {
    currencies{
      label,
      symbol
    },
  }
`;