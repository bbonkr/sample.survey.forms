import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Survey } from '../../models';
import { SurveyFormItem } from './SurveyFormItem';

export const SurveyForm = () => {
    const [record, setRecord] = useState<Survey>();

    useEffect(() => {
        Axios.get<Survey>('/api/data')
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
