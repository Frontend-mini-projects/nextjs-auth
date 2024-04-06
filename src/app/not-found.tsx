import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className=" text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">The page you are looking for does not exist.</p>
      <Link href="/">
        <p className="text-blue-500 hover:text-blue-600">Go back to home page</p>
      </Link>
    </div>
  );
};

export default NotFoundPage;
