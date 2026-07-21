import { Link } from "react-router-dom";

const AuthLayout = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 overflow-hidden rounded-3xl shadow-xl border">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-slate-100 via-white to-slate-200">
          <div>
            <Link
              to="/"
              className="text-3xl font-bold tracking-tight"
            >
              Planner
            </Link>

            <p className="mt-3 text-gray-600 leading-relaxed max-w-sm">
              A calm place to organize your work, personal life and everything
              in between.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold">
              Stay organized.
            </h2>

            <p className="mt-4 text-gray-600 max-w-sm">
              Plan your day, keep track of your progress and finish what
              matters.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-white p-8 md:p-12 flex items-center">
          <div className="w-full">

            <div className="mb-8">
              <h1 className="text-3xl font-bold">
                {title}
              </h1>

              <p className="mt-2 text-gray-500">
                {subtitle}
              </p>
            </div>

            {children}

          </div>
        </div>

      </div>
    </section>
  );
};

export default AuthLayout;