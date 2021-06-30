import React, { useEffect, useRef, useState } from 'react';
import { Answer, ControlTypes } from '../../models';
import { v4 as uuidv4 } from 'uuid';

interface SurveyAnswerProps {
    record: Answer;
    onChange?: (values: string[]) => void;
}

export const SurveyAnswer = ({ record, onChange }: SurveyAnswerProps) => {
    const id = `${uuidv4()}-${record.id}`;
    const inputs: ControlTypes[] = ['text', 'date'];

    const [answerValues, setAnswerValues] = useState<string[]>(['']);
    const [controlIds, setControlIds] = useState<string[]>([id]);

    const handleChange =
        (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
            let value = e.currentTarget.value;

            console.info('onchange');

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
        console.info('handleClickRemoveAnswer', index);
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
        console.info(`${record.id}`, answerValues);
        if (onChange) {
            onChange(answerValues.filter(Boolean).map((x) => x));
        }
    }, [answerValues]);

    return (
        <div className="answer-container">
            <div>
                {record.controlType !== 'checkbox' && record.label && (
                    <label htmlFor={id}>{record.label}</label>
                )}
            </div>
            <div className={`answers`}>
                {record.controlType === 'radio' && (
                    <div>
                        <label>
                            <input
                                type={record.controlType}
                                name={id}
                                value="yes"
                                onChange={handleChange(0)}
                            />{' '}
                            Yes
                        </label>
                        <label>
                            <input
                                type={record.controlType}
                                name={id}
                                value="no"
                                onChange={handleChange(0)}
                            />{' '}
                            No
                        </label>
                    </div>
                )}
                {record.controlType === 'checkbox' && (
                    <label>
                        <input
                            type={record.controlType}
                            onChange={handleChange(0)}
                            value={record.label}
                        />{' '}
                        {record.label}
                    </label>
                )}
                {inputs.find((x) => x === record.controlType) &&
                    controlIds?.map((controlId, index) => {
                        return (
                            <div key={controlId}>
                                <input
                                    id={controlId}
                                    name={controlId}
                                    type={record.controlType}
                                    placeholder={record.placeholder}
                                    value={answerValues[index]}
                                    onChange={handleChange(index)}
                                />
                                {index > 0 && (
                                    <button
                                        onClick={handleClickRemoveAnswer(index)}
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
                    <button onClick={handleClickAddMoreAnswer}>
                        Add more answer
                    </button>
                </div>
            )}
        </div>
    );
};
