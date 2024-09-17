import toast from "react-hot-toast";

export const handleError = (error: unknown) => {
  let message;
  if (error instanceof Error) {
    message = error.message;
  } else if (error === "string") {
    message = error;
  } else {
    message = "Unknown error has occurred";
  }
  toast.error(message);
};
