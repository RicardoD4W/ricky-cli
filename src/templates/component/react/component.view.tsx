import {COMPONENT_NAME}Theme from './css/{camelCaseName}.module.css';
import { type {COMPONENT_NAME}Model } from './{camelCaseName}.model';
import { use{COMPONENT_NAME}ViewModel } from "./{camelCaseName}.viewmodel";

export default function {COMPONENT_NAME}View (props : {COMPONENT_NAME}Model){
  const { {lowerCaseComponentName}Title } = use{COMPONENT_NAME}ViewModel(props);

  return (
    <>
      <h1>{ {lowerCaseComponentName}Title }</h1>
    </>
  );
}