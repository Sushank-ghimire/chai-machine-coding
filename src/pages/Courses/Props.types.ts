
export type Courses = {
    id: number;
    price: String;
    topic: String;
    type: String;
    image: String;
};

export interface CourseListProps {
    courses: Courses [];
    onMoveToTop: (index: number) => void;
    onMoveToBottom: (index: number) => void;
    deleteCourse: (id: number) => any;
    setChaiCourses: (courses: Courses []) => any;
};