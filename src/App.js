import React, { Component } from "react";
import {
  HashRouter,
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";

import "./App.css";
import Index from "../src/mainComponents/index";
import AllCourseSearch from "../src/mainComponents/allCourseSearch";
import CourseListing from "../src/mainComponents/courseListing";
import Institution from "../src/mainComponents/institution";
import Institutions from "../src/mainComponents/institutions";
import CourseDetail from "../src/mainComponents/courseDetail";
import Login from "../src/mainComponents/login";
import Register from "../src/mainComponents/register";

import "mdb-react-ui-kit/dist/css/mdb.min.css";
//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import ProtectedRoute from "./protectedRoute";
import "./scss/style.scss";

import {
  faCheckSquare,
  faCoffee,
  faBriefcase,
  faTools,
  faHandHoldingMedical,
  faPhotoVideo,
  faStethoscope,
  faUserNurse,
  faLaptop,
  faBrain,
} from "@fortawesome/free-solid-svg-icons";
import Sponsorship from "./containers/sponsorship";

library.add(
  fab,
  faCheckSquare,
  faCoffee,
  faBriefcase,
  faTools,
  faHandHoldingMedical,
  faPhotoVideo,
  faStethoscope,
  faUserNurse,
  faLaptop,
  faBrain
);

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));
const Profile = React.lazy(() => import("./containers/profile"));
const English = React.lazy(() => import("./containers/english"));
const HighSchool = React.lazy(() => import("./containers/highSchool"));
const Sponsor = React.lazy(() => import("./containers/sponsorship"));
const Application = React.lazy(() => import("./containers/application"));

const Qualification = React.lazy(() => import("./containers/qualification"));
const VisaHistory = React.lazy(() => import("./containers/visaHistory"));
const Dashboard = React.lazy(() => import("./containers/dashboard"));

const CourseList = React.lazy(() => import("./containers/admin/course/list"));
const CourseForm = React.lazy(() => import("./containers/admin/course/create"));
const CourseUpdate = React.lazy(() =>
  import("./containers/admin/course/update")
);

const InstitutionList = React.lazy(() =>
  import("./containers/admin/institution/list")
);
const InstitutionForm = React.lazy(() =>
  import("./containers/admin/institution/create")
);
const InstitutionUpdate = React.lazy(() =>
  import("./containers/admin/institution/update")
);

const AdminDashboard = React.lazy(() =>
  import("./containers/admin/adminDashboard")
);

const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

class App extends Component {
  render() {
    return (
      <Router>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route
              exact
              path="/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
            <Route
              path="/institution_list"
              name="Home"
              component={ProtectedRoute(InstitutionList)}
            />
            <Route
              path="/institution_update/:id"
              name="Home"
              component={ProtectedRoute(InstitutionUpdate)}
            />
            <Route
              path="/intitution_save"
              name="Home"
              component={ProtectedRoute(InstitutionForm)}
            />

            <Route
              path="/course_list"
              name="Home"
              component={ProtectedRoute(CourseList)}
              // render={(props) => <CourseList {...props} />}
            />
            <Route
              path="/course_update/:id"
              name="Home"
              component={ProtectedRoute(CourseUpdate)}
              //render={(props) => <CourseUpdate {...props} />}
            />
            <Route
              path="/course_save"
              name="Home"
              component={ProtectedRoute(CourseForm)}
            />

            <Route
              path="/dashboard"
              name="Home"
              component={ProtectedRoute(Dashboard)}
            />

            <Route
              path="/admin_dashboard"
              name="Home"
              component={ProtectedRoute(AdminDashboard)}
            />

            <Route
              path="/profile"
              name="Home"
              component={ProtectedRoute(Profile)}
            />

            <Route
              path="/highSchool"
              name="Home"
              component={ProtectedRoute(HighSchool)}
            />
            <Route
              path="/application"
              name="Home"
              component={ProtectedRoute(Application)}
            />
            <Route
              path="/edu_background"
              name="Home"
              component={ProtectedRoute(Qualification)}
            />

            <Route
              path="/visa_history"
              name="Home"
              component={ProtectedRoute(VisaHistory)}
            />

            <Route
              path="/english_test"
              name="Home"
              component={ProtectedRoute(English)}
            />

            <Route
              path="/sponsorship"
              name="Home"
              component={ProtectedRoute(Sponsor)}
            />

            <Route exact path="/" component={Index} />
            <Route exact path="/courses/:facultyId" component={CourseListing} />
            <Route exact path="/course/:id" component={CourseDetail} />
            <Route exact path="/course/:id" component={CourseDetail} />
            <Route exact path="/institution/:id" component={Institution} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/institutions" component={Institutions} />
            <Route exact path="/courses" component={AllCourseSearch} />
          </Switch>
        </React.Suspense>
      </Router>
    );
  }
}

export default App;
