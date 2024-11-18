import axios from "axios";

export const fetchContacts = async () => {
    try {
        const response = await axios.get("http://localhost:8081/");
        console.log(response.data);

        return response.data;
    } catch (err) {
        console.error(err.message);
        return null;
    }
};


export const fetchUser = async () => {
    try {
        const response = await axios.get("http://localhost:8081/user");
        console.log("Fetched users:", response.data);
        return response.data;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

export const addUser = (name, pass) => {
    axios.post("http://localhost:8081/create", { name, pass })
        .then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);

        })
}


export const addContact = async (userId, name, email, phone) => {
    try {
        const response = await axios.post("http://localhost:8081/contact", {
            userId,
            name,
            email,
            phone,
        });
        console.log("Contact added:", response.data);
    } catch (err) {
        console.error("Error adding contact:", err.message);
        throw err;
    }
};

export const deleteContact = async (email) => {
    try {
        const response = await axios.delete(`http://localhost:8081/contact/${email}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting contact:", error.message);
        throw new Error("Failed to delete contact. Please try again.");
    }
};




export const loginUser = async (username, password) => {
    try {
        const response = await axios.post("http://localhost:8081/login", { username, password });
        if (response.data.success) {
            console.log(response.data.message);
            alert(response.data.message);
            return true;
        }
        alert(response.data.message);
        return false;
    } catch (error) {
        console.error("Login error:", error.message);
        alert("An error occurred. Please try again.");
        return false;
    }
};
