// const formData = {
//   email: '',
//   message: '',
// };
const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

form.addEventListener('input', handleFormInput);
form.addEventListener('submit', handleFormSubmit);

populateForm();

/*******Обробка сабміту. Очищення форми*************/

function handleFormSubmit(event) {
  event.preventDefault();


  const formData = {
   email: form.elements.email.value,
   message: form.elements.message.value,
 };

 if (!formData.email || !formData.message) {
   alert('Fill please all fields');
   return;
 }
  console.log(formData);
 localStorage.removeItem(STORAGE_KEY);
 event.currentTarget.reset();
}

/*******Обробка інпуту*************/

function handleFormInput(event) {
  const value = event.target.value;
  const name = event.target.name;

  /************Зберігання даних в LS*********************/

  const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedFormData) {
    savedFormData[name] = value;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedFormData));
  } else {
    const formData = {
      [name]: value,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
}

/**************Заповнення форми*******************/

function populateForm() {
 const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));

 if (!savedFormData) {
   return;
 }

 for (const key in savedFormData) {
   if (savedFormData.hasOwnProperty(key)) {
     form.elements[key].value = savedFormData[key];
   }
 }
}
