exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('creations').del()
    .then(() => {
      return knex('creations').insert([
        {
          title: 'Test Tech Project',
          description: 'A project made with tech',
          materials: 'koa, postgres, mocha, chai',
          image: 'http://bit.ly/2xTwAcl',
          category: 'tech'
        },
        {
          title: 'Test Craft Project',
          description: 'A project made with craft',
          materials: 'beech, hand saw, chisel',
          image: 'http://bit.ly/2wRVdqy',
          category: 'craft'
        }
      ]);
    });
};
