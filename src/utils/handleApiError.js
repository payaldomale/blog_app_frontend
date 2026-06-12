import toast from "react-hot-toast";

export const handleApiError = (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    // Network error (no response from server)
    if (!error?.response) {
        toast.error("Network error. Please check your connection.");
        return;
    }

    switch (status) {
        case 400:
            toast.error(message || "Invalid request");
            break;

        case 401:
            toast.error(message || "Unauthorized access");
            break;

        case 403:
            toast.error(message || "You are not allowed to do this action");
            break;

        case 404:
            toast.error(message || "Resource not found");
            break;

        case 409:
            toast.error(message || "Conflict occurred");
            break;

        case 500:
            toast.error("Server error. Please try again later");
            break;

        default:
            toast.error(message || "Something went wrong");
    }
};