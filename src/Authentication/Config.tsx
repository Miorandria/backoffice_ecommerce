export const Config = {
   headers: {
      // "Content-Type": "application/json",
      "Content-Type": "multipart/form-data", // Exemple d'en-tête Content-Type
      Authorization: `Bearer ${localStorage.getItem("token_access")}`, // Exemple d'en-tête d'autorisation
      // Ajoutez d'autres en-têtes selon vos besoins
   },
};
