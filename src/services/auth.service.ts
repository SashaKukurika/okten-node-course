import { ApiErrors } from "../errors";
import { User } from "../models";
import { Token } from "../models/Token.model";
import { ITokenPair, IUser } from "../types";
import { ICredentials } from "../types/auth.types";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(body: IUser): Promise<void> {
    try {
      const { password } = body;
      const hashedPassword = await passwordService.hash(password);
      await User.create({
        ...body,
        password: hashedPassword,
      });
    } catch (e) {
      throw new ApiErrors(e.message, e.status);
    }
  }

  public async login(
    credentials: ICredentials,
    user: IUser
  ): Promise<ITokenPair> {
    try {
      const { password } = credentials;
      const isMathed = await passwordService.compare(password, user.password);
      if (!isMathed) {
        throw new ApiErrors("Invalid email or password", 400);
      }

      const tokenPair = tokenService.generateTokenPair({
        name: user.name,
        id: user._id,
      });

      await Token.create({
        _user_id: user._id,
        ...tokenPair,
      });

      return tokenPair;
    } catch (e) {
      throw new ApiErrors(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
