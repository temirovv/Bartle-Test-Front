'use client';

// export type LocaleType = 'en' | 'uz' | 'ru'; // Export LocaleType (though it's defined in LanguageContext now)

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import questionsData from '../../questions.json';
import { LocaleType, useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../context/useTranslation';

// Define interfaces for Question and Option types to enhance type safety
interface OptionType {
  en: string;
  uz: string;
  ru: string;
}

interface QuestionType {
  id: number;
  question: {
    en: string;
    uz: string;
    ru: string;
  };
  options: OptionType[];
}


interface UserAnswersType {
  [questionId: number]: string;
}

const questionsPerPage = 3;

export default function QuestionsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [userAnswers, setUserAnswers] = useState<UserAnswersType>({});
  const [isNextPageEnabled, setIsNextPageEnabled] = useState(false);
  const router = useRouter();
  const { locale } = useLanguage() as { locale: LocaleType }; // Explicitly type 'locale'
  const { t } = useTranslation();

  const totalQuestions: QuestionType[] = questionsData as QuestionType[]; // Explicitly type questionsData
  const totalPages = Math.ceil(totalQuestions.length / questionsPerPage);
  const currentQuestions: QuestionType[] = totalQuestions.slice((currentPage - 1) * questionsPerPage, currentPage * questionsPerPage);


  const handleAnswerSelect = (questionId: number, answer: string) => {
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleNextPage = () => {
    if (isNextPageEnabled) {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    } else {
      alert(t("Please answer all questions on this page before proceeding."));
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const checkPageAnswered = () => {
    const answeredCount = currentQuestions.filter(question => {
      const questionId = question.id; // Explicitly define questionId
      return userAnswers[questionId];
    }).length;
    setIsNextPageEnabled(answeredCount === currentQuestions.length);
  };

  const handleSubmitTest = async () => {
    if (isNextPageEnabled) {
      try {
        const response = await fetch('http://103.74.95.36:5000/api/score', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userAnswers,
            age: localStorage.getItem('bartleTestUserAge'),
            language: locale,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log(responseData);
        localStorage.setItem('bartleTestResults', JSON.stringify(responseData.results));
        localStorage.setItem('aiBartleConclusion', responseData.aiConclusion);
        router.push('/results');

      } catch (error) {
        console.error("Error submitting test to backend:", error);
        alert("Error submitting test. Please try again later.");
      }
    } else {
      alert(t("Please answer all questions on this page before submitting."));
    }
  };

  useEffect(() => {
    console.log("Current User Answers:", userAnswers);
    checkPageAnswered();
  }, [userAnswers, currentPage]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">{t('bartleTest')}</h1>
          <div className="text-sm text-gray-500">
            {t('progressPage')} {currentPage} {t('of')} {totalPages}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 space-y-6">
        {currentQuestions.map((question: QuestionType) => ( // Explicitly type question in map
          <div key={question.id} className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 text-gray-900">
              {t('Question')} {question.id}: {question.question[locale]}
            </h2>
            <ul className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex}>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option.en}
                      className="form-radio h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 mr-2"
                      onChange={() => handleAnswerSelect(question.id, option.en)}
                      checked={(userAnswers[question.id] ?? '') === option.en}
                    />
                    <span className="text-lg text-gray-800">
                      {option[locale]}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </main>

      <footer className="bg-purple-100 py-6 px-6">
        <div className="container mx-auto flex justify-between">
          <button
            className="bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded-full"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            {t('previous')}
          </button>
          {currentPage === totalPages ? (
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleSubmitTest}
              disabled={!isNextPageEnabled}
            >
              {t('submitTest')}
            </button>
          ) : (
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleNextPage}
              disabled={!isNextPageEnabled}
            >
              {t('next')}
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}