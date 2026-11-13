import Booking from "./modules/booking&Reservation";
import Customer from "./modules/customers";
import Employee from "./modules/employee";
import Home from "./modules/home";
import Payment from "./modules/payment";
import Report from "./modules/report";
import VehicleManagement from "./modules/vehicleManagement";
import VehicleMaintenance from "./modules/vehicleMaintenance";
import Users from "./modules/users";
import WebSite from "./modules/userside_routes";

import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [...Booking, ...Customer, ...Employee, ...Home, ...Payment, ...Report, ...VehicleManagement, ...VehicleMaintenance, ...Users, ...WebSite],
});

export default router;
