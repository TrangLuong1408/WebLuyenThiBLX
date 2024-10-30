import React from 'react'

const QuizList = () => {
    const {quizzes, addQuiz} = useContext(QuizContext);

    useEffect(() => {
        
    },[quizzes])

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this question?');
        if (confirmDelete) {
            try {
          await axios.delete(`http://localhost:8000/practices/${id}`);
          setQuizzes(quizzes.filter((q) => q._id !== id));
        }   catch (err) {
          console.error('Error deleting question:', err);
        }
      }
      };
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
            <th>Question</th>
            <
        </tr>
    </Table>
  )
}

export default QuizList