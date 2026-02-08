type NewsletterProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
  subscribeSuccess: string;
  subscribeError: string;
};

export function Newsletter({
  handleSubmit,
  isPending,
  subscribeSuccess,
  subscribeError,
}: NewsletterProps) {
  return (
    <div className="mx-auto mb-10 w-full max-w-xl rounded-xl bg-transparent border border-white/10 p-6 sm:p-8">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-5">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="w-full bg-transparent border-b border-[#363636] focus:border-white outline-none px-1 py-3 text-sm text-white placeholder:text-gray-500 transition-all duration-300"
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="w-full bg-transparent border-b border-[#363636] focus:border-white outline-none px-1 py-3 text-sm text-white placeholder:text-gray-500 transition-all duration-300"
            required
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="w-full bg-transparent border-b border-[#363636] focus:border-white outline-none px-1 py-3 text-sm text-white placeholder:text-gray-500 transition-all duration-300"
          required
        />

        {(subscribeSuccess || subscribeError) && (
          <p
            className={`text-center text-sm font-medium ${
              subscribeSuccess
                ? "text-[rgb(46,139,87)]"
                : "text-[rgb(205,28,24)]"
            }`}
          >
            {subscribeSuccess || subscribeError}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="mt-2 mx-auto w-full sm:w-auto border border-white/90 rounded-sm px-10 py-3 text-xs text-white uppercase tracking-[0.15em] hover:bg-white hover:text-[#282828] transition-all duration-300 font-light disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-white disabled:cursor-not-allowed"
        >
          {isPending ? "Processing..." : "Sign Up!"}
        </button>
      </form>
    </div>
  );
}
