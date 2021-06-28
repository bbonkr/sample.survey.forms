import React from 'react';
import { Survey } from '../../models';
import { SurveyQuestion } from './SurveyQuestion';

interface SurveyFormItemProps {
    record: Survey;
}

export const SurveyFormItem = ({ record }: SurveyFormItemProps) => {
    return (
        <div>
            <h2>{record.title}</h2>
            {record.questions.map((question) => (
                <SurveyQuestion key={question.id} record={question} />
            ))}
        </div>
    );
};
