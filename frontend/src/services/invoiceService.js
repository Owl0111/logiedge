import axios from "axios";

const baseURL = 'http://localhost:3000/api'
const invoiceURL = `${baseURL}/invoice`

const createInvoice = async (invoice) => {
    const response = await axios.post(invoiceURL, invoice);
    const data = await response.data;
    return data;
}

const getInvoices  = async () => {
    const response = await axios.get(invoiceURL);
    const data = await response.data;
    return data;
}

const getInvoiceById = async (id) => {
    const response = await axios.get(`${invoiceURL}/${id}`);
    const data = await response.data;
    return data;
}
export default {createInvoice, getInvoices,getInvoiceById};
