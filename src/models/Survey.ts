export type Survey = {
    id: number;
    title: string;
    questions: Question[];
};

export type Question = {
    id: number;
    value: string;
    answers: Answer[];
};

export type ValueTypes = 'boolean' | 'text' | 'date';

export type ControlTypes = 'radio' | 'text' | 'date' | 'checkbox';

export type Positions = 'left' | 'right';

export type Answer = {
    id: number;
    isRequired: boolean;
    descriptions: string;
    valueType: ValueTypes;
    label: string;
    placeholder: string;
    isMultiple: boolean;
    controlType: ControlTypes;
    position: Positions;
};
