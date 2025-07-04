type ErrorMessageProps = {
  children: React.ReactNode;
};

export const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <p className="bg-red-50 text-red-600 p-3 font-semibold rounded-lg">
      {children}
    </p>
  );
};
