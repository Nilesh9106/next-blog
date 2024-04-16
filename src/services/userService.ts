import { LoginForm, SignupForm } from "@/types/form";
import { errorHandler } from "@/utils/handlers";
import axios from "axios";

export class UserService {
  static login = errorHandler(async (data: LoginForm) => {
    const res = await axios.post("/api/auth/login", data);
    return res.data;
  });
  static signup = errorHandler(async (data: SignupForm) => {
    const res = await axios.post("/api/auth/signup", data);
    return res.data;
  });
  static logout = errorHandler(async () => {
    const res = await axios.post("/api/auth/logout");
    return res.data;
  });
}
