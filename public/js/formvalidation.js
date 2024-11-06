document.querySelector("#bookingForm").addEventListener("submit", function (e) {
  const fieldsToValidate = [
    '[name="book[organizerName]"]',
    '[name="book[department]"]',
    '[name="book[eventDetails]"]',
  ];

  let isValid = true;

  fieldsToValidate.forEach((selector) => {
    const inputField = document.querySelector(selector);
    const trimmedValue = inputField.value.trim();

    if (trimmedValue === "") {
      e.preventDefault();
      inputField.classList.add("is-invalid");
      isValid = false;
    } else {
      inputField.classList.remove("is-invalid");
    }
  });
});
