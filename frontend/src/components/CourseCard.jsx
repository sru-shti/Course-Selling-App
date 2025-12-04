// src/components/CourseCard.jsx
export default function CourseCard({ course, onPurchase }) {
  return (
    <div className="border p-2 rounded shadow">
      <img src={course.imgUrl} alt={course.title} className="w-full h-32 object-cover" />
      <h3 className="font-bold">{course.title}</h3>
      <p>{course.description}</p>
      <p>Price: ${course.price}</p>
      {onPurchase && (
        <button
          onClick={() => onPurchase(course._id)}
          className="bg-green-500 text-white p-1 mt-2 w-full"
        >
          Buy
        </button>
      )}
    </div>
  );
}