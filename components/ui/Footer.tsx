export default function Footer() {
  return (
    <footer className="bg-blue-500 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-center items-center">
          <p className="text-white text-center">
            © {new Date().getFullYear()} buildwithanie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
