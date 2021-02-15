import * as yup from 'yup';

export const validationTaskSchema = yup.object({
  username: yup
    .string('Введите имя')
    .required('Поле является обязательным для заполнения'),
  email: yup
    .string()
    .email('Неверный email')
    .required('Поле является обязательным для заполнения'),
  text: yup
    .string('Введите текст')
    .required('Поле является обязательным для заполнения'),
});
