import { useRouteError } from "react-router-dom";

export default function errorPage() {
  const error = useRouteError();
  return (
    <div className="space-y-8">
      <h1 className="text-center text-6xl font-extrabold mt-20 text-orange-600">
        Kruger CRM
      </h1>
      <p className="text-center">Hubo un error</p>
      <p className="text-center">{error.message}</p>
    </div>
  );
}
