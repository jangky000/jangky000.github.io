function ErrorTest() {
  return (
    <>
      <div>
        process.env.NEXT_PUBLIC_APP_STAGE: {process.env.NEXT_PUBLIC_APP_STAGE}
      </div>
      <div>process.env.NODE_ENV: {process.env.NODE_ENV}</div>
      <button
        type="button"
        onClick={() => {
          throw new Error('Sentry Frontend Error');
        }}
      >
        Throw error
      </button>
    </>
  );
}

export default ErrorTest;
