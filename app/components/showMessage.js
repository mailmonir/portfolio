import Alert from './alert'

const ShowMessage = ({errors, reset}) => {
  return (
    <>
    {(errors?.serverError?.message || errors?.successMsg?.message) && (
        <Alert
          type={
            errors?.serverError?.message
              ? "error"
              : errors?.successMsg?.message && "success"
          }
          message={
            errors?.serverError?.message
              ? errors?.serverError?.message
              : errors?.successMsg?.message && errors?.successMsg?.message
          }
          clickCloseBtn={reset}
        />
      )}
      </>
  )
}

export default ShowMessage
