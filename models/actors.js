export default (database, DataTypes) => {
  const actor = database.define('actor', {
    actor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    actor: {
      type: DataTypes.STRING
    }
  });
  return actor;
};
