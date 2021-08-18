import React, { useEffect, useState } from 'react';
import { Answer, ControlTypes } from '../../models';
import { v4 as uuidv4 } from 'uuid';

interface SurveyAnswerProps {
    record: Answer;
    onChange?: (_answer: Answer) => void;
}

export const SurveyAnswer = ({ record, onChange }: SurveyAnswerProps) => {
    const id = `${uuidv4()}-${record.id}`;
    const inputs: ControlTypes[] = ['text', 'date'];
    const [answer, setAnswer] = useState<Answer>(() => record);

    const [answerValues, setAnswerValues] = useState<string[]>(['']);
    const [controlIds, setControlIds] = useState<string[]>([id]);

    const handleChange =
        (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
            let value = e.currentTarget.value;

            // console.info('onchange');

            if (e.currentTarget.type === 'checkbox') {
                value = e.currentTarget.checked ? value : '';
            }

            setAnswerValues((prevState) => {
                const temp = [...prevState];
                temp.splice(index, 1, value);

                return temp;
            });
        };

    const handleClickAddMoreAnswer = () => {
        setAnswerValues((prevState) => [...prevState, '']);
        setControlIds((prevState) => [
            ...prevState,
            `${id}-${prevState.length + 1}`,
        ]);
    };

    const handleClickRemoveAnswer = (index: number) => () => {
        // console.info('handleClickRemoveAnswer', index);
        setAnswerValues((prevState) => {
            const temp = [...prevState];
            temp.splice(index, 1);
            return temp;
        });
        setControlIds((prevState) => {
            const temp = [...prevState];
            temp.splice(index, 1);
            return temp;
        });
    };

    useEffect(() => {
        if (onChange) {
            onChange(answer);
        }
    }, [answer]);

    return (
        <div className="answer-container">
            <div>
                {answer.controlType !== 'checkbox' && answer.label && (
                    <label htmlFor={id}>{answer.label}</label>
                )}
            </div>
            <div className={`answers`}>
                {answer.controlType === 'radio' && (
                    <div>
                        <label>
                            <input
                                type={answer.controlType}
                                name={id}
                                value="yes"
                                onChange={handleChange(0)}
                            />{' '}
                            Yes
                        </label>
                        <label>
                            <input
                                type={answer.controlType}
                                name={id}
                                value="no"
                                onChange={handleChange(0)}
                            />{' '}
                            No
                        </label>
                    </div>
                )}
                {answer.controlType === 'checkbox' && (
                    <label>
                        <input
                            type={answer.controlType}
                            onChange={handleChange(0)}
                            value={answer.label}
                        />{' '}
                        {answer.label}
                    </label>
                )}
                {inputs.find((x) => x === answer.controlType) &&
                    controlIds?.map((controlId, index) => {
                        return (
                            <div key={controlId}>
                                <input
                                    id={controlId}
                                    name={controlId}
                                    type={answer.controlType}
                                    placeholder={answer.placeholder}
                                    value={answerValues[index]}
                                    onChange={handleChange(index)}
                                />
                                {index > 0 && (
                                    <button
                                        onClick={handleClickRemoveAnswer(index)}
                                        disabled
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        );
                    })}
            </div>

            {record.isMultiple && (
                <div>
                    <button onClick={handleClickAddMoreAnswer} disabled>
                        Add more answer
                    </button>
                </div>
            )}
        </div>
    );
};
