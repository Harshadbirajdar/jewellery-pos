import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CategoryIcon from "@material-ui/icons/Category";
import TollIcon from "@material-ui/icons/Toll";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import { metalState, productState } from "../redux/action/menu";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Link from "next/link";
import styles from "../styles/Menu.module.css";
import { connect } from "react-redux";

const Menu = ({ Metal, metalChange, Product, productChange }) => {
  const MenuItems = ({ text, Icon, link, className = "" }) => (
    <Link href={link}>
      <List>
        <ListItem button className={className}>
          <ListItemIcon>
            <Icon color={className !== "" ? "inherit" : "primary"} />
          </ListItemIcon>
          <ListItemText primary={text}></ListItemText>
        </ListItem>
      </List>
    </Link>
  );
  const SubMenuItem = ({ state, onChange, Icon, title, children }) => (
    <>
      <ListItem button onClick={onChange}>
        <ListItemIcon>
          <Icon color="primary" />
        </ListItemIcon>
        <ListItemText primary={title} />
        {state ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={state} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </>
  );
  return (
    <List>
      <MenuItems text="Dashboard" Icon={DashboardIcon} link="/" />
      <SubMenuItem
        state={Metal}
        onChange={metalChange}
        Icon={TollIcon}
        title="Metal"
      >
        <MenuItems
          text="Create Metal"
          Icon={CategoryIcon}
          link="/admin/metal/create"
          className={styles.nested}
        />
        <MenuItems
          text="View Metals"
          Icon={ViewAgendaIcon}
          link="/admin/metal/view"
          className={styles.nested}
        />
      </SubMenuItem>
      <SubMenuItem
        state={Product}
        onChange={productChange}
        Icon={FileCopyIcon}
        title="Product"
      >
        <MenuItems
          text="Add Product"
          Icon={CategoryIcon}
          link="/staff/product/add"
          className={styles.nested}
        />
      </SubMenuItem>
    </List>
  );
};
const mapStateToProps = (state) => ({
  Metal: state.menu.metal,
  Product: state.menu.product,
});
const mapDispatchToProps = (dispatch) => ({
  metalChange: () => {
    dispatch(metalState());
  },
  productChange: () => {
    dispatch(productState());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
