import React, { useEffect, useState } from 'react';
import { ControlTypes, Question } from '../../models';
import { v4 as uuidv4 } from 'uuid';

interface SurveyAnswerProps {
    record: Question;
    onChange?: (_values: string[]) => void;
}

export const SurveyAnswer = ({ record, onChange }: SurveyAnswerProps) => {
    const id = `${uuidv4()}-${record.displayOrder}`;
    const inputs: ControlTypes[] = ['Textbox', 'Datepicker'];

    const [answerValues, setAnswerValues] = useState<string[]>(['']);
    const [controlIds, setControlIds] = useState<string[]>([id]);

    const handleChange =
        (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
            let value = e.currentTarget.value;

            // console.info('onchange');

            if (
                e.currentTarget.type === 'checkbox' ||
                e.currentTarget.type === 'radio'
            ) {
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
        // console.info(`${record.id}`, answerValues);
        if (onChange) {
            onChange(answerValues.filter(Boolean).map((x) => x));
        }
    }, [answerValues]);

    return (
        <div className="answer-container">
            <div className={`answers`}>
                {(record.controlType === 'RadioList' ||
                    record.controlType === 'CheckBoxList') && (
                    <div>
                        {record.controlSource &&
                            record.controlSource.split(',').map((radio) => {
                                return (
                                    <label key={radio}>
                                        <input
                                            type={
                                                record.controlType ===
                                                'RadioList'
                                                    ? 'radio'
                                                    : 'check'
                                            }
                                            name={id}
                                            value={radio}
                                            onChange={handleChange(0)}
                                        />{' '}
                                        {radio}
                                    </label>
                                );
                            })}
                    </div>
                )}

                {record.controlType === 'CheckBoxList' && (
                    <div>
                        {record.controlSource &&
                            record.controlSource
                                .split(',')
                                .map((checkbox, index) => {
                                    return (
                                        <label key={checkbox}>
                                            <input
                                                type="check"
                                                value={checkbox}
                                                onChange={handleChange(index)}
                                            />{' '}
                                            {checkbox}
                                        </label>
                                    );
                                })}
                    </div>
                )}

                {record.controlType === 'Textbox' &&
                    inputs.find((x) => x === record.controlType) &&
                    controlIds?.map((controlId, index) => {
                        return (
                            <div key={controlId}>
                                <input
                                    id={controlId}
                                    name={controlId}
                                    type="text"
                                    placeholder={record.placeholder}
                                    value={answerValues[index]}
                                    onChange={handleChange(index)}
                                    required={record.isRequired}
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

                {record.controlType === 'Datepicker' &&
                    inputs.find((x) => x === record.controlType) &&
                    controlIds?.map((controlId, index) => {
                        return (
                            <div key={controlId}>
                                <input
                                    id={controlId}
                                    name={controlId}
                                    type="date"
                                    placeholder={record.placeholder}
                                    value={answerValues[index]}
                                    onChange={handleChange(index)}
                                    required={record.isRequired}
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
