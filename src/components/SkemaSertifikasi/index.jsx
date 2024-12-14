export const CardItem = ({ id, title, subtitle, imageUrl }) => {
  return (
    <div
      className="card bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 ease-in-out"
      style={{ cursor: "pointer" }}
    >
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-40 object-cover rounded-lg mt-4 mb-3"
      />
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
};

export default CardItem;
