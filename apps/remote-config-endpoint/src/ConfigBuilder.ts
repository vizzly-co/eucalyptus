/**
 * This module fakes the dynamic logic to build the data sets depending on the ID of a user.
 * In this example, we just map the user ID to a fixed list of data sets, but in your application
 * you can build these more dynamically depending on custom schemas of tables or JSONB fields in
 * your database for each user.
 */

const USER_ID_TO_DATA_SET: { [userId: string]: Object[] } = {
  "1": [
    {
      id: "das_dynamic",
      name: "A dynamic data set for user 1!",
      fields: [
        {
          id: "fie_1",
          dataType: "TEXT",
          address: ['_', 'shop_customers', 'country'],
          publicName: "Home Country",
        },
        {
          id: "fie_2 - SQL field example",
          dataType: "TEXT",
          sql: "(ProductDetails->>'brand')",
          publicName: "Product brand",
        },
      ],
      joins: [],
    },
  ],
  "2": [
    {
      id: "das_dynamic",
      name: "A dynamic data set for user 2!",
      fields: [
        {
          id: "fie_1",
          dataType: "TEXT",
          address: ['_', 'shop_customers', 'country'],
          publicName: "Home Country",
        },
        {
          id: "fie_2",
          dataType: "BIGINT",
          address: ['_', 'shop_customers', 'price'],
          publicName: "Price in $",
        },
        {
          id: "fie_3",
          dataType: "BIGINT",
          address: ['_', 'shop_customers', 'customerid'],
        },
        {
          id: "fie_3 - SQL field example",
          dataType: "TEXT",
          sql: "(ProductDetails->>'brand')",
          publicName: "Product brand",
        }
      ],
      secureFilterGuards: [
        {
          fieldId: 'fie_3',
          op: '=',
        },
      ],
    },
  ],
  default: [
    {
      id: "das_dynamic",
      name: "A default data set!",
      fields: [
        {
          id: "fie_99",
          dataType: "TEXT",
          address: ['_', 'shop_customers', 'country'],
          publicName: "Home Country",
        },
      ],
      joins: [],
    },
  ],
};

export const buildConfigForUser = (userId: string, includeCredentialsFor?: string) => {
  if (includeCredentialsFor && includeCredentialsFor === 'postgres') {
    return {
      version: 1,
      connections: {
        '_custom_dynamic_postgres_': {
          client: 'postgres',
          encryptedCredentials: '1fa53f7b6a9f9c6cd35a0136549dbe72:::dfa190cbdd353df3f7e3878bf6819e3596415747ab95718e14cd8ce3c1f3f1e4bb3cfc05c2f35b5b15f55d161bcc7fa6599f432760ac13b9314001d4fa5a0b490ce2a59af356d824136db4806a7f31c0dfe7026164e5ecfa17af68203bab7cf16d9f3d208070cecded4f17e2a5a07b5a'
        }
      },
      dataSets: (USER_ID_TO_DATA_SET[userId] || USER_ID_TO_DATA_SET["default"]).map(dS => {
        return { ...dS, connectionId: '_custom_dynamic_postgres_' }
      }),
    }
  };

  return {
    connection: {
      client: "postgres",
    },
    dataSets: USER_ID_TO_DATA_SET[userId] || USER_ID_TO_DATA_SET["default"],
  };
};
