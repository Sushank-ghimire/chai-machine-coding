import { courseList } from "./CoursesList";
import "./Course.css";
import { useCallback, useEffect, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import CoursesListing from "./CoursesListing";
import { Courses } from "./Props.types";

const DragAndDrop = () => {
  const [chaiCourse, setChaiCourses] = useState<any>([...courseList]);

  const moveToTop = (list: any, index: number) => {
    const item = list[index];
    const newList = [item, ...list.slice(0, index), ...list.slice(index + 1)];
    return newList;
  };

  useEffect(() => {
  }, [chaiCourse])

  const deleteCourse = useCallback((id: number) => {
    console.log("Deleting element having id: ", id);
    setChaiCourses((prevCourses: Courses[]) =>
      prevCourses.filter((course: any) => course.id !== id)
    );
  }, []);

  const moveToBottom = (list: any, index: number) => {
    const item = list[index];
    const newList = [...list.slice(0, index), ...list.slice(index + 1), item];
    return newList;
  };

  const onMoveToTop = (index: number) => {
    const updatedList = moveToTop(chaiCourse, index);
    setChaiCourses(updatedList);
  };

  const onMoveToBottom = (index: number) => {
    const updatedList = moveToBottom(chaiCourse, index);
    setChaiCourses(updatedList);
  };

  const getTaskPosition = (id: number) =>
    chaiCourse.findIndex((course: any) => course.id === id);

  
  const handleDragEnd = (event: any) => {
    const { over, active } = event;
    console.log({ active, over });
    
    if (active.id === over?.id) return;
    
    setChaiCourses((courses: any) => {
      const orignalPosition = getTaskPosition(active.id);
      const newPosition = getTaskPosition(over.id);
      console.log({ orignalPosition, newPosition });
      return arrayMove(courses, orignalPosition, newPosition);
    });
  };
  
  return (
    <div className="w-[90vw] m-auto mt-4 text-xl md:text-2xl pb-12 overflow-x-hidden">
      <h1 className="text-white font-bold text-center text-3xl mb-4">
        Chai Aur Code
      </h1>
      <div className="w-[90%] p-4 rounded bg-white text-black m-auto">
        <h1 className="font-bold text-xl md:text-3xl">Manage Bundle</h1>
        <p className="text-[18px] font-light text-slate-700">
          Manage orders of the products based on the priority. <span className="text-red-400">Delete and drag-drop functionality are not working properly it will be updated soon</span>
        </p>
        <div className="mt-3 flex flex-col space-y-4 md:ml-4 justify-between">
          <DndContext onDragStart={handleDragEnd}>
            <CoursesListing
            setChaiCourses={setChaiCourses}
            onMoveToBottom={onMoveToBottom}
            onMoveToTop={onMoveToTop}
            courses={chaiCourse}
            deleteCourse={deleteCourse}  />
          </DndContext>
        </div>
      </div>
    </div>
  );
};

export default DragAndDrop;
