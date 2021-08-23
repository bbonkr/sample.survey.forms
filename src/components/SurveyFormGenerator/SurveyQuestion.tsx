import React, { useCallback, useEffect, useState } from 'react';
import { Answer, Question } from '../../models';
import { SurveyAnswer } from './SurveyAnswer';

import './style.css';

interface SurveyQuestionProps {
    record: Question;
    onChange?: (_question: Question) => void;
}

export const SurveyQuestion = ({ record, onChange }: SurveyQuestionProps) => {
    const [question, setQuestion] = useState<Question>(() => record);

    const handleChangeQuestionTitle = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const title = e.currentTarget.value;

        setQuestion((prevState) => {
            const newState = { ...prevState, value: title };

            return newState;
        });
    };

    const handleChange = useCallback((answer: Answer) => {
        setQuestion((prevSate) => {
            const answers = prevSate.answers;

            const answerIndex = answers.findIndex((x) => x.id === answer.id);

            if (answerIndex >= 0) {
                answers.splice(answerIndex, 1, answer);
            }

            return {
                ...prevSate,
                answers: [...answers],
            };
        });
    }, []);

    useEffect(() => {
        if (onChange) {
            onChange(question);
        }
    }, [question]);

    return (
        <div>
            <h3>{question.value}</h3>
            <div>
                <label>Question: </label>
                <input
                    type="text"
                    value={question.value}
                    onChange={handleChangeQuestionTitle}
                />
            </div>
            <div className="is-flex is-flex-direction-row answers-container">
                <div>
                    <div className="help">Left pane</div>
                    {question.answers
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

                    {question.answers
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
