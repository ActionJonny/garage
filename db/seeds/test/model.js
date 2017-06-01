
exports.seed = function (knex, Promise) {
  return knex('model').del()
    .then(() => {
      return Promise.all([
        knex('model').insert({
          name: 'trash',
          reason: 'you should not keep too many things',
          cleanliness: 'Rancid',
        }, 'id'),
        knex('model').insert({
          name: 'talkboy',
          reason: 'I had it since I was a kid',
          cleanliness: 'Sparkling',
        }, 'id'),
      ]);
    });
};
