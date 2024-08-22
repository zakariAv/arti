
const ID_REGEX = /^[0-9a-fA-F]{24}$/;

function validateIdURL(id) {
   return ID_REGEX.test(id)
}

export default validateIdURL