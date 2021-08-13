import React, { useCallback, useEffect, useState } from 'react';
import { Question, QuestionAndAnswer } from '../../models';
import { SurveyAnswer } from './SurveyAnswer';

import './style.css';

interface SurveyQuestionProps {
    record: Question;
    onChange?: (_id: number, _value: QuestionAndAnswer) => void;
}

export const SurveyQuestion = ({ record, onChange }: SurveyQuestionProps) => {
    const [questionAndAnswers, setQuestionAndAnswers] =
        useState<QuestionAndAnswer>(() => ({
            ...record,
            answers: [...record.answers],
        }));

    const handleChange = useCallback((id: number, values: string[]) => {
        setQuestionAndAnswers((prevSate) => {
            const answers = prevSate.answers;

            const answerIndex = answers.findIndex((x) => x.id === id);

            if (answerIndex >= 0) {
                const previousAnswer = answers.find((x) => x.id === id);
                if (previousAnswer) {
                    answers.splice(answerIndex, 1, {
                        ...previousAnswer,
                        values: values,
                    });
                }
            }

            return {
                ...prevSate,
                answers: [...answers],
            };
        });
    }, []);

    useEffect(() => {
        // console.info(
        //     'SuveyQuestion: questionAndAnswers => ',
        //     questionAndAnswers,
        // );

        if (onChange) {
            onChange(record.id, questionAndAnswers);
        }
    }, [questionAndAnswers]);

    return (
        <div>
            <h3>{record.value}</h3>
            <div className="is-flex is-flex-direction-row answers-container">
                <div>
                    <div className="help">Left pane</div>
                    {record.answers
                        .filter((x) => x.position === 'left')
                        .map((answer) => (
                            <SurveyAnswer
                                key={answer.id}
                                record={answer}
                                onChange={handleChange}
                            />
                        ))}
                </div>
                <div>
                    <div className="help">Right pane</div>

                    {record.answers
                        .filter((x) => x.position === 'right')
                        .map((answer) => (
                            <SurveyAnswer
                                key={answer.id}
                                record={answer}
                                onChange={handleChange}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};
