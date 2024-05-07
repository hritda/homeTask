import { useRouteError } from "react-router-dom";
interface RouteError {
  data: string;
  error: {
    columnNumber: number;
    fileName: string;
    lineNumber: number;
    message: string;
    stack: string;
  };
  internal: boolean;
  status: number;
  statusText: string;
}
export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="mt-3">Oops!</h1>
          <p>Sorry, an unexpected error has occurred</p>
          <p>
            <em>{JSON.stringify(error)}</em>
          </p>
        </div>
      </div>
    </div>
  );
}
