import Header from './Header';
import Content from './Content';
import TotalExercise from './TotalExercise';

const Course = ({ course }) => {
  return (
    <>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <TotalExercise parts={course.parts} />
    </>
  )
}

export default Course;