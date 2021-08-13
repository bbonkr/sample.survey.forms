import React, { useCallback, useEffect, useState } from 'react';
import { QuestionAndAnswer, Survey, SurveyResult } from '../../models';
import { SurveyQuestion } from './SurveyQuestion';

interface SurveyFormItemProps {
    record: Survey;
}

export const SurveyFormItem = ({ record }: SurveyFormItemProps) => {
    const [surveyResult, setSurveyResult] = useState<SurveyResult>(() => ({
        ...record,
    }));

    const handleClickSubmit = () => {
        console.info('submit');
    };

    const handleChange = useCallback((id: number, value: QuestionAndAnswer) => {
        setSurveyResult((prevState) => {
            const questionIndex = prevState.questions.findIndex(
                (x) => x.id === id,
            );
            if (questionIndex >= 0) {
                const previousQuestion = prevState.questions.find(
                    (x) => x.id === id,
                );
                if (previousQuestion) {
                    prevState.questions.splice(questionIndex, 1, {
                        ...previousQuestion,
                        ...value,
                    });
                }
            }

            return {
                ...prevState,
                questions: [...prevState.questions],
            };
        });
    }, []);

    useEffect(() => {
        console.info('SurveyFormItem : surveyResult => ', surveyResult);
    }, [surveyResult]);

    return (
        <div>
            <h2>{record.title}</h2>

            {record.questions.map((question) => (
                <SurveyQuestion
                    key={question.id}
                    record={question}
                    onChange={handleChange}
                />
            ))}

            <div>
                <button onClick={handleClickSubmit}>Submit</button>
            </div>

            <div>
                <h2>Result data:</h2>
                {surveyResult && (
                    <pre>{JSON.stringify(surveyResult, null, 4)}</pre>
                )}
            </div>
        </div>
    );
};
