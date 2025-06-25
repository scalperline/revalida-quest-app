
export const getOptionColor = (
  optionId: string,
  showAnswer: boolean,
  selectedOption: string | null,
  userAnswer: string | undefined,
  correctAnswer: string
) => {
  if (!showAnswer) {
    return selectedOption === optionId 
      ? "bg-blue-100 border-blue-500 dark:bg-blue-900/20 dark:border-blue-400" 
      : "bg-white border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700";
  }

  const isCorrect = optionId === correctAnswer;
  const isUserAnswer = optionId === (userAnswer || selectedOption);

  if (isCorrect) {
    return "bg-green-100 border-green-500 dark:bg-green-900/20 dark:border-green-400";
  }
  
  if (isUserAnswer && !isCorrect) {
    return "bg-red-100 border-red-500 dark:bg-red-900/20 dark:border-red-400";
  }

  return "bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-600";
};
