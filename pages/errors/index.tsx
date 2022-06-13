function ErrorTest() {
  return (
    <button
      type="button"
      onClick={() => {
        throw new Error('Sentry Frontend Error');
      }}
    >
      Throw error
    </button>
  );
}

export default ErrorTest;
