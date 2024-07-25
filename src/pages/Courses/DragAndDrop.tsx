import { courseList } from "./CoursesList";
import { FaArrowUpLong, FaArrowDown } from "react-icons/fa6";
import { MdOutlineDragIndicator, MdOutlineDelete } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./Course.css";
import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const DragAndDrop = () => {
  const [chaiCourse, setChaiCourses] = useState<any>([...courseList]);

  const moveToTop = (list: any, index: number) => {
    const item = list[index];
    const newList = [item, ...list.slice(0, index), ...list.slice(index + 1)];
    return newList;
  };

  const deleteCourse = (id: number) => {
    setChaiCourses((prevCourses: any) => {
      // Check if `id` exists before filtering
      const courseExists = prevCourses.some((course: any) => course.id === id);
      if (!courseExists) return prevCourses;
  
      // Filter out the course with the given ID
      return prevCourses.filter((course: any) => course.id !== id);
    });
  };
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
            {chaiCourse.map((courses: any, index: number) => {
              const { id } = courses;
              const {
                attributes,
                listeners,
                setNodeRef,
                transform,
                transition,
              } = useSortable({ id });
              const style = {
                transform: CSS.Transform.toString(transform),
                transition,
              };
              console.log({id, listeners});
              return (
                <SortableContext
                  items={chaiCourse}
                  strategy={verticalListSortingStrategy}
                  key={index}
                >
                  <div
                    draggable="true"
                    style={style}
                    ref={setNodeRef}
                    {...listeners}
                    {...attributes}
                    className="w-[70%] relative hover:shadow-md transition-all text-xl p-3 md:text-2xl flex justify-between bg-slate-50"
                  >
                    <div className="text-3xl flex items-center space-x-4">
                      <MdOutlineDragIndicator className="hover:cursor-grabbing" />
                      <img
                        className="w-12 rounded-md h-12 overflow-hidden"
                        src={courses.image}
                        alt={courses.topic}
                      />
                      <div className="font-normal text-xl">{courses.topic}</div>
                    </div>
                    <div className="flex space-x-4 items-center text-xl">
                      <p>{courses.price}</p>
                      <p className="p-1 rounded bg-green-500 text-sm">
                        {courses.type}
                      </p>
                      <p className="cursor-pointer group">
                        <BsThreeDotsVertical />

                        <div
                          id="menu"
                          className="group-item text-sm absolute -right-28 bg-slate-100 p-2 space-y-3 rounded flex-col shadow z-10 "
                        >
                          <p
                            onClick={() => onMoveToTop(index)}
                            className="flex items-center justify-between hover:text-black/50"
                          >
                            Move To Top{" "}
                            <span>
                              {" "}
                              <FaArrowUpLong />
                            </span>
                          </p>
                          <p
                            onClick={() => onMoveToBottom(index)}
                            className="flex items-center justify-between hover:text-black/50"
                          >
                            Move To Bottom{" "}
                            <span>
                              <FaArrowDown />
                            </span>
                          </p>
                          <p
                            onClick={() => deleteCourse(id)}
                            className="flex items-center justify-between hover:text-red-500/50 text-red-400"
                          >
                            Delete{" "}
                            <span>
                              <MdOutlineDelete />
                            </span>
                          </p>
                        </div>
                      </p>
                    </div>
                  </div>
                </SortableContext>
              );
            })}
          </DndContext>
        </div>
      </div>
    </div>
  );
};

export default DragAndDrop;
