module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'students',
      [
        {
          name: 'Pedro Henrique',
          email: 'pedro@gympoint.com',
          age: 23,
          weight: '70',
          height: '1.68',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Paulo Victor',
          email: 'paulo@gympoint.com',
          age: 19,
          weight: '70',
          height: '1.75',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Amanda Rebeca',
          email: 'amanda@gympoint.com',
          age: 21,
          weight: '50',
          height: '1.68',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Joel Rodrigues',
          email: 'pedro@gympoint.com',
          age: 50,
          weight: '70',
          height: '1.68',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
