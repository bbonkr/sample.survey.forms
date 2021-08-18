import React, { useCallback, useEffect, useState } from 'react';
import { Survey, Question } from '../../models';
import { SurveyQuestion } from './SurveyQuestion';

interface SurveyFormItemProps {
    record: Survey;
}

export const SurveyFormItem = ({ record }: SurveyFormItemProps) => {
    const [survey, setSurvey] = useState<Survey>(() => record);

    const handleChangeSurveryTitle = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const title = e.currentTarget.value;
        // console.info('[⚡ Change]', title);
        setSurvey((prevState) => {
            const newState = { ...prevState, title: title };
            return newState;
        });
    };

    const handleClickAddQuestion = () => {
        setSurvey((prevState) => {
            const latestQuestion = prevState.questions
                .sort((a, b) => (a.id > b.id ? -1 : 1))
                .find((_, index) => index === 0);

            const newQuestioin: Question = {
                id: (latestQuestion?.id ?? 0) + 1,
                value: '',
                answers: [],
            };
            const newState = {
                ...prevState,
                questions: [...prevState.questions, newQuestioin],
            };

            return newState;
        });
    };

    const handleClickSubmit = () => {
        console.info('submit');
    };

    const handleChangeQuestion = useCallback((question: Question) => {
        setSurvey((prevState) => {
            const newState = { ...prevState };
            const foundIndex = newState.questions.findIndex(
                (x) => x.id === question.id,
            );
            if (foundIndex >= 0) {
                newState.questions.splice(foundIndex, 1, question);
            }

            return newState;
        });
    }, []);

    useEffect(() => {
        console.info('[⚡ Changed] survey => ', survey);
    }, [survey]);

    return (
        <div>
            <h2>{survey.title ?? 'New survey'}</h2>
            <hr />
            <div>
                <label htmlFor="surveyTitle">Title</label>
                <input
                    type="text"
                    id="surveyTitle"
                    value={survey.title}
                    onChange={handleChangeSurveryTitle}
                />
            </div>

            <div>
                <button onClick={handleClickAddQuestion}>Add Question</button>
            </div>

            {survey.questions
                .sort((a, b) => (a.id < b.id ? -1 : 1))
                .map((question) => (
                    <SurveyQuestion
                        key={question.id}
                        record={question}
                        onChange={handleChangeQuestion}
                    />
                ))}

            <div>
                <button onClick={handleClickSubmit}>Submit</button>
            </div>

            <div>
                <h2>Result data:</h2>
                {survey && <pre>{JSON.stringify(survey, null, 4)}</pre>}
            </div>
        </div>
    );
};
