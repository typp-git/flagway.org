export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center space-y-4 mt-12">
      <h1 className="text-4xl font-bold text-red-900">
        Authentication code error!
      </h1>
      <p>
        There was an link you used has expired. Please try to log in again or
        request a new link.
      </p>
    </div>
  );
}
