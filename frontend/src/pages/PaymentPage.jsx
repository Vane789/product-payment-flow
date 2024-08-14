import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { initializeCart } from "../store/actions/carAction";
import { getCartItems } from "../utils/getCarItem";
import Header from "../components/Header/Header";
import CreditCardModal from "../components/Modal/CreditCardModal";
import "../index.scss";
import { TextField, Grid, Button, Container, Paper } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Nombre es requerido"),
  surname: Yup.string().required("Apellidos son requeridos"),
  city: Yup.string().required("Ciudad es requerida"),
  phone: Yup.string().required("Celular es requerido"),
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("Correo electrónico es requerido"),
  shippingAddress: Yup.string().required("Dirección de envío es requerida"),
  details: Yup.string(),
});

const PaymentPage = () => {
  const dispatch = useDispatch();
  const [carItem, setCarItem] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setCarItem(getCartItems(dispatch, initializeCart));
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      department: "Colombia",
      city: "",
      phone: "",
      email: "",
      shippingAddress: "",
      details: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Formulario enviado:", values);
      setModalOpen(true);
    },
  });

  return (
    <>
      <Header cartCount={carItem} />
      <h4>Detalles de facturación</h4>
      <Container component="main" maxWidth="md">
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="name"
                  label="Nombre"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="surname"
                  label="Apellidos"
                  value={formik.values.surname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.surname && Boolean(formik.errors.surname)
                  }
                  helperText={formik.touched.surname && formik.errors.surname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="department"
                  label="Departamento"
                  value={formik.values.department}
                  InputProps={{ readOnly: true }} // Campo no editable
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="city"
                  label="Ciudad"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Celular"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  label="Correo Electrónico"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="shippingAddress"
                  label="Dirección de Envío"
                  value={formik.values.shippingAddress}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.shippingAddress &&
                    Boolean(formik.errors.shippingAddress)
                  }
                  helperText={
                    formik.touched.shippingAddress &&
                    formik.errors.shippingAddress
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="details"
                  label="Detalles (Apartamento, Casa, Oficina)"
                  value={formik.values.details}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.details && Boolean(formik.errors.details)
                  }
                  helperText={formik.touched.details && formik.errors.details}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  className="custom-button"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Pay with Credit Card
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
      <CreditCardModal
        open={isModalOpen}
        handleClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default PaymentPage;
