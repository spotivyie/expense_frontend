import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useProfile } from "../../hooks/useProfile";

const ProfileEdit = () => {
    const {
        form,
        preview,
        error,
        success,
        fileInputRef,
        handleChange,
        handleImageChange,
        triggerFileInput,
        handleSubmit,
    } = useProfile();

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className="max-w-md mx-auto mt-10 mb-20 px-5 border bg-white p-6 rounded-xl border-gray-100">
                <h2 className="text-3xl mb-6 text-center">Editar Perfil</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleImageChange}
                    />

                    <div
                        onClick={triggerFileInput}
                        title="Clique para alterar foto"
                        className="w-32 h-32 mx-auto mb-5 rounded-full border-2 border-gray-300 bg-gray-100 cursor-pointer overflow-hidden flex items-center justify-center hover:bg-gray-200 transition"
                    >
                        {preview ? (
                            <img src={preview} alt="Pré-visualização da foto" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-gray-400 text-6xl select-none">+</span>
                        )}
                    </div>

                    <label className="block">
                        Nome completo
                        <input
                            type="text"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </label>

                    <label className="block">
                        Email
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </label>

                    <label className="block">
                        Nova senha (opcional)
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Nova senha (opcional)"
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </label>

                    {error && <p className="text-red-600">{error}</p>}
                    {success && <p className="text-green-600">{success}</p>}

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition"
                    >
                        Salvar Alterações
                    </button>
                </form>
            </div>
        </DashboardLayout>
    );
};

export default ProfileEdit;
