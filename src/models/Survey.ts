export type Survey = {
    id: string;
    title: string;
    questions: Question[];
};

export type Question = {
    question: string;
    placeholder: string;
    controlType: ControlTypes;
    controlSource?: string;
    isRequired: boolean;
    displayZone: Positions;
    displayOrder: number;
    // TODO multiple textbox answers
    isMultiple?: boolean;
    answers: string[];
};

export type ControlTypes =
    | 'Textbox'
    | 'Datepicker'
    | 'RadioList'
    | 'CheckBoxList';

export type Positions = 'left' | 'right';
