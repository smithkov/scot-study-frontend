import React from "react";
import {
  Menu,
  Dropdown,
  Header,
  Button,
  Icon,
  Image,
  Table,
  Segment,
  Grid,
  Form,
  Placeholder,
  Divider,
  List,
  Input,
} from "semantic-ui-react";
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetIcon,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ChartLineSimple from "../charts/ChartLineSimple";
import ChartBarSimple from "../charts/ChartBarSimple";

const WidgetsDropdown = (prop) => {
  // render
  return (
    <CCol sm="6" lg="3">
      <CWidgetIcon text={prop.title} color={prop.color} iconPadding={false}>
        <CIcon width={24} name={prop.icon} />
      </CWidgetIcon>
    </CCol>
  );
};

export default WidgetsDropdown;
