export default function Error() {
  return (
    <div className="flex items-center justify-center min-h-[75vh]">
      <div className="text-center space-y-4">
        <h1>oops! 500</h1>
        <p>something went wrong.</p>
        <p>
          <a href="/">go back home</a>
        </p>
      </div>
    </div>
  );
}
