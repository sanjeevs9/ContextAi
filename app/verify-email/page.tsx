export default function VerifyEmail() {
  return (
    <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Check your email
        </h1>
        <p className="text-gray-600">
          We&apos;ve sent you an email with a verification link. Please check
          your inbox and click the link to verify your account.
        </p>
      </div>
    </div>
  );
}
