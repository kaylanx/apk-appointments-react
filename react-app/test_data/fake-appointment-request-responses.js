export const sucessfulResponse = {
  into: '#',
  status: 'mail_sent',
  message: 'Thank you for your message. It has been sent.'
}

export const validationErrorResponse = {
  into: '#',
  status: 'validation_failed',
  message: 'One or more fields have an error. Please check and try again.',
  invalidFields: [
    {
      into: 'span.wpcf7-form-control-wrap.appointment-date',
      message: 'The field is required.',
      idref: null
    },
    {
      into: 'span.wpcf7-form-control-wrap.appointment-time',
      message: 'The field is required.',
      idref: null
    },
    {
      into: 'span.wpcf7-form-control-wrap.appointment-type',
      message: 'The field is required.',
      idref: null
    },
    {
      into: 'span.wpcf7-form-control-wrap.your-name',
      message: 'The field is required.',
      idref: null
    },
    {
      into: 'span.wpcf7-form-control-wrap.your-email',
      message: 'The field is required.',
      idref: null
    },
    {
      into: 'span.wpcf7-form-control-wrap.your-phone-no',
      message: 'The field is required.',
      idref: null
    }
  ]
}

export const notFoundResponse = {
  code: 'wpcf7_not_found',
  message: 'The requested contact form was not found.',
  data: {
    status: 404
  }
}
