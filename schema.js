//schema for tweet objects

module.exports = {
  name: "tweets",
  columns: [
    {
      name: 'id',
      dataType: 'serial'
    },
    {
      name: 'username',
      dataType: 'character'
    },
    {
      name: 'content',
      dataType: 'character'
    },
    {
      name: 'longitude',
      dataType: 'decimal'
    },
    {
      name: 'latitude',
      dataType: 'decimal'
    },
    {
      name: 'twitter_id',
      dataType: 'character'
    },
    {
      name: 'location',
      dataType: 'character'
    },
    {
      name: 'stars',
      dataType: 'integer'
    },
    {
      name: 'updated_at',
      dataType: 'timestamp with time zone'
    },
    {
      name: 'created_at',
      dataType: 'timestamp with time zone'
    }
  ]
}
