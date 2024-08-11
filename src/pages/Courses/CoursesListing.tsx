import { CourseListProps } from "./Props.types";
import { FaArrowUpLong, FaArrowDown } from "react-icons/fa6";
import { MdOutlineDragIndicator, MdOutlineDelete } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Reorder } from "framer-motion";
import { useMotionValue } from "framer-motion";
import { useRaisedShadow } from "./use-raised-shadow";

const CoursesListing = ({
  courses,
  deleteCourse,
  onMoveToBottom,
  onMoveToTop,
  setChaiCourses,
}: CourseListProps) => {
  // Check if courses is an array and contains items with id
  if (!Array.isArray(courses) || courses.length === 0) {
    console.error("Courses is not a valid array or is empty.");
    return <div>Error: Invalid courses data.</div>;
  }

  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);

  return (
    <Reorder.Group
      className="space-y-4"
      onReorder={setChaiCourses}
      values={courses}
    >
      {courses.map((course: any, index: number) => {
        if (!course || !course.id) {
          console.error("Invalid course item:", course);
          return null; // Skip rendering this item
        }

        return (
          <Reorder.Item
            style={{ boxShadow }}
            value={course}
            id={course.id}
            key={course.id}
            draggable="true"
            className="w-[70%] relative hover:shadow-md transition-all text-xl p-3 md:text-2xl flex justify-between bg-slate-50"
          >
            <div className="text-3xl flex items-center space-x-4">
              <MdOutlineDragIndicator className="hover:cursor-grabbing" />
              <img
                className="w-12 rounded-md h-12 overflow-hidden"
                src={course.image}
                alt={course.topic}
              />
              <div className="font-normal text-xl">{course.topic}</div>
            </div>
            <div className="flex space-x-4 items-center text-xl">
              <p>{course.price}</p>
              <p className="p-1 rounded bg-green-500 text-sm">{course.type}</p>
              <p className="cursor-pointer group">
                <BsThreeDotsVertical />

                <div
                  id="menu"
                  className="group-item text-sm absolute -right-28 bg-slate-100 p-2 space-y-3 rounded flex-col shadow z-10"
                >
                  <p
                    onClick={() => onMoveToTop(index)}
                    className="flex items-center justify-between hover:text-black/50"
                  >
                    Move To Top
                    <span>
                      <FaArrowUpLong />
                    </span>
                  </p>
                  <p
                    onClick={() => onMoveToBottom(index)}
                    className="flex items-center justify-between hover:text-black/50"
                  >
                    Move To Bottom
                    <span>
                      <FaArrowDown />
                    </span>
                  </p>
                  <p
                    onClick={() => deleteCourse(course.id)}
                    className="flex items-center justify-between hover:text-red-500/50 text-red-400"
                  >
                    Delete
                    <span>
                      <MdOutlineDelete />
                    </span>
                  </p>
                </div>
              </p>
            </div>
          </Reorder.Item>
        );
      })}
    </Reorder.Group>
  );
};

export default CoursesListing;
