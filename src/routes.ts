import { Express, Request, Response } from "express";

export default function (app: Express) {
  /**
   * @method GET
   * @route /api/healthcheck
   * @description Healthcheck endpoint
   */
  app.get("/healthcheck", (_, res: Response) => {
    res.sendStatus(200);
  });

  /**
   * This endpoint is used to register a new user.
   * @method POST
   * @route /api/register
   * @param {string} username The username of the new user.
   * @param {string} password The password of the new user.
   * @param {string} email The email of the new user.
   * @returns { message: string } The status code and message of the response.
   */
  app.post("/register", async (req: Request, res: Response) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      res.status(400).send({ message: "Missing required fields" });
      return;
    }

    // check if the username or the email already exists
    const user_exists = await User.findOne({ username });
    if (user_exists) {
      res.status(400).send({
        message: "Username is already taken.",
      });
      return;
    }

    const mail_exists = await User.findOne({ email });
    if (mail_exists) {
      res.status(400).send({
        message: "Email is already registered on our services!",
      });
      return;
    }

    const user = await User.create({ username, password, email });
    res.status(201).send({ message: "User created" });
  });

  /**
   * This endpoint is used to login a user.
   * @method POST
   * @route /api/login
   * @param {string} username The username of the user.
   * @param {string} password The password of the user.
   * @returns {string} The JWT token of the user.
   */
  app.post("/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).send({ message: "Missing required fields" });
      return;
    }

    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).send({ message: "User not found" });
      return;
    }

    if (!user.comparePassword(password)) {
      res.status(400).send({ message: "Incorrect password" });
      return;
    }

    const token = user.generateToken();
    res.status(200).send({ token });
  });

  /**
   * This api endpoint is responsible for returning all the users sessions.
   * @method GET
   * @route /api/sessions
   * @returns { sessions: Session[] } Returns an array of currently active sessions for the requesting user.
   */
  app.get("/sessions", async (req: Request, res: Response) => {
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    res.status(200).send({ sessions: user.sessions });
  });

  /**
   * This endpoint is used to logout a user.
   * @method DELETE
   * @route /api/logout
   * @returns { message: String } The message of the response.
   */
  app.delete("/logout", async (req: Request, res: Response) => {
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    user.sessions = user.sessions.filter((session) => {
      return session.token !== req.token;
    });
    await user.save();
    res.status(200).send({ message: "User logged out" });
  });
}
