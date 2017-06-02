
exports.seed = function (knex, Promise) {
  return knex('model').del()
    .then(() => {
      return Promise.all([
        knex('model').insert({
          name: 'trash',
          reason: 'you should not keep too many things',
          cleanliness: 'rancid',
        }, 'id'),
        knex('model').insert({
          name: 'talkboy',
          reason: 'I had it since I was a kid',
          cleanliness: 'sparkling',
        }, 'id'),
      ]);
    });
};
