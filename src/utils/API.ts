// /* eslint-disable no-useless-catch */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from "axios";
// import { decryptData } from "./Helper";
// import {
//   branch_slug,
//   dashboard_slug,
//   department_slug,
//   form_slug,
//   menu_slug,
//   password_slug,
//   profile_slug,
//   role_permission_slug,
//   role_slug,
//   service_slug,
//   tenant_slug,
//   ticket_slug,
//   user_slug,
// } from "./const";
// // import CryptoJS from "crypto-js";

// export const API = axios.create({
//   baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
// });

// export const CommanAPI = axios.create({
//   baseURL: import.meta.env.VITE_BACKEND_AUTH_URL,
// });

// CommanAPI.interceptors.request.use(async (config) => {
//   const localStorageData = decryptData(`authData`, "object");
//   if (localStorageData?.token) {
//     config.headers.Authorization = `Bearer ${localStorageData?.token}`;
//   }
//   return config;
// });

// API.interceptors.request.use(async (config) => {
//   const localStorageData = decryptData(`authData`, "object");
//   if (localStorageData?.token) {
//     config.headers.Authorization = `Bearer ${localStorageData?.token}`;
//   }
//   return config;
// });

// API.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // if (error.response) {
//     //   if (error.response.status === 401 || error.response.status === 403) {
//     //     message.error('Invalid token. Please login again.');
//     //     localStorage.removeItem(`authData`);
//     //     window.location.href = "/";
//     //   }
//     // }
//     return Promise.reject(error);
//   }
// );

// // dashboard
// export const getDashboardData = async () => {
//   const response = await API.get(`/${user_slug}/${dashboard_slug}`);
//   return response;
// };

// export const exportData = async () => {
//   const response = await API.get(`/${user_slug}/export`, {
//     responseType: "blob",
//   });
//   return response;
// };

// export const storeTenantData = async (formData: any) => {
//   const response = await API.post(`/${tenant_slug}/create`, formData);
//   return response;
// };

// // menus
// export const getAllMenus = async (params?: any) => {
//   const response = await API.get(`/${menu_slug}`, { params });
//   return response;
// };

// export const storeMenu = async (formData: any) => {
//   const response = await API.post(`/${menu_slug}`, formData);
//   return response;
// };

// export const getMenuById = async (id: string) => {
//   try {
//     const response = await API.get(`/${menu_slug}/${id}`);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateMenuStatus = async (
//   id: string,
//   data: { isActive?: boolean }
// ) => {
//   const response = await API.patch(`/${menu_slug}/${id}/toggle-status`, data);
//   return response;
// };

// export const updateMenu = async (id: string, data: any) => {
//   try {
//     const response = await API.patch(`/${menu_slug}/${id}`, data);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const deleteMenu = async (id: string) => {
//   const response = await API.delete(`/${menu_slug}/${id}`);
//   return response;
// };

// // departments
// export const getDepartments = async () => {
//   const response = await API.get(`/${department_slug}/active`);
//   return response;
// };

// export const getAllDepartments = async (params: any) => {
//   const response = await API.get(`/${department_slug}`, { params });
//   return response;
// };

// export const storeDepartment = async (formData: any) => {
//   const response = await API.post(`/${department_slug}`, formData);
//   return response;
// };

// export const getDepartmentById = async (id: string) => {
//   try {
//     const response = await API.get(`/${department_slug}/${id}`);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateDepartmentStatus = async (
//   id: string,
//   data: { isActive?: boolean }
// ) => {
//   const response = await API.patch(
//     `/${department_slug}/${id}/toggle-status`,
//     data
//   );
//   return response;
// };

// export const updateDepartment = async (id: string, data: any) => {
//   try {
//     const response = await API.patch(`/${department_slug}/${id}`, data);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const deleteDepartment = async (id: string) => {
//   const response = await API.delete(`/${department_slug}/${id}`);
//   return response;
// };

// // roles
// export const getRoles = async () => {
//   const response = await API.get(`/${role_slug}/active`);
//   return response;
// };

// export const getAllRoles = async (params: any) => {
//   const response = await API.get(`/${role_slug}`, { params });
//   return response;
// };

// export const storeRole = async (formData: any) => {
//   const response = await API.post(`/${role_slug}`, formData);
//   return response;
// };

// export const getRoleById = async (id: string) => {
//   try {
//     const response = await API.get(`/${role_slug}/${id}`);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateRoleStatus = async (
//   id: string,
//   data: { isActive?: boolean }
// ) => {
//   const response = await API.patch(`/${role_slug}/${id}/toggle-status`, data);
//   return response;
// };

// export const updateRole = async (id: string, data: any) => {
//   try {
//     const response = await API.put(`/${role_slug}/${id}`, data);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const deleteRole = async (id: string) => {
//   const response = await API.delete(`/${role_slug}/${id}`);
//   return response;
// };

// export const restoreRole = async (id: string) => {
//   const response = await API.post(`/${role_slug}/${id}/restore`);
//   return response;
// };

// // tenant
// export const getTenant = async () => {
//   try {
//     const response = await API.get(`/${tenant_slug}/active`);
//     return response;
//   } catch (error) {
//     throw error
//   }
// };

// export const getAllTenants = async (params: any) => {
//   const response = await API.get(`/${tenant_slug}`, { params });
//   return response;
// };

// export const storeTenant = async (formData: any) => {
//   const response = await API.post(`/${tenant_slug}`, formData);
//   return response;
// };

// export const getTenantById = async (id: string) => {
//   try {
//     const response = await API.get(`/${tenant_slug}/${id}`);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateTenantStatus = async (
//   id: string,
//   data: { isActive?: boolean }
// ) => {
//   const response = await API.patch(`/${tenant_slug}/${id}/toggle-status`, data);
//   return response;
// };

// export const updateTenant = async (id: string, data: any) => {
//   try {
//     const response = await API.put(`/${tenant_slug}/${id}`, data);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const deleteTenant = async (id: string) => {
//   const response = await API.delete(`/${tenant_slug}/${id}`);
//   return response;
// };

// // users
// export const getBranchByDepartment = async (id: string) => {
//   const response = await API.get(`/${branch_slug}/${id}/${department_slug}`);
//   return response;
// };

// export const getUsers = async () => {
//   const response = await API.get(`/${user_slug}`);
//   return response;
// };

// export const getAllUsers = async (params: any) => {
//   const response = await API.get(`/${user_slug}`, { params });
//   return response;
// };

// export const storeUser = async (formData: any) => {
//   try {
//     const response = await API.post(`/${user_slug}`, formData);
//     return response;
    
//   } catch (error) {
//     throw error
//   }
// };

// export const getUserById = async (id: string) => {
//   try {
//     const response = await API.get(`/${user_slug}/${id}`);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateUserStatus = async (
//   id: string,
//   data: { isActive?: boolean }
// ) => {
//   const response = await API.patch(`/${user_slug}/${id}/toggle-status`, data);
//   return response;
// };

// export const updateUser = async (id: string, data: any) => {
//   try {
//     const response = await API.patch(`/${user_slug}/${id}`, data);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const deleteUser = async (id: string) => {
//   const response = await API.delete(`/${user_slug}/${id}`);
//   return response;
// };

// export const restoreUser = async (id: string) => {
//   const response = await API.post(`/${user_slug}/${id}/restore`);
//   return response;
// };

// // branches
// export const getBranches = async () => {
//   const response = await API.get(`/${branch_slug}/active`);
//   return response;
// };

// export const getAllBranches = async (params: any) => {
//   const response = await API.get(`/${branch_slug}`, { params });
//   return response;
// };

// export const storeBranch = async (formData: any) => {
//   const response = await API.post(`/${branch_slug}`, formData);
//   return response;
// };

// export const getBranchById = async (id: string) => {
//   try {
//     const response = await API.get(`/${branch_slug}/${id}`);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateBranchStatus = async (
//   id: string,
//   data: { isActive?: boolean }
// ) => {
//   const response = await API.patch(`/${branch_slug}/${id}/toggle-status`, data);
//   return response;
// };

// export const updateBranch = async (id: string, data: any) => {
//   try {
//     const response = await API.patch(`/${branch_slug}/${id}`, data);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const deleteBranch = async (id: string) => {
//   const response = await API.delete(`/${branch_slug}/${id}`);
//   return response;
// };

// // services
// export const getServices = async () => {
//   const response = await API.get(`/${service_slug}`);
//   return response;
// };

// export const getAllServices = async (params: any) => {
//   const response = await API.get(`/${service_slug}`, { params });
//   return response;
// };

// export const storeService = async (formData: any) => {
//   const response = await API.post(`/${service_slug}`, formData);
//   return response;
// };

// export const getServiceById = async (id: string) => {
//   try {
//     const response = await API.get(`/${service_slug}/${id}`);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateServiceStatus = async (
//   id: string,
//   data: { isActive?: boolean }
// ) => {
//   const response = await API.patch(
//     `/${service_slug}/${id}/toggle-status`,
//     data
//   );
//   return response;
// };

// export const updateService = async (id: string, data: any) => {
//   try {
//     const response = await API.patch(`/${service_slug}/${id}`, data);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const deleteService = async (id: string) => {
//   const response = await API.delete(`/${service_slug}/${id}`);
//   return response;
// };

// export const restoreService = async (id: string) => {
//   const response = await API.post(`/${service_slug}/${id}/restore`);
//   return response;
// };

// export const forgetPassword = async (data: any) => {
//   try {
//     const response = await CommanAPI.post(`/forget-password`, data);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// // login
// export const login = async (data: any) => {
//   try {
//     const response = await API.post(`/auth/login`, data);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// // form
// export const getAllForms = async (params?: any) => {
//   const response = await API.get(`/${form_slug}`, { params });
//   return response;
// };

// export const storeForm = async (formData: any) => {
//   const response = await API.post(`/${form_slug}`, formData);
//   return response;
// };

// export const getFormById = async (id: string) => {
//   try {
//     const response = await API.get(`/${form_slug}/${id}`);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateFormStatus = async (
//   id: string,
//   data: { isActive?: boolean }
// ) => {
//   const response = await API.patch(`/${form_slug}/${id}/toggle-status`, data);
//   return response;
// };

// export const updateForm = async (id: string, data: any) => {
//   try {
//     const response = await API.patch(`/${form_slug}/${id}`, data);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const deleteForm = async (id: string) => {
//   const response = await API.delete(`/${form_slug}/${id}`);
//   return response;
// };

// export const getActiveForm = async () => {
//   const response = await API.get(`/${form_slug}/active`);
//   return response;
// };

// export const getFormByDepartment = async (id: string) => {
//   const response = await API.get(`/${form_slug}/${id}/department`);
//   return response;
// };

// export const getRolePermissions = async (roleId: any) => {
//   try {
//     const response = await API.get(`/${role_permission_slug}/role/${roleId}`);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateRolePermissions = async (data: any) => {
//   try {
//     const response = await API.post(`/${role_permission_slug}/bulk-save`, data);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getActiveRolePermissions = async (roleId: any) => {
//   try {
//     const response = await API.get(
//       `/${role_permission_slug}/role/active/${roleId}`
//     );
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// // ticket
// export const getAllTickets = async (params?: any) => {
//   return await API.get(`${ticket_slug}`, { params });
// };

// export const getTicketById = async (id: string) => {
//   return await API.get(`${ticket_slug}}/${id}`);
// };

// export const assignTicket = async (
//   id: string,
//   data: {
//     assignedTo: string;
//   }
// ) => {
//   return await API.patch(`${ticket_slug}/${id}/assign`, data);
// };

// export const updateTicketStatus = async (
//   id: string,
//   data: {
//     status: string;
//   }
// ) => {
//   return await API.patch(`${ticket_slug}/${id}/status`, data);
// };

// export const addTicketRemark = async (
//   id: string,
//   data: {
//     message: string;
//   }
// ) => {
//   return await API.post(`${ticket_slug}/${id}/remark`, data);
// };

// export const deleteTicket = async (id: string) => {
//   return await API.delete(`${ticket_slug}/${id}`);
// };

// export const getAssignableOfficers = async (params?: any) => {
//   return await API.get(`${ticket_slug}/officers`, { params });
// };

// // profile
// export const getProfile = async (params?: any) => {
//   return await API.get(`/user/${profile_slug}/get`, { params });
// };

// export const updateProfile = async (data: any) => {
//   return await API.post(`/user/${profile_slug}/update`, data);
// };

// export const updatePassword = async (data: any) => {
//   return await API.post(`/user/${password_slug}/update`, data);
// };
