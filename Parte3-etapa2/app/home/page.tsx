"use client";

import React, { useEffect, useState } from "react";

interface Usuario {
	cpf: number;
	telefone: string[];
	datanascimento: string;
	email: string;
	senha: string;
	primeironome: string;
	sobrenome: string;
}

interface Aluno {
	matricula: number;
	usuarioCpf: number;
	usuario: Usuario;
}

export default function Home() {
	const [alunos, setAlunos] = useState<Aluno[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	function isAluno(data: any): data is Aluno {
		return (
			typeof data.matricula === "number" &&
			typeof data.usuarioCpf === "number" &&
			data.usuario !== undefined &&
			typeof data.usuario.cpf === "number"
		);
	}

	function isAlunoArray(data: any): data is Aluno[] {
		return Array.isArray(data) && data.every(isAluno);
	}

	useEffect(() => {
		async function fetchAlunos() {
			try {
				const response = await fetch("http://localhost:3333/aluno");

				if (!response.ok) {
					throw new Error("Erro ao buscar os alunos");
				}

				const data = await response.json();
				if (!isAlunoArray(data)) {
					throw new Error("Formato de dados inválido");
				}
				setAlunos(data);
			} catch (error: unknown) {
				if (error instanceof Error) {
					setError(error.message);
				} else {
					setError("Erro desconhecido");
				}
			} finally {
				setLoading(false);
			}
		}
		fetchAlunos();
	}, []);

	const openModal = (aluno: Aluno) => {
		setSelectedAluno(aluno);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setIsDeleting(false);
	};

	const handleDelete = async () => {
		if (!selectedAluno) return;

		setIsDeleting(true);
		try {
			const response = await fetch(
				`http://localhost:3333/aluno/${selectedAluno.matricula}`,
				{
					method: "DELETE",
				},
			);

			if (!response.ok) {
				throw new Error("Falha ao remover aluno");
			}

			// Atualiza a lista de alunos após a remoção
			setAlunos(
				alunos.filter((aluno) => aluno.matricula !== selectedAluno.matricula),
			);
			closeModal();
		} catch (error) {
			console.error("Erro ao remover aluno:", error);
			setError(error instanceof Error ? error.message : "Erro desconhecido");
		} finally {
			setIsDeleting(false);
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				Carregando...
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center h-screen text-red-500">
				Erro: {error}
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-start mt-32 h-screen mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4 text-center">Lista de Alunos</h1>

			{/* Tabela de Alunos */}
			<div className="overflow-x-auto w-5/12 rounded-2xl">
				<table className="min-w-full bg-white">
					<thead className="bg-purple-800 text-white text-xl">
						<tr>
							<th className="py-2 px-4 border-b">CPF</th>
							<th className="py-2 px-4 border-b">Nome</th>
						</tr>
					</thead>
					<tbody className="text-lg font-semibold">
						{alunos.map((aluno) => (
							<tr key={aluno.matricula} className="hover:bg-gray-50">
								<td className="py-2 px-4 border-b text-center">
									{aluno.usuario.cpf}
								</td>
								{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
								<td
									onClick={() => openModal(aluno)}
									className="py-2 px-4 border-b text-center underline cursor-pointer hover:text-blue-800"
								>
									{aluno.usuario.primeironome} {aluno.usuario.sobrenome}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{isModalOpen && (
				<div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
					<div className="bg-white rounded-lg p-6 w-full max-w-md">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-2xl font-bold">Detalhes do Aluno</h2>
							<button
								type="button"
								onClick={closeModal}
								className="text-gray-500 hover:text-gray-700"
							>
								{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>

						{selectedAluno && (
							<div className="space-y-3">
								<p>
									<span className="font-bold">Matrícula:</span>{" "}
									{selectedAluno.matricula}
								</p>
								<p>
									<span className="font-bold">CPF:</span>{" "}
									{selectedAluno.usuario.cpf}
								</p>
								<p>
									<span className="font-bold">Nome:</span>{" "}
									{selectedAluno.usuario.primeironome}{" "}
									{selectedAluno.usuario.sobrenome}
								</p>
								<p>
									<span className="font-bold">Email:</span>{" "}
									{selectedAluno.usuario.email}
								</p>
								<p>
									<span className="font-bold">Telefone(s):</span>{" "}
									{selectedAluno.usuario.telefone.join(", ")}
								</p>
								<p>
									<span className="font-bold">Data de Nascimento:</span>{" "}
									{new Date(
										selectedAluno.usuario.datanascimento,
									).toLocaleDateString()}
								</p>
							</div>
						)}

						<div className="mt-6 flex justify-center gap-8">
							<button
								type="button"
								onClick={handleDelete}
								disabled={isDeleting}
								className={`px-4 py-2 text-white rounded-2xl ${
									isDeleting
										? "bg-gray-400 cursor-not-allowed"
										: "bg-red-500 hover:bg-red-900"
								} transition-colors`}
							>
								{isDeleting ? "Removendo..." : "Remover Aluno"}
							</button>

							<button
								type="button"
								onClick={closeModal}
								className="px-8 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-colors"
							>
								Fechar
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
