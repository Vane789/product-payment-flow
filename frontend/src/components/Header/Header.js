import { AppBar, Toolbar, IconButton, Badge } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import "../../scss/layout/_header.scss";
import logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";

const Header = ({ cartCount }) => (
  <AppBar position="static" className="header">
    <Toolbar>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="cart-button">
        <Link to="/cart" className="no-link-style">
          <IconButton color="inherit">
            <Badge badgeContent={cartCount} color="error">
              <ShoppingBagIcon />
            </Badge>
          </IconButton>
        </Link>
      </div>
    </Toolbar>
  </AppBar>
);

export default Header;
