import { useState } from 'react';
import { type {COMPONENT_NAME}Model } from "./{camelCaseName}.model";

export const use{COMPONENT_NAME}ViewModel = (initialModel : {COMPONENT_NAME}Model) => {
    const [{lowerCaseComponentName}Model, set{COMPONENT_NAME}Model] = useState<{COMPONENT_NAME}Model>(initialModel);

    return {
        {lowerCaseComponentName}Title : {lowerCaseComponentName}Model.title,
        updateTitle: (title: string) => () =>
            set{COMPONENT_NAME}Model((prev) => ({ ...prev, title })),
    };
};
