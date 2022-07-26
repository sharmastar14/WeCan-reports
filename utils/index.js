export function getFormValueFromEvent(e, fieldname) {
  return e.target.elements[fieldname].value;
}
