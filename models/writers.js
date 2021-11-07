export default (database, DataTypes) => {
  const writer = database.define('writer', {
    writer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    writer: {
      type: DataTypes.STRING
    }
  });
  return writer;
};