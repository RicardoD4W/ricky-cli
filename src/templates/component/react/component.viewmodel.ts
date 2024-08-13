import { useState } from 'react';
import { type {COMPONENT_NAME}Model } from "./{camelCaseName}.model";

export const use{COMPONENT_NAME}ViewModel = (initialModel : {COMPONENT_NAME}Model) => {
    const [{camelCaseName}Model, set{COMPONENT_NAME}Model] = useState<{COMPONENT_NAME}Model>(initialModel);

    return {
        {camelCaseName}Title : {camelCaseName}Model.title,
        updateTitle: (title: string) => () =>
            set{COMPONENT_NAME}Model((prev) => ({ ...prev, title })),
    };
};
