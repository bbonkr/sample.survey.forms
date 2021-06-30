import React from 'react';
import { Question } from '../../models';
import { SurveyAnswer } from './SurveyAnswer';

import './style.css';

interface SurveyQuestionProps {
    record: Question;
}

export const SurveyQuestion = ({ record }: SurveyQuestionProps) => {
    return (
        <div>
            <h3>{record.value}</h3>
            <div className="is-flex is-flex-direction-row answers-container">
                <div>
                    <div className="help">Left pane</div>
                    {record.answers
                        .filter((x) => x.position === 'left')
                        .map((answer) => (
                            <SurveyAnswer key={answer.id} record={answer} />
                        ))}
                </div>
                <div>
                    <div className="help">Right pane</div>

                    {record.answers
                        .filter((x) => x.position === 'right')
                        .map((answer) => (
                            <SurveyAnswer key={answer.id} record={answer} />
                        ))}
                </div>
            </div>
        </div>
    );
};
