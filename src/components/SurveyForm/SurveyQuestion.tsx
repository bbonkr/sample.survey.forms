import React, { useCallback, useEffect, useState } from 'react';
import { Question } from '../../models';
import { SurveyAnswer } from './SurveyAnswer';

interface SurveyQuestionProps {
    record: Question;
    onChange?: (_id: number, _value: Question) => void;
}

export const SurveyQuestion = ({ record, onChange }: SurveyQuestionProps) => {
    const [questionAndAnswers, setQuestionAndAnswers] = useState<Question>(
        () => ({
            ...record,
            answers: [...(record.answers ?? [])],
        }),
    );

    const handleChange = useCallback((values: string[]) => {
        setQuestionAndAnswers((prevSate) => {
            return {
                ...prevSate,
                answers: [...values],
            };
        });
    }, []);

    useEffect(() => {
        // console.info(
        //     'SuveyQuestion: questionAndAnswers => ',
        //     questionAndAnswers,
        // );

        if (onChange) {
            onChange(record.displayOrder, questionAndAnswers);
        }
    }, [questionAndAnswers]);

    return (
        <div>
            <h3>{record.question}</h3>
            <div className="is-flex is-flex-direction-row answers-container">
                <div>
                    <SurveyAnswer
                        key={questionAndAnswers.displayOrder}
                        record={questionAndAnswers}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
};
