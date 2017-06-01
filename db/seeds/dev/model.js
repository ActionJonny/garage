
exports.seed = function(knex, Promise) {
  return knex('model').del()
    .then(() => {
      return Promise.all([
        knex('model').insert({
          name: 'trash',
          reason: 'you should not keep too many things',
          cleanliness: 'Rancid'
        }, 'id')
      ])
    })
};
