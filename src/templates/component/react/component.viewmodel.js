import { useState } from 'react'
import { {COMPONENT_NAME}Model } from "./{camelCaseName}.model";

export const use{COMPONENT_NAME}ViewModel = () => {
    const [model, setModel] = useState(new {COMPONENT_NAME}Model())

    return {
        model
    }
}