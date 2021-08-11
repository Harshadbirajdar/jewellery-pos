import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import AssessmentIcon from "@material-ui/icons/Assessment";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CategoryIcon from "@material-ui/icons/Category";
import TollIcon from "@material-ui/icons/Toll";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import {
  metalState,
  productState,
  reportState,
  customerState,
  productNameState,
} from "../redux/action/menu";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Link from "next/link";
import DescriptionIcon from "@material-ui/icons/Description";
import styles from "../styles/Menu.module.css";
import { connect } from "react-redux";
import { withRouter, useRouter } from "next/router";
import ReceiptIcon from "@material-ui/icons/Receipt";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import PeopleIcon from "@material-ui/icons/People";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { destoryToken } from "../components/api";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MoreIcon from "@material-ui/icons/More";
const Menu = ({
  Metal,
  metalChange,
  Product,
  productChange,
  router,
  reportChange,
  Report,
  customerChange,
  Customer,
  ProductName,
  productNameChange,
}) => {
  const MenuItems = ({ text, Icon, link, className = "" }) => (
    <Link href={link}>
      <List className={link === router.pathname && styles.active}>
        {console.log(link === router.pathname)}
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
  console.log(router.pathname);
  return (
    <List>
      <MenuItems text="Dashboard" Icon={DashboardIcon} link="/" />
      <MenuItems text="Sale Panel" Icon={ReceiptIcon} link="/sale" />

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
        <MenuItems
          text="Add Product Tag"
          Icon={LocalOfferIcon}
          link="/staff/product/tag"
          className={styles.nested}
        />
        <MenuItems
          text="View Product"
          Icon={DescriptionIcon}
          link="/staff/product/view"
          className={styles.nested}
        />
      </SubMenuItem>
      <SubMenuItem
        state={ProductName}
        onChange={productNameChange}
        Icon={BookmarkIcon}
        title="Product Name"
      >
        <MenuItems
          text="Add Product Name"
          Icon={MoreIcon}
          link="/admin/product/name"
          className={styles.nested}
        />
        <MenuItems
          text="View Product Name"
          Icon={ViewAgendaIcon}
          link="/admin/product/view"
          className={styles.nested}
        />
      </SubMenuItem>
      <SubMenuItem
        state={Customer}
        onChange={customerChange}
        Icon={PeopleIcon}
        title="Customer"
      >
        <MenuItems
          text="View Customer"
          Icon={AccountCircleIcon}
          link="/staff/customer/view"
          className={styles.nested}
        />
      </SubMenuItem>
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
        state={Report}
        onChange={reportChange}
        Icon={AssessmentIcon}
        title="Report"
      >
        <MenuItems
          text="Bill Report"
          Icon={ReceiptIcon}
          link="/staff/report/bill"
          className={styles.nested}
        />
      </SubMenuItem>
      <List>
        <ListItem
          button
          onClick={() => {
            destoryToken();
            router.push("/signin");
          }}
        >
          <ListItemIcon>
            <ExitToAppIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Sign Out"></ListItemText>
        </ListItem>
      </List>
    </List>
  );
};
const mapStateToProps = (state) => ({
  Metal: state.menu.metal,
  Product: state.menu.product,
  Report: state.menu.report,
  Customer: state.menu.customer,
  ProductName: state.menu.productName,
});
const mapDispatchToProps = (dispatch) => ({
  metalChange: () => {
    dispatch(metalState());
  },
  productChange: () => {
    dispatch(productState());
  },
  reportChange: () => {
    dispatch(reportState());
  },
  customerChange: () => {
    dispatch(customerState());
  },
  productNameChange: () => {
    dispatch(productNameState());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Menu));
