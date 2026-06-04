import toast from "react-hot-toast";

export const handleApiError = (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    switch (status) {
        case 400:
            toast.error(message || "Invalid request");
            break;

        case 401:
            toast.error(message || "Invalid credentials");
            break;

        case 409:
            toast.error(message || "User already exists");
            break;

        case 500:
            toast.error("Server error. Please try again later");
            break;

        default:
            toast.error(message || "Something went wrong");
    }
};