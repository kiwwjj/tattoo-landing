const FORM_CLASS_NAME = 'feedback__form';

const formElement = document.querySelector(`.${FORM_CLASS_NAME}`);

if (formElement) {
  console.log('form', formElement)
  formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(formElement);
    
    const name = formData.get("name");
    const number = formData.get("number");
    const email = formData.get("email");

    const requestBody = {
      name: name,
      number: number,
      email: email
    }

    fetch('http://localhost:4000', {
      method: 'POST',
      body: JSON.stringify(requestBody)
    })

    console.log('event', event);
  })
}