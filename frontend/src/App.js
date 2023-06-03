import './App.css';
import AddCategory from './Admin/Category/AddCategory';
import Admin from './Admin/Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dishes from './Admin/Dish/Dishes';
import ContactUs from './Components/ContactUs/ContactUs';
import Footer from './Components/layout/Footer/Footer';
import Navbar from './Components/layout/Navbar/Navbar';
import AboutUs from './Components/AboutUs/AboutUs';
import Menu from './Components/Menu/Menu';
import Register from './Components/auth/Register/Register';
import AdminRegister from './Components/auth/AdminRegister/AdminRegister';
import { Provider } from 'react-redux';
import store from './store';
import Login from './Components/auth/Login/Login';
import AdminLogin from './Components/auth/AdminLogin/AdminLogin';
import Landing from './Components/layout/Landing-page/Landing';
import Dashboard from './Components/Dashboard/Dashboard';
import ExtraDetails from './Components/auth/Register/ExtraDetails';
import AdminExtraDetails from './Components/auth/AdminRegister/AdminExtraDetails';
import setAuthToken from './Components/utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './Components/action/authActions';
import { setCurrentAdmin, logoutAdmin } from './Components/action/Adminauthactions';
import PrivateRoute from './Components/auth/PrivateRoute';
import Cart from './Components/Cart/Cart';
import EditProfile from './Components/Dashboard/EditProfile';
import { Dishdetails } from './Components/Menu/Dishdetails';
// import Navbar2 from './Components/layout/Navbar/Navbar2';

if (localStorage.jwtToken) {
	setAuthToken(localStorage.jwtToken);
	const decode = jwt_decode(localStorage.jwtToken);
	store.dispatch(setCurrentUser(decode));
	store.dispatch(setCurrentAdmin(decode));
	const currentTime = Date.now() / 1000;
	if (decode.exp < currentTime) {
		store.dispatch(logoutUser());
		store.dispatch(logoutAdmin());
       window.location.href = '/login';
		window.location.href = './Aminlogin'
	}
}
function App() {
	return (
		<Provider store={store}>
			<Router>
				<div>
				<Navbar />

					{/* <Navbar2 /> */}
					<div>
						{/* Admin Routes */}
						<Switch>
						<PrivateRoute exact path="/AddCategory" component={AddCategory}></PrivateRoute>
						<PrivateRoute exact path="/adminMoms" component={Admin}></PrivateRoute>
						<PrivateRoute exact path="/dishes/:id/:name" component={Dishes}></PrivateRoute>
						</Switch>
					</div>
					
					{/* Frontend Routes */}
					<Route exact path="/" component={Landing}></Route>
					<Route exact path="/Register" component={Register}></Route>
					<Route exact path="/Adminregister" component={AdminRegister}></Route>
					<Route exact path="/login" component={Login}></Route>
					<Route exact path="/Adminlogin" component={AdminLogin}></Route>
					<Route exact path="/ContactUs" component={ContactUs}></Route>
					<Route exact path="/editProfile" component={EditProfile}></Route>
					<Route exact path="/AboutUs" component={AboutUs}></Route>
					<Route exact path="/Menu" component={Menu}></Route>
					<Route exact path="/extraDetails" component={ExtraDetails}></Route>
					<Route exact path="/AdminExtraDetails" component={AdminExtraDetails}></Route>
					<Route exact path="/Dishdetails" component={Dishdetails}></Route>

					<Switch>
						<PrivateRoute exact path="/dashboard" component={Dashboard} />
						<PrivateRoute exact path="/cart" component={Cart}></PrivateRoute>
					</Switch>
					<Footer />
				</div>
			</Router>
		</Provider>
	);
}

export default App;
