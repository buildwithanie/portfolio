export default function Footer() {
  return (
    <footer className="bg-red-500 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-center items-center">
          <p className="text-blue-600 text-center">
            © {new Date().getFullYear()} Annita.githinji. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
