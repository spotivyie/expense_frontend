import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const API_BASE = "http://localhost:8000/api/v1/auth";

export function useProfile() {
    const { updateUser } = useContext(UserContext);
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        profileImageFile: null,
        profileImageUrl: "",
    });

    const [preview, setPreview] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const fileInputRef = useRef(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) return;

        axios
        .get(`${API_BASE}/getUser`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            const { fullName, email, profileImageUrl } = res.data;

            const updatedUrl = profileImageUrl
                ? `${profileImageUrl}?t=${new Date().getTime()}`
                : "";

            setForm((prev) => ({
                ...prev,
                fullName,
                email,
                profileImageUrl: updatedUrl,
            }));

            if (updatedUrl) setPreview(updatedUrl);

            updateUser({
                ...res.data,
                profileImageUrl: updatedUrl,
            });
        });
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        setForm((prev) => ({ ...prev, profileImageFile: file }));
        setPreview(URL.createObjectURL(file));
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
        const formData = new FormData();
        formData.append("fullName", form.fullName);
        formData.append("email", form.email);
        if (form.password) formData.append("password", form.password);
        if (form.profileImageFile) formData.append("profileImage", form.profileImageFile);

        const res = await axios.put(`${API_BASE}/updateProfile`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        setSuccess("Perfil atualizado com sucesso!");

        if (res.data.user.profileImageUrl) {
        const updatedUrl = `${res.data.user.profileImageUrl}?t=${new Date().getTime()}`;
        setPreview(updatedUrl);
        setForm((prev) => ({
            ...prev,
            password: "",
            profileImageUrl: updatedUrl,
            profileImageFile: null,
        }));

        updateUser({
            ...res.data.user,
            profileImageUrl: updatedUrl,
        });
        } else {
        setForm((prev) => ({
            ...prev,
            password: "",
            profileImageFile: null,
        }));
            updateUser(res.data.user);
        }

        } catch {
            setError("Erro ao atualizar perfil");
        }
    };

    return {
        form,
        preview,
        error,
        success,
        fileInputRef,
        handleChange,
        handleImageChange,
        triggerFileInput,
        handleSubmit,
    };
}
