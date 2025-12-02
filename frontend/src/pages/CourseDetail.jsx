import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Mock fetch
    setCourse({
      _id: id,
      title: `Course ${id}`,
      description: `Details for course ${id}`,
      content: "Course content here..."
    });
  }, [id]);

  if (!course) return <p>Loading...</p>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p>{course.content}</p>
    </div>
  );
}
