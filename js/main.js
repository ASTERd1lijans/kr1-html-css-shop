document.addEventListener('DOMContentLoaded', () => {
  const orderDialog = document.getElementById('order-dialog');
  const closeDialogButton = document.getElementById('close-order-dialog');
  const orderForm = document.getElementById('order-form');
  const selectedProductInput = document.getElementById('selected-product');
  const successMessage = document.getElementById('success-message');
  const orderButtons = document.querySelectorAll('.product-card__button');

  if (orderButtons.length > 0 && orderDialog) {
    orderButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const productName = button.dataset.product || '';
        if (selectedProductInput) {
          selectedProductInput.value = productName;
        }
        orderDialog.showModal();
      });
    });
  }

  if (closeDialogButton && orderDialog) {
    closeDialogButton.addEventListener('click', () => {
      orderDialog.close();
    });
  }

  if (orderDialog) {
    orderDialog.addEventListener('click', (event) => {
      const rect = orderDialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        orderDialog.close();
      }
    });
  }

  if (orderForm) {
    orderForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formElements = Array.from(orderForm.elements);

      formElements.forEach((element) => {
        if (element.willValidate) {
          element.removeAttribute('aria-invalid');
        }
      });

      if (!orderForm.checkValidity()) {
        formElements.forEach((element) => {
          if (element.willValidate && !element.checkValidity()) {
            element.setAttribute('aria-invalid', 'true');
          }
        });
        orderForm.reportValidity();
        return;
      }

      if (successMessage) {
        successMessage.hidden = false;
      }
      orderForm.reset();
      if (orderDialog) {
        orderDialog.close();
      }
    });
  }
});