import { useState, useEffect } from "react";
import {
  fetchAllProducts,
  fetchProductById,
  addProduct,
  editProduct,
  deleteProduct,
  scheduleTransfer,
  concludeTransfer,
} from "../lib/api";

export function useCarData() {
  const [cars, setCars] = useState([]);
  const [car, setCar] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function getAllCars() {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAllProducts();
      setCars(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function getCarById(id) {
    setLoading(true);
    setError("");
    try {
      const data = await fetchProductById(id);
      setCar(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function createCar(carData, token) {
    setLoading(true);
    setError("");
    try {
      const data = await addProduct(carData, token);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateCar(id, carData, token) {
    setLoading(true);
    setError("");
    try {
      const data = await editProduct(id, carData, token);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function removeCar(id, token) {
    setLoading(true);
    setError("");
    try {
      await deleteProduct(id, token);
      // Atualiza a lista de carros após a exclusão
      setCars((prevCars) => prevCars.filter((car) => car._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function scheduleCarTransfer(id, scheduleData, token) {
    setLoading(true);
    setError("");
    try {
      const data = await scheduleTransfer(id, scheduleData, token);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function concludeCarTransfer(id, token) {
    setLoading(true);
    setError("");
    try {
      const data = await concludeTransfer(id, token);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    cars,
    car,
    error,
    loading,
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    removeCar,
    scheduleCarTransfer,
    concludeCarTransfer,
  };
}
