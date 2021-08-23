import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Survey } from '../../models';
import { SurveyFormItem } from './SurveyFormItem';

import './style.css';

export const SurveyForm = () => {
    const [record, setRecord] = useState<Survey>();

    useEffect(() => {
        Axios.get<Survey>(
            'https://raw.githubusercontent.com/bbonkr/sample.survey.forms/main/sample/sample.json',
        )
            .then((res) => {
                setRecord((_) => res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return <div>{record && <SurveyFormItem record={record} />}</div>;
};

export default SurveyForm;
