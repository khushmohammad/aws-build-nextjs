import * as yup from 'yup'

export const userSchema = yup.object().shape({
  firstName : yup.string().required()
})