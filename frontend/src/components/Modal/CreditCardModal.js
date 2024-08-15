import React, { useState } from "react";
import {
  Modal,
  TextField,
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Backdrop,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import visaLogo from "../../assets/img/visa-logo.png";
import masterCardLogo from "../../assets/img/mastercard-logo.png";
import "./CreditCardModal.scss";
import { getCardLogo } from "../../utils/getCardLogo";
import Summary from "../Backdrop/Backdrop";

import {
  isValidCreditCardNumber,
  isValidExpiryDate,
  isValidCVV,
} from "../../utils/validateCard";

const currentYear = new Date().getFullYear();
const years = Array.from(new Array(20), (val, index) => currentYear + index);

const menuProps = {
  PaperProps: {
    style: {
      maxHeight: 200,
    },
  },
};

const CreditCardModal = ({ open, handleClose }) => {
  const [backdropOpen, setBackdropOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      expirationMonth: "",
      expirationYear: "",
      cvv: "",
      cardholderName: "",
      documentType: "",
      documentNumber: "",
      installments: "",
      acceptTerms: false,
    },
    validationSchema: Yup.object({
      cardNumber: Yup.string()
        .required("Número de tarjeta es requerido")
        .test(
          "valid-card-number",
          "Número de tarjeta inválido",
          isValidCreditCardNumber
        ),
      expirationMonth: Yup.string()
        .required("Mes de expiración es requerido")
        .test(
          "valid-expiration",
          "Fecha de expiración inválida",
          function (value) {
            const { expirationYear } = this.parent;
            return isValidExpiryDate(value, expirationYear);
          }
        ),
      expirationYear: Yup.string().required("Año de expiración es requerido"),
      cvv: Yup.string()
        .required("CVV es requerido")
        .test("valid-cvv", "CVV inválido", isValidCVV),
      cardholderName: Yup.string().required(
        "Nombre en la tarjeta es requerido"
      ),
      documentType: Yup.string().required("Tipo de documento es requerido"),
      documentNumber: Yup.string().required("Número de documento es requerido"),
      installments: Yup.string().required("Número de cuotas es requerido"),
      acceptTerms: Yup.boolean().oneOf(
        [true],
        "Debe aceptar los términos y condiciones"
      ),
    }),
    onSubmit: (creditCardPayload) => {
      localStorage.setItem(
        "creditCardPayload",
        JSON.stringify(creditCardPayload)
      );
      console.log("Formulario de tarjeta enviado:", creditCardPayload);
      handleClose();
    },
  });

  return (
    <>
      <Modal open={open} onClose={handleClose} className="credit-card-modal">
        <div className="modal-content">
          <div className="header">
            <IconButton onClick={handleClose} className="back-button">
              <ArrowBackIcon />
            </IconButton>
            <h2>Detalles de la Tarjeta</h2>
          </div>
          <div className="img-accepted">
            <p className="accepted-cards-title">Aceptamos</p>
            <div className="logos">
              <img src={visaLogo} alt="Visa Logo" />
              <img src={masterCardLogo} alt="MasterCard Logo" />
            </div>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="cardNumber"
                  label="Número de Tarjeta"
                  value={formik.values.cardNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.cardNumber &&
                    Boolean(formik.errors.cardNumber)
                  }
                  helperText={
                    formik.touched.cardNumber && formik.errors.cardNumber
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {formik.values.cardNumber &&
                          getCardLogo(formik.values.cardNumber) && (
                            <img
                              src={getCardLogo(formik.values.cardNumber)}
                              alt="Card Logo"
                              style={{ width: "40px" }}
                            />
                          )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="expirationMonth-label">Mes</InputLabel>
                  <Select
                    labelId="expirationMonth-label"
                    name="expirationMonth"
                    value={formik.values.expirationMonth}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    input={<OutlinedInput label="Mes" />}
                    error={
                      formik.touched.expirationMonth &&
                      Boolean(formik.errors.expirationMonth)
                    }
                    MenuProps={menuProps}
                  >
                    {[...Array(12)].map((_, i) => {
                      const month = String(i + 1).padStart(2, "0");
                      const monthName = new Date(0, i).toLocaleString(
                        "default",
                        { month: "long" }
                      );
                      return (
                        <MenuItem key={month} value={month}>
                          {month} - {monthName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="expirationYear-label">Año</InputLabel>
                  <Select
                    labelId="expirationYear-label"
                    name="expirationYear"
                    value={formik.values.expirationYear}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    input={<OutlinedInput label="Año" />}
                    error={
                      formik.touched.expirationYear &&
                      Boolean(formik.errors.expirationYear)
                    }
                    MenuProps={menuProps}
                  >
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="cvv"
                  label="CVV"
                  value={formik.values.cvv}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.cvv && Boolean(formik.errors.cvv)}
                  helperText={formik.touched.cvv && formik.errors.cvv}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="cardholderName"
                  label="Nombre en la Tarjeta"
                  value={formik.values.cardholderName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.cardholderName &&
                    Boolean(formik.errors.cardholderName)
                  }
                  helperText={
                    formik.touched.cardholderName &&
                    formik.errors.cardholderName
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="documentType-label">
                    Tipo de Documento
                  </InputLabel>
                  <Select
                    labelId="documentType-label"
                    name="documentType"
                    value={formik.values.documentType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    input={<OutlinedInput label="Tipo de Documento" />}
                    error={
                      formik.touched.documentType &&
                      Boolean(formik.errors.documentType)
                    }
                    MenuProps={menuProps}
                  >
                    <MenuItem value="CC">Cédula de Ciudadanía</MenuItem>
                    <MenuItem value="TI">Tarjeta de Identidad</MenuItem>
                    <MenuItem value="CE">Cédula de Extranjería</MenuItem>
                    <MenuItem value="PP">Pasaporte</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="documentNumber"
                  label="Número de Documento"
                  value={formik.values.documentNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.documentNumber &&
                    Boolean(formik.errors.documentNumber)
                  }
                  helperText={
                    formik.touched.documentNumber &&
                    formik.errors.documentNumber
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="installments"
                  label="Número de Cuotas"
                  value={formik.values.installments}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.installments &&
                    Boolean(formik.errors.installments)
                  }
                  helperText={
                    formik.touched.installments && formik.errors.installments
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="acceptTerms"
                      color="primary"
                      checked={formik.values.acceptTerms}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  }
                  label="Acepto haber leído los términos y condiciones"
                />
                {formik.touched.acceptTerms &&
                  Boolean(formik.errors.acceptTerms) && (
                    <p style={{ color: "red" }}>{formik.errors.acceptTerms}</p>
                  )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                  className="payment-button"
                  onClick={() => setBackdropOpen(true)}
                >
                  Payment
                </Button>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backdropFilter: "blur(4px)",
                  }}
                  open={backdropOpen}
                  onClick={() => setBackdropOpen(false)}
                >
                  <div onClick={(e) => e.stopPropagation()}>
                    <Summary />
                  </div>
                </Backdrop>
              </Grid>
            </Grid>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default CreditCardModal;
