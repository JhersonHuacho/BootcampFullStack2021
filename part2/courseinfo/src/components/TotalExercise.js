const TotalExercise = ({ parts }) => {
  const total = parts.reduce(
    (previosValue, currentValue, currentIndex) => {
      if (currentIndex === 1) {
        return previosValue.exercises + currentValue.exercises;
      }
      return previosValue + currentValue.exercises;
    }
  )

  return (
    <p>
      <strong>Total of {total} exercises</strong>
    </p>
  )
}

export default TotalExercise;