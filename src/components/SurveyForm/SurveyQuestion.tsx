import React from 'react';
import { Question } from '../../models';
import { SurveyAnswer } from './SurveyAnswer';

interface SurveyQuestionProps {
    record: Question;
}

export const SurveyQuestion = ({ record }: SurveyQuestionProps) => {
    return (
        <div>
            <h3>{record.value}</h3>
            {record.answers.map((answer) => (
                <SurveyAnswer key={answer.id} record={answer} />
            ))}
        </div>
    );
};
