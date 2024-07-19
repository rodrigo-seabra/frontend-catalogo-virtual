const API_URL = "https://apicatalogovirtual.onrender.com";

export async function fetchCars() {
  const response = await fetch(`${API_URL}/products/getall`);
  const data = await response.json();
  return data;
}

export async function fetchCarDetails(id) {
  const response = await fetch(`${API_URL}/products/get/${id}`);
  const data = await response.json();
  return data;
}

export async function deleteProduct(id, token) {
  const response = await fetch(`${API_URL}/products/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao deletar produto");
  }

  return { message: "Produto deletado com sucesso" };
}

export async function addProduct(car, token) {
  const formData = new FormData();

  formData.append("name", car.name);
  formData.append("category", car.category);
  formData.append("modelVehicle", car.modelVehicle);
  formData.append("year", car.year);
  formData.append("brand", car.brand);
  formData.append("description", car.description);
  formData.append("status", car.status);

  if (car.images && car.images.length > 0) {
    car.images.forEach((image, index) => {
      formData.append(`images[${index}]`, image, image.name);
    });
  } else {
    throw new Error("A imagem é obrigatória");
  }

  const response = await fetch(`${API_URL}/products/store`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao cadastrar produto");
  }

  const data = await response.json();
  return data;
}

export async function editProduct(id, product, token) {
  const formData = new FormData();

  formData.append("name", product.name);
  formData.append("category", product.category);
  formData.append("modelVehicle", product.modelVehicle);
  formData.append("year", product.year);
  formData.append("brand", product.brand);
  formData.append("description", product.description);
  formData.append("status", product.status);

  if (product.images && product.images.length > 0) {
    product.images.forEach((image, index) => {
      formData.append(`images[${index}]`, image, image.name);
    });
  }

  const response = await fetch(`${API_URL}/products/edit/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao editar produto");
  }

  const data = await response.json();
  return data;
}

export async function scheduleTransfer(id, scheduleData, token) {
  const response = await fetch(`${API_URL}/products/schedule/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(scheduleData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao agendar transferência");
  }

  const data = await response.json();
  return data;
}

export async function concludeTransfer(id, token) {
  const response = await fetch(`${API_URL}/products/conclude/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao concluir transferência");
  }

  const data = await response.json();
  return data;
}

export async function scheduleConsultation(carId, userId, date) {
  const response = await fetch(`${API_URL}/consultations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ carId, userId, date }),
  });
  const data = await response.json();
  return data;
}

export async function fetchUserConsultations(userId) {
  const response = await fetch(`${API_URL}/users/${userId}/consultations`);
  const data = await response.json();
  return data;
}

export async function registerUser(user) {
  const formData = new FormData();

  formData.append("name", user.name);
  formData.append("email", user.email);
  formData.append("password", user.password);

  if (user.image) {
    formData.append("image", user.image, user.image.name);
  }

  const response = await fetch(`${API_URL}/user`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao cadastrar usuário");
  }

  const data = await response.json();
  return data;
}

export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao fazer login");
  }

  const data = await response.json();
  return data;
}

export async function updateUser(id, user, token) {
  const formData = new FormData();

  formData.append("name", user.name);
  formData.append("email", user.email);
  formData.append("password", user.password);

  if (user.image) {
    formData.append("image", user.image, user.image.name);
  }

  const response = await fetch(`${API_URL}/user/update/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao atualizar usuário");
  }

  const data = await response.json();
  return data;
}
