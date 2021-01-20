import { getFormsUrl, getFormUrl, getResponsesUrl, getBiasesUrl } from "./config";

async function getForms() {
  return await (await fetch(getFormsUrl)).json();
}

async function getForm(_, formId) {
  return await (await fetch(getFormUrl(formId))).json();
}

async function getResponses(_, formId) {
  return await (await fetch(getResponsesUrl(formId))).json();
}

async function getBiases(_, formId) {
  return await (await fetch(getBiasesUrl(formId))).json();
}

export { getForms, getForm, getResponses, getBiases };
