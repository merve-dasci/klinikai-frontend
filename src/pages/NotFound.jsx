import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8f5f2] px-4">
      <h1 className="text-7xl font-bold text-[#e8d5cf]">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-[#5c4a42]">
        Page Not Found
      </h2>
      <p className="mt-2 text-sm text-[#9a7f73]">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/dashboard"
        className="mt-6 rounded-xl bg-[#e8d5cf] px-6 py-3 text-sm font-medium text-[#5c4a42] transition hover:bg-[#dbc4bd]"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;
